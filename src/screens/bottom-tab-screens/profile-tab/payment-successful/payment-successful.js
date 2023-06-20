import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import {Successful} from '../../../../assets/svgs';
import PrimaryButton from '../../../../components/buttons/primary-button';
import {CustomHeader} from '../../../../components/molecules/header/header-1x';
import SERVICES from '../../../../services/common-services';
import {mvs} from '../../../../services/metrices';
import APP_API from '../../../../store/api-calls';
import Bold from '../../../../typo-graphy/bold-text';
import Medium from '../../../../typo-graphy/medium-text';
import {Styles as styles} from './style';
import {useTranslation} from 'react-i18next';
const PaymentSuccessful = props => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  return (
    <View style={{...styles.container}}>
      <CustomHeader title="" allowBackBtn />
      <ScrollView contentContainerStyle={{flexGrown: 1}}>
        <View style={styles.body}>
          <Bold
            label={t('common:payment')}
            size={mvs(23)}
            style={{alignSelf: 'center'}}
          />
          <Medium
            label={t('common:successfullyWithdraw')}
            size={21}
            style={{alignSelf: 'center', marginTop: mvs(60)}}
          />
          <Successful style={{alignSelf: 'center', marginTop: mvs(30)}} />
          <PrimaryButton
            title={t('common:backToHome')}
            style={styles.button}
            onClick={() => navigation.navigate('BottomTab')}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = store => ({
  user_info: store.state.user_info,
});

const mapDispatchToProps = {
  signin: payload => APP_API.signin(payload),
};
export default PaymentSuccessful;
