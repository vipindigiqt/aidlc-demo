import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { DeveloperNameModal } from '../shared/components/DeveloperNameModal'
import { useDeveloperName } from '../shared/hooks/use-developer-name'

function RootLayout() {
  const { name } = useDeveloperName()
  const needsName = name === null
  return (
    <>
      <Outlet />
      <DeveloperNameModal opened={needsName} onClose={() => {}} dismissible={false} />
      <TanStackRouterDevtools />
    </>
  )
}

export const Route = createRootRoute({
  component: RootLayout,
})
