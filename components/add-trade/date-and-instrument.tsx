import type { TradeDraftChangeHandler } from "@/components/add-trade/draft";
import {
  Field,
  FormSection,
  inputClass,
} from "@/components/add-trade/form-controls";
import DateTimeSelector from "@/components/date-time-selector";

type DateSectionProps = {
  closeDate: string;
  onChange: TradeDraftChangeHandler;
  openDate: string;
};

const DateSection = ({ closeDate, onChange, openDate }: DateSectionProps) => (
  <FormSection title="Date & Time">
    <div className="grid gap-4 sm:grid-cols-2">
      <DateTimeSelector
        label="Open Date & Time"
        onChange={(value) => onChange("openDate", value)}
        required
        value={openDate}
      />
      <DateTimeSelector
        label="Close Date & Time"
        onChange={(value) => onChange("closeDate", value)}
        value={closeDate}
      />
    </div>
  </FormSection>
);

type InstrumentAndDirectionSectionProps = {
  direction: "Buy" | "Sell";
  instrument: string;
  onChange: TradeDraftChangeHandler;
};

const InstrumentAndDirectionSection = ({
  direction,
  instrument,
  onChange,
}: InstrumentAndDirectionSectionProps) => (
  <FormSection title="Instrument & Direction">
    <div className="grid gap-4 sm:grid-cols-2">
      <Field label="Pair / Instrument" required>
        <input
          className={inputClass}
          onChange={(event) => onChange("instrument", event.target.value)}
          placeholder="e.g. EURUSD"
          required
          value={instrument}
        />
      </Field>
      <Field label="Direction">
        <div className="flex h-11 rounded-lg border border-[#333f52] bg-[#202d44] p-1">
          {(["Buy", "Sell"] as const).map((nextDirection) => (
            <button
              className={`flex-1 rounded-md text-xs font-medium transition ${
                direction === nextDirection
                  ? nextDirection === "Buy"
                    ? "bg-gradient-to-r from-[#057854] to-[#21c45c] text-white"
                    : "bg-gradient-to-r from-[#b01e26] to-[#f04545] text-white"
                  : "text-[#94a3b8]"
              }`}
              key={nextDirection}
              onClick={() => onChange("direction", nextDirection)}
              type="button"
            >
              {nextDirection}
            </button>
          ))}
        </div>
      </Field>
    </div>
  </FormSection>
);

export { DateSection, InstrumentAndDirectionSection };
