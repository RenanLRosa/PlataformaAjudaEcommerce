import { useState } from 'react';
import Sidebar from './components/layout/Sidebar';
import Topbar from './components/layout/Topbar';
import AdminBanner from './components/layout/AdminBanner';
import Toast from './components/common/Toast';
import HomePage from './components/home/HomePage';
import PdfPage from './components/pdf/PdfPage';
import MessagesPage from './components/messages/MessagesPage';
import PagesPage from './components/pages/PagesPage';
import ImagesPage from './components/images/ImagesPage';
import LinksPage from './components/links/LinksPage';
import TutorialsPage from './components/tutorials/TutorialsPage';
import { useAppData } from './hooks/useAppData';
import { useToast } from './hooks/useToast';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const { data, adminMode, setAdminMode, resetData, ...actions } = useAppData();
  const { toastMessage, showToast } = useToast();

  const handleExportData = () => {
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ajuda-central-dados.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Dados exportados!');
  };

  const handleReset = () => {
    if (!confirm('Restaurar todos os dados para o padrão? Isso apagará personalizações.')) return;
    resetData();
    showToast('Dados restaurados para o padrão');
  };

  const sharedProps = { data, adminMode, actions, showToast };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':   return <HomePage data={data} onNavigate={setCurrentPage} />;
      case 'pdf':    return <PdfPage showToast={showToast} />;
      case 'msgs':   return <MessagesPage {...sharedProps} />;
      case 'pages':  return <PagesPage {...sharedProps} />;
      case 'images': return <ImagesPage {...sharedProps} />;
      case 'links':  return <LinksPage {...sharedProps} />;
      case 'tutorials': return <TutorialsPage {...sharedProps} />;
      case 'docs':   return <DocsPage {...sharedProps} onNavigate={setCurrentPage} />;
      default:       return <HomePage data={data} onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="flex h-screen bg-[#EFF4F9] overflow-hidden">
      <Sidebar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        adminMode={adminMode}
        onToggleAdmin={() => setAdminMode((m) => !m)}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar currentPage={currentPage} />
        {adminMode && <AdminBanner onExport={handleExportData} onReset={handleReset} />}
        <main className="flex-1 overflow-y-auto">
          {renderPage()}
        </main>
      </div>

      <Toast message={toastMessage} />
    </div>
  );
}
