"use client";

import { FormEvent, KeyboardEvent, ReactNode, useRef, useState } from "react";

type TradeDraft = {
  openDate: string;
  closeDate: string;
  instrument: string;
  direction: "Buy" | "Sell";
  entryPrice: string;
  exitPrice: string;
  stopLoss: string;
  takeProfit: string;
  lotSize: string;
  strategy: string;
  timeframe: string;
  result: string;
  emotion: string;
  session: string;
  tradeType: string;
  notes: string;
};

const initialDraft: TradeDraft = {
  openDate: "",
  closeDate: "",
  instrument: "",
  direction: "Buy",
  entryPrice: "",
  exitPrice: "",
  stopLoss: "",
  takeProfit: "",
  lotSize: "",
  strategy: "",
  timeframe: "",
  result: "",
  emotion: "",
  session: "",
  tradeType: "",
  notes: "",
};

const inputClass =
  "h-11 w-full rounded-lg border border-[#333f52] bg-[#202d44] px-3 text-sm text-[#e2ecf6] outline-none placeholder:text-[#94a3b8] focus:border-[#22c55e]";

const AddTrade = () => {
  const [draft, setDraft] = useState(initialDraft);
  const [confirmations, setConfirmations] = useState(["Session open", "Retest"]);
  const [confirmationInput, setConfirmationInput] = useState("");
  const [csvFileName, setCsvFileName] = useState("");
  const [feedback, setFeedback] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateDraft = <Key extends keyof TradeDraft>(key: Key, value: TradeDraft[Key]) => {
    setDraft((current) => ({ ...current, [key]: value }));
  };

  const addConfirmation = () => {
    const value = confirmationInput.trim();
    if (!value || confirmations.includes(value)) return;

    setConfirmations((current) => [...current, value]);
    setConfirmationInput("");
  };

  const handleConfirmationKey = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addConfirmation();
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!draft.instrument.trim() || !draft.openDate) {
      setFeedback("Add the required instrument and open date before saving.");
      return;
    }

    setFeedback("Trade details are ready to save.");
  };

  return (
    <section className="min-h-screen bg-[#0d1627] px-6 py-8 text-[#e2ecf6] sm:px-10 lg:px-12">
      <form className="mx-auto max-w-7xl" onSubmit={handleSubmit}>
        <header className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-[32px] font-bold leading-10 tracking-[-0.5px]">Add Trade</h1>
            <p className="mt-1 text-sm leading-5 text-[#94a3b8]">Log a new trade and keep your journal up to date.</p>
          </div>
          <button
            className="h-10 rounded-lg bg-gradient-to-r from-[#1a3357] to-[#2e4f7d] px-5 text-xs font-medium text-white transition hover:brightness-110"
            onClick={() => fileInputRef.current?.click()}
            type="button"
          >
            Upload CSV
          </button>
          <input
            accept=".csv,text/csv"
            className="sr-only"
            onChange={(event) => setCsvFileName(event.target.files?.[0]?.name ?? "")}
            ref={fileInputRef}
            type="file"
          />
        </header>

        {csvFileName && (
          <p className="mb-4 rounded-lg border border-[#314159] bg-[#202d44] px-3 py-2 text-sm text-[#9aaac0]">
            Selected CSV: <span className="font-medium text-[#e2ecf6]">{csvFileName}</span>
          </p>
        )}

        <div className="grid gap-6 lg:grid-cols-2">
          <FormSection title="Date & Time">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Open Date & Time" required>
                <input className={inputClass} onChange={(event) => updateDraft("openDate", event.target.value)} required type="datetime-local" value={draft.openDate} />
              </Field>
              <Field label="Close Date & Time">
                <input className={inputClass} onChange={(event) => updateDraft("closeDate", event.target.value)} type="datetime-local" value={draft.closeDate} />
              </Field>
            </div>
          </FormSection>

          <FormSection title="Instrument & Direction">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Pair / Instrument" required>
                <input className={inputClass} onChange={(event) => updateDraft("instrument", event.target.value)} placeholder="e.g. EURUSD" required value={draft.instrument} />
              </Field>
              <Field label="Direction">
                <div className="flex h-11 rounded-lg border border-[#333f52] bg-[#202d44] p-1">
                  {(["Buy", "Sell"] as const).map((direction) => (
                    <button
                      className={`flex-1 rounded-md text-xs font-medium transition ${
                        draft.direction === direction
                          ? direction === "Buy"
                            ? "bg-gradient-to-r from-[#057854] to-[#21c45c] text-white"
                            : "bg-gradient-to-r from-[#b01e26] to-[#f04545] text-white"
                          : "text-[#94a3b8]"
                      }`}
                      key={direction}
                      onClick={() => updateDraft("direction", direction)}
                      type="button"
                    >
                      {direction}
                    </button>
                  ))}
                </div>
              </Field>
            </div>
          </FormSection>
        </div>

        <div className="mt-6">
          <FormSection title="Price Levels">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <Field label="Entry Price"><input className={inputClass} inputMode="decimal" onChange={(event) => updateDraft("entryPrice", event.target.value)} placeholder="0.00000" value={draft.entryPrice} /></Field>
              <Field label="Exit Price"><input className={inputClass} inputMode="decimal" onChange={(event) => updateDraft("exitPrice", event.target.value)} placeholder="0.00000" value={draft.exitPrice} /></Field>
              <Field label="Stop Loss"><input className={inputClass} inputMode="decimal" onChange={(event) => updateDraft("stopLoss", event.target.value)} placeholder="0.00000" value={draft.stopLoss} /></Field>
              <Field label="Take Profit"><input className={inputClass} inputMode="decimal" onChange={(event) => updateDraft("takeProfit", event.target.value)} placeholder="0.00000" value={draft.takeProfit} /></Field>
            </div>
          </FormSection>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <FormSection title="Volume & Strategy">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Lot Size"><input className={inputClass} inputMode="decimal" onChange={(event) => updateDraft("lotSize", event.target.value)} placeholder="0.00" value={draft.lotSize} /></Field>
              <SelectField label="Strategy" onChange={(value) => updateDraft("strategy", value)} options={["Select strategy", "Breakout", "Retest", "Trend continuation"]} value={draft.strategy} />
              <SelectField label="Timeframe" onChange={(value) => updateDraft("timeframe", value)} options={["Select timeframe", "M5", "M15", "H1", "H4"]} value={draft.timeframe} />
            </div>
          </FormSection>

          <FormSection title="Result & Context">
            <div className="grid gap-4 sm:grid-cols-2">
              <SelectField label="Result" onChange={(value) => updateDraft("result", value)} options={["Select result", "Win", "Loss", "Break-even"]} value={draft.result} />
              <SelectField label="Emotion" onChange={(value) => updateDraft("emotion", value)} options={["Select emotion", "Calm", "Focused", "Anxious"]} value={draft.emotion} />
              <SelectField label="Session" onChange={(value) => updateDraft("session", value)} options={["Select session", "Asia", "London", "New York"]} value={draft.session} />
              <SelectField label="Trade Type" onChange={(value) => updateDraft("tradeType", value)} options={["Select trade type", "Scalp", "Intraday", "Swing"]} value={draft.tradeType} />
            </div>
          </FormSection>
        </div>

        <div className="mt-6">
          <FormSection title="Confirmations">
            <p className="text-sm leading-5 text-[#94a3b8]">Add a confirmation, then press Enter or comma to save it.</p>
            <div className="mt-1 flex flex-wrap gap-2">
              {confirmations.map((confirmation) => (
                <span className="inline-flex items-center gap-2 rounded-full border border-[#333f52] bg-[#202d44] px-2.5 py-1.5 text-xs font-medium" key={confirmation}>
                  {confirmation}
                  <button
                    aria-label={`Remove ${confirmation}`}
                    className="text-sm leading-4 text-[#94a3b8] hover:text-white"
                    onClick={() => setConfirmations((current) => current.filter((item) => item !== confirmation))}
                    type="button"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <input
              className={`${inputClass} mt-2`}
              onChange={(event) => setConfirmationInput(event.target.value)}
              onKeyDown={handleConfirmationKey}
              placeholder="Enter a confirmation"
              value={confirmationInput}
            />
          </FormSection>
        </div>

        <div className="mt-6">
          <FormSection title="Notes">
            <textarea
              className="min-h-[120px] w-full resize-y rounded-lg border border-[#333f52] bg-[#202d44] p-3 text-sm text-[#e2ecf6] outline-none placeholder:text-[#94a3b8] focus:border-[#22c55e]"
              onChange={(event) => updateDraft("notes", event.target.value)}
              placeholder="Document your trade rationale, review, or lessons learned..."
              value={draft.notes}
            />
          </FormSection>
        </div>

        <footer className="mt-6 flex flex-wrap items-center justify-between gap-4 pb-4">
          <p className="text-xs font-medium text-[#94a3b8]">* Required fields</p>
          <div className="flex items-center gap-3">
            <button
              className="h-11 rounded-lg bg-gradient-to-r from-[#1a3357] to-[#2e4f7d] px-5 text-xs font-medium text-white transition hover:brightness-110"
              onClick={() => fileInputRef.current?.click()}
              type="button"
            >
              Upload CSV
            </button>
            <button
              className="h-11 rounded-lg bg-gradient-to-r from-[#057854] to-[#21c45c] px-5 text-xs font-medium text-white shadow-[0_8px_20px_rgba(5,120,84,0.18)] transition hover:brightness-110"
              type="submit"
            >
              Save Trade
            </button>
          </div>
        </footer>

        {feedback && <p className="pb-8 text-sm text-[#9aaac0]" role="status">{feedback}</p>}
      </form>
    </section>
  );
};

type FormSectionProps = {
  title: string;
  children: ReactNode;
};

const FormSection = ({ title, children }: FormSectionProps) => (
  <section className="rounded-xl border border-[#333f52] bg-[#172033] p-5 shadow-[0_8px_18px_rgba(0,0,0,0.18)]">
    <h2 className="text-xl font-semibold leading-7">{title}</h2>
    <div className="mt-4">{children}</div>
  </section>
);

type FieldProps = {
  label: string;
  required?: boolean;
  children: ReactNode;
};

const Field = ({ label, required, children }: FieldProps) => (
  <label className="flex flex-col gap-[7px] text-xs font-medium leading-4 text-[#94a3b8]">
    <span>{label}{required && <span className="ml-1 text-[#22c55e]">*</span>}</span>
    {children}
  </label>
);

type SelectFieldProps = {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
};

const SelectField = ({ label, value, options, onChange }: SelectFieldProps) => (
  <Field label={label}>
    <select className={inputClass} onChange={(event) => onChange(event.target.value)} value={value}>
      {options.map((option) => (
        <option className="bg-[#172033]" key={option} value={option === options[0] ? "" : option}>
          {option}
        </option>
      ))}
    </select>
  </Field>
);

export default AddTrade;
