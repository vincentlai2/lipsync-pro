import { websiteConfig } from './config/website';

/**
 * The routes for the application
 */
export enum Routes {
  Root = '/',

  // marketing pages
  FAQ = '/#faqs',
  Features = '/#features',
  Pricing = '/pricing',
  LipSyncAI = '/lip-sync-ai',
  Wav2LipOnline = '/lip-sync-ai',
  Wav2LipFree = '/lip-sync-ai',
  TextToLipSync = '/text-to-lip-sync',
  PhotoToLipSync = '/photo-to-lip-sync',
  AnimerPhotoIA = '/photo-to-lip-sync',
  Wav2LipPro = '/pricing',
  Wav2LipHowTo = '/lip-sync-ai/how-to-use',
  Wav2LipPrice = '/pricing',
  Wav2LipAlternative = '/lip-sync-ai/vs-traditional-dubbing',
  Wav2LipColab = '/lip-sync-ai/applications',
  Wav2LipWhatIs = '/lip-sync-ai/what-is',
  Blog = '/blog',
  Docs = '/docs',
  About = '/about',
  Contact = '/contact',
  Waitlist = '/waitlist',
  Changelog = '/changelog',
  Roadmap = '/roadmap',
  CookiePolicy = '/cookie',
  PrivacyPolicy = '/privacy',
  TermsOfService = '/terms',

  // auth routes
  Login = '/auth/login',
  Register = '/auth/register',
  AuthError = '/auth/error',
  ForgotPassword = '/auth/forgot-password',
  ResetPassword = '/auth/reset-password',

  // dashboard routes
  Dashboard = '/dashboard',
  Studio = '/studio',
  Wav2LipCreations = '/studio/creations',
  AdminUsers = '/admin/users',
  AdminHealth = '/admin/health',
  SettingsProfile = '/settings/profile',
  SettingsBilling = '/settings/billing',
  SettingsCredits = '/settings/credits',
  SettingsSecurity = '/settings/security',
  SettingsNotifications = '/settings/notifications',
  SettingsApiKeys = '/settings/apikeys',

  // payment processing
  Payment = '/payment',
}

/**
 * The routes that can not be accessed by logged in users
 */
export const routesNotAllowedByLoggedInUsers = [Routes.Login, Routes.Register];

/**
 * The routes that are protected and require authentication
 */
export const protectedRoutes = [
  Routes.Dashboard,
  Routes.Studio,
  Routes.Wav2LipCreations,
  Routes.AdminUsers,
  Routes.AdminHealth,
  Routes.SettingsProfile,
  Routes.SettingsBilling,
  Routes.SettingsCredits,
  Routes.SettingsSecurity,
  Routes.SettingsNotifications,
  Routes.SettingsApiKeys,
  Routes.Payment,
];

/**
 * The default redirect path after logging in
 */
export const DEFAULT_LOGIN_REDIRECT =
  websiteConfig.routes.defaultLoginRedirect ?? Routes.LipSyncAI;
