// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';
const ROOTS_ADMIN = '/admin';
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
  home: {
    dashboard: path(ROOTS_ADMIN, '/home/dashboard'),
    analysis: path(ROOTS_ADMIN, '/home/analysis')
  },
  account: {
    root: path(ROOTS_ADMIN, '/account'),
    accounts: path(ROOTS_ADMIN, '/account/accounts'),
    create: path(ROOTS_ADMIN, '/account/create')
  },
  admin_profile: {
    home: path(ROOTS_ADMIN, '/admin_profile/home'),
  },
}

// SUPERVISOR PATH
export const PATH_SUPERVISOR = {
  root: ROOTS_SUPERVISOR,
  dasboard: {
    home: path(ROOTS_SUPERVISOR, '/home/dashboard'),
    analysis: path(ROOTS_SUPERVISOR, '/home/analysis')
  },
  
}

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
    home: path(ROOTS_DASHBOARD, '/admin_profile/home'),
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