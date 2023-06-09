import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import MainLayout from '../layouts/main';
import AdminLayout from '../layouts/admin';
import SupervisorLayout from '../layouts/supervisor';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// guards
import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard';
import RoleBasedGuard from '../guards/RoleBasedGuard';
// components
import LoadingScreen from '../components/LoadingScreen';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();
  const isDashboard = pathname.includes('/dashboard');

  return (
    <Suspense
      fallback={
        <LoadingScreen
          sx={{
            ...(!isDashboard && {
              top: 0,
              left: 0,
              width: 1,
              zIndex: 9999,
              position: 'fixed'
            })
          }}
        />
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          )
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          )
        },
        { path: 'login-unprotected', element: <Login /> },
        { path: 'register-unprotected', element: <Register /> },
        { path: 'reset-password', element: <ResetPassword /> },
        { path: 'verify', element: <VerifyCode /> }
      ]
    },

    // Admin Routes
    {
      path: 'admin',
      element: (
        <AuthGuard>
          <RoleBasedGuard accessibleRoles="Admin">
            <AdminLayout />
          </RoleBasedGuard>
        </AuthGuard>
      ),
      children: [
        { path: '/', element: <Navigate to="/admin/home" replace /> },
        { path: '/:id/edit', element: <UserEdit /> },
        {
          path: '/home',
          element: <AdminDashboard />
        },
        {
          path: 'account',
          children: [
            { path: '/', element: <Navigate to="/admin/account/accounts" replace /> },
            { path: '/accounts', element: <AdminUserListPage /> },
            { path: '/create', element: <AdminCreateUserPage /> }
          ]
        },
        {
          path: 'admin_profile',
          children: [
            { path: '/home', element: <AdminProfilePage /> },
            { path: '/edit', element: <AdminEditProfile /> }
          ]
        },
        {
          path: 'area',
          children: [
            { path: '/', element: <Navigate to="/admin/area/list" replace /> },
            { path: '/list', element: <ListAreaPage /> },
            { path: '/add', element: <AddAreaPage /> },
            { path: '/:id', element: <EditAreaPage /> }
          ]
        }
      ]
    },

    // Supervisor
    {
      path: 'supervisor',
      element: (
        <AuthGuard>
          <RoleBasedGuard accessibleRoles="Supervisor">
            <SupervisorLayout />
          </RoleBasedGuard>
        </AuthGuard>
      ),
      children: [
        { path: '/', element: <Navigate to="/supervisor/home" replace /> },
        {
          path: '/home',
          element: <SupervisorDashboard />
        },
        {
          path: 'room',
          children: [
            { path: '/list-flat', element: <ListFlatPage /> },
            { path: '/list-room', element: <ListRoomPage /> },
            { path: '/flat/create', element: <CreateFlatPage /> },
            { path: '/edit/:id', element: <EditRoomPage /> },
            { path: '/flat/edit/:id', element: <EditFlatPage /> }
          ]
        },
        {
          path: 'guest',
          children: [
            { path: '/contracts', element: <ListContractPage /> },
            { path: '/contract/create', element: <CreateContractPage /> },
            { path: '/contract/:id', element: <EditContractPage /> },
            { path: '/list-guest', element: <ListGuestPage /> },
            { path: '/:id', element: <EditGuestPage /> },
            { path: '/requests', element: <ListRequestPage /> },
            { path: '/requests/:id', element: <DetailRequestPage /> }
          ]
        },
        { path: '/dormitory', element: <DomiritoryPage /> },
        {
          path: 'finances',
          children: [
            { path: '/bills', element: <BillsPage /> },
            { path: '/create', element: <CreateBill /> },
            { path: '/:id', element: <ViewBill /> },
            { path: '/statistic', element: <StatisticPage /> }
          ]
        },
        { path: '/electric', element: <ElectricPage /> },
        {
          path: 'report',
          children: [
            { path: '/render-status', element: <RenderStatusPage /> },
            { path: '/service', element: <ServicesPage /> }
          ]
        },
        {
          path: 'setting',
          children: [
            { path: '/room-type', element: <RoomTypePage /> },
            { path: '/flat-type', element: <FlatTypePage /> },
            { path: '/flat-type/add', element: <CreateEditFlatTypePage /> },
            { path: '/flat-type/:id', element: <CreateEditFlatTypePage /> },
            { path: '/room-type/add', element: <CreateEditRoomTypePage /> },
            { path: '/room-type/:id', element: <CreateEditRoomTypePage /> }
          ]
        },
        { path: '/profile', element: <Profile /> },
        {
          path: 'profile',
          children: [
            { path: '/', element: <Profile /> },
            { path: '/edit', element: <EditProfilePage /> }
          ]
        },
      ]
    },

    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'coming-soon', element: <ComingSoon /> },
        { path: 'maintenance', element: <Maintenance /> },
        { path: 'pricing', element: <Pricing /> },
        { path: 'payment', element: <Payment /> },
        { path: '500', element: <Page500 /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> },
        
      ]
    },
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { path: '/', element: <LandingPage /> },
        { path: 'about-us', element: <About /> },
        { path: 'contact-us', element: <Contact /> },
        { path: 'faqs', element: <Faqs /> },
        { path: 'building/:id', element: <BuildinDetail /> }, // Path Detail Building (no Login)
        {
          path: 'components',
          children: [
            { path: '/', element: <ComponentsOverview area={window.localStorage.getItem('AreaName')} /> },
            // FOUNDATIONS
            { path: 'color', element: <Color /> },
            { path: 'typography', element: <Typography /> },
            { path: 'shadows', element: <Shadows /> },
            { path: 'grid', element: <Grid /> },
            { path: 'icons', element: <Icons /> },
            // MATERIAL UI
            { path: 'accordion', element: <Accordion /> },
            { path: 'alert', element: <Alert /> },
            { path: 'autocomplete', element: <Autocomplete /> },
            { path: 'avatar', element: <Avatar /> },
            { path: 'badge', element: <Badge /> },
            { path: 'breadcrumbs', element: <Breadcrumb /> },
            { path: 'buttons', element: <Buttons /> },
            { path: 'checkbox', element: <Checkbox /> },
            { path: 'chip', element: <Chip /> },
            { path: 'dialog', element: <Dialog /> },
            { path: 'label', element: <Label /> },
            { path: 'list', element: <List /> },
            { path: 'menu', element: <Menu /> },
            { path: 'pagination', element: <Pagination /> },
            { path: 'pickers', element: <Pickers /> },
            { path: 'popover', element: <Popover /> },
            { path: 'progress', element: <Progress /> },
            { path: 'radio-button', element: <RadioButtons /> },
            { path: 'rating', element: <Rating /> },
            { path: 'slider', element: <Slider /> },
            { path: 'snackbar', element: <Snackbar /> },
            { path: 'stepper', element: <Stepper /> },
            { path: 'switch', element: <Switches /> },
            { path: 'table', element: <Table /> },
            { path: 'tabs', element: <Tabs /> },
            { path: 'textfield', element: <Textfield /> },
            { path: 'timeline', element: <Timeline /> },
            { path: 'tooltip', element: <Tooltip /> },
            { path: 'transfer-list', element: <TransferList /> },
            { path: 'tree-view', element: <TreeView /> },
            { path: 'data-grid', element: <DataGrid /> },
            // EXTRA COMPONENTS
            { path: 'chart', element: <Charts /> },
            { path: 'map', element: <Map /> },
            { path: 'editor', element: <Editor /> },
            { path: 'copy-to-clipboard', element: <CopyToClipboard /> },
            { path: 'upload', element: <Upload /> },
            { path: 'carousel', element: <Carousel /> },
            { path: 'multi-language', element: <MultiLanguage /> },
            { path: 'animate', element: <Animate /> },
            { path: 'mega-menu', element: <MegaMenu /> },
            { path: 'form-validation', element: <FormValidation /> }
          ]
        }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}

