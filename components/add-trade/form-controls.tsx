import type { ReactNode } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const inputClass =
  "h-11 w-full rounded-lg border border-[#333f52] bg-[#202d44] px-3 text-sm text-[#e2ecf6] outline-none placeholder:text-[#94a3b8] focus:border-[#22c55e]";

type FormSectionProps = {
  children: ReactNode;
  title: string;
};

export const FormSection = ({ children, title }: FormSectionProps) => (
  <section className="rounded-xl border border-[#333f52] bg-[#172033] p-5 shadow-[0_8px_18px_rgba(0,0,0,0.18)]">
    <h2 className="text-xl font-semibold leading-7">{title}</h2>
    <div className="mt-4">{children}</div>
  </section>
);

type FieldProps = {
  children: ReactNode;
  label: string;
  required?: boolean;
};

export const Field = ({ children, label, required }: FieldProps) => (
  <label className="flex flex-col gap-[7px] text-xs font-medium leading-4 text-[#94a3b8]">
    <span>
      {label}
      {required && <span className="ml-1 text-[#22c55e]">*</span>}
    </span>
    {children}
  </label>
);

export type SelectOption = {
  label: string;
  value: string;
};

type SelectFieldOption = SelectOption | string;

type SelectFieldProps = {
  label: string;
  onChange: (value: string) => void;
  options: readonly SelectFieldOption[];
  required?: boolean;
  value: string;
};

const getOptionLabel = (option?: SelectFieldOption) =>
  typeof option === "string" ? option : option?.label;

const getOptionValue = (option: SelectFieldOption) =>
  typeof option === "string" ? option : option.value;

export const SelectField = ({
  label,
  onChange,
  options,
  required,
  value,
}: SelectFieldProps) => (
  <Field label={label} required={required}>
    <Select
      onValueChange={(nextValue) => nextValue && onChange(nextValue)}
      value={value || undefined}
    >
      <SelectTrigger className="h-11 w-full border-[#333f52] bg-[#202d44] px-3 text-sm text-[#e2ecf6] hover:bg-[#263650] focus-visible:border-[#22c55e] focus-visible:ring-0">
        <SelectValue placeholder={getOptionLabel(options[0])} />
      </SelectTrigger>
      <SelectContent className="border-[#3a4a64] bg-[#172033] text-[#e2ecf6]">
        {options.slice(1).map((option) => (
          <SelectItem
            className="text-[#e2ecf6] focus:bg-[#202d44] focus:text-[#e2ecf6]"
            key={getOptionValue(option)}
            value={getOptionValue(option)}
          >
            {getOptionLabel(option)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </Field>
);
