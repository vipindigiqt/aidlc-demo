import { createFileRoute } from '@tanstack/react-router'
import { Container } from '@mantine/core'
import { LogsheetTable } from '../modules/logsheet'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <Container size="xl" py="lg">
      <LogsheetTable />
    </Container>
  )
}
