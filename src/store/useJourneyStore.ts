import { create } from 'zustand'

export type NaviTab = 'default' | 'chat' | 'save' | 'settings' | 'tutorial'

interface JourneyState {
  hasInstalled: boolean
  isMember: boolean
  onboardingComplete: boolean
  permissionsGranted: boolean
  activeNaviTab: NaviTab
  tourStep: number
  panelOpen: boolean
  setInstalled: (v: boolean) => void
  setMember: (v: boolean) => void
  completeOnboarding: () => void
  grantPermissions: () => void
  setNaviTab: (t: NaviTab) => void
  setTourStep: (n: number) => void
  setPanelOpen: (v: boolean) => void
}

export const useJourneyStore = create<JourneyState>((set) => ({
  hasInstalled: false,
  isMember: false,
  onboardingComplete: false,
  permissionsGranted: false,
  activeNaviTab: 'default',
  tourStep: 0,
  panelOpen: true,
  setInstalled: (v) => set({ hasInstalled: v }),
  setMember: (v) => set({ isMember: v }),
  completeOnboarding: () => set({ onboardingComplete: true }),
  grantPermissions: () => set({ permissionsGranted: true }),
  setNaviTab: (t) => set({ activeNaviTab: t }),
  setTourStep: (n) => set({ tourStep: n }),
  setPanelOpen: (v) => set({ panelOpen: v }),
}))
