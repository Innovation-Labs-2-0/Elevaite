import { useState } from "react";

function StarRatingInput({ label, value, onChange, disabled }) {
  const [hoverValue, setHoverValue] = useState(0);

  return (
    <div>
      <label className="block text-sm font-semibold mb-1">{label}</label>

      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => {
          const isActive = star <= (hoverValue || value);

          return (
            <button
              key={star}
              type="button"
              disabled={disabled}
              onClick={() => onChange(star)}
              onMouseEnter={() => !disabled && setHoverValue(star)}
              onMouseLeave={() => !disabled && setHoverValue(0)}
              className={`text-xl transition-colors duration-150 ${
                isActive ? "text-yellow-400" : "text-gray-300"
              } disabled:cursor-not-allowed`}
            >
              ★
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default StarRatingInput;
