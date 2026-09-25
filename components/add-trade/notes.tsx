import type { TradeDraftChangeHandler } from "@/components/add-trade/draft";
import { FormSection } from "@/components/add-trade/form-controls";

type NotesSectionProps = {
  notes: string;
  onChange: TradeDraftChangeHandler;
};

const NotesSection = ({ notes, onChange }: NotesSectionProps) => (
  <FormSection title="Notes">
    <textarea
      className="min-h-[120px] w-full resize-y rounded-lg border border-[#333f52] bg-[#202d44] p-3 text-sm text-[#e2ecf6] outline-none placeholder:text-[#94a3b8] focus:border-[#22c55e]"
      onChange={(event) => onChange("notes", event.target.value)}
      placeholder="Document your trade rationale, review, or lessons learned..."
      value={notes}
    />
  </FormSection>
);

export default NotesSection;
