import type { TradeDraftChangeHandler } from "@/components/add-trade/draft";
import {
  Field,
  FormSection,
  inputClass,
} from "@/components/add-trade/form-controls";

const priceFields = [
  { key: "entryPrice", label: "Entry Price" },
  { key: "exitPrice", label: "Exit Price" },
  { key: "stopLoss", label: "Stop Loss" },
  { key: "takeProfit", label: "Take Profit" },
] as const;

type PriceLevelsSectionProps = {
  onChange: TradeDraftChangeHandler;
  prices: {
    entryPrice: string;
    exitPrice: string;
    stopLoss: string;
    takeProfit: string;
  };
};

const PriceLevelsSection = ({ onChange, prices }: PriceLevelsSectionProps) => (
  <FormSection title="Price Levels">
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {priceFields.map((field) => (
        <Field key={field.key} label={field.label} required>
          <input
            className={inputClass}
            onChange={(event) => onChange(field.key, event.target.value)}
            placeholder="0.00000"
            required
            step="any"
            type="number"
            value={prices[field.key]}
          />
        </Field>
      ))}
    </div>
  </FormSection>
);

export default PriceLevelsSection;
