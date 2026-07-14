import { useRef } from 'react'
import { UploadIcon } from './icons'

export function FileUploader({ onFileSelected, label = 'Upload JSONL File' }) {
  const inputRef = useRef(null)

  const handleChange = (event) => {
    const file = event.target.files?.[0]
    if (file) onFileSelected(file)
    event.target.value = ''
  }

  return (
    <>
      <button
        type="button"
        className="upload-button"
        onClick={() => inputRef.current?.click()}
      >
        <UploadIcon width={15} height={15} />
        {label}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept=".jsonl,.ndjson"
        onChange={handleChange}
        style={{ display: 'none' }}
        aria-label="Upload JSONL file"
      />
    </>
  )
}
