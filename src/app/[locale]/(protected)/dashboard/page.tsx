import { redirect } from 'next/navigation';
import { Routes } from '@/routes';

/**
 * Dashboard page
 *
 * NOTICE: This is a demo page for the dashboard, no real data is used,
 * we will show real data in the future
 */
export default function DashboardPage() {
  redirect(Routes.LipSyncAI);
}
