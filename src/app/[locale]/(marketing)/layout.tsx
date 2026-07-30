import { Footer } from '@/components/layout/footer';
import { Navbar } from '@/components/layout/navbar';
import { getSession } from '@/lib/server';
import type { ReactNode } from 'react';

export default async function MarketingLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getSession().catch(() => null);

  if (session?.user) {
    return children;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar scroll={true} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
