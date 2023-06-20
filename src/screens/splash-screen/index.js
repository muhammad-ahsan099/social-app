import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {Image, StatusBar, View} from 'react-native';
import {connect} from 'react-redux';
import {ACTIONS} from '../../store/actions';
import {Logo} from '../../assets/svgs';
import {Splash_Styles as styles} from './style';
import colors from '../../services/colors';
import APP_API from '../../store/api-calls';
import {Videhope} from '../../assets/images';
import {mvs} from '../../services/metrices';
const Splash = props => {
  const {setUserInfo, navigation, getVideos} = props;
  React.useEffect(() => {
    (async () => {
      //const token = await AsyncStorage.getItem('@token');
      dnavigation = navigation;
      const user = await AsyncStorage.getItem('@user');
      // if (user) {
      //   getVideos();
      // }
      setTimeout(() => {
        if (!user) {
          navigation.replace('Onboarding');
        } else {
          // setSocket(ioClient);
          setUserInfo(JSON.parse(user));
          //navigation.replace('Onboarding');
          navigation.replace('BottomTab');
        }
      }, 500);
    })();
  }, []);

  return (
    <View style={{...styles.container, backgroundColor: colors.primary}}>
      {/* <Logo /> */}
      <StatusBar barStyle="light-content" backgroundColor={'black'} />
      <Image source={Videhope} style={{height: mvs(250), width: mvs(150)}} />
    </View>
  );
};

const mapStateToProps = store => ({
  user_info: store.state.user_info,
});

const mapDispatchToProps = {
  setUserInfo: payload => ACTIONS.setUserInfo(payload),
  //setSocket: payload => ACTIONS.setSocket(payload),
  getVideos: () => APP_API.home_content(),
};
export default connect(mapStateToProps, mapDispatchToProps)(Splash);
