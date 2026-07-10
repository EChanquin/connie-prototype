import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FigmaFrame } from '@/layouts/FigmaFrame'
import { callConnie } from '@/api/connieClient'
import { isPostPurchase, type CommunityStat } from '@/types/connie-contract'

/** The product this check-in is about (matches the saved ProductCard). */
const LIVE_PRODUCT = 'UppaBaby Vista V2'

/* ---------- Post-Purchase asset paths (public/figma, prefix pp-) ---------- */
const asset = {
  backdrop: '/figma/pp-backdrop.png',
  naviChat: '/figma/pp-navi-chat.svg',
  naviHeart: '/figma/pp-navi-heart.svg',
  naviLine: '/figma/pp-navi-line.svg',
  naviGear: '/figma/pp-navi-gear.svg',
  naviQuestion: '/figma/pp-navi-question.svg',
  naviDot: '/figma/pp-navi-dot.svg',
  vista: '/figma/pp-vista.png',
  close: '/figma/pp-header-caret.svg',
  send: '/figma/pp-send.svg',
  bannerStar: '/figma/pp-banner-star.svg',
}

/** Dimmed retailer page behind the panel — 1052:4835 (bg left -141/top -6, inner img scaled 117%). */
function Backdrop() {
  return (
    <div className="absolute overflow-hidden" style={{ left: -141, top: -6, width: 1656, height: 1035 }}>
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <img
          alt=""
          src={asset.backdrop}
          className="absolute max-w-none"
          style={{ left: '-14.65%', top: '-17.12%', width: '117.12%', height: '117.12%' }}
        />
      </div>
    </div>
  )
}

/* ---------- Shared Connie post-purchase primitives ---------- */

/** Collapsed Connie "Navi bar" rail — 1052:5192. Fixed at left 62 / top 300. */
function NaviRail({ notify = false, onOpen }: { notify?: boolean; onOpen?: () => void }) {
  return (
    <div
      className="absolute flex items-center rounded-[8px] border-[0.5px] border-border-subtle bg-white p-[10px] shadow-[0px_0px_7.5px_0px_rgba(5,5,0,0.16)]"
      style={{ left: 62, top: 300 }}
    >
      <div className="flex flex-col items-start gap-[16px]">
        <div className="flex flex-col items-start gap-[16px]">
          <button aria-label="Open Connie chat" onClick={onOpen} className="relative block size-[40px]">
            <img alt="" src={asset.naviChat} className="absolute inset-0 block size-full" />
          </button>
          <div className="relative size-[40px]">
            <img alt="" src={asset.naviHeart} className="absolute inset-0 block size-full" />
          </div>
        </div>
        <div className="relative h-0 w-full">
          <img alt="" src={asset.naviLine} className="block h-[2px] w-full" />
        </div>
        <div className="flex flex-col items-start gap-[16px]">
          <div className="relative size-[40px]">
            <img alt="" src={asset.naviGear} className="absolute inset-0 block size-full" />
          </div>
          <div className="relative size-[40px]">
            <img alt="" src={asset.naviQuestion} className="absolute inset-0 block size-full" />
          </div>
        </div>
      </div>
      {notify && (
        <img
          alt=""
          src={asset.naviDot}
          className="pointer-events-none absolute size-[14px]"
          style={{ left: 30, top: 13 }}
        />
      )}
    </div>
  )
}

