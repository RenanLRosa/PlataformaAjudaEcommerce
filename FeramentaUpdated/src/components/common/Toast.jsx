export default function Toast({ message }) {
  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] px-4 py-2 rounded-md text-sm font-medium
        bg-neutral-900 text-neutral-200 border border-neutral-700 shadow-lg
        transition-all duration-200 pointer-events-none
        ${message ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
    >
      {message || ''}
    </div>
  );
}
