/** Typed route constants + prototype flow order for the clickthrough. */
export const routes = {
  install: '/onboarding/install',
  welcome: '/onboarding/welcome',
  memberCheck: '/onboarding/member-check',
  login: '/onboarding/login',
  promise: '/onboarding/promise',
  surveyCommunities: '/onboarding/survey/communities',
  surveyPriorities: '/onboarding/survey/priorities',
  permissions: '/onboarding/permissions',
  done: '/onboarding/done',

  insights: '/browse/insights',
  annotations: '/browse/annotations',
  priorities: '/browse/priorities',
  decision: '/browse/decision',
  collaborate: '/browse/collaborate',
  postPurchase: '/browse/post-purchase',
  chat: '/browse/chat',

  ds: '/ds',
} as const

/** Linear prototype order used by "Next" affordances. */
export const flowOrder: string[] = [
  routes.install,
  routes.welcome,
  routes.memberCheck,
  routes.login,
  routes.promise,
  routes.surveyCommunities,
  routes.surveyPriorities,
  routes.permissions,
  routes.done,
  routes.insights,
  routes.annotations,
  routes.priorities,
  routes.decision,
  routes.collaborate,
  routes.postPurchase,
  routes.chat,
]

export function nextRoute(current: string): string | null {
  const i = flowOrder.indexOf(current)
  if (i === -1 || i === flowOrder.length - 1) return null
  return flowOrder[i + 1]
}
