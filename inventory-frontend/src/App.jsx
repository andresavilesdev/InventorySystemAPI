import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import BackendProvider from './context/BackendContext';
import OfflineBanner from './components/OfflineBanner';
import Sidebar from './components/Sidebar';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import NewProduct from './pages/NewProduct';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 30000,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BackendProvider>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route
              path="*"
              element={
                <div className="flex min-h-screen flex-col bg-background">
                  <OfflineBanner />
                  <div className="flex flex-1">
                    <Sidebar />
                    <main className="flex-1 overflow-y-auto px-4 py-6 pt-16 lg:px-8 lg:pt-6">
                      <div className="mx-auto max-w-6xl">
                        <Routes>
                          <Route path="/dashboard" element={<Dashboard />} />
                          <Route path="/products" element={<Products />} />
                          <Route path="/products/new" element={<NewProduct />} />
                        </Routes>
                      </div>
                    </main>
                  </div>
                </div>
              }
            />
          </Routes>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#1a1a1a',
              color: '#e4e4e7',
              border: '1px solid #27272a',
              fontSize: '14px',
            },
            success: {
              iconTheme: { primary: '#00ff88', secondary: '#1a1a1a' },
            },
            error: {
              iconTheme: { primary: '#ff4757', secondary: '#1a1a1a' },
            },
          }}
        />
        </BrowserRouter>
      </BackendProvider>
    </QueryClientProvider>
  );
}
