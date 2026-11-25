// 6/8 written in quarter-note beats: a bar is three beats, an eighth is half a beat.
export default {
  title: 'Silent Night',
  bpm: 84,
  style: 'lullaby',
  transpose: 5,
  melody: `
    G4:1.5 A4:.5 G4:1 | E4:3 | G4:1.5 A4:.5 G4:1 | E4:3 |
    D5:2 D5:1 | B4:3 | C5:2 C5:1 | G4:3 |
    A4:2 A4:1 | C5:1.5 B4:.5 A4:1 | G4:1.5 A4:.5 G4:1 | E4:3 |
    A4:2 A4:1 | C5:1.5 B4:.5 A4:1 | G4:1.5 A4:.5 G4:1 | E4:3 |
    D5:2 D5:1 | F5:1.5 D5:.5 B4:1 | C5:3 | E5:3 |
    C5:1.5 G4:.5 E4:1 | G4:1.5 F4:.5 D4:1 | C4:3 | r:3
  `,
  chords: `
    C:3 | C:3 | C:3 | C:3 |
    G7:3 | G7:3 | C:3 | C:3 |
    F:3 | F:3 | C:3 | C:3 |
    F:3 | F:3 | C:3 | C:3 |
    G7:3 | G7:3 | C:3 | C:3 |
    C:3 | G7:3 | C:3 | C:3
  `,
}
