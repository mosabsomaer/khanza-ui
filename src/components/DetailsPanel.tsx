import { useState } from 'react';
import { X, Download, Copy, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { downloadFile } from '@/utils/download';
import { copyToClipboard } from '@/utils/clipboard';
import {
  generateReactCode,
  generateVueCode,
  generateHtmlCode,
  generateSvelteCode,
  generateSvgImport,
} from '@/utils/format-code';
import { toast } from 'sonner';
import type { Bank, PaymentMethod, DownloadFormat, CodeFormat } from '@/types';

interface DetailsPanelProps {
  item: (Bank | PaymentMethod) & { type: 'bank' | 'payment-method' };
  onClose: () => void;
}

export function DetailsPanel({ item, onClose }: DetailsPanelProps) {
  const [downloadFormat, setDownloadFormat] = useLocalStorage<DownloadFormat>(
    'khazna-download-format',
    'svg',
  );
  const [codeFormat, setCodeFormat] = useLocalStorage<CodeFormat>(
    'khazna-code-format',
    'react',
  );
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const handleDownload = async () => {
    const ext = downloadFormat;
    const filename = `${item.id}.${ext}`;
    const url = item.logo.replace('.svg', `.${ext}`);
    try {
      await downloadFile(url, filename);
      toast.success(`Downloaded ${filename}`);
    } catch {
      // Fallback: try with .svg if other formats don't exist
      await downloadFile(item.logo, `${item.id}.svg`);
      toast.success(`Downloaded ${item.id}.svg`);
    }
  };

  const handleCopyCode = async () => {
    let code = '';
    switch (codeFormat) {
      case 'react':
        code = generateReactCode(item.name, item.logo);
        break;
      case 'vue':
        code = generateVueCode(item.name, item.logo);
        break;
      case 'html':
        code = generateHtmlCode(item.name, item.logo);
        break;
      case 'svelte':
        code = generateSvelteCode(item.name, item.logo);
        break;
      case 'svg':
        code = generateSvgImport(item.logo);
        break;
    }
    const success = await copyToClipboard(code);
    if (success) {
      toast.success('Copied to clipboard');
    } else {
      toast.error('Failed to copy');
    }
  };

  const handleCopyColor = async (color: string) => {
    const success = await copyToClipboard(color);
    if (success) {
      setCopiedColor(color);
      toast.success(`Copied ${color}`);
      setTimeout(() => setCopiedColor(null), 1000);
    }
  };

  return (
    <div className="w-80 lg:w-96 p-6 h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-white truncate pr-2">
          {item.name}
        </h3>
        <button
          onClick={onClose}
          className="text-[#52525B] hover:text-white transition-colors duration-150"
        >
          <X className="size-5" />
        </button>
      </div>

      {/* Logo Preview */}
      <div className="border border-[#27272A] rounded-md p-8 mb-6 flex items-center justify-center bg-tech-grid aspect-square">
        <img
          src={item.logo}
          alt={`${item.name} logo`}
          className="max-w-[160px] max-h-[160px] object-contain"
        />
      </div>

      {/* Brand Colors */}
      <div className="mb-6">
        <p className="text-xs text-[#52525B] uppercase tracking-[0.05em] mb-3">
          Brand Colors
        </p>
        <div className="flex gap-2">
          {item.colors.map((color) => (
            <button
              key={color}
              onClick={() => handleCopyColor(color)}
              className={`
                w-10 h-10 rounded-sm border-2 transition-all duration-150
                ${copiedColor === color
                  ? 'border-[#00DC82]'
                  : 'border-[#27272A] hover:border-[#3F3F46]'
                }
              `}
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
      </div>

      {/* Download Format */}
      <div className="mb-4">
        <p className="text-xs text-[#52525B] uppercase tracking-[0.05em] mb-3">
          Download Format
        </p>
        <Tabs value={downloadFormat} onValueChange={(v) => setDownloadFormat(v as DownloadFormat)}>
          <TabsList className="bg-[#0A0A0A] border border-[#27272A] w-full">
            <TabsTrigger value="svg" className="flex-1 text-xs data-[state=active]:bg-[#27272A] data-[state=active]:text-white">SVG</TabsTrigger>
            <TabsTrigger value="png" className="flex-1 text-xs data-[state=active]:bg-[#27272A] data-[state=active]:text-white">PNG</TabsTrigger>
            <TabsTrigger value="webp" className="flex-1 text-xs data-[state=active]:bg-[#27272A] data-[state=active]:text-white">WebP</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Code Format */}
      <div className="mb-6">
        <p className="text-xs text-[#52525B] uppercase tracking-[0.05em] mb-3">
          Code Format
        </p>
        <Tabs value={codeFormat} onValueChange={(v) => setCodeFormat(v as CodeFormat)}>
          <TabsList className="bg-[#0A0A0A] border border-[#27272A] w-full">
            <TabsTrigger value="svg" className="flex-1 text-xs data-[state=active]:bg-[#27272A] data-[state=active]:text-white">SVG</TabsTrigger>
            <TabsTrigger value="react" className="flex-1 text-xs data-[state=active]:bg-[#27272A] data-[state=active]:text-white">React</TabsTrigger>
            <TabsTrigger value="vue" className="flex-1 text-xs data-[state=active]:bg-[#27272A] data-[state=active]:text-white">Vue</TabsTrigger>
            <TabsTrigger value="html" className="flex-1 text-xs data-[state=active]:bg-[#27272A] data-[state=active]:text-white">HTML</TabsTrigger>
            <TabsTrigger value="svelte" className="flex-1 text-xs data-[state=active]:bg-[#27272A] data-[state=active]:text-white">Svelte</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3">
        <Button
          onClick={handleCopyCode}
          className="w-full bg-[#00DC82] text-black hover:bg-[#00DC82]/90 font-medium"
        >
          <Copy className="size-4 mr-2" />
          Copy Code
        </Button>

        <Button
          onClick={handleDownload}
          variant="outline"
          className="w-full border-[#3F3F46] bg-transparent text-white hover:border-white hover:bg-transparent"
        >
          <Download className="size-4 mr-2" />
          Download
        </Button>

        {'figmaUrl' in item && item.figmaUrl && (
          <Button
            asChild
            variant="outline"
            className="w-full border-[#3F3F46] bg-transparent text-white hover:border-white hover:bg-transparent"
          >
            <a href={item.figmaUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="size-4 mr-2" />
              Open in Figma
            </a>
          </Button>
        )}
      </div>
    </div>
  );
}
