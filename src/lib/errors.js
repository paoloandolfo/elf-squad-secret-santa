const MESSAGES = {
  session_expired: 'Your session melted like a snowman. Pick yourself again.',
  not_admin: 'Only the head elf can do that.',
  event_not_found: "Can't find this year's Secret Santa. Has supabase/02_seed.sql been run in Supabase?",
  not_set_up: "The workshop isn't built yet. Run supabase/01_schema.sql in Supabase first.",
  not_enough_players: 'Need at least 3 people with a PIN before drawing names.',
  already_drawn: 'Names are already drawn. Undo the draw first.',
  in_draw: "They're already in the draw. Undo the draw before removing them.",
  cannot_remove_self: "You can't remove yourself, head elf.",
  name_taken: 'Someone with that name is already on the list.',
  invalid_name: 'Names need at least one letter.',
  invalid_wish: 'Wishes need some words (200 characters max).',
  too_many_wishes: 'Ten wishes max. The sleigh has a weight limit!',
  invalid_pin: 'PINs are exactly 4 digits.',
  unknown_member: "That person isn't on the list anymore.",
  wrong_pin: 'Wrong PIN.',
  locked: 'Too many tries.',
  code_required: 'Enter the group code to come in.',
  bad_access_code: 'That’s not the magic word. Check the code with your head elf.',
  invalid_code: 'Group codes need 4 to 40 characters.',
  no_valid_draw: 'No draw works with these keep-apart pairs. Remove a pair and try again.',
  invalid_exclusion: 'Pick two different people to keep apart.',
}

export class SantaError extends Error {
  constructor(code, details = {}) {
    super(MESSAGES[code] || 'Something went wrong in the workshop. Try again!')
    this.code = code
    this.details = details
  }
}

export function toSantaError(error) {
  if (error instanceof SantaError) return error
  if (error?.code === 'PGRST202') return new SantaError('not_set_up')
  return new SantaError(error?.message)
}
