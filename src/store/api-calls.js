import * as Actions from './action-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SERVICES from '../services/common-services';
import API_REQUESTS from './api-requests';
import {URLS} from './api-urls';
import {Alert} from 'react-native';
const register = payload => {
  return async (dispatch, getState) => {
    try {
      payload = SERVICES._removeEmptyKeys(payload);
      const response = await API_REQUESTS.postFormData(
        URLS.account.register,
        payload,
      );
      console.log(response?.data);
      return response;
    } catch (error) {
      console.log('error:', error?.response?.data);
      if (error?.response?.data) {
        Alert.alert('Sign Up', error?.response?.data?.Message);
      }
      //throw new Error(error?.response?.data?.message || error.message);
    }
  };
};

const signin = payload => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.postData(URLS.account.sigin, payload);
      if (response?.data?.succeeded == true) {
        // console.log(response?.data?.data?.token)
        await AsyncStorage.setItem(
          '@user',
          JSON.stringify(response?.data?.data?.user),
        );
        await AsyncStorage.setItem('@token', response?.data?.data?.token);
        dispatch({
          type: Actions.SET_USER_INFO,
          payload: response?.data?.data?.user,
        });
      }
      // console.log("mmmmmmmmmmmmmmmmmmmmmm"+JSON.stringify(response?.data))
      return response;
    } catch (error) {
      throw new Error(SERVICES._returnError(error));
    }
  };
};

const change_password = payload => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.putData(
        URLS.account.change_password,
        payload,
      );
      return response;
    } catch (error) {
      return error;
    }
  };
};
const delete_account = payload => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.deleteData(
        URLS.account.delete_account,
        {data: payload},
      );
      return response;
    } catch (error) {
      console.log('error:', error);
      if (error?.response?.data?.Message) {
        Alert.alert('Delete Account', error?.response?.data?.Message);
      }
    }
  };
};
const update_profile = payload => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.putFormData(
        URLS.account.update_profile,
        payload,
      );

      if (response?.data?.data) {
        await AsyncStorage.setItem(
          '@user',
          JSON.stringify(response?.data?.data),
        );
        dispatch({
          type: Actions.SET_USER_INFO,
          payload: response?.data?.data,
        });
      }
      return response;
    } catch (error) {
      return error;
    }
  };
};
const forgot_password = payload => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.postData(
        URLS.account.forgot_password,
        payload,
      );
      return response;
    } catch (error) {
      return error;
    }
  };
};
const reset_password = payload => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.postData(
        URLS.account.reset_password,
        payload,
      );
      return response;
    } catch (error) {
      return error;
    }
  };
};
const block_user = payload => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.postData(
        URLS.block.block_user,
        payload,
      );
      console.log(response?.data?.data);
      return response;
    } catch (error) {
      return error;
    }
  };
};

const unblock_user = payload => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.putData(
        URLS.block.unblock_user,
        payload,
      );
      console.log(response?.data?.data);
      return response;
    } catch (error) {
      return error;
    }
  };
};

const home_content = (params) => {
  return async (dispatch, getState) => {
    try {
      alert(URLS.content.home_content);
      const response = await API_REQUESTS.getPaginateData(URLS.content.home_content, params);
      alert("as");
       console.log(response?.data)
      if (response?.data?.succeeded == true) {
        //ACTIONS.setSearchUsers(response?.data?.User)
        dispatch({
          type: Actions.SET_HOME_CONTENTS,
          payload: response?.data?.data,
        });
      }
      return response;
    } catch (error) {
      throw new Error(SERVICES._returnError(error));
    }
  };
};
const get_wallet = () => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.getData(URLS.user.get_wallet);
      // console.log(response?.data)
      if (response?.data?.succeeded == true) {
        //ACTIONS.setSearchUsers(response?.data?.User)
        dispatch({
          type: Actions.SET_WALLET,
          payload: response?.data?.data,
        });
      }
      return response;
    } catch (error) {
      return error;
    }
  };
};

