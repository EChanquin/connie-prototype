import type { Annotation, AnnotationVerdict } from '@/types'
import { cn } from '@/lib/cn'
import { IconCheck, IconInfo, IconX } from '@/components/icons'
import { SourcesList } from '@/components/display/SourcesList'

const verdictMeta: Record<
  AnnotationVerdict,
  { label: string; tone: string; underline: string; icon: React.ReactNode }
> = {
  'verified-cr-community': {
    label: 'Verified by CR + community',
    tone: 'text-fg-brand bg-brand-muted',
    underline: 'decoration-brand',
    icon: <IconCheck size={14} />,
  },
  'verified-community-only': {
    label: 'Verified by community',
    tone: 'text-accent-blue bg-[#e2edf7]',
    underline: 'decoration-accent-blue',
    icon: <IconCheck size={14} />,
  },
  misleading: {
    label: 'Misleading claim',
    tone: 'text-fg-attention bg-bg-attention-muted',
    underline: 'decoration-fg-attention',
    icon: <IconX size={14} />,
  },
  unverifiable: {
    label: 'Unable to verify',
    tone: 'text-fg-secondary bg-bg-tertiary',
    underline: 'decoration-border-strong',
    icon: <IconInfo size={14} />,
  },
}

/** Highlighted claim text on the retailer page + its verdict callout. */
export function AnnotationMark({ annotation, open }: { annotation: Annotation; open?: boolean }) {
  const meta = verdictMeta[annotation.verdict]
  return (
    <div className="space-y-100">
      <span
        className={cn(
          'inline decoration-wavy decoration-2 underline underline-offset-4',
          meta.underline,
        )}
      >
        “{annotation.claim}”
      </span>
      {open && (
        <div className="rounded-sm border border-border-subtle bg-bg-primary p-200 shadow-subtle">
          <div className={cn('mb-75 inline-flex items-center gap-50 rounded-pill px-100 py-[2px] text-utility font-medium', meta.tone)}>
            {meta.icon} {meta.label}
          </div>
          <p className="mb-100 text-utility text-fg-primary">{annotation.explanation}</p>
          <SourcesList sources={annotation.sources} />
        </div>
      )}
    </div>
  )
}

export { verdictMeta }
