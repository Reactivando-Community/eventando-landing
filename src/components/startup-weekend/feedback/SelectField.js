"use client";

export default function SelectField({ label, value, onChange, options, required, placeholder }) {
  return (
    <div className="space-y-2">
      <label className="block text-black font-bold text-sm md:text-base">
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {options.map((opt) => {
          const selected = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className={`border-4 border-black px-3 py-3 font-bold text-xs sm:text-sm text-left transition-all ${
                selected
                  ? "bg-techstars-green text-black shadow-[4px_4px_0_#000] -translate-y-0.5 -translate-x-0.5"
                  : "bg-white text-black hover:bg-gray-100 hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[4px_4px_0_#000]"
              }`}
              aria-pressed={selected}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
