import { useState } from 'react'
import { FileUploader } from './FileUploader'

export function EmptyState({ onFileSelected, hasRecords }) {
  const [isDragActive, setIsDragActive] = useState(false)

  const handleDragOver = (event) => {
    event.preventDefault()
    setIsDragActive(true)
  }

  const handleDragLeave = () => setIsDragActive(false)

  const handleDrop = (event) => {
    event.preventDefault()
    setIsDragActive(false)
    const file = event.dataTransfer.files?.[0]
    if (file) onFileSelected(file)
  }

  return (
    <div className="empty-state" onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
      <div className={`empty-state-inner${isDragActive ? ' drag-active' : ''}`}>
        <p className="empty-state-title">
          {hasRecords ? 'No records match your search' : 'No JSONL file loaded'}
        </p>
        <p className="empty-state-body">
          {hasRecords
            ? 'Try a different search term, or clear the search to see all records.'
            : 'Upload a JSONL file to browse and inspect records.'}
        </p>
        {!hasRecords && <FileUploader onFileSelected={onFileSelected} />}
      </div>
    </div>
  )
}
