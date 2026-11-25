import GiftBox from '../doodles/GiftBox'
import HatOfNames from '../doodles/HatOfNames'
import LetterDoodle from '../doodles/LetterDoodle'

export const onboardingSlides = (first, names) => [
  {
    art: <GiftBox />,
    title: `Welcome to the crew, ${first}!`,
    body: 'You’re signed up. Your PIN is your key to this page, so keep it to yourself.',
  },
  {
    art: <HatOfNames names={names.length ? names : ['You']} />,
    title: 'The head elf draws names',
    body: 'Once everyone’s in, names go in the hat. A little badge on Mission tells you when your match is ready to unwrap.',
  },
  {
    art: <LetterDoodle />,
    title: 'Now, your wishlist',
    body: 'Only your Secret Santa can read it, and only after the draw. A few good hints go a long way.',
  },
]
