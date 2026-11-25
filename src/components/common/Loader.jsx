import SnowflakeDoodle from '../doodles/SnowflakeDoodle'
import './Loader.css'

export default function Loader({ message = 'Asking the elves…' }) {
  return (
    <div className="loader" role="status">
      <SnowflakeDoodle className="loader__flake" />
      <p>{message}</p>
    </div>
  )
}
