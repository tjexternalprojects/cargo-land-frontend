import { lazy } from 'react';

export const LandingPage = lazy(() => import('./LandingPage'));
export const Login = lazy(() => import('./Login'));
export const ResetPassword = lazy(() => import('./ResetPassword'));
export const BusinessSignup = lazy(() => import('./BusinessSignup'));
export const Dashboard = lazy(() => import('./Dashboard'));
export const Admin = lazy(() => import('./SuperAdminDashboard'));
