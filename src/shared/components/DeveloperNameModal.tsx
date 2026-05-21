import { useEffect } from 'react'
import { Button, Group, Modal, Stack, Text, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { useDeveloperName } from '../hooks/use-developer-name'

type Props = {
  opened: boolean
  onClose: () => void
  dismissible: boolean
}

export function DeveloperNameModal({ opened, onClose, dismissible }: Props) {
  const { name, save } = useDeveloperName()
  const form = useForm<{ name: string }>({
    initialValues: { name: name ?? '' },
    validate: {
      name: (value) => (value.trim().length >= 2 ? null : 'Name must be at least 2 characters'),
    },
  })

  useEffect(() => {
    if (opened) {
      form.setValues({ name: name ?? '' })
      form.resetDirty()
      form.resetTouched()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opened, name])

  function handleSubmit(values: { name: string }) {
    save(values.name)
    onClose()
  }

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={dismissible ? 'Edit developer name' : 'Welcome'}
      centered
      size="sm"
      withCloseButton={dismissible}
      closeOnClickOutside={dismissible}
      closeOnEscape={dismissible}
    >
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          {!dismissible && (
            <Text size="sm" c="dimmed">
              Enter your name to start logging entries. It will appear on your monthly Excel export.
            </Text>
          )}
          <TextInput
            label="Developer name"
            placeholder="Jane Doe"
            withAsterisk
            data-autofocus
            {...form.getInputProps('name')}
          />
          <Group justify="flex-end" mt="sm">
            {dismissible && (
              <Button variant="default" onClick={onClose}>
                Cancel
              </Button>
            )}
            <Button type="submit">Save</Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  )
}
