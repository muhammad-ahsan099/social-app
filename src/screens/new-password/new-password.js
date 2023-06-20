import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Alert, ScrollView, View} from 'react-native';
import {connect} from 'react-redux';
import APP_API from '../../store/api-calls';
import Bold from '../../typo-graphy/bold-text';
import {Signin_Styles as styles} from './style';
import PrimaryInput from '../../components/input/primary-input';
import PrimaryButton from '../../components/buttons/primary-button';
import Spinner from 'react-native-loading-spinner-overlay';
import {useTranslation} from 'react-i18next';
const NewPassword = props => {
  const {t} = useTranslation();
  const {new_password, route} = props;
  const {email} = route?.params;
  const navigation = useNavigation();
  const [spinner, setSpinner] = React.useState(false);
  const [payload, setPayload] = React.useState({
    password: '',
    email: email,
    confirmPassword: '',
  });
  const setNewPassword = async () => {
    setSpinner(true);
    const res = await new_password(payload);
    setSpinner(false);
    if (res?.data?.succeeded) {
      navigation.navigate('Perfect', {changePassword: false});
    }
    if (res?.response?.data?.Message) {
      Alert.alert(t('common:newPassword'), res?.response?.data?.Message);
    }
  };

  return (
    <View style={{...styles.container}}>
      <ScrollView contentContainerStyle={{flexGrown: 1}}>
        <Spinner
          visible={spinner}
          textContent={''}
          textStyle={{color: '#FFF'}}
        />
        <View style={styles.body}>
          <Bold size={42} label={t('common:newPassword')} numberOfLines={2} />
          <View style={styles.input_container}>
            <PrimaryInput
              secureTextEntry={true}
              icon="Lock"
              placeholder={t('common:password')}
              onChange={val => setPayload({...payload, password: val})}
            />
            <PrimaryInput
              secureTextEntry={true}
              icon="Lock"
              placeholder={t('common:confirmPassword')}
              onChange={val => setPayload({...payload, confirmPassword: val})}
            />

            <PrimaryButton
              title={t('common:updatePassword')}
              onClick={() => setNewPassword()}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = store => ({});

const mapDispatchToProps = {
  new_password: payload => APP_API.reset_password(payload),
};
export default connect(mapStateToProps, mapDispatchToProps)(NewPassword);