// IMPORT COMPONENTS

// Authentication
const Login = Loadable(lazy(() => import('../pages/authentication/Login')));
const Register = Loadable(lazy(() => import('../pages/authentication/Register')));
const ResetPassword = Loadable(lazy(() => import('../pages/authentication/ResetPassword')));
const VerifyCode = Loadable(lazy(() => import('../pages/authentication/VerifyCode')));

// Admin
const AdminDashboard = Loadable(lazy(() => import('../pages/feature/admin/dashboard/AdminDashboardPage')));
const AdminUserListPage = Loadable(lazy(() => import('../pages/feature/admin/manageUser/AdminUserListPage')));
const AdminCreateUserPage = Loadable(lazy(() => import('../pages/feature/admin/manageUser/AdminCreateUserPage')));
const AdminProfilePage = Loadable(lazy(() => import('../pages/feature/admin/profile/AdminProfilePage')));
const AdminEditProfile = Loadable(lazy(() => import('../pages/feature/admin/profile/components/EditAdminProfile')));
const ListAreaPage = Loadable(lazy(() => import('../pages/feature/admin/area/ListAreaPage')));
const AddAreaPage = Loadable(lazy(() => import('../pages/feature/admin/area/AddAreaPage')));
const EditAreaPage = Loadable(lazy(() => import('../pages/feature/admin/area/EditAreaPage')));

