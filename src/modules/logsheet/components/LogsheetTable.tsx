import { useMemo, useState } from 'react'
import {
  ActionIcon,
  Badge,
  Button,
  Group,
  Modal,
  Stack,
  Table,
  Text,
  Title,
  Tooltip,
} from '@mantine/core'
import { MonthPickerInput } from '@mantine/dates'
import { notifications } from '@mantine/notifications'
import dayjs from 'dayjs'
import {
  ENTRY_TYPE_COLORS,
  ENTRY_TYPE_LABELS,
  type LogEntry,
} from '../schemas/log-entry'
import { useLogEntries } from '../hooks/use-log-entries'
import { deleteEntry } from '../utils/db'
import { LogEntryForm } from './LogEntryForm'
import { ExportButton } from './ExportButton'
import { DeveloperNameModal } from '../../../shared/components/DeveloperNameModal'
import { useDeveloperName } from '../../../shared/hooks/use-developer-name'

function isWeekend(dateStr: string): boolean {
  const day = dayjs(dateStr).day()
  return day === 0 || day === 6
}

export function LogsheetTable() {
  const [month, setMonth] = useState<Date>(new Date())
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<LogEntry | undefined>(undefined)
  const [pendingDelete, setPendingDelete] = useState<LogEntry | null>(null)
  const [nameModalOpen, setNameModalOpen] = useState(false)
  const { name: developerName } = useDeveloperName()

  const range = useMemo(() => {
    const m = dayjs(month)
    return {
      from: m.startOf('month').format('YYYY-MM-DD'),
      to: m.endOf('month').format('YYYY-MM-DD'),
    }
  }, [month])

  const entries = useLogEntries(range.from, range.to)

  const totalHours = useMemo(
    () => (entries ?? []).reduce((sum, e) => sum + e.hours, 0),
    [entries],
  )

  function openAdd() {
    setEditing(undefined)
    setFormOpen(true)
  }

  function openEdit(entry: LogEntry) {
    setEditing(entry)
    setFormOpen(true)
  }

  async function performDelete() {
    if (!pendingDelete) return
    const target = pendingDelete
    setPendingDelete(null)
    await deleteEntry(target.date)
    notifications.show({ color: 'gray', title: 'Entry deleted', message: target.date })
  }

  return (
    <Stack gap="md">
      <Group justify="space-between" align="flex-end">
        <div>
          <Group gap="xs" align="center">
            <Title order={2}>Logsheet</Title>
            {developerName && (
              <Text size="sm" c="dimmed">
                — {developerName}
              </Text>
            )}
            <Tooltip label="Edit developer name">
              <ActionIcon
                variant="subtle"
                onClick={() => setNameModalOpen(true)}
                aria-label="Edit developer name"
              >
                <span aria-hidden>⚙</span>
              </ActionIcon>
            </Tooltip>
          </Group>
          <Text c="dimmed" size="sm">
            {dayjs(month).format('MMMM YYYY')} — {(entries ?? []).length} entries · {totalHours} hours total
          </Text>
        </div>
        <Group>
          <MonthPickerInput
            label="Month"
            value={month}
            onChange={(v) => v && setMonth(typeof v === 'string' ? new Date(v) : v)}
            valueFormat="MMMM YYYY"
            clearable={false}
          />
          <ExportButton />
          <Button onClick={openAdd}>Add entry</Button>
        </Group>
      </Group>

      <Table.ScrollContainer minWidth={720}>
        <Table striped highlightOnHover withTableBorder verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Date</Table.Th>
              <Table.Th>Day</Table.Th>
              <Table.Th>Type</Table.Th>
              <Table.Th style={{ textAlign: 'right' }}>Hours</Table.Th>
              <Table.Th>Description</Table.Th>
              <Table.Th style={{ width: 100 }}>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {entries === undefined ? (
              <Table.Tr>
                <Table.Td colSpan={6}>
                  <Text c="dimmed" ta="center" py="md">
                    Loading…
                  </Text>
                </Table.Td>
              </Table.Tr>
            ) : entries.length === 0 ? (
              <Table.Tr>
                <Table.Td colSpan={6}>
                  <Text c="dimmed" ta="center" py="md">
                    No entries for this month. Click "Add entry" to create one.
                  </Text>
                </Table.Td>
              </Table.Tr>
            ) : (
              entries.map((entry) => (
                <Table.Tr key={entry.date} className={isWeekend(entry.date) ? 'bg-gray-50' : ''}>
                  <Table.Td>{entry.date}</Table.Td>
                  <Table.Td>{dayjs(entry.date).format('ddd')}</Table.Td>
                  <Table.Td>
                    <Badge color={ENTRY_TYPE_COLORS[entry.type]} variant="light">
                      {ENTRY_TYPE_LABELS[entry.type]}
                    </Badge>
                  </Table.Td>
                  <Table.Td style={{ textAlign: 'right' }}>{entry.hours}</Table.Td>
                  <Table.Td>
                    <Text size="sm" style={{ whiteSpace: 'pre-wrap' }}>
                      {entry.description || <span className="text-gray-400">—</span>}
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Group gap="xs">
                      <Tooltip label="Edit">
                        <ActionIcon variant="subtle" onClick={() => openEdit(entry)} aria-label="Edit">
                          <span aria-hidden>✎</span>
                        </ActionIcon>
                      </Tooltip>
                      <Tooltip label="Delete">
                        <ActionIcon
                          variant="subtle"
                          color="red"
                          onClick={() => setPendingDelete(entry)}
                          aria-label="Delete"
                        >
                          <span aria-hidden>🗑</span>
                        </ActionIcon>
                      </Tooltip>
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ))
            )}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>

      <LogEntryForm
        opened={formOpen}
        onClose={() => setFormOpen(false)}
        initialEntry={editing}
      />

      <DeveloperNameModal
        opened={nameModalOpen}
        onClose={() => setNameModalOpen(false)}
        dismissible
      />

      <Modal
        opened={pendingDelete !== null}
        onClose={() => setPendingDelete(null)}
        title="Delete entry"
        centered
        size="sm"
      >
        <Stack>
          <Text size="sm">Delete the log for {pendingDelete?.date}?</Text>
          <Group justify="flex-end">
            <Button variant="default" onClick={() => setPendingDelete(null)}>
              Cancel
            </Button>
            <Button color="red" onClick={performDelete}>
              Delete
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Stack>
  )
}
