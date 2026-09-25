import { type KeyboardEvent, useState } from "react";

import {
  FormSection,
  inputClass,
} from "@/components/add-trade/form-controls";

type ConfirmationsSectionProps = {
  confirmations: string[];
  onChange: (confirmations: string[]) => void;
};

const ConfirmationsSection = ({
  confirmations,
  onChange,
}: ConfirmationsSectionProps) => {
  const [confirmationInput, setConfirmationInput] = useState("");

  const addConfirmation = () => {
    const value = confirmationInput.trim();
    if (!value || confirmations.includes(value)) return;

    onChange([...confirmations, value]);
    setConfirmationInput("");
  };

  const handleConfirmationKey = (
    event: KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addConfirmation();
    }
  };

  return (
    <FormSection title="Confirmations">
      <p className="text-sm leading-5 text-[#94a3b8]">
        Add a confirmation, then press Enter or comma to save it.
      </p>
      <div className="mt-1 flex flex-wrap gap-2">
        {confirmations.map((confirmation) => (
          <span
            className="inline-flex items-center gap-2 rounded-full border border-[#333f52] bg-[#202d44] px-2.5 py-1.5 text-xs font-medium"
            key={confirmation}
          >
            {confirmation}
            <button
              aria-label={`Remove ${confirmation}`}
              className="text-sm leading-4 text-[#94a3b8] hover:text-white"
              onClick={() =>
                onChange(
                  confirmations.filter((item) => item !== confirmation),
                )
              }
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
  );
};

export default ConfirmationsSection;
