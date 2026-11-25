import Highlight from '../sketch/Highlight'
import { firstName } from '../../lib/names'

export function missionCopy(view, me, target) {
  const kicker = `Ho ho ho, ${firstName(me.name)}!`

  switch (view) {
    case 'gift':
      return {
        kicker,
        title: <>Your match is <Highlight>ready</Highlight></>,
        subtitle: 'Names are drawn. Tap the present to find out who you’re shopping for.',
      }
    case 'target':
      return {
        kicker,
        title: <>You’re Santa for <Highlight>{firstName(target.name)}</Highlight></>,
        subtitle: 'Keep it hush-hush. Their wishlist is right under the photo.',
      }
    case 'missed':
      return {
        kicker,
        title: <>The hat was <Highlight color="var(--sky)">already drawn</Highlight></>,
        subtitle: 'You signed up after the draw. Ask the head elf to redo it so you’re in.',
      }
    default:
      return {
        kicker,
        title: <>Your mission is <Highlight>almost ready</Highlight></>,
        subtitle: 'The head elf draws names once the crew is in. Here’s what to do in the meantime.',
      }
  }
}
