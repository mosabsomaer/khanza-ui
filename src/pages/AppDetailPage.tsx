import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { SearchBar } from '@/components/SearchBar';
import type { Bank } from '@/types';
import banksData from '@/data/banks.json';

const banks = banksData as Bank[];

interface AppDetailPageProps {
  bankId: string;
  onNavigate: (path: string) => void;
}

function formatScreenshotLabel(url: string) {
  const filename = url.split('/').pop() || '';
  const name = filename.replace(/\.[^.]+$/, '');
  return name
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

export default function AppDetailPage({ bankId, onNavigate }: AppDetailPageProps) {
  const [search, setSearch] = useState('');
  const bank = banks.find((b) => b.id === bankId);
  const screenshots = (bank?.screenshots ?? []).map((url) => ({
    url,
    label: formatScreenshotLabel(url),
  }));

  if (!bank) {
    return (
      <div className="text-center py-12">
        <p className="text-[#52525B] text-sm">Bank not found</p>
        <button
          onClick={() => onNavigate('/apps')}
          className="text-[#00DC82] text-sm mt-4 hover:underline"
        >
          Back to Apps
        </button>
      </div>
    );
  }

  const filtered = screenshots.filter((s) =>
    s.label.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => onNavigate('/apps')}
          className="text-[#A1A1AA] hover:text-white transition-colors duration-150"
        >
          <ArrowLeft className="size-5" />
        </button>
        <img
          src={bank.logo}
          alt={`${bank.name} logo`}
          className="w-8 h-8 object-contain"
        />
        <h2 className="text-lg font-medium text-white">{bank.name}</h2>
      </div>

      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search screenshots..."
      />

      {screenshots.length === 0 ? (
        <p className="text-[#52525B] text-sm text-center py-12">
          No screenshots available
        </p>
      ) : filtered.length === 0 ? (
        <p className="text-[#52525B] text-sm text-center py-12">
          No matching screenshots
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filtered.map((screenshot) => (
            <div
              key={screenshot.url}
              className="border border-[#27272A] rounded-md overflow-hidden hover:border-[#3F3F46] transition-colors duration-150"
            >
              <div className="aspect-[9/16] bg-[#0A0A0A]">
                <img
                  src={screenshot.url}
                  alt={screenshot.label}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs text-[#A1A1AA] text-center py-2">
                {screenshot.label}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
