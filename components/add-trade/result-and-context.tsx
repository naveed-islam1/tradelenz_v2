import type { TradeDraftChangeHandler } from "@/components/add-trade/draft";
import {
  Field,
  FormSection,
  inputClass,
  SelectField,
} from "@/components/add-trade/form-controls";
const emotionOptions = ["Select emotion", "Calm", "Focused", "Anxious"];
const sessionOptions = ["Select session", "Asia", "London", "New York"];
const tradeTypeOptions = ["Select trade type", "Scalp", "Intraday", "Swing"];

type ResultAndContextSectionProps = {
  emotion: string;
  onChange: TradeDraftChangeHandler;
  result: string;
  session: string;
  tradeType: string;
};

const ResultAndContextSection = ({
  emotion,
  onChange,
  result,
  session,
  tradeType,
}: ResultAndContextSectionProps) => (
  <FormSection title="Result & Context">
    <div className="grid gap-4 sm:grid-cols-2">
      <Field label="Result">
        <input
          className={inputClass}
          onChange={(event) => onChange("result", event.target.value)}
          placeholder="Enter trade result"
          step="any"
          type="number"
          value={result}
        />
      </Field>
      <SelectField
        label="Emotion"
        onChange={(value) => onChange("emotion", value)}
        options={emotionOptions}
        value={emotion}
      />
      <SelectField
        label="Session"
        onChange={(value) => onChange("session", value)}
        options={sessionOptions}
        value={session}
      />
      <SelectField
        label="Trade Type"
        onChange={(value) => onChange("tradeType", value)}
        options={tradeTypeOptions}
        value={tradeType}
      />
    </div>
  </FormSection>
);

export default ResultAndContextSection;
