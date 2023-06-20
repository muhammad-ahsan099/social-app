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
import {CustomHeader} from '../../components/molecules/header/header-1x';
import {mvs} from '../../services/metrices';
import {SuperFan} from '../../assets/svgs';
import SERVICES from '../../services/common-services';
const ChangePassword = props => {
  const {new_password, user_info} = props;
  const navigation = useNavigation();
  const [spinner, setSpinner] = React.useState(false);
  const [payload, setPayload] = React.useState({
    newPassword: '',
    OldPassword: '',
    email: user_info?.email,
    confirmPassword: '',
  });
  const setNewPassword = async () => {
    setSpinner(true);
    const res = await new_password(payload);
    setSpinner(false);
    if (res?.data?.succeeded) {
      navigation.navigate('Perfect', {changePassword: true});
    }
    if (res?.response?.data?.Message) {
      Alert.alert(
        SERVICES.translate('changePassword'),
        res?.response?.data?.Message,
      );
    }
  };

  return (
    <View style={{...styles.container}}>
      <CustomHeader
        title={SERVICES.translate('newPassword')}
        allowBackBtn
        style={{marginTop: mvs(0)}}
      />
      <ScrollView contentContainerStyle={{flexGrown: 1}}>
        <Spinner
          visible={spinner}
          textContent={''}
          textStyle={{color: '#FFF'}}
        />
        <View style={styles.body}>
          <SuperFan
            style={{alignSelf: 'center'}}
            width={mvs(100)}
            height={mvs(100)}
          />
          <Bold
            size={mvs(16)}
            label={SERVICES.translate('newPassword')}
            numberOfLines={2}
            style={{
              alignSelf: 'center',
              marginTop: mvs(10),
              marginRight: mvs(15),
            }}
          />
          <View style={styles.input_container}>
            <PrimaryInput
              secureTextEntry={true}
              icon="Lock"
              placeholder={SERVICES.translate('oldPassword')}
              onChange={val => setPayload({...payload, OldPassword: val})}
            />
            <PrimaryInput
              secureTextEntry={true}
              icon="Lock"
              placeholder={SERVICES.translate('newPassword')}
              onChange={val => setPayload({...payload, newPassword: val})}
            />
            <PrimaryInput
              secureTextEntry={true}
              icon="Lock"
              placeholder={SERVICES.translate('confirmPassword')}
              onChange={val => setPayload({...payload, confirmPassword: val})}
            />

            <PrimaryButton
              title={SERVICES.translate('updatePassword')}
              onClick={() => setNewPassword()}
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
  new_password: payload => APP_API.change_password(payload),
};
export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
