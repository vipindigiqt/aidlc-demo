import ExcelJS from 'exceljs'
import dayjs from 'dayjs'
import { db } from './db'
import { ENTRY_TYPE_LABELS, type EntryType } from '../schemas/log-entry'
import { slugifyDeveloperName } from '../../../shared/utils/developer-name'

const TYPE_FILL: Partial<Record<EntryType, string>> = {
  'full-leave': 'FFFFE5E5',
  'partial-leave': 'FFFFF1E0',
  weekend: 'FFF1F3F5',
  holiday: 'FFF3E8FF',
}

export async function exportMonthToExcel(month: Date, developerName: string): Promise<void> {
  const m = dayjs(month)
  const from = m.startOf('month').format('YYYY-MM-DD')
  const to = m.endOf('month').format('YYYY-MM-DD')

  const entries = await db.entries.where('date').between(from, to, true, true).sortBy('date')

  const workbook = new ExcelJS.Workbook()
  workbook.creator = developerName
  workbook.created = new Date()

  const sheet = workbook.addWorksheet(m.format('MMMM YYYY'))

  sheet.columns = [
    { key: 'date', width: 14 },
    { key: 'day', width: 8 },
    { key: 'type', width: 16 },
    { key: 'hours', width: 10 },
    { key: 'description', width: 60 },
  ]

  const developerRow = sheet.addRow({
    date: 'Developer:',
    day: '',
    type: developerName,
    hours: '',
    description: '',
  })
  developerRow.font = { bold: true }
  sheet.mergeCells(developerRow.number, 3, developerRow.number, 5)
  developerRow.alignment = { vertical: 'middle', horizontal: 'left' }

  const headerRow = sheet.addRow({
    date: 'Date',
    day: 'Day',
    type: 'Type',
    hours: 'Hours',
    description: 'Description',
  })
  headerRow.font = { bold: true, color: { argb: 'FFFFFFFF' } }
  headerRow.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF1971C2' },
  }
  headerRow.alignment = { vertical: 'middle', horizontal: 'left' }
  headerRow.height = 22

  for (const entry of entries) {
    const row = sheet.addRow({
      date: entry.date,
      day: dayjs(entry.date).format('ddd'),
      type: ENTRY_TYPE_LABELS[entry.type],
      hours: entry.hours,
      description: entry.description,
    })
    const fillColor = TYPE_FILL[entry.type]
    if (fillColor) {
      row.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: fillColor },
      }
    }
    row.alignment = { vertical: 'top', wrapText: true }
  }

  if (entries.length > 0) {
    const totalRow = sheet.addRow({
      date: '',
      day: '',
      type: 'Total',
      hours: entries.reduce((sum, e) => sum + e.hours, 0),
      description: `${entries.length} entries`,
    })
    totalRow.font = { bold: true }
    totalRow.border = {
      top: { style: 'thin' },
    }
  }

  sheet.getColumn('hours').numFmt = '0.##'
  sheet.views = [{ state: 'frozen', ySplit: headerRow.number }]

  const buffer = await workbook.xlsx.writeBuffer()
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  })

  const slug = slugifyDeveloperName(developerName)
  const filename = slug
    ? `logsheet-${slug}-${m.format('YYYY-MM')}.xlsx`
    : `logsheet-${m.format('YYYY-MM')}.xlsx`

  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