const deposit = payload => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.postData(
        URLS.wallet.deposit,
        payload,
      );
      if (response?.data?.succeeded) {
        dispatch({
          type: Actions.SET_WALLET,
          payload: response?.data?.data,
        });
      }
      return response;
    } catch (error) {
      throw new Error(SERVICES._returnError(error));
    }
  };
};
const upload_content = payload => {
  return async (dispatch, getState) => {
    try {
      payload = SERVICES._removeEmptyKeys(payload);
      const response = await API_REQUESTS.postFormData(
        URLS.content.upload_content,
        payload,
      );
      console.log('=====' + JSON.stringify(response?.data));
      return response;
    } catch (error) {
      console.log('error:', error);
      return error;
    }
  };
};
const delete_content = id => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.deleteData(
        URLS.content.delete_content + id,
      );
      return response;
    } catch (error) {
      console.log('error:', error);
      if (error?.response?.data?.Message) {
        Alert.alert('Delete Content', error?.response?.data?.Message);
      }
    }
  };
};
const like_content = payload => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.postData(
        URLS.content.like_content,
        payload,
      );
      return response;
    } catch (error) {
      throw new Error(SERVICES._returnError(error));
    }
  };
};

const unlike_content = payload => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.putData(
        URLS.content.unlike_content,
        payload,
      );
      return response;
    } catch (error) {
      throw new Error(SERVICES._returnError(error));
    }
  };
};

const comment = payload => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.postData(
        URLS.content.comment,
        payload,
      );
      console.log('===========' + JSON.stringify(response));
      return response;
    } catch (error) {
      throw new Error(SERVICES._returnError(error));
    }
  };
};

const get_comments = payload => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.getData(
        URLS.content.get_comments + payload,
        payload,
      );
      console.log(response?.data?.succeeded);
      if (response?.data?.succeeded == true) {
        //ACTIONS.setSearchUsers(response?.data?.User)
        dispatch({
          type: Actions.SET_COMMENTS,
          payload: response?.data?.data,
        });
      }
      return response;
    } catch (error) {
      throw new Error(SERVICES._returnError(error));
    }
  };
};
const get_all_notifications = () => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.getData(URLS.notifications.get_all);
      console.log('Notification Response ==> ', response?.data?.data);
      if (response?.data?.succeeded == true) {
        dispatch({
          type: Actions.SET_NOTIFICATIONS,
          payload: response?.data?.data,
        });
      }
      return response;
    } catch (error) {
      return error;
    }
  };
};

const follow = payload => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.postData(
        URLS.follower.follow,
        payload,
      );
      return response;
    } catch (error) {
      return error;
    }
  };
};

const unfollow = payload => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.putData(
        URLS.follower.unfollow,
        payload,
      );
      return response;
    } catch (error) {
      return error;
    }
  };
};

const get_messages = userId => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.getData(
        URLS.message.get_message + userId,
      );
      console.log(response?.data?.succeeded);
      if (response?.data?.succeeded == true) {
        dispatch({
          type: Actions.SET_MESSAGES,
          payload: response?.data?.data,
        });
      }
      return response;
    } catch (error) {
      throw new Error(SERVICES._returnError(error));
    }
  };
};
const get_admin_messages = userId => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.getData(
        URLS.message.get_admin_messages + userId,
      );
      console.log(response?.data?.succeeded);
      if (response?.data?.succeeded == true) {
        dispatch({
          type: Actions.SET_ADMIN_MESSAGES,
          payload: response?.data?.data,
        });
      }
      return response;
    } catch (error) {
      throw new Error(SERVICES._returnError(error));
    }
  };
};
const get_chat_list = () => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.getData(URLS.message.get_chat_list);
      console.log(response?.data?.data);
      if (response?.data?.succeeded == true) {
        //ACTIONS.setSearchUsers(response?.data?.User)
        dispatch({
          type: Actions.SET_CHAT_LIST,
          payload: response?.data?.data,
        });
      }
      return response;
    } catch (error) {
      return error;
    }
  };
};

const send = payload => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.postFormData(
        URLS.message.send,
        payload,
      );
      console.log('===========' + JSON.stringify(response));
      return response;
    } catch (error) {
      throw new Error(SERVICES._returnError(error));
    }
  };
};

