import { supabase } from './supabase'
import { SantaError, toSantaError } from './errors'
import { loadAccessCode } from './storage'

async function call(fn, args) {
  const { data, error } = await supabase.rpc(fn, args)
  if (error) throw toSantaError(error)
  return data
}

export const api = {
  roster: (slug, code = loadAccessCode()) => call('santa_roster', { p_slug: slug, p_code: code || null }),

  async login(memberId, pin, code = loadAccessCode()) {
    const result = await call('santa_login', { p_member_id: memberId, p_pin: pin, p_code: code || null })
    if (!result.ok) {
      throw new SantaError(result.error, { attemptsLeft: result.attempts_left, retryIn: result.retry_in })
    }
    return result
  },

  logout: (token) => call('santa_logout', { p_token: token }),
  me: (token) => call('santa_me', { p_token: token }),

  addWish: (token, body, link) =>
    call('santa_add_wish', { p_token: token, p_body: body, p_link: link || null }),

  removeWish: (token, wishId) =>
    call('santa_remove_wish', { p_token: token, p_wish_id: wishId }),
}

export const adminApi = {
  saveEvent: (token, { title, budget, exchangeDate }) =>
    call('santa_admin_save_event', {
      p_token: token,
      p_title: title,
      p_budget: budget,
      p_exchange_date: exchangeDate || null,
    }),

  setAccessCode: (token, code) => call('santa_admin_set_access_code', { p_token: token, p_code: code }),

  addMember: (token, name, avatarUrl) =>
    call('santa_admin_add_member', { p_token: token, p_name: name, p_avatar_url: avatarUrl || null }),

  removeMember: (token, memberId) =>
    call('santa_admin_remove_member', { p_token: token, p_member_id: memberId }),

  resetPin: (token, memberId) =>
    call('santa_admin_reset_pin', { p_token: token, p_member_id: memberId }),

  draw: (token) => call('santa_admin_draw', { p_token: token }),
  undoDraw: (token) => call('santa_admin_undo_draw', { p_token: token }),

  addExclusion: (token, a, b) =>
    call('santa_admin_add_exclusion', { p_token: token, p_member_a: a, p_member_b: b }),

  removeExclusion: (token, a, b) =>
    call('santa_admin_remove_exclusion', { p_token: token, p_member_a: a, p_member_b: b }),
}
