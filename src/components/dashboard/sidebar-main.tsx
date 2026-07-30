'use client';

import { cn } from '@/lib/utils';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { LocaleLink, useLocalePathname } from '@/i18n/navigation';
import type { NestedMenuItem } from '@/types';

/**
 * Main navigation for the dashboard sidebar
 */
export function SidebarMain({ items }: { items: NestedMenuItem[] }) {
  const pathname = useLocalePathname();

  // Function to check if a path is active
  const isActive = (href: string | undefined): boolean => {
    if (!href) return false;
    return pathname === href || pathname.startsWith(href + '/');
  };

  const topItems = items.filter((item) => item.align !== 'bottom');
  const bottomItems = items.filter((item) => item.align === 'bottom');

  const renderItem = (item: NestedMenuItem) => {
    return item.items && item.items.length > 0 ? (
      <SidebarGroup key={item.title}>
        <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
        <SidebarGroupContent className="flex flex-col gap-2">
          <SidebarMenu>
            {item.items.map((subItem) => (
              <SidebarMenuItem key={subItem.title}>
                <SidebarMenuButton asChild isActive={isActive(subItem.href)}>
                  <LocaleLink href={subItem.href || ''}>
                    {subItem.icon ? subItem.icon : null}
                    <span className="truncate font-medium text-sm">
                      {subItem.title}
                    </span>
                  </LocaleLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    ) : (
      /* Render items without children directly in a SidebarMenu */
      <SidebarGroup key={item.title}>
        <SidebarGroupContent className="flex flex-col gap-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive(item.href)}>
                <LocaleLink href={item.href || ''}>
                  {item.icon ? item.icon : null}
                  <span
                    className={cn(
                      'truncate text-sm',
                      item.href?.includes('/lip-sync-ai') ||
                        item.href?.includes('/studio/creations')
                        ? 'font-semibold'
                        : 'font-medium'
                    )}
                  >
                    {item.title}
                  </span>
                </LocaleLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    );
  };

  return (
    <div className="flex flex-col justify-between flex-1 min-h-0">
      <div className="flex flex-col gap-2">{topItems.map(renderItem)}</div>
      <div className="flex flex-col gap-2 mt-auto">
        {bottomItems.map(renderItem)}
      </div>
    </div>
  );
}
