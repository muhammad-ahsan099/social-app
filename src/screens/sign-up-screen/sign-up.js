import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { Image, Pressable, ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import APP_API from '../../store/api-calls';
import { Signin_Styles as styles } from './style';
import colors from '../../services/colors';
import { CustomHeader } from '../../components/molecules/header/header-1x';
import { TouchableOpacity } from 'react-native';
import { mvs } from '../../services/metrices';
import Spinner from 'react-native-loading-spinner-overlay';
import { Camera, Email, Line } from '../../assets/svgs';
import SemiBold from '../../typo-graphy/semibold-text';
import PrimaryInput from '../../components/input/primary-input';
import PrimaryButton from '../../components/buttons/primary-button';
import Regular from '../../typo-graphy/regular-text';
import Row from '../../components/atoms/row';
import SocialButton from '../../components/buttons/social-button';
import SERVICES from '../../services/common-services';
import { Alert } from 'react-native';
import CheckBox from 'react-native-check-box';
import { useTranslation } from 'react-i18next';
const SignUp = props => {
  const { t } = useTranslation();
  const { register } = props;
  const navigation = useNavigation();
  const [spinner, setSpinner] = useState(false);
  const [checked, setChecked] = useState(false);
  const [payload, setPayload] = React.useState({
    Email: '',
    Password: '',
    UserName: '',
    FullName: '',
    ProfilePicture: null,
  });
  const [confrim_password, setConfirm_Password] = useState('');
  const selectPic = async () => {
    const image = await SERVICES._returnImageGallery();
    console.log(image);
    if (image != undefined) {
      setPayload({ ...payload, ProfilePicture: image });
    }
  };
  const RegisterAccount = async () => {
    if (!checked) {
      Alert.alert(t('common:signUp'), t('common:ageAlert'));
      return;
    }
    // if (!payload.ProfilePicture?.uri) {
    //   Alert.alert(t('common:signUp'), t('common:ProfilePictureAlert'));
    //   return;
    // }
    if (payload.Email.length < 1) {
      Alert.alert(t('common:signUp'), t('common:emailAlert'));
      return;
    }
    if (payload.Password.length < 1) {
      Alert.alert(t('common:signUp'), t('common:passwordAlert'));
      return;
    }
    if (payload.Password != confrim_password) {
      Alert.alert(t('common:signUp'), t('common:confirmPasswordAlert'));
      return;
    }
    if (payload.UserName.length < 1) {
      Alert.alert(t('common:signUp'), t('common:usernameAlert'));
      return;
    }

    setSpinner(true);
    register(payload)
      .then(res => {
        setSpinner(false);
        if (res?.data?.succeeded == true) {
          Alert.alert(
            t('common:signUp'),
            t('common:accountCreateSuccessMessage'),
          );
          navigation.navigate('Signin');
        }
      })
      .catch(err => {
        console.log(err);
        setSpinner(false);
      });
    //navigation.navigate("InterestScreen")
  };

  return (
    <View style={{ ...styles.container }}>
      <CustomHeader title={t('common:createAnAccount')} allowBackBtn />
      <ScrollView contentContainerStyle={{ flexGrown: 1 }}>
        <View style={styles.body}>
          <TouchableOpacity
            style={styles.cameraButton}
            onPress={() => selectPic()}>
            {payload?.ProfilePicture?.uri ? (
              <Image
                source={{ uri: payload?.ProfilePicture?.uri }}
                style={{ width: '100%', height: '100%', borderRadius: 1000 }}
              />
            ) : (
              <Camera />
            )}
          </TouchableOpacity>
          <SemiBold
            label={t('common:uploadPicture')}
            color={colors.white}
            size={14}
            style={{ alignSelf: 'center', marginTop: mvs(10) }}
          />
          <View style={styles.input_container}>
            <PrimaryInput
              placeholder={t('common:username')}
              icon={'User'}
              onChange={val => setPayload({ ...payload, UserName: val })}
            />

            <PrimaryInput
              placeholder={t('common:fullName')}
              icon={'User'}
              onChange={val => setPayload({ ...payload, FullName: val })}
            />

            <PrimaryInput
              icon={'Email'}
              placeholder={t('common:email')}
              onChange={val => setPayload({ ...payload, Email: val })}
            />

            <PrimaryInput
              secureTextEntry={true}
              icon="Lock"
              placeholder={t('common:password')}
              onChange={val => setPayload({ ...payload, Password: val })}
            />

            <PrimaryInput
              secureTextEntry={true}
              icon="Lock"
              placeholder={t('common:confirmPassword')}
              onChange={val => setConfirm_Password(val)}
            />
            <CheckBox
              style={{ flex: 1, padding: 10, marginTop: mvs(10) }}
              onClick={() => setChecked(!checked)}
              isChecked={checked}
              checkBoxColor={colors.lightBlue}
              rightText={t('common:areYou18Plus')}
              rightTextStyle={{ color: colors.lightgrey1 }}
            />
            <Regular
              numberOfLines={3}
              size={14}
              style={{
                textAlign: 'center',
                marginTop: mvs(32),
                lineHeight: mvs(20),
              }}
              label={t('common:agreeTo') + ' '}>
              <SemiBold
                label={t('common:terms')}
                onPress={() => navigation.navigate('TermsAndCondition')}
                style={{ textDecorationLine: 'underline' }}
              />
              <Regular label={' ' + t('common:and') + ' '} />
              <SemiBold
                label={' ' + t('common:policy')}
                onPress={() => navigation.navigate('PrivacyPolicy')}
                style={{ textDecorationLine: 'underline' }}
                numberOfLines={2}
              />
            </Regular>
            <PrimaryButton
              title={t('common:createAccount')}
              onClick={() => RegisterAccount()}
            />
            {/* <Row
              style={{
                justifyContent: 'center',
                marginTop: mvs(23),
                alignItems: 'center',
              }}> */}
            {/* <Line />
              <Regular label={' ' + t('common:orContinueWith') + ' '} />
              <Line /> */}
            {/* </Row> */}
            {/* <SocialButton title={t('common:signInWithApple')} icon="Apple" />
            <SocialButton title={t('common:signInWithGoogle')} icon="Google" />
            <SocialButton
              title={t('common:signInWithFacebook')}
              icon="Facebook"
            /> */}
          </View>
        </View>
        <Spinner
          visible={spinner}
          textContent={''}
          textStyle={{ color: '#FFF' }}
        />
      </ScrollView>
    </View>
  );
};

const mapStateToProps = store => ({
  // home_posts: store.state.home_posts,
});

const mapDispatchToProps = {
  register: payload => APP_API.register(payload),
};
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
