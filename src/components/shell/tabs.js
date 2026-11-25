export const TABS = [
  { id: 'mission', label: 'Mission', icon: 'gift' },
  { id: 'wishlist', label: 'Wishlist', icon: 'list' },
  { id: 'crew', label: 'Crew', icon: 'crew' },
  { id: 'hq', label: 'Elf HQ', icon: 'hat', adminOnly: true },
]

export const DEFAULT_TAB = 'mission'

export const tabsFor = (me) => TABS.filter((tab) => !tab.adminOnly || me.is_admin)

export function resolveTab(route, tabs) {
  return tabs.some((tab) => tab.id === route) ? route : DEFAULT_TAB
}
