import { useNavigate } from 'react-router-dom'
import { useJourneyStore, type NaviTab } from '@/store/useJourneyStore'
import { IconFeather, IconChat, IconBookmark, IconSettings, IconTutorial } from '@/components/icons'
import { cn } from '@/lib/cn'
import { routes } from '@/app/routes'

const tabs: { key: NaviTab; icon: React.ReactNode; label: string; to?: string }[] = [
  { key: 'default', icon: <IconFeather size={22} />, label: 'Connie', to: routes.insights },
  { key: 'chat', icon: <IconChat size={22} />, label: 'Chat', to: routes.chat },
  { key: 'save', icon: <IconBookmark size={22} />, label: 'Saved', to: routes.collaborate },
  { key: 'settings', icon: <IconSettings size={22} />, label: 'Settings' },
  { key: 'tutorial', icon: <IconTutorial size={22} />, label: 'Tutorial' },
]

/** Persistent left rail. Does not remount between /browse screens. */
export function NaviBar() {
  const active = useJourneyStore((s) => s.activeNaviTab)
  const setTab = useJourneyStore((s) => s.setNaviTab)
  const navigate = useNavigate()

  return (
    <nav className="flex h-full w-16 flex-col items-center gap-100 border-r border-border-subtle bg-bg-primary py-200">
      <div className="mb-100 flex h-10 w-10 items-center justify-center rounded-pill bg-brand text-fg-inverse">
        <IconFeather size={22} />
      </div>
      {tabs.map((t) => (
        <button
          key={t.key}
          aria-label={t.label}
          title={t.label}
          onClick={() => {
            setTab(t.key)
            if (t.to) navigate(t.to)
          }}
          className={cn(
            'flex h-11 w-11 flex-col items-center justify-center gap-[2px] rounded-sm transition-colors',
            active === t.key ? 'bg-brand-muted text-fg-brand' : 'text-fg-secondary hover:bg-bg-tertiary',
          )}
        >
          {t.icon}
        </button>
      ))}
    </nav>
  )
}
