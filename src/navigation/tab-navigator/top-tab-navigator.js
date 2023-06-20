import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, TouchableOpacity ,Text} from 'react-native';
import Morning from '../../screens/activities/morning/morning';
import AfterNoon from '../../screens/activities/afternoon/after-noon';
import Evening from '../../screens/activities/evening/evening';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Regular from '../../presentation/typography/regular-text';
import { mvs } from '../../services/metrices';
import allColors from '../../services/colors';
import colors from '../../services/colors';
import SemiBold from '../../presentation/typography/semibold-text';
import Row from './../../components/atoms/row';
import { BookingActive, calendar as Cal, } from '../../assets/common-icons';
import { INPUT_FIELD } from '../../components/atoms';
import MyTabBar from './../../components/top-tab-navigation/index';
import { Floating } from '../../assets/common-icons';

const Tab = createMaterialTopTabNavigator();

const TopTabNavigator = () => {
  const navigation=useNavigation();
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity onPress={()=>navigation.navigate("NewBooking")}
        style={{position:'absolute',bottom:0,zIndex:100,right:5}}>
       <Text><Floating/></Text> 
      </TouchableOpacity>
      <Row style={{ paddingHorizontal: mvs(20), paddingVertical: mvs(15), borderBottomWidth: 0.5, borderColor: colors.GD8D8D8 }}>
        <Row>
          <BookingActive />
          <SemiBold size={mvs(16)} label={'  My Bookings'} color={colors.B444251} />
        </Row>
        <Row style={{ alignItems: 'center', }}>
          <Cal height={mvs(24)} width={mvs(24)} />
          <INPUT_FIELD.InputDropDown placeholder={'Today'} 
          style={{ borderWidth: 0,height:mvs(20),width:mvs(100),paddingHorizontal:0 }} />
        </Row>
      </Row>
      <Tab.Navigator
        tabBar={props => <MyTabBar {...props} />}
        screenOptions={{
          tabBarActiveTintColor: allColors.black,
          tabBarStyle: { backgroundColor: 'white', marginTop: mvs(14) },
          tabBarIndicatorStyle: {
            backgroundColor: allColors.primary
          }
        }}>
        <Tab.Screen name="Morning" component={Morning}
          options={{
            title: '09:00 - 12:00',
            tabBarLabel: 'Morning',
          }}
        />
        <Tab.Screen name="Afternoon" component={AfterNoon}
          options={{
            title: '09:00 - 11:00',
            tabBarLabel: 'Afternoon',
          }} />
        <Tab.Screen name="Evening" component={Evening}
          options={{
            title: '10:00 - 12:00',
            tabBarLabel: 'Evening',
            tabBarStyle: { backgroundColor: 'powderblue' },
          }} />
      </Tab.Navigator>
    </View>


  );
};
const styles = StyleSheet.create({
  tabOption: {
    width: mvs(110),
    height: mvs(50),

  },
  lableStyle: {
    color: colors.black,
    fontSize: 17
  }
});
export default TopTabNavigator;
