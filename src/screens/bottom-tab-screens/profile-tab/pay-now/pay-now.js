import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Alert, ScrollView, TouchableOpacity, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import {connect} from 'react-redux';
import Row from '../../../../components/atoms/row';
import PrimaryRadioButton from '../../../../components/buttons/primary-radio';
import SeconderyInput from '../../../../components/input/secondery-input';
import {CustomHeader} from '../../../../components/molecules/header/header-1x';
import colors from '../../../../services/colors';
import {mvs} from '../../../../services/metrices';
import APP_API from '../../../../store/api-calls';
import Regular from '../../../../typo-graphy/regular-text';
import SemiBold from '../../../../typo-graphy/semibold-text';
import {Styles as styles} from './style';
const PayNow = props => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const {wallet, user_info, deposit, route} = props;
  const {amount} = route?.params;
  const [payload, setPayload] = useState({
    userId: user_info?.id,
    recipientEmail: user_info?.email,
    recipientFirstName: user_info?.userName,
    recipientLastName: user_info?.userName,
    otp: '',
    isOrange: true,
    amount: amount,
    recipientNumber: '',
    walletId: wallet?.id,
  });
  const request = async () => {
    if (payload.recipientNumber.length < 1) {
      Alert.alert(t('common:depositAlert'), t('common:depositAccountAlert'));
      return;
    }
    if (payload.isOrange && payload.otp.length < 1) {
      Alert.alert(t('common:depositAlert'), t('common:depositOtpAlert'));
      return;
    }
    setLoading(true);
    var res = await deposit(payload);
    setLoading(false);
    if (res?.data?.succeeded) {
      Alert.alert('Deposit', res?.data?.message);
    } else if (res?.data?.succeeded == false) {
      Alert.alert('Deposit', res?.data?.message);
    } else if (res?.response?.data?.Message) {
      Alert.alert('Deposit', res?.response?.data?.Message);
    }
  };
  return (
    <View style={{...styles.container}}>
      <CustomHeader title="Deposit Amount" allowBackBtn />
      <Spinner
        visible={loading}
        textContent={t('common:loading')}
        textStyle={{color: '#FFF'}}
      />
      <ScrollView
        contentContainerStyle={{flexGrown: 1, paddingBottom: mvs(50)}}>
        <View style={styles.body}>
          <View style={{marginTop: mvs(20)}}>
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
              {/* <PrimaryRadioButton
                isSelected={!payload.isOrange}
                label={'MTN'}
                style={{marginLeft: mvs(20)}}
                onClick={() => setPayload({...payload, isOrange: false})}
              /> */}
            </Row>

            <SeconderyInput
              label={t('common:email')}
              icon={'Email'}
              value={payload.recipientEmail}
              placeholder={t('common:email')}
              style={{marginTop: mvs(15)}}
              onChange={val => setPayload({...payload, recipientEmail: val})}
            />
            <SeconderyInput
              label={t('common:firstName')}
              icon={'User'}
              style={{marginTop: mvs(15)}}
              value={payload.recipientFirstName}
              placeholder={t('common:firstName')}
              onChange={val =>
                setPayload({...payload, recipientFirstName: val})
              }
            />
            <SeconderyInput
              label={t('common:lastName')}
              icon={'User'}
              style={{marginTop: mvs(15)}}
              value={payload.recipientLastName}
              placeholder={t('common:lastName')}
              onChange={val => setPayload({...payload, recipientLastName: val})}
            />

            <SeconderyInput
              label={t('common:accountNumber')}
              icon={'Phone'}
              style={{marginTop: mvs(15)}}
              value={payload.recipientNumber}
              placeholder={t('common:accountNumber')}
              onChange={val => setPayload({...payload, recipientNumber: val})}
            />
            {payload.isOrange && (
              <SeconderyInput
                label={t('common:otpCode')}
                icon={''}
                value={payload.otp}
                style={{marginTop: mvs(15)}}
                placeholder={t('common:otpCode')}
                onChange={val => setPayload({...payload, otp: val})}
              />
            )}
          </View>

          <TouchableOpacity
            style={styles.paymentView}
            onPress={() => request()}>
            <SemiBold
              label={t('common:pay') + ' ' + amount + ' GNF'}
              size={mvs(13)}
              color={colors.white}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = store => ({
  user_info: store.state.user_info,
  wallet: store.state.wallet,
});

const mapDispatchToProps = {
  deposit: payload => APP_API.deposit(payload),
};
export default connect(mapStateToProps, mapDispatchToProps)(PayNow);
