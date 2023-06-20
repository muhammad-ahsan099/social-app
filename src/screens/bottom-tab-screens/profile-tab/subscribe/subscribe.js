import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {connect} from 'react-redux';
import APP_API from '../../../../store/api-calls';
import {styles} from './style';
import Spinner from 'react-native-loading-spinner-overlay';
import {CustomHeader} from '../../../../components/molecules/header/header-1x';
import {URLS} from '../../../../store/api-urls';
import Row from '../../../../components/atoms/row';
import {mvs} from '../../../../services/metrices';
import SemiBold from '../../../../typo-graphy/semibold-text';
import Regular from '../../../../typo-graphy/regular-text';
import {SuperFan} from '../../../../assets/svgs';
import Bold from '../../../../typo-graphy/bold-text';
import {colors} from 'react-native-swiper-flatlist/src/themes';
import PrimaryButton from '../../../../components/buttons/primary-button';
import SERVICES from '../../../../services/common-services';
import FastImage from 'react-native-fast-image';
import {useTranslation} from 'react-i18next';
const Subscribe = props => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const subscriptionText = t('common:subscription');
  const youHaveSuccessfullySubscribedTo = t(
    'common:youHaveSuccessfullySubscribedTo',
  );
  const {route, profile, user_profile, subscribe, user_info} = props;
  const [spinner, setSpinner] = useState(false);
  useEffect(() => {
    getProfile();
  }, []);
  const getProfile = async () => {
    setSpinner(true);
    await profile(route.params.id);
    setSpinner(false);
  };
  const confirmSubscription = async () => {
    setSpinner(true);
    var payload = {
      superFanId: user_info?.id,
      userId: user_profile?.user?.id,
    };
    const res = await subscribe(payload);
    setSpinner(false);
    if (res?.data?.succeeded) {
      Alert.alert(
        subscriptionText,
        `${youHaveSuccessfullySubscribedTo} ${user_profile?.user?.userName}`,
      );
    }
    if (res?.response?.data?.Message) {
      Alert.alert(subscriptionText, res?.response?.data?.Message);
    }
  };
  return (
    <View style={{...styles.container}}>
      <FastImage
        style={{
          flex: 1,
          position: 'absolute',
          ...StyleSheet.absoluteFill,
          paddingTop: mvs(25),
          opacity: 20,
        }}
        source={{uri: `${URLS.image_url}${user_profile?.user?.profile}`}}
        opacity={0.25}>
        <CustomHeader title={''} allowBackBtn />
        <ScrollView contentContainerStyle={{flexGrown: 1, flex: 1}}>
          <View style={styles.body}>
            <Row alignItems="center">
              <FastImage
                source={{
                  uri: `${URLS.image_url}${user_profile?.user?.profile}`,
                }}
                style={styles.image}
              />
              <View style={styles.profileView} opacity={0.5}>
                <SemiBold label={user_profile?.user?.userName} size={18} />
                <SemiBold
                  label={t('common:about')}
                  size={8}
                  style={{marginTop: mvs(5)}}
                />
                <Regular
                  size={7}
                  numberOfLines={3}
                  style={{marginTop: mvs(4)}}
                  label={
                    user_profile?.user?.about != 'null'
                      ? user_profile?.user?.about
                      : 'Videhope creator'
                  }
                />
              </View>
            </Row>
            <Row style={{marginTop: mvs(40)}}>
              <SuperFan
                width={mvs(57)}
                height={mvs(57)}
                style={{alignSelf: 'center', marginTop: mvs(8)}}
              />
              <View style={{flex: 1, marginLeft: mvs(20)}}>
                <Bold
                  label={t('common:contentForSuperfans')}
                  color={colors.white}
                  size={mvs(14)}
                />
                <Regular
                  label={t('common:accessAllContentText')}
                  size={mvs(13)}
                  numberOfLines={3}
                  style={{marginTop: mvs(5)}}
                />
              </View>
            </Row>

            <View style={styles.paymentView} opacity={0.7}>
              <SemiBold
                label={
                  user_profile?.user?.subscriptionPrice +
                  ' GNF / ' +
                  t('common:month')
                }
                size={mvs(13)}
                color={colors.white}
              />
            </View>
            <PrimaryButton
              title={t('common:subscribe')}
              onClick={() =>
                navigation.navigate('SubscriptionPayment', {
                  user: user_profile?.user,
                })
              }
              style={{marginTop: mvs(40)}}
            />
          </View>
        </ScrollView>
        <Spinner
          visible={spinner}
          textContent={t('common:loading')}
          textStyle={{color: '#FFF'}}
        />
      </FastImage>
    </View>
  );
};

const mapStateToProps = store => ({
  user_info: store.state.user_info,
  user_profile: store.state.profile,
});

const mapDispatchToProps = {
  profile: payload => APP_API.profile(payload),
  subscribe: payload => APP_API.subscribe(payload),
};
export default connect(mapStateToProps, mapDispatchToProps)(Subscribe);
