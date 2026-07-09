import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@/components/primitives/Button'
import { nextRoute } from '@/app/routes'

/** Continue button that advances along the prototype flow order. */
export function FlowFooter({
  label = 'Continue',
  to,
  disabled,
  secondary,
  onBeforeNext,
}: {
  label?: string
  to?: string
  disabled?: boolean
  secondary?: { label: string; to: string }
  onBeforeNext?: () => void
}) {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const go = () => {
    onBeforeNext?.()
    navigate(to ?? nextRoute(pathname) ?? pathname)
  }
  return (
    <div className="flex items-center gap-100">
      {secondary && (
        <Button variant="ghost" fullWidth onClick={() => navigate(secondary.to)}>
          {secondary.label}
        </Button>
      )}
      <Button fullWidth onClick={go} disabled={disabled}>
        {label}
      </Button>
    </div>
  )
}
