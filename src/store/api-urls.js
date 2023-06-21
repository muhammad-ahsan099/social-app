export const IP = 'http://kankiraapp-001-site1.etempurl.com';
export const URLS = {
  base_url: `${IP}/api/`,
  image_url: `${IP}/UploadedFiles/`,

  account: {
    sigin: 'account/login',
    register: 'account/register',
    forgot_password: 'account/forgot-password',
    reset_password: 'account/reset-password',
    change_password: 'account/change-password',
    update_profile: 'account/update-profile',
    delete_account: 'account/delete-account',
  },
  block: {
    block_user: 'block/block-user',
    unblock_user: 'block/unblock-user',
  },
  content: {
    home_content: 'http://fcoll242-001-site12.etempurl.com/api/content/home-contentV1',
    // home_content: 'content/home-content',
    upload_content: 'content/upload-content',
    like_content: 'content/like-content',
    unlike_content: 'content/unlike-content',
    comment: 'content/comment',
    get_comments: 'content/get-comments/',
    delete_content: 'content/delete-content/',
  },
  follower: {
    follow: 'follower/follow',
    unfollow: 'follower/unfollow',
  },
  message: {
    get_message: 'message/get-messages/',
    get_chat_list: 'message/get-chat-list',
    send: 'message/send',
    get_admin_messages: 'admin/get-messages/',
  },
  report: {
    report_user: 'report/report-user',
    report_content: 'report/report-content',
    report_problem: 'report/report-problem',
  },
  saveMedia: {
    get_save_media: 'media/get-save-media',
    save: 'media/save',
    un_save: 'media/un-save',
  },
  subscription: {
    subscribe: 'subscription/subscribe',
    unsubscribe: 'subscription/unsubscribe',
    get_subscriptions: 'subscription/user-subscriptions',
    renew: 'subscription/renew/',
  },
  user: {
    creators: 'user/creators',
    search_users: 'user/search-users',
    fetch_users: 'user/search-users?name=',
    profile: 'user/profile/',
    video: 'http://fcoll242-001-site12.etempurl.com/api/content/content/Video',
    audio: 'http://fcoll242-001-site12.etempurl.com/api/content/content/Audio',
    update_interests: 'user/update-interests',
    update_fcm: 'user/update-fcm',
    update_subscription_price: 'user/update-subscription-price',
    get_wallet: 'user/wallet',
  },
  notifications: {
    get_all: 'notifications/get-all',
  },
  liveStream: {
    start: 'livestream/start-live',
    end: 'livestream/end-live/',
  },
  creator: {
    create_request: 'creator-request/create',
  },
  wallet: {
    deposit: 'wallet/deposit',
  },
  bank: {
    get_all: 'bank/get-all',
  },
  bank_account: {
    get_all: 'bank-account/get-all',
    create: 'bank-account/add-account',
  },
  withdraw: {
    create: 'withdraw/request',
  },
};
