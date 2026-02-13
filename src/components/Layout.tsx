import type { ReactNode } from 'react';
import { AppSidebar } from '@/components/Sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

interface LayoutProps {
  children: ReactNode;
  detailsPanel?: ReactNode;
}

export function Layout({ children, detailsPanel }: LayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-1 min-h-svh bg-tech-grid">
        <main className="flex-1 overflow-y-auto scrollbar-none p-8">
          {children}
        </main>
        {detailsPanel && (
          <aside className="shrink-0 border-l border-[#27272A] overflow-y-auto scrollbar-none">
            {detailsPanel}
          </aside>
        )}
      </div>
    </SidebarProvider>
  );
}
