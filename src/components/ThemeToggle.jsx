import { MoonIcon, SunIcon } from './icons'

export function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === 'dark'
  return (
    <button
      type="button"
      className="theme-toggle-button"
      onClick={onToggle}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      {isDark ? <SunIcon width={15} height={15} /> : <MoonIcon width={15} height={15} />}
    </button>
  )
}
