import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Spinner from 'react-native-loading-spinner-overlay';
import {connect} from 'react-redux';
import {SuperFan} from '../../../../assets/svgs';
import Row from '../../../../components/atoms/row';
import PrimaryButton from '../../../../components/buttons/primary-button';
import {CustomHeader} from '../../../../components/molecules/header/header-1x';
import SERVICES from '../../../../services/common-services';
import {mvs} from '../../../../services/metrices';
import APP_API from '../../../../store/api-calls';
import {STORAGE_URL, URLS} from '../../../../store/api-urls';
import Bold from '../../../../typo-graphy/bold-text';
import Regular from '../../../../typo-graphy/regular-text';
import SemiBold from '../../../../typo-graphy/semibold-text';
import {styles} from './style';
import PrimaryInput from '../../../../components/input/primary-input';
import SeconderyInput from '../../../../components/input/secondery-input';
import PrimaryRadioButton from '../../../../components/buttons/primary-radio';
import colors from '../../../../services/colors';
const SubscriptionPayment = props => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const subscriptionText = t('common:subscription');
  const youHaveSuccessfullySubscribedTo = t(
    'common:youHaveSuccessfullySubscribedTo',
  );
  const {route, subscribe, user_info} = props;
  const {user} = route?.params;
  const [spinner, setSpinner] = useState(false);
  const [payload, setPayload] = useState({
    userId: user?.id,
    superFanId: user_info?.id,
    recipientEmail: user_info?.email,
    recipientFirstName: user_info?.userName,
    recipientLastName: user_info?.userName,
    otp: '',
    isOrange: true,
    amount: user?.subscriptionPrice,
    recipientNumber: '',
    paymentMethod: 'TouchPay',
  });
  useEffect(() => {}, []);
  const confirmSubscription = async () => {
    console.log('Payload for subscription is ===> ', payload);
    setSpinner(true);
    const res = await subscribe(payload);
    setSpinner(false);
    console.log('Response is ===> ', res?.response?.data);
    if (res?.data?.succeeded) {
      Alert.alert(
        subscriptionText,
        `${youHaveSuccessfullySubscribedTo} ${user?.userName}`,
      );
    }
    if (res?.response?.data?.Message) {
      Alert.alert(subscriptionText, res?.response?.data?.Message);
    }
  };
  return (
    <View style={{...styles.container}}>
      <CustomHeader title={'Subscription Payment'} allowBackBtn />
      <ScrollView
        contentContainerStyle={{flexGrown: 1, paddingBottom: mvs(40)}}>
        <View style={styles.body}>
          <Row alignItems="center">
            <FastImage
              source={{
                // uri: `${URLS.image_url}${user?.profile}`,
                uri: `${STORAGE_URL}${user?.profile}`,
              }}
              style={styles.image}
            />
            <View style={styles.profileView} opacity={0.5}>
              <SemiBold label={user?.userName} size={18} />
              <SemiBold
                label={t('common:about')}
                size={8}
                style={{marginTop: mvs(5)}}
              />
              <Regular
                size={7}
                numberOfLines={3}
                style={{marginTop: mvs(4)}}
                label={user?.about != 'null' ? user?.about : 'Videhope creator'}
              />
            </View>
          </Row>
          <Row alignItems="center" style={{marginTop: mvs(20)}}>
            <TouchableOpacity
              onPress={() =>
                setPayload({...payload, paymentMethod: 'TouchPay'})
              }
              style={
                payload.paymentMethod == 'TouchPay'
                  ? styles.active
                  : styles.inactive
              }>
              <Regular
                label={'Touch Pay'}
                color={
                  payload.paymentMethod == 'TouchPay'
                    ? colors.white
                    : colors.primary
                }
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setPayload({...payload, paymentMethod: 'Wallet'})}
              style={
                payload.paymentMethod == 'TouchPay'
                  ? styles.inactive
                  : styles.active
              }>
              <Regular
                label={'Wallet'}
                color={
                  payload.paymentMethod == 'TouchPay'
                    ? colors.primary
                    : colors.white
                }
              />
            </TouchableOpacity>
          </Row>
          <View style={{marginTop: mvs(20)}}>
            {payload.paymentMethod == 'TouchPay' && (
              <>
                <Regular label={'Account Type'} />
                <Row
                  alignItems="center"
                  style={{
                    justifyContent: 'flex-start',
                    marginTop: mvs(10),
                    marginBottom: mvs(10),
                  }}>
                  <PrimaryRadioButton
                    isSelected={payload.isOrange}
                    label={'ORANGE'}
                    onClick={() => setPayload({...payload, isOrange: true})}
                  />
                  <PrimaryRadioButton
                    isSelected={!payload.isOrange}
                    label={'MTN'}
                    style={{marginLeft: mvs(20)}}
                    onClick={() => setPayload({...payload, isOrange: false})}
                  />
                </Row>
              </>
            )}

            <SeconderyInput
              label={t('common:email')}
              icon={'Email'}
              value={payload.recipientEmail}
              placeholder={t('common:email')}
              onChange={val => setPayload({...payload, recipientEmail: val})}
            />
            <SeconderyInput
              label={t('common:firstName')}
              icon={'User'}
              value={payload.recipientFirstName}
              placeholder={t('common:firstName')}
              onChange={val =>
                setPayload({...payload, recipientFirstName: val})
              }
            />
            <SeconderyInput
              label={t('common:lastName')}
              icon={'User'}
              value={payload.recipientLastName}
              placeholder={t('common:lastName')}
              onChange={val => setPayload({...payload, recipientLastName: val})}
            />
            {payload.paymentMethod == 'TouchPay' && (
              <>
                <SeconderyInput
                  label={t('common:accountNumber')}
                  icon={'Phone'}
                  value={payload.recipientNumber}
                  placeholder={t('common:accountNumber')}
                  onChange={val =>
                    setPayload({...payload, recipientNumber: val})
                  }
                />
                {payload.isOrange && (
                  <SeconderyInput
                    label={t('common:otpCode')}
                    icon={''}
                    value={payload.otp}
                    placeholder={t('common:otpCode')}
                    onChange={val => setPayload({...payload, otp: val})}
                  />
                )}
              </>
            )}
          </View>

          <TouchableOpacity
            style={styles.paymentView}
            onPress={() => confirmSubscription()}>
            <SemiBold
              label={t('common:pay') + ' ' + user?.subscriptionPrice + ' GNF'}
              size={mvs(13)}
              color={colors.white}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Spinner
        visible={spinner}
        textContent={t('common:loading')}
        textStyle={{color: '#FFF'}}
      />
    </View>
  );
};

const mapStateToProps = store => ({
  user_info: store.state.user_info,
});

const mapDispatchToProps = {
  subscribe: payload => APP_API.subscribe(payload),
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SubscriptionPayment);
