import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {Styles as styles} from './style';
import {CustomHeader} from '../../../../components/molecules/header/header-1x';
import SettingItem from '../../../../components/setting/setting-item';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions} from '@react-navigation/native';
import PrimaryConfirmation from '../../../../components/modals/primary-confirmation';
import SERVICES from '../../../../services/common-services';
import {useTranslation} from 'react-i18next';
const Setting = props => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  const [show, setShow] = useState(false);
  const isFocused = useIsFocused();
  const [settings, setSettings] = useState([
    {
      id: 1,
      title: 'manageSubscriptions',
      icon: 'Subscription',
      action: 'Subscriptions',
    },
    {
      id: 2,
      title: 'bankInformation',
      icon: 'Bank',
      action: 'BankAccounts',
    },
    {
      id: 3,
      title: 'setSubcriptionPrice',
      icon: 'Payment',
      action: 'SetSubscriptionPrice',
    },
    {
      id: 4,
      title: 'deposit',
      icon: 'Payment',
      action: 'Wallet',
    },
    {
      id: 5,
      title: 'withdrawal',
      icon: 'Earning',
      action: 'Earning',
    },
    {
      id: 7,
      title: 'savedMedia',
      icon: 'Media',
      action: 'Media',
    },
    {
      id: 8,
      title: 'reportAProblem',
      icon: 'Report',
      action: 'ReportProblem',
    },
    {
      id: 10,
      title: 'becomeACreator',
      icon: 'Music',
      action: 'BeACreator',
    },
    {
      id: 6,
      title: 'changeLanguage',
      icon: 'Language',
      action: 'SelectLanguage',
    },
  ]);

  useEffect(() => {}, [isFocused]);

  const moveTo = async action => {
    if (action.length > 0) {
      navigation.navigate(action);
    }
  };
  const SignOut = async () => {
    await AsyncStorage.clear();
    props?.navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{name: 'Signin'}],
      }),
    );
  };
  return (
    <View style={{...styles.container}}>
      <CustomHeader title={SERVICES.translate('settings')} allowBackBtn />
      <ScrollView contentContainerStyle={{flexGrown: 1}}>
        <View style={styles.body}>
          {settings.map((item, index) => (
            <SettingItem
              key={item.id + index + ''}
              onClick={() => moveTo(item.action)}
              title={t('common:' + item.title)}
              icon={item.icon}
            />
          ))}
          <View style={styles.line}></View>
          <SettingItem
            title={SERVICES.translate('terms')}
            onClick={() => navigation.navigate('TermsAndCondition')}
            icon="Policy"
          />
          <SettingItem
            title={SERVICES.translate('policy')}
            onClick={() => navigation.navigate('PrivacyPolicy')}
            icon="Policy"
          />
          <SettingItem
            title={SERVICES.translate('deleteMyAccount')}
            onClick={() => navigation.navigate('DeleteAccount')}
            icon="Delete"
          />
          <SettingItem
            title={SERVICES.translate('logout')}
            onClick={() => {
              setShow(true);
            }}
            icon={'Logout'}
          />
        </View>
      </ScrollView>
      <PrimaryConfirmation
        visible={show}
        subtitle={SERVICES.translate('signOutAlert')}
        title={SERVICES.translate('signOut')}
        onCancel={() => setShow(false)}
        onOk={() => {
          setShow(false);
          SignOut();
        }}
      />
    </View>
  );
};

export default Setting;