/** Connie chat panel shell — header + divider + scrolling body. */
function ConniePanel({
  left,
  top,
  scroll,
  children,
  onClose,
}: {
  left: number
  top: number
  scroll?: boolean
  children: ReactNode
  onClose?: () => void
}) {
  return (
    <div
      className="absolute flex flex-col items-start overflow-clip rounded-md border border-border-subtle bg-bg-primary p-[36px] shadow-panel"
      style={{ left, top, width: 520, height: 800 }}
    >
      {/* Header — 1052:4838 */}
      <div className="flex w-full shrink-0 items-center gap-[10px] overflow-clip px-[20px] py-[18px]">
        <div className="relative size-[34px] shrink-0 overflow-clip rounded-[8px] bg-fg-primary">
          <span className="absolute left-[10px] top-[6px] whitespace-nowrap text-[18px] font-semibold leading-[22px] tracking-[-0.25px] text-white">
            C
          </span>
        </div>
        <div className="flex min-w-px flex-1 flex-col items-start overflow-clip whitespace-nowrap">
          <p className="text-[16px] font-semibold leading-[24px] text-fg-primary">Connie</p>
          <p className="text-[14px] leading-[20px] text-fg-secondary">Consumer Reports</p>
        </div>
        <button aria-label="Close" onClick={onClose} className="relative size-[20px] shrink-0">
          <img alt="" src={asset.close} className="absolute inset-0 block size-full" />
        </button>
      </div>
      <div className="h-px w-full shrink-0 bg-border-subtle" />
      {/* Body — 1052:4847 */}
      <div
        className={`flex min-h-px w-full flex-1 flex-col items-start gap-[14px] p-[20px] ${
          scroll ? 'overflow-y-auto overflow-x-clip' : 'overflow-clip'
        }`}
      >
        {children}
      </div>
    </div>
  )
}

/** Connie message bubble (1052:4848) — bottom-left tail radius. */
function BotBubble({ children }: { children: ReactNode }) {
  return (
    <div className="w-[340px] shrink-0 overflow-clip rounded-bl-[16px] rounded-br-[16px] rounded-tl-[4px] rounded-tr-[16px] bg-bg-tertiary px-[16px] py-[13px]">
      <p className="w-full text-[16px] leading-[24px] text-fg-primary">{children}</p>
    </div>
  )
}

/** User reply bubble (1052:4922) — right-aligned, black, top-right tail radius. */
function UserBubble({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-full shrink-0 items-start justify-end overflow-clip">
      <div className="w-[260px] overflow-clip rounded-bl-[16px] rounded-br-[16px] rounded-tl-[16px] rounded-tr-[4px] bg-fg-primary px-[16px] py-[13px]">
        <p className="w-full text-[16px] font-semibold leading-[24px] text-white">{children}</p>
      </div>
    </div>
  )
}

type ChipState = 'default' | 'active' | 'selected'
/** Choice chip (1052:4865). default=thin gray, active=2px subtle, selected=2px brand. */
function Chip({ label, state = 'default' }: { label: string; state?: ChipState }) {
  const border =
    state === 'selected'
      ? 'border-2 border-border-brand'
      : state === 'active'
        ? 'border-2 border-border-subtle'
        : 'border-[1.5px] border-[#d9d9db]'
  return (
    <div
      className={`flex shrink-0 items-center overflow-clip rounded-pill bg-bg-primary px-[15px] py-[9px] ${border}`}
    >
      <p className="whitespace-nowrap text-[14px] leading-[20px] text-fg-primary">{label}</p>
    </div>
  )
}

function ChipRow({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-full shrink-0 flex-wrap content-start items-start gap-[8px] overflow-clip">
      {children}
    </div>
  )
}

/** Saved product card (1052:4850) — UppaBaby Vista V2. */
function ProductCard() {
  return (
    <div className="flex shrink-0 items-start gap-[16px]">
      <div className="flex size-[80px] shrink-0 flex-col items-start justify-center overflow-clip rounded-[8px] bg-bg-tertiary">
        <img alt="" src={asset.vista} className="size-full rounded-[8px] object-cover" />
      </div>
      <div className="flex w-[236px] shrink-0 flex-col items-start gap-[4px]">
        <div className="h-[28px] w-full">
          <div className="flex items-start rounded-[4px] bg-bg-brand-muted px-[8px] py-[4px]">
            <p className="whitespace-nowrap text-[14px] leading-[20px] text-fg-brand">#1 BEST MATCH</p>
          </div>
        </div>
        <div className="w-full overflow-clip">
          <p className="w-full text-[14px] font-semibold leading-[20px] text-fg-primary">UppaBaby Vista V2</p>
        </div>
        <div className="flex h-[30px] w-full items-center gap-[9px]">
          <p className="w-[60px] text-[14px] leading-[20px] text-fg-primary">$999.00</p>
          <div className="flex items-start rounded-[4px] bg-[#fff3b3] px-[8px] py-[4px]">
            <p className="whitespace-nowrap text-[14px] leading-[20px] text-fg-secondary">AT AMAZON</p>
          </div>
        </div>
      </div>
    </div>
  )
}

