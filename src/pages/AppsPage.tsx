import { useState } from 'react';
import { SearchBar } from '@/components/SearchBar';
import { AppCard } from '@/components/AppCard';
import type { Bank } from '@/types';
import banksData from '@/data/banks.json';

const banks = banksData as Bank[];

interface AppsPageProps {
  onNavigate: (path: string) => void;
}

export default function AppsPage({ onNavigate }: AppsPageProps) {
  const [search, setSearch] = useState('');

  const banksWithScreenshots = banks.filter((b) => b.hasScreenshots);
  const filtered = banksWithScreenshots.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search apps..."
      />

      <h2 className="text-lg font-medium text-white mb-6">Banking Apps</h2>

      {filtered.length === 0 ? (
        <p className="text-[#52525B] text-sm text-center py-12">
          No apps found
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered.map((bank) => (
            <AppCard
              key={bank.id}
              bank={bank}
              onClick={() => onNavigate(`/apps/${bank.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
