"use client";

import Papa from "papaparse";
import { ChangeEvent, DragEvent, useRef, useState } from "react";
import { CheckCircle2Icon, Loader2Icon, UploadIcon, XIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useImportTradesMutation } from "@/lib/trades-api";
import type { CsvTradeImportInput } from "@/lib/trade-types";

type CSVImportModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onImportComplete: (fileName: string) => void;
};

type CsvRow = Record<string, string>;
type ImportState = "idle" | "parsing" | "uploading" | "success";

const maxFileSize = 10 * 1024 * 1024;

const mapCsvToTrade = (row: CsvRow): CsvTradeImportInput => ({
  pair: row.symbol,
  type: row.type,
  lot_size: Number(row.lots),
  entry: Number(row.opening_price),
  exit: row.closing_price ? Number(row.closing_price) : null,
  stop_loss: row.stop_loss ? Number(row.stop_loss) : null,
  take_profit: row.take_profit ? Number(row.take_profit) : null,
  date_open: new Date(row.opening_time_utc).toISOString(),
  date_close: row.closing_time_utc
    ? new Date(row.closing_time_utc).toISOString()
    : null,
  result:
    row.profit_usd !== undefined && row.profit_usd !== ""
      ? Number(row.profit_usd)
      : row.profit !== undefined && row.profit !== ""
        ? Number(row.profit)
        : null,
});

const parseCSV = (file: File) =>
  new Promise<CsvRow[]>((resolve, reject) => {
    Papa.parse<CsvRow>(file, {
      header: true,
      skipEmptyLines: "greedy",
      transformHeader: (header) => header.replace(/^\uFEFF/, "").trim(),
      transform: (value) => value.trim(),
      complete: ({ data, errors }) => {
        if (errors.length) {
          reject(new Error(`Failed to parse CSV file: ${errors[0].message}`));
          return;
        }
        if (!data.length || !data[0].symbol || !data[0].opening_time_utc) {
          reject(new Error("CSV is empty or missing required trade columns"));
          return;
        }
        resolve(data);
      },
      error: () => reject(new Error("Failed to read CSV file")),
    });
  });

