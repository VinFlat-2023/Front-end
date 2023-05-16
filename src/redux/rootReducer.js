import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// slices
import mailReducer from './slices/mail';
import chatReducer from './slices/chat';
import blogReducer from './slices/blog';
import userReducer from './slices/user';
import productReducer from './slices/product';
import calendarReducer from './slices/calendar';
import kanbanReducer from './slices/kanban';
import settingReducer from './slices/setting';
import flatReducer from './slices/flat';
import guestReducer from './slices/guest';
import financeReducer from './slices/finance';
import contractReducer from './slices/contract';
import buildingReducer from './slices/building';
import roomReducer from './slices/room';
// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: []
};

const productPersistConfig = {
  key: 'product',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout']
};

const rootReducer = combineReducers({
  mail: mailReducer,
  chat: chatReducer,
  blog: blogReducer,
  user: userReducer,
  calendar: calendarReducer,
  kanban: kanbanReducer,
  product: persistReducer(productPersistConfig, productReducer),
  setting: settingReducer,
  flat: flatReducer,
  guest: guestReducer,
  finance: financeReducer,
  contract: contractReducer,
  building: buildingReducer,
  room: roomReducer,
});

export { rootPersistConfig, rootReducer };


//bearer eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJTdXBlcnZpc29yIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoia2hvaWh1eUBtYWlsIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwOS8wOS9pZGVudGl0eS9jbGFpbXMvYWN0b3IiOiJzdXAzIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6IjMiLCJleHAiOjE2ODUyNzA5ODMsImlzcyI6Imh0dHBzOi8vdmluZmxhdC13ZWJhcHAuYXp1cmV3ZWJzaXRlcy5uZXQvIiwiYXVkIjoiaHR0cHM6Ly92aW5mbGF0LXdlYmFwcC5henVyZXdlYnNpdGVzLm5ldC8ifQ.AFwtVg1Imhdjtya4zrkZxybsYwflV-7ECPvojsVnJxSsd47LR7B-ilx37bDDHZYT_GSV5nQF0KhQauSdGUWrdw