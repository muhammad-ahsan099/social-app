import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {Provider} from 'react-redux';
import {MainNavigator} from './src/navigation';
import store from './src/store';
import './src/services/axios-interceptors';
import './src/services/axios-form-data-client';
import ReactGA from 'react-ga';
// import RouteChangeTracker from './src/components/atoms/RouteChangeTrackerangeTracker'
import RouteChangeTracker from './src/components/atoms/RouteChangeTracker'
// after other import statements
import './src/services/IMLocalize';
import messaging from '@react-native-firebase/messaging';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import {StatusBar} from 'react-native';
messaging().setBackgroundMessageHandler(async remoteMessage => {
  //let message_body = remoteMessage.notification.body?.type;
  let message_title = remoteMessage.notification?.title;
  let message_body = remoteMessage.notification?.body;
});
const linking = {
  prefixes: ['videhope://'],
  // config: {
  //   initialRouteName: 'Home',
  //   screens: {
  //     Home: {
  //       path: 'home'
  //     },
  //     Details: {
  //       path: 'details/:personId'
  //     }
  //   }
  // }
};
const TRACKING_ID = "UA-273998624-1"; // YOUR_OWN_TRACKING_ID
ReactGA.initialize(TRACKING_ID);
const App = () => {
  //ReactGA.pageview("dashbaord/home");
      //  <div>
      //   <RouteChangeTracker />
      // </div>
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <Provider store={store}>
        <NavigationContainer linking={linking}>
          <MainNavigator />
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
};
export default App;
