import { useMemo, useState } from 'react'
import { Sidebar } from './components/Sidebar'
import { ViewerHeader } from './components/ViewerHeader'
import { JsonViewer } from './components/JsonViewer'
import { AttributesViewer } from './components/AttributesViewer'
import { EmptyState } from './components/EmptyState'
import { useJsonlParser } from './hooks/useJsonlParser'
import { useRecordSearch } from './hooks/useRecordSearch'
import { useTheme } from './hooks/useTheme'

function App() {
  const { records, searchableRecords, uploadedFile, parseErrors, loadError, loadFile } =
    useJsonlParser()
  const { theme, toggleTheme } = useTheme()

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRecordIndex, setSelectedRecordIndex] = useState(null)
  const [viewMode, setViewMode] = useState('full')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [wrapEnabled, setWrapEnabled] = useState(
    () => localStorage.getItem('jsonl-viewer-wrap') === 'true',
  )

  const toggleWrap = () => {
    setWrapEnabled((prev) => {
      const next = !prev
      localStorage.setItem('jsonl-viewer-wrap', String(next))
      return next
    })
  }

  const { filteredIndices } = useRecordSearch(searchableRecords, searchQuery)

  const handleFileSelected = (file) => {
    setSearchQuery('')
    setSelectedRecordIndex(null)
    setViewMode('full')
    loadFile(file).then(() => {
      setSelectedRecordIndex(0)
    })
  }

  const handleSelectRecord = (index) => {
    setSelectedRecordIndex(index)
    setIsSidebarOpen(false)
  }

  const selectedRecord = useMemo(
    () => (selectedRecordIndex != null ? records[selectedRecordIndex] : null),
    [records, selectedRecordIndex],
  )

  return (
    <div className="app-shell">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        uploadedFile={uploadedFile}
        records={records}
        parseErrors={parseErrors}
        loadError={loadError}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filteredIndices={filteredIndices}
        selectedRecordIndex={selectedRecordIndex}
        onSelectRecord={handleSelectRecord}
        onFileSelected={handleFileSelected}
      />

      <main className="main-panel">
        <ViewerHeader
          recordNumber={selectedRecord != null ? selectedRecordIndex + 1 : null}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          wrapEnabled={wrapEnabled}
          onToggleWrap={toggleWrap}
          theme={theme}
          onToggleTheme={toggleTheme}
          onOpenSidebar={() => setIsSidebarOpen(true)}
        />

        {selectedRecord != null ? (
          viewMode === 'full' ? (
            <JsonViewer
              key={`${uploadedFile?.name}-full`}
              record={selectedRecord}
              recordKey={selectedRecordIndex}
              wrapEnabled={wrapEnabled}
            />
          ) : (
            <AttributesViewer
              key={`${uploadedFile?.name}-attrs`}
              record={selectedRecord}
              recordKey={selectedRecordIndex}
              wrapEnabled={wrapEnabled}
            />
          )
        ) : (
          <EmptyState onFileSelected={handleFileSelected} hasRecords={records.length > 0} />
        )}
      </main>
    </div>
  )
}

export default App
