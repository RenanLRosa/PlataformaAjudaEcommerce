import { useState, useCallback, useRef } from 'react';

/** Hook simples para exibir uma notificação temporária (toast) no canto da tela */
export function useToast() {
  const [message, setMessage] = useState(null);
  const timeoutRef = useRef(null);

  const showToast = useCallback((msg) => {
    setMessage(msg);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setMessage(null), 2600);
  }, []);

  return { toastMessage: message, showToast };
}
