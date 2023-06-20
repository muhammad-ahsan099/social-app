import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Alert, ScrollView, View} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import {connect} from 'react-redux';
import PrimaryButton from '../../../../components/buttons/primary-button';
import SeconderyInput from '../../../../components/input/secondery-input';
import PrimaryDropdown from '../../../../components/modals/primary-dropdown';
import {CustomHeader} from '../../../../components/molecules/header/header-1x';
import colors from '../../../../services/colors';
import {mvs} from '../../../../services/metrices';
import APP_API from '../../../../store/api-calls';
import Regular from '../../../../typo-graphy/regular-text';
import {Styles as styles} from './style';
const BankInformation = props => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const {add_bank_account, user_info, get_banks, banks, get_all_bank_accounts} =
    props;
  const [show, setShow] = React.useState(false);
  const [spinner, setSpinner] = React.useState(false);
  const [bankName, setBankName] = useState('');
  const [bankId, setBankId] = useState(0);
  const [payload, setPayload] = useState({
    userId: user_info?.id,
    ibanNumber: '',
    accountNumber: '',
    accountHolder: '',
    bankId: 0,
    bankName: '',
  });
  useEffect(() => {
    get_banks();
  }, []);
  const saveAccount = async () => {
    console.log('Payload is ====> ', payload);
    var data = payload;
    // data.bankName = bankName;
    // data.bankId = bankId;
    if (data.accountHolder?.length < 1) {
      Alert.alert('Bank Account', 'Enter name on account');
      return;
    }
    if (data.bankName?.length < 1) {
      Alert.alert('Bank Account', 'Select the bank');
      return;
    }
    if (data.accountNumber?.length < 1) {
      Alert.alert('Bank Account', 'Enter your bank account number');
      return;
    }
    if (data.ibanNumber?.length < 1) {
      Alert.alert('Bank Account', 'Enter your bank account IBAN number');
      return;
    }
    setSpinner(true);
    var res = await add_bank_account(data);
    setSpinner(false);
    if (res?.data?.succeeded) {
      Alert.alert('Bank Account', res?.data?.message);
      get_all_bank_accounts();
    } else if (res?.response?.data?.Message) {
      Alert.alert('Bank Account', res?.response?.data?.Message);
    } else if (res?.data?.succeeded == false) {
      Alert.alert('Bank Account', res?.data?.message);
    }
  };
  return (
    <View style={{...styles.container}}>
      <CustomHeader title={t('common:bankInformation')} allowBackBtn />
      <Spinner
        visible={spinner}
        textContent={t(`common:uploading`)}
        textStyle={{color: '#FFF'}}
      />
      <ScrollView
        contentContainerStyle={{flexGrown: 1, paddingBottom: mvs(40)}}>
        <View style={{...styles.body}}>
          <Regular
            label={t('common:enterBankInformation')}
            size={mvs(15)}
            style={{
              alignSelf: 'center',
              textAlign: 'center',
              marginHorizontal: mvs(30),
            }}
            numberOfLines={2}
            color={colors.white}
          />
          <View style={styles.input_container}>
            <SeconderyInput
              label={t('common:nameOnAccount')}
              icon={'User'}
              value={payload.accountHolder}
              style={{marginTop: mvs(15)}}
              onChange={val => setPayload({...payload, accountHolder: val})}
              placeholder={t('common:nameOnAccount')}
            />
            <SeconderyInput
              label={t('common:bankName')}
              icon={''}
              value={payload.bankName}
              style={{marginTop: mvs(15)}}
              onChange={val => setPayload({...payload, bankName: val})}
              placeholder={t('common:bankName')}
            />
            <SeconderyInput
              label={t('common:accountNumber')}
              icon={''}
              value={payload.accountNumber}
              style={{marginTop: mvs(15)}}
              onChange={val => setPayload({...payload, accountNumber: val})}
              placeholder={t('common:accountNumber')}
            />
            <SeconderyInput
              label={t('common:iban')}
              icon={''}
              value={payload.ibanNumber}
              style={{marginTop: mvs(15)}}
              onChange={val => setPayload({...payload, ibanNumber: val})}
              placeholder={t('common:iban')}
            />
            <PrimaryButton
              title={t('common:saveChanges')}
              style={{marginTop: mvs(40)}}
              onClick={() => saveAccount()}
            />
          </View>
        </View>
      </ScrollView>
      <PrimaryDropdown
        title={'Select Your Bank'}
        visible={show}
        items={banks}
        onBackdropPress={() => setShow(false)}
        setValue={item => {
          setShow(false);
          setBankName(item?.title);
          setBankId(item?.id);
        }}
      />
    </View>
  );
};

const mapStateToProps = store => ({
  user_info: store.state.user_info,
  banks: store.state.banks,
});

const mapDispatchToProps = {
  add_bank_account: payload => APP_API.add_bank_account(payload),
  get_banks: () => APP_API.get_all_banks(),
  get_all_bank_accounts: () => APP_API.get_all_bank_accounts(),
};
export default connect(mapStateToProps, mapDispatchToProps)(BankInformation);
