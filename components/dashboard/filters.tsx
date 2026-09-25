import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { DashboardFilters } from "@/lib/trades-api";

const dateOptions: DashboardFilters["date"][] = [
  "This week",
  "This month",
  "All time",
];
const pairOptions = ["All pairs", "EURUSD", "XAUUSD", "GBPUSD"];
const tradeTypeOptions = ["All types", "BUY", "SELL"];

type DashboardFiltersProps = {
  appliedDate: DashboardFilters["date"];
  filters: DashboardFilters;
  onApply: () => void;
  onChange: (filters: DashboardFilters) => void;
  onClear: () => void;
};

const DashboardFilters = ({
  appliedDate,
  filters,
  onApply,
  onChange,
  onClear,
}: DashboardFiltersProps) => {
  const sectionTitle =
    appliedDate === "This week"
      ? "This week’s trades"
      : `${appliedDate} trades`;

  return (
    <section className="mt-7" aria-labelledby="trade-filters-heading">
      <h2
        className="text-xl font-semibold leading-7"
        id="trade-filters-heading"
      >
        {sectionTitle}
      </h2>
      <div className="mt-3 flex flex-wrap items-end gap-3">
        <FilterSelect
          label="Date"
          onChange={(date) =>
            onChange({
              ...filters,
              date: date as DashboardFilters["date"],
            })
          }
          options={dateOptions}
          value={filters.date}
        />
        <FilterSelect
          label="Pair"
          onChange={(pair) => onChange({ ...filters, pair })}
          options={pairOptions}
          value={filters.pair}
        />
        <FilterSelect
          label="Trade type"
          onChange={(tradeType) => onChange({ ...filters, tradeType })}
          options={tradeTypeOptions}
          value={filters.tradeType}
        />
        <button
          className="h-10 rounded-lg bg-linear-to-r from-[#057854] to-[#21c45c] px-4.5 text-sm font-medium text-white shadow-[0_8px_20px_rgba(5,120,84,0.18)] transition hover:brightness-110"
          onClick={onApply}
          type="button"
        >
          Apply
        </button>
        <button
          className="h-10 rounded-lg border border-[#333f52] bg-linear-to-r from-[#1a2a43] to-[#2d4f7d] px-3.5 text-sm font-medium text-white transition hover:brightness-110"
          onClick={onClear}
          type="button"
        >
          Clear filters
        </button>
      </div>
    </section>
  );
};

type FilterSelectProps = {
  label: string;
  onChange: (value: string) => void;
  options: readonly string[];
  value: string;
};

const FilterSelect = ({
  label,
  onChange,
  options,
  value,
}: FilterSelectProps) => (
  <label className="flex h-14 w-52.5 flex-col gap-1 rounded-lg border border-[#333f52] bg-bg-raised px-3 py-2">
    <span className="text-xs font-medium leading-4 text-[#94a3b8]">
      {label}
    </span>
    <Select
      onValueChange={(nextValue) => nextValue && onChange(nextValue)}
      value={value}
    >
      <SelectTrigger className="h-5 w-full border-0 bg-transparent px-0 text-sm leading-5 text-[#e2ecf6] hover:bg-transparent focus-visible:ring-0">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="border-[#3a4a64] bg-[#172033] text-[#e2ecf6]">
        {options.map((option) => (
          <SelectItem
            className="text-[#e2ecf6] focus:bg-bg-raised focus:text-[#e2ecf6]"
            key={option}
            value={option}
          >
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </label>
);

export default DashboardFilters;
