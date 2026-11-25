import { AnimatePresence } from 'motion/react'
import MemberRow from './MemberRow'
import AddMemberForm from './AddMemberForm'
import { adminApi } from '../../lib/api'
import { firstName } from '../../lib/names'
import { useAdminAction } from '../../hooks/useAdminAction'
import { useConfirm } from '../../context/confirm'

export default function MemberManager({ token, members, onRosterChange }) {
  const { busy, run } = useAdminAction(onRosterChange)
  const confirm = useConfirm()

  const add = (name, avatarUrl) =>
    run('add', () => adminApi.addMember(token, name, avatarUrl), `${firstName(name)} joined the crew`)

  const reset = async (member) => {
    const ok = await confirm({
      title: `Reset ${firstName(member.name)}’s PIN?`,
      body: 'They pick a new one next time they visit. Their match and wishlist stay the same.',
      confirmLabel: 'Reset PIN',
    })
    if (ok) run(`reset-${member.id}`, () => adminApi.resetPin(token, member.id), 'PIN reset')
  }

  const remove = async (member) => {
    const ok = await confirm({
      title: `Remove ${firstName(member.name)}?`,
      body: 'Their wishlist goes with them.',
      confirmLabel: 'Remove',
      tone: 'danger',
    })
    if (ok) run(`remove-${member.id}`, () => adminApi.removeMember(token, member.id), `${firstName(member.name)} removed`)
  }

  return (
    <div className="admin-section">
      <h3>The crew ({members.length})</h3>
      <ul style={{ listStyle: 'none' }}>
        <AnimatePresence initial={false}>
          {members.map((member) => (
            <MemberRow
              key={member.id}
              member={member}
              busy={Boolean(busy)}
              onReset={() => reset(member)}
              onRemove={() => remove(member)}
            />
          ))}
        </AnimatePresence>
      </ul>
      <AddMemberForm onAdd={add} busy={busy === 'add'} />
    </div>
  )
}
