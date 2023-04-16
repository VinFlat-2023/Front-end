// routes
import { PATH_DASHBOARD, PATH_PAGE, PATH_ADMIN } from '../../routes/paths';
// components
import SvgIconStyle from '../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => (
  <SvgIconStyle src={`/static/icons/navbar/${name}.svg`} sx={{ width: '100%', height: '100%' }} />
);

const ICONS = {
  home: getIcon('ic_home'),
  book: getIcon('ic_book'),
  flash: getIcon('ic_flash'),
  dashboard: getIcon('ic_dashboard'),
  ecommerce: getIcon('ic_ecommerce'),
  user: getIcon('ic_user'),
  cart: getIcon('ic_cart'),
  blog: getIcon('ic_blog'),
  calendar: getIcon('ic_calendar'),
  admin: getIcon('ic_admin'),
  person: getIcon('ic_person')
};

// ADMIN SIDEBAR
export const adminSlidebar = [
  {
    items: [
      {
        title: 'Trang chủ',
        path: PATH_ADMIN.home.dashboard,
        icon: ICONS.home,
        children: [
          { title: 'App', path: PATH_ADMIN.home.dashboard },
          { title: 'Analysis', path: PATH_ADMIN.home.analysis }
        ]
      },
      {
        title: 'Quản lý tài khoản',
        path: PATH_ADMIN.account.accounts,
        icon: ICONS.user,
        children: [
          { title: 'Danh sách tài khoản', path: PATH_ADMIN.account.accounts },
          { title: 'Thêm tài khoản', path: PATH_ADMIN.account.create }
        ]
      },
      {
        title: 'Hồ sơ cá nhân',
        path: PATH_ADMIN.admin_profile.home,
        icon: ICONS.person,
        children: [{ title: 'Hồ sơ cá nhân', path: PATH_ADMIN.admin_profile.home }]
      }
    ]
  }
];

// SUPERVISOR SIDEBAR
export const supervisorSlidebar = [
  {
    items: [
      {
        title: 'Trang chủ',
        path: PATH_DASHBOARD.general.home,
        icon: ICONS.home,
        children: [
          { title: 'App', path: PATH_DASHBOARD.general.home },
          { title: 'Analysis', path: PATH_DASHBOARD.general.analysis }
        ]
      },
      {
        title: 'Manager',
        path: PATH_DASHBOARD.general.finances,
        icon: ICONS.dashboard,
        children: [
          { title: 'Danh sách người dùng', path: PATH_DASHBOARD.manage.users },
          { title: 'Thông tin tài khoản', path: PATH_DASHBOARD.manage.profile },
          { title: 'Tạo tài khoản', path: PATH_DASHBOARD.manage.create },
          { title: 'Chỉnh sửa tài khoản', path: PATH_DASHBOARD.manage.edit }
        ]
      },
      {
        title: 'Toà nhà KTX',
        path: PATH_DASHBOARD.dormitory.root,
        icon: ICONS.home
      },
      {
        title: 'Tài chính',
        path: PATH_DASHBOARD.general.finances,
        icon: ICONS.ecommerce,
        children: [
          { title: 'Thu/Chi', path: PATH_DASHBOARD.finances.invoices },
          { title: 'Phiếu thu', path: PATH_DASHBOARD.finances.income },
          { title: 'Phiếu chi', path: PATH_DASHBOARD.finances.expense },
          { title: 'Thống kê kinh doanh', path: PATH_DASHBOARD.finances.statistic }
        ]
      },
      {
        title: 'Hợp đồng thuê',
        path: PATH_DASHBOARD.general.renter,
        icon: ICONS.user,
        children: [
          { title: 'Danh sách hợp đồng thuê', path: PATH_DASHBOARD.contract.contracts },
          { title: 'Danh sách khách thuê', path: PATH_DASHBOARD.contract.renters }
        ]
      },
      {
        title: 'Căn hộ',
        path: PATH_DASHBOARD.general.ecommerce,
        icon: ICONS.book,
        children: [
          { title: 'Danh sách căn hộ', path: PATH_DASHBOARD.flat.flats },
          { title: 'Danh sách tòa nhà', path: PATH_DASHBOARD.flat.buildings }
        ]
      },
      {
        title: 'Điện nước',
        path: PATH_DASHBOARD.general.ecommerce,
        icon: ICONS.flash,
        children: [{ title: 'Danh sách điện nước', path: PATH_DASHBOARD.service.services }]
      },
      {
        title: 'Báo cáo',
        path: PATH_DASHBOARD.general.report,
        icon: ICONS.calendar,
        children: [
          { title: 'Báo cáo tổng hợp tình trạng thuê', path: PATH_DASHBOARD.report.status },
          { title: 'Báo cáo điện nước', path: PATH_DASHBOARD.report.services }
        ]
      }
    ]
  }
];
