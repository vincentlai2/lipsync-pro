import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { isDemoWebsite } from '@/lib/demo';
import { getSession } from '@/lib/server';
import { notFound } from 'next/navigation';

interface HealthLayoutProps {
  children: React.ReactNode;
}

export default async function HealthLayout({ children }: HealthLayoutProps) {
  const isDemo = isDemoWebsite();
  const session = await getSession();

  if (!session || (session.user.role !== 'admin' && !isDemo)) {
    notFound();
  }

  return (
    <>
      <DashboardHeader
        breadcrumbs={[
          {
            label: 'Admin',
            isCurrentPage: false,
          },
          {
            label: 'Health',
            isCurrentPage: true,
          },
        ]}
      />

      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
