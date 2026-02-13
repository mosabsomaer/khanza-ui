export interface Bank {
  id: string;
  name: string;
  logo: string;
  colors: string[];
  figmaUrl?: string;
  paymentMethods: string[];
  hasScreenshots: boolean;
  screenshots?: string[];
  dateAdded: string;
  lastUpdated?: string;
  isNew?: boolean;
  isUpdated?: boolean;
}

export interface PaymentMethod {
  id: string;
  name: string;
  logo: string;
  colors: string[];
  figmaUrl?: string;
  dateAdded: string;
  isNew?: boolean;
  isUpdated?: boolean;
}

export type DownloadFormat = 'svg' | 'png' | 'webp';
export type CodeFormat = 'svg' | 'react' | 'vue' | 'html' | 'svelte';

export interface SelectedItem {
  type: 'bank' | 'payment-method';
  id: string;
}
