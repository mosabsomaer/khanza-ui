import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder = 'Search...' }: SearchBarProps) {
  return (
    <div className="relative w-full mb-8">
      <Search className="absolute left-0 top-1/2 -translate-y-1/2 size-5 text-[#52525B] pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent py-3 pl-8 pr-0 text-white placeholder:text-[#52525B] border-b border-[#27272A] focus:border-white outline-none transition-colors duration-150 ease-out text-sm"
      />
    </div>
  );
}