// Supervisor
const SupervisorDashboard = Loadable(lazy(() => import('../pages/feature/supervisor/dashboard/SupervisorDashboard')));
const DomiritoryPage = Loadable(lazy(() => import('../pages/feature/supervisor/buildingKTX/BuildingKTXPage')));
const ListFlatPage = Loadable(lazy(() => import('../pages/feature/supervisor/room/ListFlatPage')));
const ListRoomPage = Loadable(lazy(() => import('../pages/feature/supervisor/room/ListRoomPage')));
const EditRoomPage = Loadable(lazy(() => import('../pages/feature/supervisor/room/EditRoomPage')));
const EditFlatPage = Loadable(lazy(() => import('../pages/feature/supervisor/room/EditFlatPage')));
const CreateFlatPage = Loadable(lazy(() => import('../pages/feature/supervisor/room/CreateFlatPage')));
const ListContractPage = Loadable(lazy(() => import('../pages/feature/supervisor/guest/ListContractPage')));
const CreateContractPage = Loadable(lazy(() => import('../pages/feature/supervisor/guest/CreateContractPage')));
const EditContractPage = Loadable(lazy(() => import('../pages/feature/supervisor/guest/EditContractPage')));
const ListGuestPage = Loadable(lazy(() => import('../pages/feature/supervisor/guest/ListGuestPage')));
const EditGuestPage = Loadable(lazy(() => import('../pages/feature/supervisor/guest/EditGuestPage')));
const BillsPage = Loadable(lazy(() => import('../pages/feature/supervisor/finances/BillsPage')));
const CreateBill = Loadable(lazy(() => import('../pages/feature/supervisor/finances/CreateBill')));
const ViewBill = Loadable(lazy(() => import('../pages/feature/supervisor/finances/ViewBill')));
const StatisticPage = Loadable(lazy(() => import('../pages/feature/supervisor/finances/StatisticPage')));
const ElectricPage = Loadable(lazy(() => import('../pages/feature/supervisor/electric/ElectricPage')));
const RenderStatusPage = Loadable(lazy(() => import('../pages/feature/supervisor/report/StatusPage')));
const ServicesPage = Loadable(lazy(() => import('../pages/feature/supervisor/report/ServicesPage')));
const RoomTypePage = Loadable(lazy(() => import('../pages/feature/supervisor/setting/RoomType')));
const FlatTypePage = Loadable(lazy(() => import('../pages/feature/supervisor/setting/FlatType')));
const CreateEditFlatTypePage = Loadable(
  lazy(() => import('../pages/feature/supervisor/setting/CreateEditFlatTypePage'))
);
const CreateEditRoomTypePage = Loadable(
  lazy(() => import('../pages/feature/supervisor/setting/CreateEditRoomTypePage'))
);
const ListRequestPage = Loadable(lazy(() => import('../pages/feature/supervisor/guest/ListRequestPage')));
const DetailRequestPage = Loadable(
  lazy(() => import('../pages/feature/supervisor/guest/components/requests/DetailRequestPage'))
);
const Profile = Loadable(lazy(() => import('../pages/feature/supervisor/profile/SupervisorProfilePage')));
const EditProfilePage = Loadable(lazy(() => import('../pages/feature/supervisor/profile/components/EditSupervisorProfile')));

// Others
const UserEdit = Loadable(lazy(() => import('../pages/dashboard/UserEdit')));
const BuildinDetail = Loadable(lazy(() => import('../pages/feature/public/BuildingDetailPage.jsx')));

