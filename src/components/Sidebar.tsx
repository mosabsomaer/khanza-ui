import { Grid3X3, Smartphone } from 'lucide-react';
import { useRouter } from '@/hooks/useRouter';
import {
  Sidebar as SidebarUI,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';

const navItems = [
  { label: 'Logos', icon: Grid3X3, path: '/logos', route: 'logos' },
  { label: 'Apps', icon: Smartphone, path: '/apps', route: 'apps' },
] as const;

export function AppSidebar() {
  const { route, navigate } = useRouter();

  return (
    <SidebarUI collapsible="none">
      <SidebarHeader className="px-6 py-6">
        <h1 className="text-2xl font-bold text-white tracking-[-0.02em]">
          Khazna UI
        </h1>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = route === item.route || (item.route === 'apps' && route === 'app-detail');
                return (
                  <SidebarMenuItem key={item.route}>
                    <SidebarMenuButton
                      isActive={isActive}
                      onClick={() => navigate(item.path)}
                      tooltip={item.label}
                    >
                      <item.icon />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="px-6 py-4 border-t border-sidebar-border">
        <p className="text-xs text-[#52525B]">Libyan Banking Assets</p>
      </SidebarFooter>
    </SidebarUI>
  );
}