const CSVImportModal = ({
  isOpen,
  onClose,
  onImportComplete,
}: CSVImportModalProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [state, setState] = useState<ImportState>("idle");
  const [insertedCount, setInsertedCount] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const [importTrades] = useImportTradesMutation();
  const isProcessing = state === "parsing" || state === "uploading";

  const selectFile = (nextFile: File | undefined) => {
    if (!nextFile || isProcessing) return;
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
    setInsertedCount(0);
    setState("idle");
    setFile(nextFile);
  };

  const importFile = async () => {
    if (!file || isProcessing) return;

    try {
      setError("");
      setState("parsing");
      const trades = (await parseCSV(file)).map(mapCsvToTrade);
      setState("uploading");
      await importTrades(trades).unwrap();
      setInsertedCount(trades.length);
      setState("success");
      onImportComplete(file.name);
    } catch (importError) {
      setError(
        importError instanceof Error
          ? importError.message
          : "An error occurred while importing this CSV.",
      );
      setState("idle");
    }
  };

  const handleClose = () => {
    if (isProcessing) return;
    setFile(null);
    setError("");
    setInsertedCount(0);
    setState("idle");
    if (inputRef.current) inputRef.current.value = "";
    onClose();
  };

  const handleFileInput = (event: ChangeEvent<HTMLInputElement>) =>
    selectFile(event.target.files?.[0]);
  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    selectFile(event.dataTransfer.files?.[0]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent
        className="w-150 max-w-[calc(100vw-48px)] gap-0 rounded-2xl border-[#333f52] bg-[#172033] px-7 pb-6 pt-7 text-[#e2ecf6] shadow-[0_8px_18px_rgba(0,0,0,0.18)] sm:max-w-150"
        showCloseButton={false}
      >
        <DialogHeader className="flex-row items-start justify-between gap-5">
          <div>
            <DialogTitle className="text-xl font-semibold leading-7 text-[#e2ecf6]">
              Upload CSV
            </DialogTitle>
            <DialogDescription className="mt-1.5 text-sm leading-5 text-[#94a3b8]">
              Import trades from a CSV file.
            </DialogDescription>
          </div>
          <Button
            aria-label="Close CSV import"
            className="size-9 shrink-0 rounded-lg border-[#333f52] bg-bg-raised text-[#94a3b8] hover:bg-bg-raised hover:text-white"
            disabled={isProcessing}
            onClick={handleClose}
            size="icon-lg"
            variant="outline"
          >
            <XIcon />
          </Button>
        </DialogHeader>

        {state === "success" ? (
          <div className="py-12 text-center">
            <div className="mx-auto grid size-12 place-items-center rounded-full bg-[#163a30] text-status-positive">
              <CheckCircle2Icon className="size-6" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-[#e2ecf6]">
              Import complete
            </h3>
            <p className="mt-2 text-sm text-[#94a3b8]">
              {insertedCount} trade{insertedCount === 1 ? "" : "s"} imported
              from {file?.name}.
            </p>
            <Button
              className="mt-6 h-10 bg-linear-to-r from-[#057854] to-[#21c45c] px-5 text-xs text-white hover:brightness-110"
              onClick={handleClose}
            >
              Done
            </Button>
          </div>
        ) : (
          <>
            <div
              className={`mt-5 flex h-55.5 flex-col items-center justify-center rounded-xl border border-dashed p-6 text-center transition ${isDragging ? "border-status-positive bg-[#15382d]" : "border-[#38bdf7] bg-bg-raised"}`}
              onDragEnter={(event) => {
                event.preventDefault();
                if (!isProcessing) setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDragOver={(event) => event.preventDefault()}
              onDrop={handleDrop}
            >
              <div className="mx-auto grid size-11 place-items-center rounded-xl border border-[#3c4d67] bg-[#172033] text-status-positive">
                <UploadIcon className="size-5" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-[#e2ecf6]">
                {file ? file.name : "Drop your CSV file here"}
              </h3>
              <p className="mt-2 text-sm leading-5 text-[#94a3b8]">
                {isProcessing
                  ? state === "parsing"
                    ? "Parsing CSV…"
                    : "Uploading trades…"
                  : "or choose a file from your device"}
              </p>
              {!isProcessing && (
                <Button
                  className="mt-3 h-9 w-32 bg-linear-to-r from-[#1a3357] to-[#2e4f7d] text-xs text-white hover:brightness-110"
                  onClick={() => inputRef.current?.click()}
                  variant="outline"
                >
                  Browse files
                </Button>
              )}
              {isProcessing && (
                <Loader2Icon className="mt-3 size-5 animate-spin text-status-positive" />
              )}
              <input
                accept=".csv,text/csv"
                className="sr-only"
                disabled={isProcessing}
                onChange={handleFileInput}
                ref={inputRef}
                type="file"
              />
            </div>
            <div className="mt-5 flex flex-col gap-2 text-xs font-medium leading-4 text-[#94a3b8]">
              <p>CSV files only · Maximum file size: 10 MB</p>
              <p>Required columns include symbol and opening_time_utc.</p>
            </div>
            {error && (
              <p
                className="mt-4 rounded-lg border border-[#61343c] bg-[#351f29] px-3 py-2.5 text-sm text-[#fca5a5]"
                role="alert"
              >
                {error}
              </p>
            )}
            {file && (
              <div className="mt-4 flex items-center justify-between gap-4 rounded-lg border border-[#245b46] bg-[#163a30] px-4 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-[#e2ecf6]">
                    {file.name}
                  </p>
                  <p className="mt-1 text-xs text-[#9ed8b3]">
                    {(file.size / 1024 / 1024).toFixed(2)} MB · Ready to import
                  </p>
                </div>
                <Button
                  className="h-auto shrink-0 px-0 text-xs text-[#9ed8b3] hover:bg-transparent hover:text-white"
                  disabled={isProcessing}
                  onClick={() => setFile(null)}
                  variant="ghost"
                >
                  Remove
                </Button>
              </div>
            )}
            <footer className="mt-5 flex h-11 items-center justify-end gap-3">
              <Button
                className="h-11 w-22 bg-linear-to-r from-[#1a3357] to-[#2e4f7d] text-xs text-white hover:brightness-110"
                disabled={isProcessing}
                onClick={handleClose}
                variant="ghost"
              >
                Cancel
              </Button>
              <Button
                className="h-11 w-23.5 bg-linear-to-r from-[#057854] to-[#21c45c] text-xs text-white shadow-[0_8px_20px_rgba(5,120,84,0.18)] hover:brightness-110"
                disabled={!file || isProcessing}
                onClick={importFile}
              >
                {isProcessing ? "Importing…" : "Upload"}
              </Button>
            </footer>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CSVImportModal;
