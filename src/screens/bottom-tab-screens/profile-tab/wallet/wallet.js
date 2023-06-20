import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ScrollView, View, ActivityIndicator, Alert} from 'react-native';
import {connect} from 'react-redux';
import Row from '../../../../components/atoms/row';
import PrimaryButton from '../../../../components/buttons/primary-button';
import PrimaryInput from '../../../../components/input/primary-input';
import {CustomHeader} from '../../../../components/molecules/header/header-1x';
import colors from '../../../../services/colors';
import {mvs} from '../../../../services/metrices';
import APP_API from '../../../../store/api-calls';
import Bold from '../../../../typo-graphy/bold-text';
import Medium from '../../../../typo-graphy/medium-text';
import SemiBold from '../../../../typo-graphy/semibold-text';
import {Styles as styles} from './style';
const Wallet = props => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  const {wallet, get_wallet} = props;
  const [loading, setLoading] = useState(true);
  const [price, setPrice] = useState(0);
  useEffect(() => {
    getWallet();
  }, []);
  const getWallet = async () => {
    setLoading(true);
    await get_wallet();
    setLoading(false);
  };
  function deposit() {
    if (price < 1) {
      Alert.alert(t('common:amount'), t('common:amountAlert'));
      return;
    }
    navigation.navigate('PayNow', {amount: price});
  }
  return (
    <View style={{...styles.container}}>
      <CustomHeader title="" allowBackBtn />
      <ScrollView contentContainerStyle={{flexGrown: 1, flex: 1}}>
        <View style={styles.body}>
          <Row style={styles.wallet} alignItems="center">
            <Bold
              label={t('common:wallet')}
              size={mvs(20)}
              color={colors.lightgrey1}
            />
            <View style={styles.blnc} alignItems="center">
              {loading ? (
                <ActivityIndicator />
              ) : (
                <>
                  <SemiBold
                    label={t('common:currentBalance')}
                    size={mvs(12)}
                    color={colors.white}
                  />
                  <SemiBold
                    label={wallet?.balance + ' GNF'}
                    size={mvs(21)}
                    color={colors.white}
                    style={{marginTop: mvs(7)}}
                  />
                </>
              )}
            </View>
          </Row>
          <SemiBold
            label={t('common:makeDeposit')}
            size={mvs(18)}
            style={{marginTop: mvs(49)}}
          />
          <Medium
            label={t('common:enterAmountNotLessThen1')}
            size={mvs(13)}
            style={{marginTop: mvs(7)}}
          />
          <PrimaryInput
            placeholder="1000GNF"
            icon=""
            inputType="numeric"
            onChange={val => setPrice(val)}
            style={{backgroundColor: colors.white}}
          />
          <PrimaryButton
            title={t('common:makeDeposit')}
            style={styles.button}
            onClick={() => deposit()}
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
  get_wallet: () => APP_API.get_wallet(),
};
export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
