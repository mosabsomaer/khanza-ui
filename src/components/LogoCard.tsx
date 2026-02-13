import { Badge } from '@/components/ui/badge';

interface LogoCardProps {
  id: string;
  name: string;
  logo: string;
  isNew?: boolean;
  isUpdated?: boolean;
  isSelected?: boolean;
  onClick: () => void;
}

export function LogoCard({
  name,
  logo,
  isNew,
  isUpdated,
  isSelected,
  onClick,
}: LogoCardProps) {
  return (
    <button
      onClick={onClick}
      className={`
        relative flex flex-col items-center justify-center aspect-square
        rounded-md border p-8 cursor-pointer bg-transparent
        transition-all duration-150 ease-out
        ${isSelected
          ? 'border-[#00DC82]'
          : 'border-[#27272A] hover:border-[#3F3F46]'
        }
      `}
    >
      {(isNew || isUpdated) && (
        <Badge
          variant="outline"
          className={`
            absolute top-2 left-2 text-[10px] uppercase tracking-[0.05em] bg-transparent
            ${isNew
              ? 'border-[#00DC82] text-[#00DC82]'
              : 'border-[#A1A1AA] text-[#A1A1AA]'
            }
          `}
        >
          {isNew ? 'New' : 'Updated'}
        </Badge>
      )}

      <img
        src={logo}
        alt={`${name} logo`}
        className="max-w-[80px] max-h-[80px] object-contain"
      />

      <span className="text-sm text-[#A1A1AA] mt-3 text-center truncate w-full">
        {name}
      </span>
    </button>
  );
}
