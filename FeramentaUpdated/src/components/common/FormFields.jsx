export function FieldGroup({ label, optional, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="flex items-center gap-2">
        <span className="text-[11px] font-black uppercase tracking-[0.1em] text-[#4A6A85]">{label}</span>
        {optional && (
          <span className="text-[10px] font-semibold text-[#8BA8BF] bg-[#EFF4F9] border border-[#D6E4EF] px-1.5 py-0.5 rounded-full normal-case tracking-normal">
            opcional
          </span>
        )}
      </label>
      {children}
    </div>
  );
}

const inputBase =
  'px-3 py-2 rounded-lg text-[13px] text-[#002B4D] bg-white outline-none transition-all placeholder:text-[#B8CDD8] ' +
  'border border-[#D6E4EF] focus:border-[#A0E800] focus:ring-2 focus:ring-[#A0E80020] focus:shadow-sm';

export function TextInput(props) {
  return <input {...props} className={inputBase + ' ' + (props.className || '')} />;
}

export function SelectInput({ children, ...props }) {
  return (
    <select {...props} className={inputBase + ' cursor-pointer ' + (props.className || '')}>
      {children}
    </select>
  );
}

export function TextArea(props) {
  return <textarea {...props} className={inputBase + ' resize-y ' + (props.className || '')} />;
}

export function FieldRow({ children }) {
  return <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{children}</div>;
}
