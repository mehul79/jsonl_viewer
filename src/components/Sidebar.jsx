import { BracesIcon, CloseIcon } from './icons'
import { FileInfo } from './FileInfo'
import { RecordSearch } from './RecordSearch'
import { RecordList } from './RecordList'
import { formatFileSize } from '../utils/formatFileSize'

export function Sidebar({
  isOpen,
  onClose,
  uploadedFile,
  records,
  parseErrors,
  loadError,
  searchQuery,
  onSearchChange,
  filteredIndices,
  selectedRecordIndex,
  onSelectRecord,
}) {
  return (
    <aside className={`sidebar${isOpen ? ' open' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-header-title">
          <BracesIcon width={17} height={17} aria-hidden="true" />
          <h1>JSONL Viewer</h1>
        </div>
        <button
          type="button"
          className="sidebar-close-button"
          onClick={onClose}
          aria-label="Close sidebar"
        >
          <CloseIcon width={16} height={16} />
        </button>
      </div>

      {loadError && (
        <div className="sidebar-section">
          <div className="load-error">{loadError}</div>
        </div>
      )}

      {uploadedFile && (
        <div className="sidebar-section">
          <FileInfo
            uploadedFile={uploadedFile}
            recordCount={records.length}
            parseErrors={parseErrors}
          />
        </div>
      )}

      {uploadedFile && (
        <div className="sidebar-section">
          <RecordSearch value={searchQuery} onChange={onSearchChange} />
        </div>
      )}

      {uploadedFile && (
        <>
          <div className="records-label">RECORDS ({filteredIndices.length.toLocaleString()})</div>
          <div className="sidebar-section sidebar-section--fill">
            <RecordList
              indices={filteredIndices}
              records={records}
              selectedIndex={selectedRecordIndex}
              onSelect={onSelectRecord}
            />
          </div>
          <div className="sidebar-footer">
            Total Size: {formatFileSize(uploadedFile.size)}
          </div>
        </>
      )}
    </aside>
  )
}
