"use client";

const colorFor = (score) => {
  if (score <= 6) return "bg-red-400";
  if (score <= 8) return "bg-yellow-300";
  return "bg-techstars-green";
};

export default function NpsScale({ value, onChange, label, required }) {
  const scores = Array.from({ length: 11 }, (_, i) => i);

  return (
    <div className="space-y-4">
      <label className="block text-black font-bold text-base md:text-lg">
        {label} {required && <span className="text-red-600">*</span>}
      </label>

      <div className="grid grid-cols-11 gap-1 sm:gap-2">
        {scores.map((s) => {
          const selected = value === s;
          return (
            <button
              key={s}
              type="button"
              onClick={() => onChange(s)}
              className={`border-4 border-black aspect-square font-black text-base sm:text-lg transition-all ${
                selected
                  ? `${colorFor(s)} text-black shadow-[4px_4px_0_#000] -translate-y-0.5 -translate-x-0.5`
                  : "bg-white text-black hover:bg-gray-100 hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[4px_4px_0_#000]"
              }`}
              aria-pressed={selected}
              aria-label={`Nota ${s}`}
            >
              {s}
            </button>
          );
        })}
      </div>

      <div className="flex justify-between text-xs font-black uppercase tracking-wider text-gray-700">
        <span>Pouco provável</span>
        <span>Muito provável</span>
      </div>
    </div>
  );
}
