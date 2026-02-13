import { useState } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { Layout } from '@/components/Layout';
import { DetailsPanel } from '@/components/DetailsPanel';
import { useRouter } from '@/hooks/useRouter';
import LogosPage from '@/pages/LogosPage';
import AppsPage from '@/pages/AppsPage';
import AppDetailPage from '@/pages/AppDetailPage';
import type { SelectedItem, Bank, PaymentMethod } from '@/types';
import banksData from '@/data/banks.json';
import paymentMethodsData from '@/data/payment-methods.json';

const banks = banksData as Bank[];
const paymentMethods = paymentMethodsData as PaymentMethod[];

export default function App() {
  const { route, params, navigate } = useRouter();
  const [selected, setSelected] = useState<SelectedItem | null>(null);

  const handleSelect = (type: 'bank' | 'payment-method', id: string) => {
    setSelected({ type, id });
  };

  const handleClose = () => {
    setSelected(null);
  };

  const selectedItem = selected
    ? selected.type === 'bank'
      ? { ...banks.find((b) => b.id === selected.id)!, type: 'bank' as const }
      : { ...paymentMethods.find((pm) => pm.id === selected.id)!, type: 'payment-method' as const }
    : null;

  const detailsPanel = selectedItem ? (
    <DetailsPanel
      item={selectedItem as (Bank | PaymentMethod) & { type: 'bank' | 'payment-method' }}
      onClose={handleClose}
    />
  ) : null;

  return (
    <>
      <Layout detailsPanel={detailsPanel}>
        {route === 'app-detail' && params.bankId ? (
          <AppDetailPage bankId={params.bankId} onNavigate={navigate} />
        ) : route === 'apps' ? (
          <AppsPage onNavigate={navigate} />
        ) : (
          <LogosPage selectedId={selected?.id ?? null} onSelect={handleSelect} />
        )}
      </Layout>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#0A0A0A',
            border: '1px solid #27272A',
            color: '#FFFFFF',
          },
        }}
      />
    </>
  );
}
