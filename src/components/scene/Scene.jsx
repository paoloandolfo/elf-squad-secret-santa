import Garland from './Garland'
import Snowfall from './Snowfall'
import SnowyHills from './SnowyHills'
import SnowDrift from './SnowDrift'
import Sleigh from './Sleigh'

export default function Scene({ quiet = false }) {
  return (
    <>
      <Snowfall />
      <Sleigh />
      <Garland />
      {quiet ? <SnowDrift /> : <SnowyHills />}
    </>
  )
}
