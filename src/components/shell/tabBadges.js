export function tabBadges({ wishes, event, target, revealed }) {
  return {
    mission: event.drawn_at && target && !revealed ? { label: '1', title: 'Your match is ready to unwrap' } : null,
    wishlist: wishes.length === 0 ? { title: 'Your wishlist is still empty' } : null,
  }
}
