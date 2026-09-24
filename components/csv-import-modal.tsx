"use client";

import { ChangeEvent, DragEvent, useRef, useState } from "react";
import { UploadIcon, XIcon } from "lucide-react";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

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

  const handleFileInput = (event: ChangeEvent<HTMLInputElement>) => selectFile(event.target.files?.[0]);

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
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent
        className="w-[600px] max-w-[calc(100vw-48px)] gap-0 rounded-2xl border-[#333f52] bg-[#172033] px-7 pb-6 pt-7 text-[#e2ecf6] shadow-[0_8px_18px_rgba(0,0,0,0.18)] sm:max-w-[600px]"
        showCloseButton={false}
      >
        <DialogHeader className="flex-row items-start justify-between gap-5">
          <div>
            <DialogTitle className="text-xl font-semibold leading-7 text-[#e2ecf6]">Upload CSV</DialogTitle>
            <DialogDescription className="mt-1.5 text-sm leading-5 text-[#94a3b8]">Import trades from a CSV file.</DialogDescription>
          </div>
          <Button aria-label="Close CSV import" className="size-9 shrink-0 rounded-lg border-[#333f52] bg-[#202d44] text-[#94a3b8] hover:bg-[#202d44] hover:text-white" onClick={handleClose} size="icon-lg" variant="outline">
            <XIcon />
          </Button>
        </DialogHeader>

        <div
          className={`mt-5 flex h-[222px] flex-col items-center justify-center rounded-xl border border-dashed p-6 text-center transition ${isDragging ? "border-[#22c55e] bg-[#15382d]" : "border-[#38bdf7] bg-[#202d44]"}`}
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
          <div className="mx-auto grid size-11 place-items-center rounded-xl border border-[#3c4d67] bg-[#172033] text-[#22c55e]">
            <UploadIcon className="size-5" />
          </div>
          <h3 className="mt-4 text-base font-semibold text-[#e2ecf6]">Drop your CSV file here</h3>
          <p className="mt-2 text-sm leading-5 text-[#94a3b8]">or choose a file from your device</p>
          <Button className="mt-3 h-9 w-32 bg-gradient-to-r from-[#1a3357] to-[#2e4f7d] text-xs text-white hover:brightness-110" onClick={() => inputRef.current?.click()} variant="outline">Browse files</Button>
          <input accept=".csv,text/csv" className="sr-only" onChange={handleFileInput} ref={inputRef} type="file" />
        </div>

        <div className="mt-5 flex flex-col gap-2 text-xs font-medium leading-4 text-[#94a3b8]">
          <p>CSV files only · Maximum file size: 10 MB</p>
          <p>Your file will be parsed and uploaded after selection.</p>
        </div>

        {error && <p className="mt-4 rounded-lg border border-[#61343c] bg-[#351f29] px-3 py-2.5 text-sm text-[#fca5a5]" role="alert">{error}</p>}

        {file && (
          <div className="mt-4 flex items-center justify-between gap-4 rounded-lg border border-[#245b46] bg-[#163a30] px-4 py-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-[#e2ecf6]">{file.name}</p>
              <p className="mt-1 text-xs text-[#9ed8b3]">{(file.size / 1024 / 1024).toFixed(2)} MB · Ready to continue</p>
            </div>
            <Button className="h-auto shrink-0 px-0 text-xs text-[#9ed8b3] hover:bg-transparent hover:text-white" onClick={() => setFile(null)} variant="ghost">Remove</Button>
          </div>
        )}

        <footer className="mt-5 flex h-11 items-center justify-end gap-3">
          <Button className="h-11 w-[88px] bg-gradient-to-r from-[#1a3357] to-[#2e4f7d] text-xs text-white hover:brightness-110" onClick={handleClose} variant="ghost">Cancel</Button>
          <Button className="h-11 w-[94px] bg-gradient-to-r from-[#057854] to-[#21c45c] text-xs text-white shadow-[0_8px_20px_rgba(5,120,84,0.18)] hover:brightness-110" disabled={!file} onClick={() => file && onSelect(file)}>Upload</Button>
        </footer>
      </DialogContent>
    </Dialog>
  );
};

export default CSVImportModal;
