type AddTradeHeaderProps = {
  onUpload: () => void;
};

const AddTradeHeader = ({ onUpload }: AddTradeHeaderProps) => (
  <header className="mb-6 flex flex-wrap items-start justify-between gap-4">
    <div>
      <h1 className="text-[32px] font-bold leading-10 tracking-[-0.5px]">
        Add Trade
      </h1>
      <p className="mt-1 text-sm leading-5 text-[#94a3b8]">
        Log a new trade and keep your journal up to date.
      </p>
    </div>
    <button
      className="h-10 rounded-lg bg-gradient-to-r from-[#1a3357] to-[#2e4f7d] px-5 text-xs font-medium text-white transition hover:brightness-110"
      onClick={onUpload}
      type="button"
    >
      Upload CSV
    </button>
  </header>
);

type SelectedCSVNoticeProps = {
  fileName: string;
};

const SelectedCSVNotice = ({ fileName }: SelectedCSVNoticeProps) => {
  if (!fileName) return null;

  return (
    <p className="mb-4 rounded-lg border border-[#314159] bg-[#202d44] px-3 py-2 text-sm text-[#9aaac0]">
      Selected CSV:{" "}
      <span className="font-medium text-[#e2ecf6]">{fileName}</span>
    </p>
  );
};

export { SelectedCSVNotice };
export default AddTradeHeader;
