import { useEffect } from 'react'
import {
  Button,
  Group,
  Modal,
  NumberInput,
  Select,
  Stack,
  Textarea,
} from '@mantine/core'
import { DateInput } from '@mantine/dates'
import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import dayjs from 'dayjs'
import {
  ENTRY_TYPES,
  ENTRY_TYPE_LABELS,
  type EntryType,
  type LogEntry,
  requiresDescription,
  requiresHours,
} from '../schemas/log-entry'
import { upsertEntry } from '../utils/db'

type FormValues = {
  date: Date | null
  type: EntryType
  hours: number | string
  description: string
}

type Props = {
  opened: boolean
  onClose: () => void
  initialEntry?: LogEntry
  defaultDate?: string
}

export function LogEntryForm({ opened, onClose, initialEntry, defaultDate }: Props) {
  const form = useForm<FormValues>({
    initialValues: {
      date: initialEntry ? dayjs(initialEntry.date).toDate() : defaultDate ? dayjs(defaultDate).toDate() : new Date(),
      type: initialEntry?.type ?? 'working',
      hours: initialEntry?.hours ?? 8,
      description: initialEntry?.description ?? '',
    },
    validate: {
      date: (value) => (value ? null : 'Date is required'),
      hours: (value, values) => {
        const num = typeof value === 'string' ? Number(value) : value
        if (Number.isNaN(num) || num < 0) return 'Hours must be 0 or greater'
        if (requiresHours(values.type) && num <= 0) return 'Hours must be greater than 0'
        if (num > 24) return 'Hours cannot exceed 24'
        return null
      },
      description: (value, values) => {
        if (requiresDescription(values.type) && !value.trim()) return 'Description is required'
        return null
      },
    },
  })

  useEffect(() => {
    if (opened) {
      form.setValues({
        date: initialEntry ? dayjs(initialEntry.date).toDate() : defaultDate ? dayjs(defaultDate).toDate() : new Date(),
        type: initialEntry?.type ?? 'working',
        hours: initialEntry?.hours ?? 8,
        description: initialEntry?.description ?? '',
      })
      form.resetDirty()
      form.resetTouched()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opened, initialEntry?.date])

  const isEditing = Boolean(initialEntry)

  return (
    <Modal opened={opened} onClose={onClose} title={isEditing ? 'Edit log entry' : 'Add log entry'} centered>
      <form
        onSubmit={form.onSubmit(async (values) => {
          if (!values.date) return
          const dateStr = dayjs(values.date).format('YYYY-MM-DD')
          const hoursNum = typeof values.hours === 'string' ? Number(values.hours) : values.hours
          try {
            await upsertEntry({
              date: dateStr,
              type: values.type,
              hours: hoursNum,
              description: values.description.trim(),
            })
            notifications.show({
              color: 'green',
              title: isEditing ? 'Entry updated' : 'Entry saved',
              message: dateStr,
            })
            onClose()
          } catch (err) {
            notifications.show({
              color: 'red',
              title: 'Failed to save',
              message: err instanceof Error ? err.message : 'Unknown error',
            })
          }
        })}
      >
        <Stack>
          <DateInput
            label="Date"
            withAsterisk
            disabled={isEditing}
            valueFormat="YYYY-MM-DD"
            {...form.getInputProps('date')}
          />
          <Select
            label="Type"
            withAsterisk
            data={ENTRY_TYPES.map((t) => ({ value: t, label: ENTRY_TYPE_LABELS[t] }))}
            {...form.getInputProps('type')}
          />
          <NumberInput
            label="Hours"
            min={0}
            max={24}
            step={0.5}
            decimalScale={2}
            {...form.getInputProps('hours')}
          />
          <Textarea
            label="Description"
            autosize
            minRows={3}
            withAsterisk={requiresDescription(form.values.type)}
            {...form.getInputProps('description')}
          />
          <Group justify="flex-end" mt="sm">
            <Button variant="default" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">{isEditing ? 'Save' : 'Add entry'}</Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  )
}
