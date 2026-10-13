"use client";

import {useId} from "react";
import {useCalculationGate} from "@/components/CalculationGate";

type Props = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  suffix?: string;
  help?: string;
  min?: number;
};

/** Keep calculator state numeric and unformatted while allowing pasted commas/$ signs. */
export function sanitizeNumericInput(input: string) {
  const cleaned = input.replace(/[^\d.]/g, "");
  const dot = cleaned.indexOf(".");
  if (dot === -1) return cleaned;
  return cleaned.slice(0, dot + 1) + cleaned.slice(dot + 1).replace(/\./g, "");
}

/** Add thousands separators without losing an in-progress decimal such as `1000.`. */
export function formatMoneyInput(raw: string) {
  if (raw === "") return "";
  const [wholeRaw = "", fraction] = raw.split(".");
  const whole = (wholeRaw.replace(/^0+(?=\d)/, "") || "0").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return fraction !== undefined ? `${whole}.${fraction}` : whole;
}

/** Compact, readable interpretation for values where long runs of zeroes become hard to scan. */
export function humanMoneyLabel(raw: string) {
  if (!raw || raw.endsWith(".")) return "";
  const value = Number(raw);
  if (!Number.isFinite(value) || value < 1000) return "";

  const units = [
    {threshold: 1e12, divisor: 1e12, name: "trillion"},
    {threshold: 1e9, divisor: 1e9, name: "billion"},
    {threshold: 1e6, divisor: 1e6, name: "million"},
    {threshold: 1e3, divisor: 1e3, name: "thousand"},
  ];
  const unit = units.find(item => value >= item.threshold);
  if (!unit) return "";
  const amount = new Intl.NumberFormat("en-US", {maximumFractionDigits: 2}).format(value / unit.divisor);
  return `≈ ${amount} ${unit.name} dollars`;
}

export default function CalculatorField({label, value, onChange, suffix, help, min = 0}: Props) {
  const gate = useCalculationGate();
  const helperId = useId();
  const isMoney = suffix === "$";
  const readable = isMoney ? humanMoneyLabel(value) : "";
  const describedBy = readable || help ? helperId : undefined;

  return <label>
    <span className="label">{label}</span>
    <div className="relative">
      <input
        className={suffix ? "field field-with-suffix" : "field"}
        type={isMoney ? "text" : "number"}
        inputMode="decimal"
        autoComplete="off"
        spellCheck={false}
        value={isMoney ? formatMoneyInput(value) : value}
        {...(!isMoney ? {min, step: "any"} : {})}
        aria-describedby={describedBy}
        onChange={event => {
          const next = isMoney ? sanitizeNumericInput(event.target.value) : event.target.value;
          onChange(next);
          gate.markDirty();
        }}
      />
      {suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400" aria-hidden="true">{suffix}</span>}
    </div>
    {(readable || help) && <span id={helperId} className="block mt-1.5 leading-5">
      {readable && <span className="money-readable">{readable}</span>}
      {help && <span className="block text-xs text-slate-500">{help}</span>}
    </span>}
  </label>;
}
