import * as Actions from './action-types';

const INITIAL_STATE = {
  user_info: {
    first_name: 'Irfan',
    last_name: 'khan',
    email: 'irfan@gmail.com',
    image: null,
    role: 2,
  },
  search_history: [],
  categories: [],
  home_content: [],
  message: [],
  user: [],
  getcomments: [],
  save_media: [],
  search_users: [],
  user_find: [],
  profile: {},
  user_data: {},
  chat_list: [],
  chat: [],
  conversation: [],
  notifications: [],
  subscriptions: [],
  admin_messages: [],
  my_info: {},
  wallet: {},
  banks: [],
  bank_accounts: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case Actions.SET_USER_INFO:
      return {
        ...state,
        user_info: action.payload,
      };
    case Actions.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case Actions.SET_SEARCH_USERS:
      return {
        ...state,
        search_users: action.payload,
      };
    case Actions.SET_USER_SEARCH:
      return {
        ...state,
        user_find: action.payload,
      };
    case Actions.SET_SEARCH_HISTORY:
      return {
        ...state,
        search_history: action.payload,
      };
    case Actions.SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case Actions.SET_MESSAGES:
      return {
        ...state,
        message: action.payload,
      };
    case Actions.SET_HOME_CONTENTS:
      return {
        ...state,
        home_content: action.payload,
      };
    case Actions.SET_COMMENTS:
      return {
        ...state,
        getcomments: action.payload,
      };
    case Actions.SET_MEDIA:
      return {
        ...state,
        save_media: action.payload,
      };
    case Actions.SET_PROFILE:
      return {
        ...state,
        profile: action.payload,
      };
    case Actions.SET_USER_DATA:
      return {
        ...state,
        user_data: action.payload,
      };
    case Actions.SET_CHAT:
      return {
        ...state,
        chat: action.payload,
      };
    case Actions.SET_CHAT_LIST:
      return {
        ...state,
        chat_list: action.payload,
      };
    case Actions.SET_CONVERSATION:
      return {
        ...state,
        conversation: action.payload,
      };
    case Actions.SET_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload,
      };
    case Actions.SET_SUBSCRIPTIONS:
      return {
        ...state,
        subscriptions: action.payload,
      };
    case Actions.SET_ADMIN_MESSAGES:
      return {
        ...state,
        admin_messages: action.payload,
      };
    case Actions.SET_MY_INFO:
      return {
        ...state,
        my_info: action.payload,
      };
    case Actions.SET_WALLET:
      return {
        ...state,
        wallet: action.payload,
      };
    case Actions.SET_BANKS:
      return {
        ...state,
        banks: action.payload,
      };
    case Actions.SET_BANK_ACCOUNTS:
      return {
        ...state,
        bank_accounts: action.payload,
      };
    default:
      return state;
  }
};
