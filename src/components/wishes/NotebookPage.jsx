import './NotebookPage.css'

export default function NotebookPage({ title, subtitle, children, className = '' }) {
  return (
    <div className={`notebook ${className}`}>
      <h3 className="notebook__title">{title}</h3>
      {subtitle && <p className="notebook__subtitle">{subtitle}</p>}
      {children}
    </div>
  )
}
