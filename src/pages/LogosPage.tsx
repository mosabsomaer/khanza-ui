import { useState } from 'react';
import { SearchBar } from '@/components/SearchBar';
import { LogoCard } from '@/components/LogoCard';
import type { Bank, PaymentMethod } from '@/types';
import banksData from '@/data/banks.json';
import paymentMethodsData from '@/data/payment-methods.json';

const banks = banksData as Bank[];
const paymentMethods = paymentMethodsData as PaymentMethod[];

interface LogosPageProps {
  selectedId: string | null;
  onSelect: (type: 'bank' | 'payment-method', id: string) => void;
}

export default function LogosPage({ selectedId, onSelect }: LogosPageProps) {
  const [search, setSearch] = useState('');

  const filteredBanks = banks.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase()),
  );

  const filteredPaymentMethods = paymentMethods.filter((pm) =>
    pm.name.toLowerCase().includes(search.toLowerCase()),
  );

  const noResults = filteredBanks.length === 0 && filteredPaymentMethods.length === 0;

  return (
    <div>
      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search logos..."
      />

      {noResults && (
        <p className="text-[#52525B] text-sm text-center py-12">
          No logos found
        </p>
      )}

      {filteredBanks.length > 0 && (
        <section>
          <h2 className="text-lg font-medium text-white mb-6">Bank Logos</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filteredBanks.map((bank) => (
              <LogoCard
                key={bank.id}
                id={bank.id}
                name={bank.name}
                logo={bank.logo}
                isNew={bank.isNew}
                isUpdated={bank.isUpdated}
                isSelected={selectedId === bank.id}
                onClick={() => onSelect('bank', bank.id)}
              />
            ))}
          </div>
        </section>
      )}

      {filteredBanks.length > 0 && filteredPaymentMethods.length > 0 && (
        <div className="border-t border-[#27272A] my-10" />
      )}

      {filteredPaymentMethods.length > 0 && (
        <section>
          <h2 className="text-lg font-medium text-white mb-6">
            Payment Method Logos
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filteredPaymentMethods.map((pm) => (
              <LogoCard
                key={pm.id}
                id={pm.id}
                name={pm.name}
                logo={pm.logo}
                isNew={pm.isNew}
                isUpdated={pm.isUpdated}
                isSelected={selectedId === pm.id}
                onClick={() => onSelect('payment-method', pm.id)}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
