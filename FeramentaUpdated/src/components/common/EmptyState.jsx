export default function EmptyState({ children = 'Nenhum item encontrado.', wide = false }) {
  return (
    <div className={`text-center py-7 px-3.5 text-neutral-500 text-sm ${wide ? 'col-span-full' : ''}`}>
      {children}
    </div>
  );
}
