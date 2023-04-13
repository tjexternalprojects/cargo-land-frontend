// common components
export { default as Header } from './common/Header';
export { default as LineGraph } from './common/Graph';
export { default as MapDirection } from './common/Maps/GoogleMap/Direction';
export { default as AddressMap } from './common/Maps/GoogleMap/AddressMap';
export { default as useGeocode } from './common/Maps/GoogleMap/useGeocode';
export { default as Notification } from './common/Notification';
export { default as Loader } from './common/loader';
export { default as RingLoader } from './common/RingLoader';
export { default as LoadingPage } from './common/LoadingPage'

// login components
export { default as LoginComponent } from './login-signup/Login';
export { default as SingupComponent } from './login-signup/Signup';
export { default as ForgotPassword } from './ForgotPassword'
export { default as ResendToken } from './resendVerification'

// Business SignUp
export { default as BasicInfo } from './businessSignup/BasicInfo';
export { default as BusinessData } from './businessSignup/BusinessData';
export { default as BusinessDocuments } from './businessSignup/BusinessDocuments';

// USER DASHBOARD =========================================================
// Dashboard
export { default as DashboardHome } from './dashboard/Home';
export { default as ShipmentPage } from './dashboard/Shipment';
export { default as History } from './dashboard/History';
export { default as Sidebar } from './dashboard/Sidebar';
export { default as TopBar } from './dashboard/TopBar';
export { default as ShipmentModal } from './dashboard/Shipment/ShipmentModal';
export { default as TrackShipment } from './dashboard/TrackShipment';

// Dashboard New_Shipment
export { default as NewShipmentForm } from './dashboard/Shipment/newShipment/NewShipmentForm';
export { default as RecipientDetails } from './dashboard/Shipment/newShipment/RecipientDetails';
export { default as ShipmentSummary } from './dashboard/Shipment/newShipment/ShipmentSummary';
export { default as Payment } from './dashboard/Shipment/newShipment/Payment';

// Landing Page
export { default as Hero } from './LandingPage/Hero';
export { default as Services } from './LandingPage/Services';
export { default as Business } from './LandingPage/Business';
export { default as Contact } from './LandingPage/Contact';
export { default as GetStarted } from './LandingPage/GetStarted';
export { default as AboutUs } from './LandingPage/AboutUs';


// SUPER ADMIN DASHBOARD ======================================================
export { default as ATopBar } from './superAdminDashboard/TopBar';
export { default as ASidebar } from './superAdminDashboard/Sidebar';
export { default as AdminHome} from './superAdminDashboard/Home'
export { default as AUsers} from './superAdminDashboard/Users'
export {default as AUserDetailsModal} from './superAdminDashboard/Users/UserDetailsModal'
export { default as ATrackShipment} from './superAdminDashboard/TrackShipment'
export { default as ATransactions } from './superAdminDashboard/Transactions'
export { default as AShipment } from './superAdminDashboard/Shipment'

