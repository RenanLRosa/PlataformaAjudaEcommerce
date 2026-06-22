export function FieldGroup({ label, optional, children }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[11px] font-semibold text-neutral-600 uppercase tracking-wide flex items-center gap-1.5">
        {label}
        {optional && (
          <span className="text-[10px] font-medium text-neutral-400 bg-neutral-100 border border-neutral-200 px-1 rounded-sm normal-case tracking-normal">
            opcional
          </span>
        )}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  'px-2.5 py-1.5 border border-neutral-300 rounded-[3px] text-[13px] text-neutral-900 bg-white outline-none ' +
  'focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-colors placeholder:text-neutral-300';

export function TextInput(props) {
  return <input {...props} className={inputClass + ' ' + (props.className || '')} />;
}

export function SelectInput({ children, ...props }) {
  return (
    <select {...props} className={inputClass + ' ' + (props.className || '')}>
      {children}
    </select>
  );
}

export function TextArea(props) {
  return <textarea {...props} className={inputClass + ' resize-y ' + (props.className || '')} />;
}

export function FieldRow({ children }) {
  return <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{children}</div>;
}
