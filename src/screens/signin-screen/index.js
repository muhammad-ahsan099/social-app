import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import APP_API from '../../store/api-calls';
import Bold from '../../typo-graphy/bold-text';
import { Signin_Styles as styles } from './style';
import { CustomHeader } from '../../components/molecules/header/header-1x';
import { TouchableOpacity } from 'react-native';
import { mvs } from '../../services/metrices';
import { Line } from '../../assets/svgs';
import PrimaryInput from '../../components/input/primary-input';
import PrimaryButton from '../../components/buttons/primary-button';
import Regular from '../../typo-graphy/regular-text';
import Row from '../../components/atoms/row';
// import SocialButton from '../../components/buttons/social-button';
import Spinner from 'react-native-loading-spinner-overlay';
import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import AudioModal from '../../components/modals/audio-modal';
//Facebook Sign in
// import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
// import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
// const WEB_CLIENT_ID =
//   '972603446305-5u462s36p56dd866v7i0q3ptc75nobp1.apps.googleusercontent.com';
const Signin = props => {
  const { t } = useTranslation();
  const { signin } = props;
  const navigation = useNavigation();
  const [spinner, setSpinner] = useState(false);
  const [payload, setPayload] = React.useState({
    email: '',
    password: '',
  });
  // useEffect(() => {
  //   configureGoogleSign();
  // }, []);
  // function configureGoogleSign() {
  //   GoogleSignin.configure({
  //     webClientId: WEB_CLIENT_ID,
  //     offlineAccess: false,
  //   });
  // }
  // const googleLogin = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const userInfo = await GoogleSignin.signIn();
  //     console.log('User infpo ===> ', userInfo?.user);
  //   } catch (error) {
  //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //       // when user cancels sign in process,
  //       Alert.alert('Process Cancelled');
  //     } else if (error.code === statusCodes.IN_PROGRESS) {
  //       // when in progress already
  //       Alert.alert('Process in progress');
  //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //       // when play services not available
  //       Alert.alert('Play services are not available');
  //     } else {
  //       // some other error
  //       console.log('Error Details===> ', error);
  //       Alert.alert('Something else went wrong... ', error.toString());
  //     }
  //   }
  // };
  // const onFacebookButtonPress = async () => {
  //   console.log('here...');
  //   // Attempt login with permissions
  //   LoginManager.logOut();
  //   const result = await LoginManager.logInWithPermissions([
  //     'public_profile',
  //     'email',
  //   ]);

  //   if (result.isCancelled) {
  //   }

  //   // Once signed in, get the users AccesToken
  //   const data = await AccessToken.getCurrentAccessToken();
  //   console.log(data);
  //   if (!data) {
  //   }

  //   // Create a Firebase credential with the AccessToken
  //   const facebookCredential = auth.FacebookAuthProvider.credential(
  //     data.accessToken,
  //   );
  //   console.log('facebookCredential:', facebookCredential);

  //   // Sign-in the user with the credential
  //   var response = await auth().signInWithCredential(facebookCredential);
  //   console.log('Sign in response  ==> ', response);
  // };
  const LoginAccount = async () => {
    signin(payload)
      .then(res => {
        console.log('--------------------' + res?.data);
        if (res?.data?.succeeded == true) {
          //Alert.alert("Sign In","Sign In Successfully!")
          setSpinner(false);
          navigation.navigate('BottomTab');
        }
      })
      .catch(err => {
        Alert.alert(t('common:signIn'), t('common:accountNotExistAlert'));
        setSpinner(false);
        console.log('9999999999' + err);
      });
  };

  return (
    <View style={{ ...styles.container }}>
      <CustomHeader title={t('common:signIn')} allowBackBtn />
      <ScrollView contentContainerStyle={{ flexGrown: 1 }}>
        <View style={styles.body}>
          <Bold
            size={38}
            label={t('common:welcomeBack')}
            style={{ alignSelf: 'center' }}
          />
          <View style={styles.input_container}>
            <PrimaryInput
              icon={'Email'}
              placeholder={t('common:email')}
              onChange={val => setPayload({ ...payload, email: val })}
            />

            <PrimaryInput
              secureTextEntry={true}
              icon="Lock"
              placeholder={t('common:password')}
              onChange={val => setPayload({ ...payload, password: val })}
            />

            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPassword')}
              style={{ alignSelf: 'flex-end', marginTop: mvs(14) }}>
              <Regular label={t('common:forgotYouPassword')} size={12} />
            </TouchableOpacity>
            <PrimaryButton
              title={t('common:signIn')}
              onClick={() => {
                setSpinner(true);
                LoginAccount();
              }}
            />
            <Row
              style={{
                justifyContent: 'center',
                marginVertical: mvs(23),
                alignItems: 'center',
              }}>
              <Line />
              <Regular label={' ' + t('common:orContinueWith') + ' '} />
              <Line />
            </Row>
            {/* <SocialButton title={t('common:signInWithApple')} icon="Apple" />
            <SocialButton
              title={t('common:signInWithGoogle')}
              icon="Google"
              onClick={() => googleLogin()}
            />
            <SocialButton
              title={t('common:signInWithFacebook')}
              onClick={() => onFacebookButtonPress()}
              icon="Facebook"
            /> */}
          </View>
        </View>
      </ScrollView>
      <Spinner
        visible={spinner}
        textContent={'Loading...'}
        textStyle={{ color: '#FFF' }}
      />
      <AudioModal visible={false} />
    </View>
  );
};

const mapStateToProps = store => ({
  // home_posts: store.state.home_posts,
});

const mapDispatchToProps = {
  signin: payload => APP_API.signin(payload),
};
export default connect(mapStateToProps, mapDispatchToProps)(Signin);
