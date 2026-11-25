import { firstName } from '../../lib/names'

export function pinCopy(member, creating, step) {
  const first = firstName(member.name)
  if (!creating) {
    return { title: `Welcome back, ${first}!`, hint: 'Enter your PIN to peek at your mission.' }
  }
  if (step === 'confirm') {
    return { title: 'One more time', hint: 'Type the same PIN again so we know you’ve got it.' }
  }
  return { title: `Hey ${first}!`, hint: 'Pick a secret 4-digit PIN. You’ll need it every time you come back.' }
}

export function pinErrorMessage(error) {
  if (error.code === 'wrong_pin') {
    const left = error.details?.attemptsLeft
    return left ? `Nope! ${left} ${left === 1 ? 'try' : 'tries'} left.` : 'Nope, that’s not it.'
  }
  if (error.code === 'locked') {
    return `Too many tries. The elves locked this one for ${error.details?.retryIn ?? 120}s.`
  }
  return error.message
}
