import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Alert, ScrollView, View} from 'react-native';
import {connect} from 'react-redux';
import APP_API from '../../store/api-calls';
import Bold from '../../typo-graphy/bold-text';
import {Signin_Styles as styles} from './style';
import {CustomHeader} from '../../components/molecules/header/header-1x';
import {mvs} from '../../services/metrices';
import PrimaryInput from '../../components/input/primary-input';
import PrimaryButton from '../../components/buttons/primary-button';
import Spinner from 'react-native-loading-spinner-overlay';
import Light from '../../typo-graphy/light-text';
import {useTranslation} from 'react-i18next';
const ForgotPassword = props => {
  const {t} = useTranslation();
  const {forgot_password} = props;
  const navigation = useNavigation();
  const [spinner, setSpinner] = useState(false);
  const [payload, setPayload] = React.useState({
    email: '',
  });
  const forgot = async () => {
    setSpinner(true);
    const res = await forgot_password(payload);
    setSpinner(false);
    if (res?.data?.succeeded) {
      console.log('Otp is ', res?.data?.data);
      navigation.navigate('Otp', {email: payload.email, otp: res?.data?.data});
    }
    if (res?.response?.data?.Message) {
      Alert.alert(t('common:newPassword'), res?.response?.data?.Message);
    }
  };

  return (
    <View style={{...styles.container}}>
      <CustomHeader title="" allowBackBtn />
      <Spinner
        visible={spinner}
        cancelable={true}
        textContent={''}
        textStyle={{color: '#FFF'}}
      />
      <ScrollView contentContainerStyle={{flexGrown: 1}}>
        <View style={styles.body}>
          <Bold
            size={42}
            label={t('common:forgotYouPassword')}
            numberOfLines={2}
          />
          <Light
            label={t('common:noWorries')}
            numberOfLines={2}
            style={{marginTop: mvs(11)}}
            size={16}
          />
          <View style={styles.input_container}>
            <PrimaryInput
              icon={'Email'}
              placeholder={t('common:email')}
              onChange={val => setPayload({...payload, email: val})}
            />

            <PrimaryButton
              title={t('common:continue')}
              onClick={() => forgot()}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = store => ({
  user_info: store.state.user_info,
});

const mapDispatchToProps = {
  forgot_password: payload => APP_API.forgot_password(payload),
};
export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
