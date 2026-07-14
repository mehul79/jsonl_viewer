import { MenuIcon } from './icons'
import { ViewModeToggle } from './ViewModeToggle'
import { ThemeToggle } from './ThemeToggle'
import { WrapToggle } from './WrapToggle'

export function ViewerHeader({
  recordNumber,
  viewMode,
  onViewModeChange,
  wrapEnabled,
  onToggleWrap,
  theme,
  onToggleTheme,
  onOpenSidebar,
}) {
  return (
    <div className="viewer-header">
      <div className="viewer-header-left">
        <button
          type="button"
          className="mobile-menu-button"
          onClick={onOpenSidebar}
          aria-label="Open sidebar"
        >
          <MenuIcon width={16} height={16} />
        </button>
        <h2 className="record-title">
          {recordNumber != null ? `Record #${recordNumber}` : 'No record selected'}
        </h2>
      </div>
      <div className="viewer-header-right">
        {recordNumber != null && (
          <>
            <span className="view-mode-label">View:</span>
            <ViewModeToggle viewMode={viewMode} onChange={onViewModeChange} />
            <WrapToggle wrapEnabled={wrapEnabled} onToggle={onToggleWrap} />
          </>
        )}
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>
    </div>
  )
}
