import type { TradeDraftChangeHandler } from "@/components/add-trade/draft";
import {
  Field,
  FormSection,
  inputClass,
  SelectField,
  type SelectOption,
} from "@/components/add-trade/form-controls";
import { useGetStrategiesQuery } from "@/lib/trades-api";

const timeframeOptions = ["Select timeframe", "M5", "M15", "H1", "H4"];

type VolumeAndStrategySectionProps = {
  lotSize: string;
  onChange: TradeDraftChangeHandler;
  strategyId: string;
  timeframe: string;
};

const VolumeAndStrategySection = ({
  lotSize,
  onChange,
  strategyId,
  timeframe,
}: VolumeAndStrategySectionProps) => {
  const { data: strategies = [], isError, isLoading } =
    useGetStrategiesQuery();
  const strategyOptions: SelectOption[] = [
    {
      label: isLoading
        ? "Loading strategies..."
        : isError
          ? "Unable to load strategies"
          : "Select strategy",
      value: "",
    },
    ...strategies.map((item) => ({ label: item.name, value: item.id })),
  ];

  const selectStrategy = (nextStrategyId: string) => {
    const selectedStrategy = strategies.find(
      (item) => item.id === nextStrategyId,
    );
    onChange("strategyId", nextStrategyId);
    onChange("strategy", selectedStrategy?.name ?? "");
  };

  return (
    <FormSection title="Volume & Strategy">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Lot Size" required>
          <input
            className={inputClass}
            min="0.01"
            onChange={(event) => onChange("lotSize", event.target.value)}
            placeholder="0.00"
            required
            step="0.01"
            type="number"
            value={lotSize}
          />
        </Field>
        <SelectField
          label="Strategy"
          onChange={selectStrategy}
          options={strategyOptions}
          value={strategyId}
        />
        <SelectField
          label="Timeframe"
          onChange={(value) => onChange("timeframe", value)}
          options={timeframeOptions}
          required
          value={timeframe}
        />
      </div>
    </FormSection>
  );
};

export default VolumeAndStrategySection;
