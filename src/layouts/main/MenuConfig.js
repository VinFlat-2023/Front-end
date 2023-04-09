import { Icon } from '@iconify/react';
import homeFill from '@iconify/icons-eva/home-fill';
import fileFill from '@iconify/icons-eva/file-fill';
import roundGrain from '@iconify/icons-ic/round-grain';
import bookOpenFill from '@iconify/icons-eva/book-open-fill';
// routes
import { PATH_AUTH, PATH_DOCS, PATH_PAGE, PATH_DASHBOARD } from '../../routes/paths';

// ----------------------------------------------------------------------

const ICON_SIZE = {
  width: 22,
  height: 22
};

const menuConfig = [
  {
    title: 'Trang chủ',
    icon: <Icon icon={homeFill} {...ICON_SIZE} />,
    path: '/'
  },
  {
    title: 'Tìm ký túc xá',
    icon: <Icon icon={fileFill} {...ICON_SIZE} />,
    path: PATH_PAGE.components,
    children: [
      {
        subheader: 'Tìm kiếm',
        items: [
          { title: 'Tất cả', path: PATH_PAGE.components },         
          { title: 'Giá dưới 3 triệu', path: PATH_PAGE.maintenance },
          { title: 'Có phòng trống', path: PATH_PAGE.comingSoon }
        ]
      },
      {
        subheader: 'Theo quận',
        items: [
           { title: 'Quận 9', path: PATH_PAGE.maintenance },
          { title: 'Thủ Đức', path: PATH_PAGE.maintenance },
          { title: 'Tân Bình', path: PATH_PAGE.maintenance },
          { title: 'Khu vực khác', path: PATH_PAGE.maintenance }
        ]
      },
      // {
      //   subheader: 'Error',
      //   items: [
      //     { title: 'Page 404', path: PATH_PAGE.page404 },
      //     { title: 'Page 500', path: PATH_PAGE.page500 }
      //   ]
      // },
      // {
      //   subheader: 'Dashboard',
      //   items: [{ title: 'Dashboard', path: PATH_DASHBOARD.root }]
      // }
    ]
  },
  {
    title: 'Về chúng tôi',
    icon: <Icon icon={roundGrain} {...ICON_SIZE} />,
    path: PATH_PAGE.about
  },
];

export default menuConfig;
