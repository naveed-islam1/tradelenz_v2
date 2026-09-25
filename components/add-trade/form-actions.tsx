import { Loader2 } from "lucide-react";

type FormActionsProps = {
  feedback: string;
  isSubmitting: boolean;
  onUpload: () => void;
};

const FormActions = ({
  feedback,
  isSubmitting,
  onUpload,
}: FormActionsProps) => (
  <>
    <footer className="mt-6 flex flex-wrap items-center justify-between gap-4 pb-4">
      <p className="text-xs font-medium text-[#94a3b8]">* Required fields</p>
      <div className="flex items-center gap-3">
        <button
          className="h-11 rounded-lg bg-gradient-to-r from-[#1a3357] to-[#2e4f7d] px-5 text-xs font-medium text-white transition hover:brightness-110"
          onClick={onUpload}
          type="button"
        >
          Upload CSV
        </button>
        <button
          className="flex h-11 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#057854] to-[#21c45c] px-5 text-xs font-medium text-white shadow-[0_8px_20px_rgba(5,120,84,0.18)] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Saving
            </>
          ) : (
            "Save Trade"
          )}
        </button>
      </div>
    </footer>
    {feedback && (
      <p className="pb-8 text-sm text-[#9aaac0]" role="status">
        {feedback}
      </p>
    )}
  </>
);

export default FormActions;
