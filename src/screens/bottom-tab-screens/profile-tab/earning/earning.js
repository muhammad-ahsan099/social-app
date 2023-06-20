import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ActivityIndicator, Alert, ScrollView, View} from 'react-native';
import {connect} from 'react-redux';
import Row from '../../../../components/atoms/row';
import PrimaryButton from '../../../../components/buttons/primary-button';
import SeconderyInput from '../../../../components/input/secondery-input';
import {CustomHeader} from '../../../../components/molecules/header/header-1x';
import colors from '../../../../services/colors';
import {mvs} from '../../../../services/metrices';
import APP_API from '../../../../store/api-calls';
import Bold from '../../../../typo-graphy/bold-text';
import {Styles as styles} from './style';
import Spinner from 'react-native-loading-spinner-overlay/lib';
const Earning = props => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const [subs, setSubs] = useState([1, 2, 3]);
  const {wallet, get_wallet, withdraw_request, user_info} = props;
  const [loading, setLoading] = useState(true);
  const [spinner, setSpinner] = useState(false);
  const [price, setPrice] = useState(0);
  useEffect(() => {
    getWallet();
  }, []);
  const getWallet = async () => {
    setLoading(true);
    await get_wallet();
    setLoading(false);
  };
  const request = async () => {
    if (price > wallet?.balance) {
      Alert.alert('Withdraw', 'Insuffcient balance in the wallet');
      return;
    }
    setSpinner(true);
    var payLoad = {
      userId: user_info?.id,
      walletId: wallet?.id,
      requestedAmount: price,
    };
    var res = await withdraw_request(payLoad);
    setSpinner(false);
    if (res?.data?.succeeded) {
      navigation.navigate('PaymentSuccessful');
    } else if (res?.data?.succeeded == false) {
      Alert.alert('Withdraw', res?.data?.message);
    } else if (res?.response?.data?.Message) {
      Alert.alert('Withdraw', res?.response?.data?.Message);
    }
  };
  return (
    <View style={{...styles.container}}>
      <CustomHeader title="Withdraw Amount" allowBackBtn />
      <Spinner visible={spinner} textContent={''} textStyle={{color: '#FFF'}} />
      <ScrollView
        contentContainerStyle={{flexGrown: 1, paddingBottom: mvs(40)}}>
        <View style={styles.body}>
          <Row style={styles.earn} alignItems="center">
            <Bold
              label={t('common:wallet')}
              size={mvs(23)}
              color={colors.lightgrey1}
              style={{marginHorizontal: mvs(10)}}
            />
            <View style={styles.balance}>
              {loading ? (
                <ActivityIndicator size={'small'} color={colors.white} />
              ) : (
                <Bold
                  label={wallet?.balance + ' GNF'}
                  size={mvs(16)}
                  color={colors.white}
                />
              )}
            </View>
          </Row>
          <SeconderyInput
            value={price}
            icon=""
            label={'Amount (GNF)'}
            placeholder="Enter amount to withdraw"
            onChange={val => setPrice(val)}
            labelStyle={{marginTop: mvs(30)}}
            style={{marginTop: mvs(10)}}
            keyboardType="numeric"
          />
          <Row style={styles.blnc}></Row>
          <PrimaryButton
            title={t('common:done')}
            style={{marginTop: mvs(40)}}
            onClick={() => request()}
          />
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
  withdraw_request: payload => APP_API.withdraw_request(payload),
  get_wallet: () => APP_API.get_wallet(),
};
export default connect(mapStateToProps, mapDispatchToProps)(Earning);
