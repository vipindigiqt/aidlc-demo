import { useState } from 'react'
import { Button, Group, Modal, Stack, Text } from '@mantine/core'
import { MonthPickerInput } from '@mantine/dates'
import { notifications } from '@mantine/notifications'
import dayjs from 'dayjs'
import { exportMonthToExcel } from '../utils/export-excel'
import { useDeveloperName } from '../../../shared/hooks/use-developer-name'

export function ExportButton() {
  const [opened, setOpened] = useState(false)
  const [month, setMonth] = useState<Date>(new Date())
  const [busy, setBusy] = useState(false)
  const { name: developerName } = useDeveloperName()

  async function handleExport() {
    if (!developerName) {
      notifications.show({
        color: 'red',
        title: 'Developer name missing',
        message: 'Set your name before exporting.',
      })
      return
    }
    setBusy(true)
    try {
      await exportMonthToExcel(month, developerName)
      notifications.show({
        color: 'green',
        title: 'Export ready',
        message: `Downloaded logsheet for ${dayjs(month).format('MMMM YYYY')}`,
      })
      setOpened(false)
    } catch (err) {
      notifications.show({
        color: 'red',
        title: 'Export failed',
        message: err instanceof Error ? err.message : 'Unknown error',
      })
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <Button variant="default" onClick={() => setOpened(true)}>
        Export Excel
      </Button>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Export to Excel"
        centered
        size="sm"
      >
        <Stack>
          <Text size="sm" c="dimmed">
            Pick the month to export. Empty months will export with just the header row.
          </Text>
          <MonthPickerInput
            label="Month"
            value={month}
            onChange={(v) => v && setMonth(typeof v === 'string' ? new Date(v) : v)}
            valueFormat="MMMM YYYY"
            clearable={false}
          />
          <Group justify="flex-end" mt="sm">
            <Button variant="default" onClick={() => setOpened(false)} disabled={busy}>
              Cancel
            </Button>
            <Button onClick={handleExport} loading={busy}>
              Download
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  )
}
