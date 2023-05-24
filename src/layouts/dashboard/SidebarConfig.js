// routes
import { PATH_ADMIN, PATH_SUPERVISOR } from '../../routes/paths';
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
        path: PATH_ADMIN.home,
        icon: ICONS.home
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
        title: 'Quản lý hồ sơ cá nhân',
        path: PATH_ADMIN.admin_profile.home,
        icon: ICONS.person,
        children: [{ title: 'Hồ sơ cá nhân', path: PATH_ADMIN.admin_profile.home }]
      },
      {
        title: 'Quản lý khu vực',
        path: PATH_ADMIN.area.root,
        icon: ICONS.book,
        children: [
          { title: 'Danh sách khu vực', path: PATH_ADMIN.area.listAreas },
          { title: 'Thêm khu vực', path: PATH_ADMIN.area.addArea }
        ]
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
        path: PATH_SUPERVISOR.home,
        icon: ICONS.blog
      }
    ]
  },
  {
    subheader: 'QUẢN LÝ',
    items: [
      {
        title: 'Toà nhà KTX',
        path: PATH_SUPERVISOR.domitory,
        icon: ICONS.home
      },
      {
        title: 'Phòng',
        path: PATH_SUPERVISOR.room.root,
        icon: ICONS.home,
        children: [
          { title: 'Danh sách căn hộ', path: PATH_SUPERVISOR.room.listFlat },
          { title: 'Danh sách phòng', path: PATH_SUPERVISOR.room.listRoom }
        ]
      },
      {
        title: 'Khách thuê',
        path: PATH_SUPERVISOR.guest.root,
        icon: ICONS.user,
        children: [
          { title: 'Danh sách hợp đồng', path: PATH_SUPERVISOR.guest.listContract },
          { title: 'Danh sách khách thuê', path: PATH_SUPERVISOR.guest.listGuest },
          { title: 'Danh sách yêu cầu', path: PATH_SUPERVISOR.guest.listRequest }
        ]
      },
      {
        title: 'Tài chính',
        path: PATH_SUPERVISOR.finances.root,
        icon: ICONS.ecommerce,
        children: [
          { title: 'Danh sách hóa đơn', path: PATH_SUPERVISOR.finances.bill },
          // { title: 'Thống kê kinh doanh', path: PATH_SUPERVISOR.finances.statistic }
        ]
      },
      {
        title: 'Điện nước',
        path: PATH_SUPERVISOR.electric,
        icon: ICONS.dashboard
      },
      // {
      //   title: 'Báo cáo',
      //   path: PATH_SUPERVISOR.report.root,
      //   icon: ICONS.user,
      //   children: [
      //     { title: 'Báo cáo tổng hợp tình trạng thuê', path: PATH_SUPERVISOR.report.renderStatus },
      //     { title: 'Báo cáo điện nước', path: PATH_SUPERVISOR.report.service }
      //   ]
      // },
      {
        title: 'Cài đặt',
        path: PATH_SUPERVISOR.setting.root,
        icon: ICONS.book,
        children: [
          { title: 'Loại căn hộ', path: PATH_SUPERVISOR.setting.flatType },
          { title: 'Loại phòng', path: PATH_SUPERVISOR.setting.roomType }
        ]
      }
    ]
  }
];
