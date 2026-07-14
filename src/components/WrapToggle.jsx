import { WrapTextIcon } from './icons'

export function WrapToggle({ wrapEnabled, onToggle }) {
  return (
    <button
      type="button"
      className={`wrap-toggle-button${wrapEnabled ? ' active' : ''}`}
      onClick={onToggle}
      aria-pressed={wrapEnabled}
      aria-label={wrapEnabled ? 'Disable word wrap' : 'Enable word wrap'}
      title={wrapEnabled ? 'Disable word wrap' : 'Enable word wrap'}
    >
      <WrapTextIcon width={15} height={15} />
    </button>
  )
}
