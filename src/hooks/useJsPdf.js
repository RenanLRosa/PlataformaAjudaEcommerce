import { useState, useEffect, useCallback } from 'react';

const JSPDF_SRC = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';

let loadingPromise = null;

function loadScript(src) {
  if (loadingPromise) return loadingPromise;
  loadingPromise = new Promise((resolve, reject) => {
    if (window.jspdf?.jsPDF) {
      resolve(window.jspdf.jsPDF);
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => {
      if (window.jspdf?.jsPDF) resolve(window.jspdf.jsPDF);
      else reject(new Error('jsPDF carregou mas não expôs window.jspdf.jsPDF'));
    };
    script.onerror = () => reject(new Error('Falha ao carregar jsPDF'));
    document.body.appendChild(script);
  });
  return loadingPromise;
}

/** Hook que garante o carregamento da biblioteca jsPDF (via CDN) antes de gerar PDFs */
export function useJsPdf() {
  const [ready, setReady] = useState(!!window.jspdf?.jsPDF);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (ready) return;
    loadScript(JSPDF_SRC)
      .then(() => setReady(true))
      .catch((err) => setError(err.message));
  }, [ready]);

  const getJsPDF = useCallback(async () => {
    if (window.jspdf?.jsPDF) return window.jspdf.jsPDF;
    return loadScript(JSPDF_SRC);
  }, []);

  return { ready, error, getJsPDF };
}
