import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import {
  HomeActive,
  Home,
  Discover,
  DiscoverActive,
  Video,
  Profile,
  ProfileActive,
  Activity,
  ActivityActive,
} from '../../assets/svgs/bottom-tab-icons';
import BottomMenu from '../../components/atoms/BottomMenu';
import colors from '../../services/colors';
import { mvs } from '../../services/metrices';
import HomeReels from '../../screens/bottom-tab-screens/home-tab/home-tab-reels';
import DiscoverTab from '../../screens/bottom-tab-screens/discover/discover-tab';
import VideoTab from '../../screens/bottom-tab-screens/video-tab/video-tab';
import ActivityTab from '../../screens/bottom-tab-screens/activity-tab/activity-tab';
import ProfileTab from '../../screens/bottom-tab-screens/profile-tab/profile-tab';
import Bold from '../../typo-graphy/bold-text';
import SERVICES from '../../services/common-services';
const BottomTab = createBottomTabNavigator();
import { useNavigation } from '@react-navigation/native';
const TabNavigator = () => {
  const [refresh, setReferesh] = useState(false);
  const navigation = useNavigation();
  useEffect(() => {
    console.log('Refereshing ============ Home ');
  }, [refresh]);
  // Define the Home component as a separate function
  const HomeScreen = ({ refresh_screen }) => (
    <HomeReels refresh_screen={refresh_screen} />
  );
  return (
    <BottomTab.Navigator
      screenOptions={{ headerShown: false, tabBarHideOnKeyboard: true }}
      tabBar={props => <BottomMenu {...props} colors={colors} />}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          unmountOnBlur: true,
          title: 'Home',
          tabBarIcon: focused => (
            <TouchableOpacity
              style={styles.tabOption}
              onPress={() => navigation.navigate('Home')}>
              {focused ? <HomeActive /> : <Home />}
              <Bold
                label={SERVICES.translate('home')}
                style={styles.lableStyle}
                size={10}
                color={focused ? colors.white : colors.lightgrey1}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <BottomTab.Screen
        name="Discover"
        component={DiscoverTab}
        options={{
          title: 'Discover',
          unmountOnBlur: true,
          tabBarIcon: focused => (
            <View style={styles.tabOption}>
              {focused ? <DiscoverActive /> : <Discover />}
              <Bold
                label={SERVICES.translate('discover')}
                style={styles.lableStyle}
                size={mvs(10)}
                color={focused ? colors.white : colors.lightgrey1}
              />
            </View>
          ),
        }}
      />
      <BottomTab.Screen
        name="Video"
        component={VideoTab}
        options={{
          title: 'Video',
          unmountOnBlur: true,
          // tabBarVisibilityAnimationConfig:{
          //   show:false,
          //   hide:true
          // },
          tabBarIcon: focused => (
            <View style={styles.tabOption}>
              <Video />
            </View>
          ),
        }}
      />
      <BottomTab.Screen
        name="Activity"
        component={ActivityTab}
        initialParams={{ user: null }}
        options={{
          unmountOnBlur: true,
          title: 'Activity',
          tabBarIcon: focused => (
            <View style={styles.tabOption}>
              {focused ? <ActivityActive /> : <Activity />}
              <Bold
                label={SERVICES.translate('activity')}
                style={styles.lableStyle}
                size={10}
                color={focused ? colors.white : colors.lightgrey1}
              />
            </View>
          ),
        }}
      />
      <BottomTab.Screen
        name="Profile"
        initialParams={{ isMe: true, id: 0 }}
        component={ProfileTab}
        options={{
          unmountOnBlur: true,
          title: 'Profile',
          tabBarIcon: focused => (
            <View style={styles.tabOption}>
              {focused ? <ProfileActive /> : <Profile />}
              <Bold
                label={SERVICES.translate('profile')}
                style={styles.lableStyle}
                size={10}
                color={focused ? colors.white : colors.lightgrey1}
              />
            </View>
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};
const styles = StyleSheet.create({
  tabOption: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: mvs(10),
  },
  lableStyle: {
    fontSize: mvs(12),
    marginTop: mvs(5.5),
  },
});
export default TabNavigator;
