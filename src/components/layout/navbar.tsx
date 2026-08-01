'use client';

import { LoginWrapper } from '@/components/auth/login-wrapper';
import Container from '@/components/layout/container';
import { Logo } from '@/components/layout/logo';
import { ModeSwitcher } from '@/components/layout/mode-switcher';
import { NavbarMobile } from '@/components/layout/navbar-mobile';
import { UserButton } from '@/components/layout/user-button';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { useNavbarLinks } from '@/config/navbar-config';
import { useScroll } from '@/hooks/use-scroll';
import {
  LocaleLink,
  useLocalePathname,
  useLocaleRouter,
} from '@/i18n/navigation';
import { authClient } from '@/lib/auth-client';
import { cn } from '@/lib/utils';
import { Routes } from '@/routes';
import { ArrowUpRightIcon, SparklesIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { Skeleton } from '../ui/skeleton';
import LocaleSwitcher from './locale-switcher';

interface NavBarProps {
  scroll?: boolean;
}

const customNavigationMenuTriggerStyle = cn(
  navigationMenuTriggerStyle(),
  'relative bg-transparent text-muted-foreground cursor-pointer',
  'hover:bg-accent hover:text-accent-foreground',
  'focus:bg-accent focus:text-accent-foreground',
  'data-active:font-semibold data-active:bg-transparent data-active:text-accent-foreground',
  'data-[state=open]:bg-transparent data-[state=open]:text-accent-foreground'
);

function NavbarUserActions() {
  const t = useTranslations();
  const [mounted, setMounted] = useState(false);
  const { data: session, isPending } = authClient.useSession();
  const currentUser = session?.user;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || isPending) {
    return <Skeleton className="size-8 border rounded-full" />;
  }

  return currentUser ? (
    <>
      <LocaleLink
        href={Routes.LipSyncAI}
        className={cn(
          buttonVariants({
            variant: 'default',
            size: 'sm',
          }),
          'hidden min-w-20 cursor-pointer rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 font-bold text-white shadow-md transition-transform hover:scale-105 sm:inline-flex'
        )}
      >
        Studio
      </LocaleLink>
      <UserButton user={currentUser} />
    </>
  ) : (
    <div className="flex items-center gap-x-2.5">
      <LoginWrapper mode="modal" asChild>
        <Button
          variant="ghost"
          size="sm"
          className="cursor-pointer font-bold text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white"
        >
          {t('Common.login')}
        </Button>
      </LoginWrapper>

      <LocaleLink
        href={Routes.LipSyncAI}
        className={cn(
          buttonVariants({
            variant: 'default',
            size: 'sm',
          }),
          'inline-flex items-center gap-1.5 cursor-pointer rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 px-4 py-2 font-black text-white shadow-md shadow-blue-500/20 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-200'
        )}
      >
        <SparklesIcon className="size-3.5 fill-amber-300 text-amber-300" />
        <span>Try AI Lip Sync</span>
      </LocaleLink>
    </div>
  );
}

