"use client";

import { type SubmitEvent, useState } from "react";

import ConfirmationsSection from "@/components/add-trade/confirmations";
import {
  DateSection,
  InstrumentAndDirectionSection,
} from "@/components/add-trade/date-and-instrument";
import {
  initialTradeDraft,
  type TradeDraft,
} from "@/components/add-trade/draft";
import FormActions from "@/components/add-trade/form-actions";
import AddTradeHeader, {
  SelectedCSVNotice,
} from "@/components/add-trade/header";
import NotesSection from "@/components/add-trade/notes";
import PriceLevelsSection from "@/components/add-trade/price-levels";
import ResultAndContextSection from "@/components/add-trade/result-and-context";
import {
  buildTradeCreateInput,
  getTradeValidationError,
} from "@/components/add-trade/trade-payload";
import VolumeAndStrategySection from "@/components/add-trade/volume-and-strategy";
import CSVImportModal from "@/components/csv-import-modal";
import { useAddTradeMutation } from "@/lib/trades-api";

const AddTrade = () => {
  const [draft, setDraft] = useState<TradeDraft>(initialTradeDraft);
  const [csvFileName, setCsvFileName] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isCSVModalOpen, setIsCSVModalOpen] = useState(false);
  const [addTrade, { isLoading: isSubmitting }] = useAddTradeMutation();

  const updateDraft = <Key extends keyof TradeDraft>(
    key: Key,
    value: TradeDraft[Key],
  ) => {
    setDraft((current) => ({ ...current, [key]: value }));
    setFeedback("");
  };

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationError = getTradeValidationError(draft);
    if (validationError) {
      setFeedback(validationError);
      return;
    }

    try {
      await addTrade(buildTradeCreateInput(draft)).unwrap();
      setDraft({
        ...initialTradeDraft,
        confirmations: [...initialTradeDraft.confirmations],
      });
      setCsvFileName("");
      setFeedback("Trade added successfully.");
    } catch {
      setFeedback("Error adding trade. Please try again.");
    }
  };

  return (
    <section className="min-h-screen bg-bg-page px-6 py-8 text-[#e2ecf6] sm:px-10 lg:px-10">
      <form className="mx-auto max-w-7xl" onSubmit={handleSubmit}>
        <AddTradeHeader onUpload={() => setIsCSVModalOpen(true)} />
        <SelectedCSVNotice fileName={csvFileName} />

        <div className="grid gap-6 lg:grid-cols-2">
          <DateSection
            closeDate={draft.closeDate}
            onChange={updateDraft}
            openDate={draft.openDate}
          />
          <InstrumentAndDirectionSection
            direction={draft.direction}
            instrument={draft.instrument}
            onChange={updateDraft}
          />
        </div>

        <div className="mt-6">
          <PriceLevelsSection
            onChange={updateDraft}
            prices={{
              entryPrice: draft.entryPrice,
              exitPrice: draft.exitPrice,
              stopLoss: draft.stopLoss,
              takeProfit: draft.takeProfit,
            }}
          />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <VolumeAndStrategySection
            lotSize={draft.lotSize}
            onChange={updateDraft}
            strategyId={draft.strategyId}
            timeframe={draft.timeframe}
          />
          <ResultAndContextSection
            emotion={draft.emotion}
            onChange={updateDraft}
            result={draft.result}
            session={draft.session}
            tradeType={draft.tradeType}
          />
        </div>

        <div className="mt-6">
          <ConfirmationsSection
            confirmations={draft.confirmations}
            onChange={(confirmations) =>
              updateDraft("confirmations", confirmations)
            }
          />
        </div>

        <div className="mt-6">
          <NotesSection
            notes={draft.notes}
            onChange={updateDraft}
          />
        </div>

        <FormActions
          feedback={feedback}
          isSubmitting={isSubmitting}
          onUpload={() => setIsCSVModalOpen(true)}
        />
      </form>
      <CSVImportModal
        isOpen={isCSVModalOpen}
        onClose={() => setIsCSVModalOpen(false)}
        onImportComplete={(fileName) => setCsvFileName(fileName)}
      />
    </section>
  );
};

export default AddTrade;
