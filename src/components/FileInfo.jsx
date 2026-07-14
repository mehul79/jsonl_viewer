import { formatFileSize } from '../utils/formatFileSize'
import { CheckCircleIcon } from './icons'

export function FileInfo({ uploadedFile, recordCount, parseErrors }) {
  if (!uploadedFile) return null

  return (
    <div className="file-info">
      <div className="file-info-row">
        <span className="file-info-name" title={uploadedFile.name}>
          {uploadedFile.name}
        </span>
        <CheckCircleIcon className="file-info-success" aria-hidden="true" />
      </div>
      <div className="file-info-meta">
        <span>{recordCount.toLocaleString()} records</span>
        <span>&middot;</span>
        <span>{formatFileSize(uploadedFile.size)}</span>
      </div>
      {parseErrors > 0 && (
        <div className="file-info-error">
          {parseErrors} line{parseErrors === 1 ? '' : 's'} could not be parsed
        </div>
      )}
    </div>
  )
}
