"use client";

import { ChangeEvent, DragEvent, useEffect, useRef, useState } from "react";

type CSVImportModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (file: File) => void;
};

const maxFileSize = 10 * 1024 * 1024;

const CSVImportModal = ({ isOpen, onClose, onSelect }: CSVImportModalProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const selectFile = (nextFile: File | undefined) => {
    if (!nextFile) return;

    if (!nextFile.name.toLowerCase().endsWith(".csv")) {
      setFile(null);
      setError("Choose a CSV file to continue.");
      return;
    }

    if (nextFile.size > maxFileSize) {
      setFile(null);
      setError("This file is larger than the 10 MB limit.");
      return;
    }

    setError("");
    setFile(nextFile);
  };

  const handleFileInput = (event: ChangeEvent<HTMLInputElement>) => {
    selectFile(event.target.files?.[0]);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    selectFile(event.dataTransfer.files?.[0]);
  };

  const handleClose = () => {
    setFile(null);
    setError("");
    onClose();
  };

  return (
    <div
      aria-labelledby="csv-import-title"
      aria-modal="true"
      className="fixed inset-0 z-50 grid place-items-center bg-[#06101f]/80 px-6 py-8 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) handleClose();
      }}
      role="dialog"
    >
      <section className="w-full max-w-[640px] rounded-2xl border border-[#3a4a64] bg-[#172033] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.42)]">
        <header className="flex items-start justify-between gap-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#22c55e]">TradeLenz</p>
            <h2 className="mt-2 text-[28px] font-bold leading-[34px] tracking-[-0.3px] text-[#e2ecf6]" id="csv-import-title">Import trades from CSV</h2>
            <p className="mt-2 text-sm leading-5 text-[#94a3b8]">Upload one CSV file to add it to your trade-import flow.</p>
          </div>
          <button aria-label="Close CSV import" className="grid size-9 place-items-center rounded-lg border border-[#3a4a64] bg-[#202d44] text-lg leading-none text-[#94a3b8] transition hover:text-white" onClick={handleClose} type="button">×</button>
        </header>

        <div
          className={`mt-6 rounded-xl border border-dashed p-8 text-center transition ${
            isDragging ? "border-[#22c55e] bg-[#15382d]" : "border-[#4b5c76] bg-[#202d44]/60"
          }`}
          onDragEnter={(event) => {
            event.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={(event) => {
            event.preventDefault();
            setIsDragging(false);
          }}
          onDragOver={(event) => event.preventDefault()}
          onDrop={handleDrop}
        >
          <div className="mx-auto grid size-11 place-items-center rounded-xl border border-[#3c4d67] bg-[#172033] text-xl text-[#22c55e]">CSV</div>
          <h3 className="mt-4 text-base font-semibold text-[#e2ecf6]">Drag and drop your CSV here</h3>
          <p className="mt-2 text-sm leading-5 text-[#94a3b8]">CSV files only · Maximum file size 10 MB</p>
          <button className="mt-5 h-10 rounded-lg border border-[#3c4d67] bg-[#172033] px-4 text-xs font-medium text-[#e2ecf6] transition hover:bg-[#2a3a55]" onClick={() => inputRef.current?.click()} type="button">Browse files</button>
          <input accept=".csv,text/csv" className="sr-only" onChange={handleFileInput} ref={inputRef} type="file" />
        </div>

        {error && <p className="mt-4 rounded-lg border border-[#61343c] bg-[#351f29] px-3 py-2.5 text-sm text-[#fca5a5]" role="alert">{error}</p>}

        {file && (
          <div className="mt-4 flex items-center justify-between gap-4 rounded-lg border border-[#245b46] bg-[#163a30] px-4 py-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-[#e2ecf6]">{file.name}</p>
              <p className="mt-1 text-xs text-[#9ed8b3]">{(file.size / 1024 / 1024).toFixed(2)} MB · Ready to continue</p>
            </div>
            <button className="shrink-0 text-xs font-medium text-[#9ed8b3] transition hover:text-white" onClick={() => setFile(null)} type="button">Remove</button>
          </div>
        )}

        <footer className="mt-6 flex items-center justify-end gap-3 border-t border-[#333f52] pt-5">
          <button className="h-10 rounded-lg px-4 text-xs font-medium text-[#94a3b8] transition hover:text-[#e2ecf6]" onClick={handleClose} type="button">Cancel</button>
          <button
            className="h-10 rounded-lg bg-gradient-to-r from-[#057854] to-[#21c45c] px-5 text-xs font-medium text-white shadow-[0_8px_20px_rgba(5,120,84,0.18)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-45"
            disabled={!file}
            onClick={() => file && onSelect(file)}
            type="button"
          >
            Continue with CSV
          </button>
        </footer>
      </section>
    </div>
  );
};

export default CSVImportModal;
