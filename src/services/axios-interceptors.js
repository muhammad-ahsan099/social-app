import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {URLS} from '../store/api-urls';
import {Alert} from 'react-native';

const CancelToken = axios.CancelToken;
source = CancelToken.source();
client = axios.create({
  baseURL: URLS.base_url,
});

//Axios Interceptors
client.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('@token');
    config.headers = {
      Accept: 'application/json',
      'Cache-Control': 'no-cache',
      'Content-Type': 'application/json',
    };

    config.params = config.params || {};
    config.cancelToken = source.token || {};
    if (token) {
      config.headers['Authorization'] = `Bearer ` + token;
    }
    return config;
  },
  error => {
    console.log('I am here');
    Promise.reject(error);
  },
);

client.interceptors.response.use(
  response => {
    console.log('RESPONSE INTERCPTOR : ', response?.status);
    return response;
  },
  async function (error) {
    console.log('INTERCEPTOR ERROR RESPONSE : ', error?.response?.status);
    console.log('INTERCEPTOR ERROR RESPONSE CONFIG: ', error?.config);
    if (error?.response?.status === 401) {
      console.log('Un-Authorized');
      await AsyncStorage.clear();
      Alert.alert('Log in', 'Session Expired! Please Login');
      dnavigation.replace('Signin');
    }
    return Promise.reject(error);
  },
);
