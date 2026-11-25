export default function RosterStatus({ event, lit, total }) {
  if (event.drawn_at) return <>Names are drawn! Tap your bauble to unwrap your match.</>
  return <><strong>{lit} of {total}</strong> baubles lit so far</>
}
