import { lazy } from 'react';
// common components
export const Header = lazy(() => import('./common/Header'));
export const LineGraph = lazy(() => import('./common/Graph/LingGraph'));
export const MapDirection = lazy(() => import('./common/Maps/GoogleMap/Direction'));
export const AddressMap = lazy(() => import('./common/Maps/GoogleMap/AddressMap'));
export { default as useGeocode } from './common/Maps/GoogleMap/useGeocode';
export const Notification = lazy(() => import('./common/Notification'));
export const Loader = lazy(() => import('./common/loader'));
export const RingLoader = lazy(() => import('./common/RingLoader'));
export const LoadingPage = lazy(() => import('./common/LoadingPage'));
export const Pagination = lazy(() => import('./common/Pagination'));
export const SearchShipment = lazy(() => import('./common/SearchShipment'));

// login components
export const LoginComponent = lazy(() => import('./login-signup/Login'));
export const SingupComponent = lazy(() => import('./login-signup/Signup'));
export const ForgotPassword = lazy(() => import('./ForgotPassword'));
export const ResendToken = lazy(() => import('./resendVerification'));

// Business SignUp
export const BusinessSignup = lazy(() => import('./dashboard/UserProfile/businessSignup'));
export const BusinessData = lazy(
	() => import('./dashboard/UserProfile/businessSignup/BusinessData')
);
export const BusinessDocuments = lazy(
	() => import('./dashboard/UserProfile/businessSignup/BusinessDocuments')
);

// USER DASHBOARD =========================================================
// Dashboard
export const DashboardHome = lazy(() => import('./dashboard/Home'));
export const ShipmentPage = lazy(() => import('./dashboard/Shipment'));
export const AllShipment = lazy(() => import('./dashboard/AllShipment'));
export const History = lazy(() => import('./dashboard/History'));
export const Sidebar = lazy(() => import('./dashboard/Sidebar'));
export const TopBar = lazy(() => import('./dashboard/TopBar'));
export const ShipmentModal = lazy(() => import('./dashboard/Shipment/ShipmentModal'));
export const TrackShipment = lazy(() => import('./dashboard/TrackShipment'));

// Dashboard User
export const UserProfile = lazy(() => import('./dashboard/UserProfile'));
export const PersonalDetails = lazy(() => import('./dashboard/UserProfile/PersonalDetails'));
export const UpdatePassword = lazy(
	() => import('./dashboard/UserProfile/PersonalDetails/UpdatePassword')
);
export const UserDetails = lazy(
	() => import('./dashboard/UserProfile/PersonalDetails/UserDetails')
);
export const UserImage = lazy(() => import('./dashboard/UserProfile/PersonalDetails/UserImage'));

export const AccountType = lazy(() => import('./dashboard/UserProfile/AccountType'));

// Dashboard New_Shipment
export const NewShipmentForm = lazy(
	() => import('./dashboard/Shipment/newShipment/NewShipmentForm')
);
export const RecipientDetails = lazy(
	() => import('./dashboard/Shipment/newShipment/RecipientDetails')
);
export const ShipmentSummary = lazy(
	() => import('./dashboard/Shipment/newShipment/ShipmentSummary')
);
export const Payment = lazy(() => import('./dashboard/Shipment/newShipment/Payment'));

// Landing Page
export const Hero = lazy(() => import('./LandingPage/Hero'));
export const Services = lazy(() => import('./LandingPage/Services'));
export const Business = lazy(() => import('./LandingPage/Business'));
export const Contact = lazy(() => import('./LandingPage/Contact'));
export const GetStarted = lazy(() => import('./LandingPage/GetStarted'));
export const AboutUs = lazy(() => import('./LandingPage/AboutUs'));

// SUPER ADMIN DASHBOARD ======================================================
export const ATopBar = lazy(() => import('./superAdminDashboard/TopBar'));
export const ASidebar = lazy(() => import('./superAdminDashboard/Sidebar'));
export const AdminHome = lazy(() => import('./superAdminDashboard/Home'));
export const AUsers = lazy(() => import('./superAdminDashboard/Users'));
export const AUserDetailsModal = lazy(() => import('./superAdminDashboard/Users/UserDetailsModal'));
export const ATrackShipment = lazy(() => import('./superAdminDashboard/TrackShipment'));
export const ATransactions = lazy(() => import('./superAdminDashboard/Transactions'));
export const AShipment = lazy(() => import('./superAdminDashboard/Shipment'));


// TRACK SHIPMENT 
export const SearchShipmentModal  = lazy(() => import('./superAdminDashboard/TrackShipment/ShipmentIDModal'));
