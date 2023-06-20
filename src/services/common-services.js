import { Platform, Share } from 'react-native';
import {
  launchCamera,
  launchImageLibrary,
  launchVideoLibrary,
} from 'react-native-image-picker';
import { useTranslation } from 'react-i18next';
import { IP, URLS } from '../store/api-urls';
const createShareLink = refId => {
  let shareLink = '';
  try {
    shareLink = `${IP}/${refId}`;
  } catch (err) { }
  return shareLink;
};
const SERVICES = {
  getFormData: object => {
    const formData = new FormData();
    Object.keys(object).forEach(key => formData.append(key, object[key]));
    return formData;
  },
  _returnError: error => {
    if (error?.response?.request) {
      let { _response } = error?.response?.request;
      console.log(_response);
      return JSON.parse(_response)?.message
        ? JSON.parse(_response)?.message.toString()
        : error.message?.toString();
    } else {
      if (error === 'Hi Dude') {
        return 'Dismiss';
      } else if (error?.message) {
        if (error?.message === 'Network Error') {
          return 'Network Error';
        } else {
          return error?.message?.toString();
        }
      } else {
        return error?.toString();
      }
    }
  },
  _capitalizeFirst: str => str.charAt(0).toUpperCase() + str.slice(1),
  _returnStringify: data => JSON.stringify(data),

  _share: async (description = '', url) => {
    try {
      console.log('url::', url);
      const result = await Share.share({
        // message:description?description:url,
        // url: url,
        message: description, // + ' ' + createText(description),
        url: url,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      // console.log(error.message);
    }
  },
  serialize: obj => {
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]));
      }
    return str.join('&');
  },
  _removeEmptyKeys: payload => {
    const obj = payload;
    Object.keys(obj).forEach(key => {
      if (obj[key] === '') {
        delete obj[key];
      }
    });
    return obj;
  },
  _returnFile: uri => `${URLS.image_url}${uri}`,
  _returnImageCamera: async () => {
    try {
      const res = await launchCamera({
        mediaType: 'photo',
        includeBase64: false,
      });
      if (res?.didCancel) {
        throw 'user canceled the action';
      } else if (res?.assets) {
        return {
          uri: res.assets[0].uri,
          name: res.assets[0].fileName,
          type: res.assets[0].type,
        };
      } else {
        throw 'unknown error';
      }
    } catch (error) {
      throw new Error(error);
    }
  },
  _returnImageGallery: async () => {
    try {
      const res = await launchImageLibrary({
        mediaType: 'photo',
        includeBase64: false,
      });
      if (res?.didCancel) {
        // throw 'user canceled the action';
        console.log('user canceled the action');
      } else if (res?.assets) {
        return res?.assets[0]

      } else {
        throw 'unknown error';
      }
    } catch (error) {
      throw new Error(error);
    }
  },
  findOnlineUser: (users = {}, user_id) => {
    console.log('usersssss:::', users);
    return Object.keys(users)?.find(
      (key, index) => users[key]?.user_id === user_id,
    );
  },
  translate: key => {
    const { t } = useTranslation();
    return t(`common:${key}`);
  },
};

export default SERVICES;
