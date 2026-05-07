"use client";

const COLORS = {
  excelente: "bg-techstars-green",
  boa: "bg-lime-300",
  regular: "bg-yellow-300",
  ruim: "bg-red-400",
};

export default function RatingScale4({ name, label, options, value, onChange, required }) {
  return (
    <div className="space-y-3">
      <label className="block text-black font-bold text-sm md:text-base">
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {options.map((opt) => {
          const selected = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className={`border-4 border-black px-3 py-3 font-black uppercase text-xs sm:text-sm tracking-wide transition-all ${
                selected
                  ? `${COLORS[opt.value]} text-black shadow-[4px_4px_0_#000] -translate-y-0.5 -translate-x-0.5`
                  : "bg-white text-black hover:bg-gray-100 hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[4px_4px_0_#000]"
              }`}
              aria-pressed={selected}
              aria-label={`${name}: ${opt.label}`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
