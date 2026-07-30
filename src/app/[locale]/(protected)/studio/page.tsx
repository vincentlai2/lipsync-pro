import { redirect } from 'next/navigation';
import { Routes } from '@/routes';

export default function StudioPage() {
  redirect(Routes.LipSyncAI);
}
