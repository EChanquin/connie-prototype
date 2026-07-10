import { create } from 'zustand'

/**
 * The shopper's selected shopping preferences (from onboarding survey N4b).
 * These drive the live personalization: passed into callConnie() for Decision Support and
 * Product Insights, and shown in the "BASED ON · Preferences" popover.
 */
const DEFAULT_PREFERENCES = ['Long-term reliability', 'Ease of use']

interface PreferencesState {
  preferences: string[]
  setPreferences: (p: string[]) => void
  togglePreference: (label: string) => void
}

export const usePreferences = create<PreferencesState>((set) => ({
  preferences: DEFAULT_PREFERENCES,
  setPreferences: (p) => set({ preferences: p }),
  togglePreference: (label) =>
    set((s) => ({
      preferences: s.preferences.includes(label)
        ? s.preferences.filter((x) => x !== label)
        : [...s.preferences, label],
    })),
}))

/** Comma-separated preferences for callConnie({ priorities }). Empty string if none selected. */
export function preferencesToPriorities(preferences: string[]): string {
  return preferences.join(', ')
}