/** Composer input pill (1052:4873). */
function InputBar() {
  return (
    <div className="flex w-full shrink-0 items-center gap-[10px] overflow-clip rounded-pill bg-bg-secondary py-[10px] pl-[18px] pr-[10px]">
      <p className="min-w-px flex-1 text-[16px] leading-[24px] text-fg-secondary">
        Add anything in your own words…
      </p>
      <div className="relative size-[40px] shrink-0 overflow-clip rounded-pill bg-fg-primary">
        <img alt="" src={asset.send} className="absolute left-[10px] top-[10px] size-[20px]" />
      </div>
    </div>
  )
}

/** Community-impact confirmation banner (1052:5181). */
function ThanksBanner({ stat }: { stat?: CommunityStat | null }) {
  return (
    <div className="flex w-full shrink-0 items-center gap-[10px] overflow-clip rounded-md bg-[#f2eddb] py-[13px] pl-[15px] pr-[16px]">
      <img alt="" src={asset.bannerStar} className="size-[20px] shrink-0" />
      <p className="min-w-px flex-1 text-[16px] leading-[24px] text-[#80610f]">
        {stat
          ? `Thanks! ${stat.percent}% ${stat.statement}`
          : 'Thanks! Your take just helped 3 parents deciding right now! Keep up the good work!'}
      </p>
    </div>
  )
}

const HEY =
  "Hey! You're browsing baby bottles now - but you saved the UPPAbaby Vista three weeks ago. Did you end up buying it? 20 seconds here helps other parents like you choose."

/* ---------- Step reproductions (each = one Figma frame) ---------- */
const STEP_COUNT = 8