const report_user = payload => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.postData(
        URLS.report.report_user,
        payload,
      );
      //  if(response?.data?.succeeded==true){
      //   dispatch({
      //     type: Actions.SET_USER_INFO,
      //     payload: response?.data?.data?.user,
      //    });
      //   }
      console.log('===========' + JSON.stringify(response));
      return response;
    } catch (error) {
      throw new Error(SERVICES._returnError(error));
    }
  };
};

const report_content = payload => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.postData(
        URLS.report.report_content,
        payload,
      );
      console.log('===========' + JSON.stringify(response));

      return response;
    } catch (error) {
      throw new Error(SERVICES._returnError(error));
    }
  };
};
const report_problem = payload => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.postData(
        URLS.report.report_problem,
        payload,
      );
      console.log(response?.data?.data);
      return response;
    } catch (error) {
      throw new Error(SERVICES._returnError(error));
    }
  };
};

const get_save_media = () => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.getData(
        URLS.saveMedia.get_save_media,
      );
      // console.log(response?.data)
      if (response?.data?.succeeded == true) {
        //ACTIONS.setSearchUsers(response?.data?.User)
        dispatch({
          type: Actions.SET_MEDIA,
          payload: response?.data?.data,
        });
      }

      return response;
    } catch (error) {
      throw new Error(SERVICES._returnError(error));
    }
  };
};

const save = payload => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.postData(
        URLS.saveMedia.save,
        payload,
      );
      console.log(response?.data?.data);
      return response;
    } catch (error) {
      throw new Error(SERVICES._returnError(error));
    }
  };
};

const un_save = payload => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.putData(
        URLS.saveMedia.un_save,
        payload,
      );
      return response;
    } catch (error) {
      throw new Error(SERVICES._returnError(error));
    }
  };
};

const subscribe = payload => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.postData(
        URLS.subscription.subscribe,
        payload,
      );
      return response;
    } catch (error) {
      return error;
    }
  };
};

const unsubscribe = payload => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.putData(
        URLS.subscription.unsubscribe,
        payload,
      );
      console.log(response?.data?.data);
      return response;
    } catch (error) {
      throw new Error(SERVICES._returnError(error));
    }
  };
};
const renew_subscription = id => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.putData(URLS.subscription.renew + id);
      console.log(response?.data?.data);
      return response;
    } catch (error) {
      return error;
    }
  };
};

const get_subscriptions = () => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.getData(
        URLS.subscription.get_subscriptions,
      );
      console.log(response?.data?.data);
      if (response?.data?.succeeded == true) {
        dispatch({
          type: Actions.SET_SUBSCRIPTIONS,
          payload: response?.data?.data,
        });
      }
      return response;
    } catch (error) {
      throw new Error(SERVICES._returnError(error));
    }
  };
};

const creators = () => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.getData(URLS.user.creators);
      if (response?.data?.succeeded == true) {
        dispatch({
          type: Actions.SET_USER,
          payload: response?.data?.data,
        });
      }
      return response;
    } catch (error) {
      throw new Error(SERVICES._returnError(error));
    }
  };
};

const fetch_users = name => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.getData(URLS.user.fetch_users + name);
      console.log(response?.data?.data);
      if (response?.data?.succeeded == true) {
        //ACTIONS.setSearchUsers(response?.data?.User)
        dispatch({
          type: Actions.SET_SEARCH_USERS,
          payload: response?.data?.data,
        });
      }

      return response;
    } catch (error) {
      throw new Error(SERVICES._returnError(error));
    }
  };
};

const search_user = payload => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.getData(
        URLS.user.search_users + payload,
        payload,
      );
      console.log(response?.data?.succeeded);
      if (response?.data?.succeeded == true) {
        dispatch({
          type: Actions.SET_USER_SEARCH,
          payload: response?.data?.data,
        });
      }

      return response;
    } catch (error) {
      throw new Error(SERVICES._returnError(error));
    }
  };
};

const profile = (userId, isMe = false) => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.getData(URLS.user.profile + userId);
      if (response?.data?.succeeded == true) {
        if (!isMe) {
          console.log('setting profile');
          dispatch({
            type: Actions.SET_PROFILE,
            payload: response?.data?.data,
          });
        } else {
          dispatch({
            type: Actions.SET_MY_INFO,
            payload: response?.data?.data,
          });
        }
      }
      return response;
    } catch (error) {
      return error;
    }
  };
};

