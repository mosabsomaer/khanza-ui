import { Badge } from '@/components/ui/badge';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

interface AppCardProps {
  bank: {
    id: string;
    name: string;
    logo: string;
    screenshots?: string[];
    isNew?: boolean;
    isUpdated?: boolean;
  };
  onClick: () => void;
}

export function AppCard({ bank, onClick }: AppCardProps) {
  const screenshots = bank.screenshots ?? [];

  return (
    <div
      className="relative rounded-md border border-[#27272A] hover:border-[#3F3F46] bg-transparent transition-all duration-150 ease-out overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      {(bank.isNew || bank.isUpdated) && (
        <Badge
          variant="outline"
          className={`
            absolute top-2 left-2 z-10 text-[10px] uppercase tracking-[0.05em] bg-transparent
            ${bank.isNew
              ? 'border-[#00DC82] text-[#00DC82]'
              : 'border-[#A1A1AA] text-[#A1A1AA]'
            }
          `}
        >
          {bank.isNew ? 'New' : 'Updated'}
        </Badge>
      )}

      {screenshots.length > 0 ? (
        <Carousel className="w-full" opts={{ loop: true }}>
          <CarouselContent>
            {screenshots.map((src, i) => (
              <CarouselItem key={i}>
                <div className="aspect-[9/16] bg-[#0A0A0A]">
                  <img
                    src={src}
                    alt={`${bank.name} screenshot ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      ) : (
        <div className="aspect-square flex items-center justify-center p-6">
          <img
            src={bank.logo}
            alt={`${bank.name} logo`}
            className="max-w-[60px] max-h-[60px] object-contain"
          />
        </div>
      )}

      <div className="p-3 border-t border-[#27272A]">
        <span className="text-sm text-[#A1A1AA] text-center truncate block">
          {bank.name}
        </span>
      </div>
    </div>
  );
}
