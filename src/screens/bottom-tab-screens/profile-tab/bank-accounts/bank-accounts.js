import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ScrollView, View, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import APP_API from '../../../../store/api-calls';
import {Styles as styles} from './style';
import {CustomHeader} from '../../../../components/molecules/header/header-1x';
import PaymentItem from '../../../../components/setting/payment-item';
import PrimaryButton from '../../../../components/buttons/primary-button';
import {colors} from 'react-native-swiper-flatlist/src/themes';
import Regular from '../../../../typo-graphy/regular-text';
const BankAccounts = props => {
  const navigation = useNavigation();
  const {bank_accounts, get_all_bank_accounts} = props;
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getAccounts();
  }, []);
  const getAccounts = async () => {
    setLoading(true);
    await get_all_bank_accounts();
    setLoading(false);
  };
  return (
    <View style={{...styles.container}}>
      <CustomHeader title="Bank Accounts" allowBackBtn />
      {loading ? (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <ActivityIndicator color={colors.white} size={'large'} />
        </View>
      ) : bank_accounts?.length > 0 ? (
        <ScrollView contentContainerStyle={{flexGrown: 1}}>
          <View style={styles.body}>
            {bank_accounts.map((item, index) => (
              <PaymentItem key={item} item={item} />
            ))}
          </View>
        </ScrollView>
      ) : (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <Regular label={'No Bank Accounts Added'} color={colors.white} />
        </View>
      )}
      <PrimaryButton
        title="Add New Account"
        style={styles.button}
        onClick={() => navigation.navigate('BankInformation')}
      />
    </View>
  );
};

const mapStateToProps = store => ({
  user_info: store.state.user_info,
  bank_accounts: store.state.bank_accounts,
});

const mapDispatchToProps = {
  get_all_bank_accounts: () => APP_API.get_all_bank_accounts(),
};
export default connect(mapStateToProps, mapDispatchToProps)(BankAccounts);