export function Navbar({ scroll }: NavBarProps) {
  const t = useTranslations();
  const scrolled = useScroll(50);
  const menuLinks = useNavbarLinks();
  const localePathname = useLocalePathname();
  const router = useLocaleRouter();

  return (
    <section
      className={cn(
        'sticky inset-x-0 top-0 z-40 py-3 transition-all duration-300',
        'border-b border-white/5 bg-background/70 backdrop-blur-md supports-backdrop-filter:bg-background/60 shadow-sm'
      )}
    >
      <Container className="px-4">
        {/* desktop navbar */}
        <nav className="hidden lg:flex">
          {/* logo and name */}
          <div className="flex items-center">
            <LocaleLink href="/" className="flex items-center space-x-2">
              <Logo />
              <span className="text-xl font-semibold">
                {t('Metadata.name')}
              </span>
            </LocaleLink>
          </div>

          {/* menu links */}
          <div className="flex-1 flex items-center justify-center space-x-2">
            <NavigationMenu className="relative">
              <NavigationMenuList className="flex items-center">
                {menuLinks?.map((item, index) =>
                  item.items ? (
                    <NavigationMenuItem key={index} className="relative">
                      <NavigationMenuTrigger
                        onClick={() => {
                          if (item.href) {
                            router.push(item.href as any);
                          }
                        }}
                        data-active={
                          item.items.some((subItem) =>
                            subItem.href
                              ? localePathname.startsWith(subItem.href)
                              : false
                          )
                            ? 'true'
                            : undefined
                        }
                        className={customNavigationMenuTriggerStyle}
                      >
                        {item.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-4 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                          {item.items?.map((subItem, subIndex) => {
                            const isSubItemActive =
                              subItem.href &&
                              localePathname.startsWith(subItem.href);
                            return (
                              <li key={subIndex}>
                                <NavigationMenuLink asChild>
                                  <LocaleLink
                                    href={subItem.href || '#'}
                                    target={
                                      subItem.external ? '_blank' : undefined
                                    }
                                    rel={
                                      subItem.external
                                        ? 'noopener noreferrer'
                                        : undefined
                                    }
                                    className={cn(
                                      'group flex select-none flex-row items-center gap-4 rounded-md',
                                      'p-2 leading-none no-underline outline-hidden transition-colors',
                                      'hover:bg-accent hover:text-accent-foreground',
                                      'focus:bg-accent focus:text-accent-foreground',
                                      isSubItemActive &&
                                        'bg-accent text-accent-foreground'
                                    )}
                                  >
                                    <div
                                      className={cn(
                                        'flex size-8 shrink-0 items-center justify-center transition-colors',
                                        'bg-transparent text-muted-foreground',
                                        'group-hover:bg-transparent group-hover:text-accent-foreground',
                                        'group-focus:bg-transparent group-focus:text-accent-foreground',
                                        isSubItemActive &&
                                          'bg-transparent text-accent-foreground'
                                      )}
                                    >
                                      {subItem.icon ? subItem.icon : null}
                                    </div>
                                    <div className="flex-1">
                                      <div
                                        className={cn(
                                          'text-sm font-medium text-muted-foreground',
                                          'group-hover:bg-transparent group-hover:text-accent-foreground',
                                          'group-focus:bg-transparent group-focus:text-accent-foreground',
                                          isSubItemActive &&
                                            'bg-transparent text-accent-foreground'
                                        )}
                                      >
                                        {subItem.title}
                                      </div>
                                      {subItem.description && (
                                        <div
                                          className={cn(
                                            'text-sm text-muted-foreground',
                                            'group-hover:bg-transparent group-hover:text-accent-foreground/80',
                                            'group-focus:bg-transparent group-focus:text-accent-foreground/80',
                                            isSubItemActive &&
                                              'bg-transparent text-accent-foreground/80'
                                          )}
                                        >
                                          {subItem.description}
                                        </div>
                                      )}
                                    </div>
                                    {subItem.external && (
                                      <ArrowUpRightIcon
                                        className={cn(
                                          'size-4 shrink-0 text-muted-foreground',
                                          'group-hover:bg-transparent group-hover:text-accent-foreground',
                                          'group-focus:bg-transparent group-focus:text-accent-foreground',
                                          isSubItemActive &&
                                            'bg-transparent text-accent-foreground'
                                        )}
                                      />
                                    )}
                                  </LocaleLink>
                                </NavigationMenuLink>
                              </li>
                            );
                          })}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  ) : (
                    <NavigationMenuItem key={index}>
                      <NavigationMenuLink
                        asChild
                        active={
                          item.href
                            ? item.href === '/'
                              ? localePathname === '/'
                              : localePathname.startsWith(item.href)
                            : false
                        }
                        className={customNavigationMenuTriggerStyle}
                      >
                        <LocaleLink
                          href={item.href || '#'}
                          target={item.external ? '_blank' : undefined}
                          rel={
                            item.external ? 'noopener noreferrer' : undefined
                          }
                        >
                          {item.title}
                        </LocaleLink>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  )
                )}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* navbar right show sign in or user */}
          <div className="flex items-center gap-x-4">
            <NavbarUserActions />

            <ModeSwitcher />
            <LocaleSwitcher />
          </div>
        </nav>

        {/* mobile navbar */}
        <NavbarMobile className="lg:hidden" />
      </Container>
    </section>
  );
}