/** Post-purchase check-in — 8 step variants of the Connie chat panel. */
export function PostPurchaseScreen() {
  const [params, setParams] = useSearchParams()
  const raw = Number(params.get('step') ?? '0')
  const step = Number.isFinite(raw) ? Math.min(Math.max(Math.trunc(raw), 0), STEP_COUNT - 1) : 0
  const go = (n: number) => {
    const next = Math.min(Math.max(n, 0), STEP_COUNT - 1)
    const p = new URLSearchParams(params)
    p.set('step', String(next))
    setParams(p, { replace: true })
  }

  // Fetch the live check-in once (guard against StrictMode double-invoke). Baked copy shows
  // until it returns, then live message + sentiment options swap in.
  const [checkInMsg, setCheckInMsg] = useState<string | null>(null)
  const [sentiments, setSentiments] = useState<string[] | null>(null)
  const [stat, setStat] = useState<CommunityStat | null>(null)
  const didFetch = useRef(false)
  useEffect(() => {
    if (didFetch.current) return
    didFetch.current = true
    callConnie({ message: `How's my ${LIVE_PRODUCT} working out?` })
      .then((r) => {
        if (isPostPurchase(r)) {
          setCheckInMsg(r.post_purchase.message)
          if (r.post_purchase.sentiment_options.length > 0) {
            setSentiments(r.post_purchase.sentiment_options)
          }
          setStat(r.post_purchase.community_stat)
        }
      })
      .catch(() => {
        /* keep baked content on error */
      })
  }, [])
  const sentimentChips = sentiments ?? ['Love it', "It's fine", 'Not what I hoped']

  // Panel visibility + position per frame.
  const panelOpen = step !== 0 && step !== 4
  const pos: Record<number, { left: number; top: number; scroll: boolean }> = {
    1: { left: 864, top: 72, scroll: false },
    2: { left: 864, top: 72, scroll: false },
    3: { left: 864, top: 72, scroll: false },
    5: { left: 871, top: 50, scroll: true },
    6: { left: 885, top: 50, scroll: true },
    7: { left: 885, top: 50, scroll: true },
  }
  const p = pos[step] ?? { left: 864, top: 72, scroll: false }

  return (
    <FigmaFrame bg="#f4f4f5">
      <Backdrop />
      <NaviRail notify={step === 0} onOpen={() => go(step === 0 ? 1 : 5)} />

      {panelOpen && (
        <ConniePanel left={p.left} top={p.top} scroll={p.scroll} onClose={() => go(step >= 5 ? 4 : 0)}>
          {/* Pre-scroll intro (present in PP1–PP3) */}
          {(step === 1 || step === 2 || step === 3) && (
            <>
              <BotBubble>{HEY}</BotBubble>
              <ProductCard />
            </>
          )}
          {/* Product card also heads PP5 / PP8 */}
          {(step === 5 || step === 6) && <ProductCard />}

          {/* Q1 — Did you buy it? */}
          {step === 1 ? (
            <ChipRow>
              <Chip label="Yes - I bought it " state="active" />
              <Chip label="Not yet" />
              <Chip label="Bought a different one" />
              <Chip label="Other" />
            </ChipRow>
          ) : (
            <>
              <ChipRow>
                <Chip label="Yes - I bought it " state="selected" />
                <Chip label="Not yet" />
                <Chip label="Bought a different one" />
                <Chip label="Other" />
              </ChipRow>
              <UserBubble>Yes - I bought it</UserBubble>
            </>
          )}

          {/* Q2 — How's it treating you? (PP3 onward) */}
          {step >= 3 && (
            <>
              <BotBubble>{checkInMsg ?? "How's it treating you?"}</BotBubble>
              <ChipRow>
                {sentimentChips.map((label, i) => (
                  <Chip
                    key={label}
                    label={label}
                    state={i === 0 ? (step === 3 ? 'active' : 'selected') : 'default'}
                  />
                ))}
                <Chip label="Other" />
              </ChipRow>
              {step >= 4 && <UserBubble>{sentimentChips[0]}</UserBubble>}
            </>
          )}

          {/* Q3 — What would've made it even better? (PP5 onward) */}
          {step >= 5 && (
            <>
              <BotBubble>Love that. Quick one - what would've made it even better?</BotBubble>
              <ChipRow>
                <Chip label="Fold & portability" />
                <Chip label="Comfort" />
                <Chip label="Durability" state={step === 5 ? 'active' : 'selected'} />
                <Chip label="Other" />
              </ChipRow>
            </>
          )}

          {/* Confirmation banner (PP9) */}
          {step === 7 && <ThanksBanner stat={stat} />}

          <InputBar />
        </ConniePanel>
      )}

      <StepPager step={step} go={go} />
    </FigmaFrame>
  )
}

/** Minimal fixed pager to advance between step variants (dev control). */
function StepPager({ step, go }: { step: number; go: (n: number) => void }) {
  const btn: CSSProperties = { width: 26, height: 26 }
  const labels = ['Pre', 'PP1', 'PP2', 'PP3', 'PP4', 'PP5', 'PP8', 'PP9']
  return (
    <div className="fixed bottom-[14px] left-[14px] z-50 flex items-center gap-[6px] rounded-pill bg-black/70 px-[10px] py-[6px] text-[12px] font-medium text-white">
      <button style={btn} onClick={() => go(step - 1)} aria-label="Previous step">
        ‹
      </button>
      <span className="min-w-[64px] text-center">
        {labels[step]} · {step + 1}/{STEP_COUNT}
      </span>
      <button style={btn} onClick={() => go(step + 1)} aria-label="Next step">
        ›
      </button>
    </div>
  )
}
