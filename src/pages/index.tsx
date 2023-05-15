import { lazy } from 'react';

export const LandingPage = lazy(() => import('./LandingPage'));
export const Login = lazy(() => import('./Login'));
export const ResetPassword = lazy(() => import('./ResetPassword'));
export const Dashboard = lazy(() => import('./Dashboard'));
export const Admin = lazy(() => import('./SuperAdminDashboard'));
export const VerifyPayment = lazy (()=> import('./VerifyPayment'))
export const Page404 = lazy(()=>import('./404'))