const update_interest = payload => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.putData(
        URLS.user.update_interests,
        payload,
      );
      if (response?.data?.succeeded == true) {
        console.log('result' + JSON.stringify(response?.data));
      }
      return response;
    } catch (error) {
      throw new Error(SERVICES._returnError(error));
    }
  };
};

const update_fcm = payload => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.putData(
        URLS.user.update_fcm,
        payload,
      );
      if (response?.data?.succeeded == true) {
        console.log('result' + JSON.stringify(response?.data));
      }
      return response;
    } catch (error) {
      throw new Error(SERVICES._returnError(error));
    }
  };
};
const update_subscription_price = payload => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.putData(
        URLS.user.update_subscription_price,
        payload,
      );
      if (response?.data?.succeeded == true) {
        console.log('result' + JSON.stringify(response?.data));
      }
      return response;
    } catch (error) {
      return error;
    }
  };
};
const start_live = payload => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.postData(
        URLS.liveStream.start,
        payload,
      );
      return response;
    } catch (error) {
      return error;
    }
  };
};

const end_live = id => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.putData(URLS.liveStream.end + id, {});
      return response;
    } catch (error) {
      throw new Error(SERVICES._returnError(error));
    }
  };
};

const be_a_creator = payload => {
  return async (dispatch, getState) => {
    try {
      payload = SERVICES._removeEmptyKeys(payload);
      const response = await API_REQUESTS.postFormData(
        URLS.creator.create_request,
        payload,
      );
      console.log(response?.data?.data);
      if (response?.data?.succeeded) {
        await AsyncStorage.setItem(
          '@user',
          JSON.stringify(response?.data?.data),
        );
        dispatch({
          type: Actions.SET_USER_INFO,
          payload: response?.data?.data,
        });
      }
      return response;
    } catch (error) {
      error;
    }
  };
};
const get_all_banks = () => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.getData(URLS.bank.get_all);
      // console.log(response?.data)
      if (response?.data?.succeeded == true) {
        //ACTIONS.setSearchUsers(response?.data?.User)
        dispatch({
          type: Actions.SET_BANKS,
          payload: response?.data?.data,
        });
      }
      return response;
    } catch (error) {
      return error;
    }
  };
};
const get_all_bank_accounts = () => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.getData(URLS.bank_account.get_all);
      // console.log(response?.data)
      if (response?.data?.succeeded == true) {
        //ACTIONS.setSearchUsers(response?.data?.User)
        dispatch({
          type: Actions.SET_BANK_ACCOUNTS,
          payload: response?.data?.data,
        });
      }
      return response;
    } catch (error) {
      return error;
    }
  };
};
const add_bank_account = payload => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.postData(
        URLS.bank_account.create,
        payload,
      );
      return response;
    } catch (error) {
      return error;
    }
  };
};
const withdraw_request = payload => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.postData(
        URLS.withdraw.create,
        payload,
      );
      return response;
    } catch (error) {
      return error;
    }
  };
};
const APP_API = {
  signin,
  register,
  update_profile,
  change_password,
  forgot_password,
  reset_password,
  block_user,
  unblock_user,
  home_content,
  upload_content,
  like_content,
  unlike_content,
  comment,
  get_comments,
  follow,
  unfollow,
  get_messages,
  get_chat_list,
  send,
  report_user,
  report_content,
  report_problem,
  fetch_users,
  get_save_media,
  save,
  un_save,
  subscribe,
  unsubscribe,
  get_subscriptions,
  renew_subscription,
  creators,
  search_user,
  profile,
  update_interest,
  update_fcm,
  update_subscription_price,
  delete_content,
  get_all_notifications,
  start_live,
  end_live,
  be_a_creator,
  delete_account,
  get_admin_messages,
  get_wallet,
  deposit,
  get_all_banks,
  get_all_bank_accounts,
  add_bank_account,
  withdraw_request,
};

export default APP_API;
