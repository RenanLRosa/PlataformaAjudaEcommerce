import { CAT_COLORS } from '../../data/constants';

export default function ColorPicker({ value, onChange }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {CAT_COLORS.map((col) => (
        <button
          key={col}
          type="button"
          onClick={() => onChange(col)}
          style={{ background: col }}
          className={`w-[22px] h-[22px] rounded-[3px] border-2 transition-transform hover:scale-110 ${
            value === col ? 'border-[#004070]' : 'border-transparent'
          }`}
          aria-label={`Selecionar cor ${col}`}
        />
      ))}
    </div>
  );
}