// Main
const LandingPage = Loadable(lazy(() => import('../pages/LandingPage')));
const About = Loadable(lazy(() => import('../pages/About')));
const Contact = Loadable(lazy(() => import('../pages/Contact')));
const Faqs = Loadable(lazy(() => import('../pages/Faqs')));
const ComingSoon = Loadable(lazy(() => import('../pages/ComingSoon')));
const Maintenance = Loadable(lazy(() => import('../pages/Maintenance')));
const Pricing = Loadable(lazy(() => import('../pages/Pricing')));
const Payment = Loadable(lazy(() => import('../pages/Payment')));
const Page500 = Loadable(lazy(() => import('../pages/Page500')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));
// Components
const ComponentsOverview = Loadable(lazy(() => import('../pages/ComponentsOverview')));
const Color = Loadable(lazy(() => import('../pages/components-overview/foundations/FoundationColors')));
const Typography = Loadable(lazy(() => import('../pages/components-overview/foundations/FoundationTypography')));
const Shadows = Loadable(lazy(() => import('../pages/components-overview/foundations/FoundationShadows')));
const Grid = Loadable(lazy(() => import('../pages/components-overview/foundations/FoundationGrid')));
const Icons = Loadable(lazy(() => import('../pages/components-overview/foundations/FoundationIcons')));
const Accordion = Loadable(lazy(() => import('../pages/components-overview/material-ui/Accordion')));
const Alert = Loadable(lazy(() => import('../pages/components-overview/material-ui/Alert')));
const Autocomplete = Loadable(lazy(() => import('../pages/components-overview/material-ui/Autocomplete')));
const Avatar = Loadable(lazy(() => import('../pages/components-overview/material-ui/Avatar')));
const Badge = Loadable(lazy(() => import('../pages/components-overview/material-ui/Badge')));
const Breadcrumb = Loadable(lazy(() => import('../pages/components-overview/material-ui/Breadcrumb')));
const Buttons = Loadable(lazy(() => import('../pages/components-overview/material-ui/buttons')));
const Checkbox = Loadable(lazy(() => import('../pages/components-overview/material-ui/Checkboxes')));
const Chip = Loadable(lazy(() => import('../pages/components-overview/material-ui/chips')));
const Dialog = Loadable(lazy(() => import('../pages/components-overview/material-ui/dialog')));
const Label = Loadable(lazy(() => import('../pages/components-overview/material-ui/Label')));
const List = Loadable(lazy(() => import('../pages/components-overview/material-ui/Lists')));
const Menu = Loadable(lazy(() => import('../pages/components-overview/material-ui/Menus')));
const Pagination = Loadable(lazy(() => import('../pages/components-overview/material-ui/Pagination')));
const Pickers = Loadable(lazy(() => import('../pages/components-overview/material-ui/pickers')));
const Popover = Loadable(lazy(() => import('../pages/components-overview/material-ui/Popover')));
const Progress = Loadable(lazy(() => import('../pages/components-overview/material-ui/progress')));
const RadioButtons = Loadable(lazy(() => import('../pages/components-overview/material-ui/RadioButtons')));
const Rating = Loadable(lazy(() => import('../pages/components-overview/material-ui/Rating')));
const Slider = Loadable(lazy(() => import('../pages/components-overview/material-ui/Slider')));
const Snackbar = Loadable(lazy(() => import('../pages/components-overview/material-ui/Snackbar')));
const Stepper = Loadable(lazy(() => import('../pages/components-overview/material-ui/stepper')));
const Switches = Loadable(lazy(() => import('../pages/components-overview/material-ui/Switches')));
const Table = Loadable(lazy(() => import('../pages/components-overview/material-ui/table')));
const Tabs = Loadable(lazy(() => import('../pages/components-overview/material-ui/Tabs')));
const Textfield = Loadable(lazy(() => import('../pages/components-overview/material-ui/textfield')));
const Timeline = Loadable(lazy(() => import('../pages/components-overview/material-ui/Timeline')));
const Tooltip = Loadable(lazy(() => import('../pages/components-overview/material-ui/Tooltip')));
const TransferList = Loadable(lazy(() => import('../pages/components-overview/material-ui/transfer-list')));
const TreeView = Loadable(lazy(() => import('../pages/components-overview/material-ui/TreeView')));
const DataGrid = Loadable(lazy(() => import('../pages/components-overview/material-ui/data-grid')));

//
const Charts = Loadable(lazy(() => import('../pages/components-overview/extra/Charts')));
const Map = Loadable(lazy(() => import('../pages/components-overview/extra/Map')));
const Editor = Loadable(lazy(() => import('../pages/components-overview/extra/Editor')));
const CopyToClipboard = Loadable(lazy(() => import('../pages/components-overview/extra/CopyToClipboard')));
const Upload = Loadable(lazy(() => import('../pages/components-overview/extra/Upload')));
const Carousel = Loadable(lazy(() => import('../pages/components-overview/extra/Carousel')));
const MultiLanguage = Loadable(lazy(() => import('../pages/components-overview/extra/MultiLanguage')));
const Animate = Loadable(lazy(() => import('../pages/components-overview/extra/animate')));
const MegaMenu = Loadable(lazy(() => import('../pages/components-overview/extra/MegaMenu')));
const FormValidation = Loadable(lazy(() => import('../pages/components-overview/extra/form-validation')));
