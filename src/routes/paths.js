// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';
export const ROOTS_ADMIN = '/admin';
const ROOTS_SUPERVISOR = '/supervisor';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  register: path(ROOTS_AUTH, '/register'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  verify: path(ROOTS_AUTH, '/verify')
};

// ADMIN PATH
export const PATH_ADMIN = {
  root: ROOTS_ADMIN,
  home: path(ROOTS_ADMIN, '/home'),
  account: {
    root: path(ROOTS_ADMIN, '/account'),
    accounts: path(ROOTS_ADMIN, '/account/accounts'),
    create: path(ROOTS_ADMIN, '/account/create')
  },
  admin_profile: {
    home: path(ROOTS_ADMIN, '/admin_profile/home')
  },
  area: {
    root: path(ROOTS_ADMIN, '/area'),
    listAreas: path(ROOTS_ADMIN, '/area/list'),
    addArea: path(ROOTS_ADMIN, '/area/add')
  }
};

// SUPERVISOR PATH
export const PATH_SUPERVISOR = {
  root: ROOTS_SUPERVISOR,
  home: path(ROOTS_SUPERVISOR, '/home'),
  domitory: path(ROOTS_SUPERVISOR, '/dormitory'),
  electric: path(ROOTS_SUPERVISOR, '/electric'),
  room: {
    root: path(ROOTS_SUPERVISOR, '/room'),
    listFlat: path(ROOTS_SUPERVISOR, '/room/list-flat'),
    listRoom: path(ROOTS_SUPERVISOR, '/room/list-room')
  },
  guest: {
    root: path(ROOTS_SUPERVISOR, '/guest'),
    listContract: path(ROOTS_SUPERVISOR, '/guest/contracts'),
    listGuest: path(ROOTS_SUPERVISOR, '/guest/list-guest'),
    listRequest: path(ROOTS_SUPERVISOR, '/guest/requests'),
  },
  finances: {
    root: path(ROOTS_SUPERVISOR, '/finances'),
    bill: path(ROOTS_SUPERVISOR, '/finances/bills'),
    view: path(ROOTS_SUPERVISOR, '/finances/:id'),
    create: path(ROOTS_SUPERVISOR, '/finances/create'),
    statistic: path(ROOTS_SUPERVISOR, '/finances/statistic')
  },
  report: {
    root: path(ROOTS_SUPERVISOR, '/report'),
    renderStatus: path(ROOTS_SUPERVISOR, '/report/render-status'),
    service: path(ROOTS_SUPERVISOR, '/report/service'),
  },
  setting: {
    root: path(ROOTS_SUPERVISOR, '/setting'),
    roomType: path(ROOTS_SUPERVISOR, '/setting/room-type'),
    flatType: path (ROOTS_SUPERVISOR, '/setting/flat-type'),
    addFlatType: path(ROOTS_SUPERVISOR, '/setting/flat-type/add'),
    addRoomType: path(ROOTS_SUPERVISOR, '/setting/room-type/add')
  }
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page404: '/404',
  page500: '/500',
  components: '/components'
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    home: path(ROOTS_DASHBOARD, '/general/home'),
    analysis: path(ROOTS_DASHBOARD, '/general/analysis')
  },
  account: {
    root: path(ROOTS_DASHBOARD, '/account'),
    accounts: path(ROOTS_DASHBOARD, '/account/accounts'),
    create: path(ROOTS_DASHBOARD, '/account/create')
  },
  admin_profile: {
    home: path(ROOTS_DASHBOARD, '/admin_profile/home')
  },
  manage: {
    users: path(ROOTS_DASHBOARD, '/manage/users'),
    profile: path(ROOTS_DASHBOARD, '/manage/profile'),
    create: path(ROOTS_DASHBOARD, '/manage/create'),
    edit: path(ROOTS_DASHBOARD, '/manage/edit')
  },
  finances: {
    invoices: path(ROOTS_DASHBOARD, '/finances/invoices'),
    income: path(ROOTS_DASHBOARD, '/finances/income'),
    expense: path(ROOTS_DASHBOARD, '/finances/expense'),
    statistic: path(ROOTS_DASHBOARD, '/finances/statistic')
  },
  contract: {
    contracts: path(ROOTS_DASHBOARD, '/contract/contracts'),
    renters: path(ROOTS_DASHBOARD, '/contract/renters')
  },
  flat: {
    flats: path(ROOTS_DASHBOARD, '/flat/flats'),
    buildings: path(ROOTS_DASHBOARD, '/flat/buildings')
  },
  service: {
    services: path(ROOTS_DASHBOARD, '/service/services')
  },
  report: {
    status: path(ROOTS_DASHBOARD, '/report/status'),
    services: path(ROOTS_DASHBOARD, '/report/services')
  },
  mail: {
    root: path(ROOTS_DASHBOARD, '/mail'),
    all: path(ROOTS_DASHBOARD, '/mail/all')
  },
  chat: {
    root: path(ROOTS_DASHBOARD, '/chat'),
    new: path(ROOTS_DASHBOARD, '/chat/new'),
    conversation: path(ROOTS_DASHBOARD, '/chat/:conversationKey')
  },
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    profile: path(ROOTS_DASHBOARD, '/user/profile'),
    cards: path(ROOTS_DASHBOARD, '/user/cards'),
    list: path(ROOTS_DASHBOARD, '/user/list'),
    newUser: path(ROOTS_DASHBOARD, '/user/new'),
    editById: path(ROOTS_DASHBOARD, `/user/reece-chung/edit`),
    account: path(ROOTS_DASHBOARD, '/user/account')
  },
  dormitory: {
    root: path(ROOTS_DASHBOARD, '/dormitory')
  }
};

export const PATH_DOCS = 'https://docs-minimals.vercel.app/introduction';
