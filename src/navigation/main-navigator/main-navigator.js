// In App.js in a new project
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { StatusBar, View } from 'react-native';
import Splash from '../../screens/splash-screen';
import SigninScreen from '../../screens/signin-screen';
import SignUp from '../../screens/sign-up-screen/sign-up';
import colors from './../../services/colors';
import ForgotPassword from '../../screens/forgot-password/forgot-password';
import Perfect from '../../screens/perfect-screen/perfect';
import NewPassword from '../../screens/new-password/new-password';
import TabNavigator from '../tab-navigator/tab-navigator';
import InterestScreen from '../../screens/interest-screen/interest-screen';
import PaymentSuccessful from '../../screens/bottom-tab-screens/profile-tab/payment-successful/payment-successful';
import Hold from '../../screens/hold-screen/hold';
import Setting from '../../screens/bottom-tab-screens/profile-tab/setting-screen/setting';
import TermsAndCondition from '../../screens/bottom-tab-screens/profile-tab/terms-and-conditions/terms-and-condition';
import PrivacyPolicy from '../../screens/bottom-tab-screens/profile-tab/privacy-policy-screen/privacy-policy';
import ReportProblem from '../../screens/bottom-tab-screens/profile-tab/report-problem/report-problem';
import Subscriptions from '../../screens/bottom-tab-screens/profile-tab/subscription/subscriptions';
import BankInformation from '../../screens/bottom-tab-screens/profile-tab/bank-information/bank-information';
import MyInbox from '../../screens/inbox-screen/inbox';
import Onboarding from './../../screens/onboarding-screen/index';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Conversation from '../../screens/conversation-screen/conversation';
import discoverTab from '../../screens/bottom-tab-screens/discover/discover-tab';
import BankAccounts from '../../screens/bottom-tab-screens/profile-tab/bank-accounts/bank-accounts';
import NewPayment from '../../screens/bottom-tab-screens/profile-tab/new-payment/new-payment';
import UserProfile from '../../screens/bottom-tab-screens/profile-tab/profile-tab';
import EditProfile from '../../screens/bottom-tab-screens/profile-tab/edit-profile/edit-profile';
import Media from '../../screens/bottom-tab-screens/profile-tab/media/media';
import liveStream from '../../screens/live-stream';
import BeACreator from '../../screens/bottom-tab-screens/profile-tab/Be-a-creator/be-a-creator';
import UploadContent from '../../screens/upload-content/upload-content';
import InviteFriend from '../../screens/invite-friend/invite-friend';
import ReportContent from '../../screens/report-content/report-content';
import DeleteAccount from '../../screens/delete-account/delete-account';
import Earning from '../../screens/bottom-tab-screens/profile-tab/earning/earning';
import Wallet from '../../screens/bottom-tab-screens/profile-tab/wallet/wallet';
import PayNow from '../../screens/bottom-tab-screens/profile-tab/pay-now/pay-now';
import UserVideos from '../../screens/user-videos/user-videos';
import Subscribe from '../../screens/bottom-tab-screens/profile-tab/subscribe/subscribe';
import Otp from '../../screens/otp-screen/otp';
import ChangePassword from '../../screens/change-password/change-password';
import OtherUserProfile from '../../screens/user-profile/user-profile';
import SetSubscriptionPrice from '../../screens/bottom-tab-screens/profile-tab/set-subscription-price/set-subscription-price';
import SelectLanguage from '../../screens/bottom-tab-screens/profile-tab/select-language/select-language';
import SubscriptionPayment from '../../screens/bottom-tab-screens/profile-tab/subscription-payment/subscription-payment';
// -----------Live streaming---------------
import HomePage from '../../screens/live-streaming/HomePage';
import HostPage from '../../screens/live-streaming/HostPage';
import AudiencePage from '../../screens/live-streaming/AudiancePage';

const Stack = createStackNavigator();
const horizontalAnimation = {
  headerShown: false,
  gestureDirection: 'horizontal',
  cardStyleInterpolator: ({ current, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
};
export const MainNavigator = () => {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ flex: 1, marginTop: insets.top }}>
      <StatusBar
        transluent
        backgroundColor={colors.black}
        barStyle={'dark-content'}
      />
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={horizontalAnimation}>
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Signin" component={SigninScreen} />
        <Stack.Screen name="Signup" component={SignUp} />
        <Stack.Screen name="InterestScreen" component={InterestScreen} />
        <Stack.Screen name="Subscribe" component={Subscribe} />
        <Stack.Screen name="BottomTab" component={TabNavigator} />
        <Stack.Screen name="Perfect" component={Perfect} />
        <Stack.Screen name="Hold" component={Hold} />
        <Stack.Screen name="Media" component={Media} />
        <Stack.Screen name="MyInbox" component={MyInbox} />
        <Stack.Screen name="Otp" component={Otp} />
        <Stack.Screen
          name="UserProfile"
          component={UserProfile}
          initialParams={{ isMe: false, id: 0 }}
        />
        <Stack.Screen
          name="OtherUserProfile"
          component={OtherUserProfile}
          initialParams={{ isMe: false, id: 0 }}
        />
        <Stack.Screen name="Conversation" component={Conversation} />
        <Stack.Screen name="Setting" component={Setting} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="BankAccounts" component={BankAccounts} />
        <Stack.Screen name="BeACreator" component={BeACreator} />
        <Stack.Screen name="DiscoverTab" component={discoverTab} />
        <Stack.Screen name="NewPayment" component={NewPayment} />
        <Stack.Screen name="TermsAndCondition" component={TermsAndCondition} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
        <Stack.Screen name="NewPassword" component={NewPassword} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="UploadContent" component={UploadContent} />
        <Stack.Screen name="ReportProblem" component={ReportProblem} />
        <Stack.Screen name="Subscriptions" component={Subscriptions} />
        <Stack.Screen name="BankInformation" component={BankInformation} />
        <Stack.Screen name="LiveStream" component={liveStream} />
        <Stack.Screen name="InviteFriend" component={InviteFriend} />
        <Stack.Screen
          name="ReportContent"
          component={ReportContent}
          initialParams={{ isMe: false, id: 0 }}
        />
        <Stack.Screen name="UserVideos" component={UserVideos} />
        <Stack.Screen name="DeleteAccount" component={DeleteAccount} />
        <Stack.Screen name="Earning" component={Earning} />
        <Stack.Screen name="Wallet" component={Wallet} />
        <Stack.Screen name="PayNow" component={PayNow} />
        <Stack.Screen name="PaymentSuccessful" component={PaymentSuccessful} />
        <Stack.Screen name="HostPage" component={HostPage} />
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="AudiencePage" component={AudiencePage} />
        <Stack.Screen
          name="SetSubscriptionPrice"
          component={SetSubscriptionPrice}
        />
        <Stack.Screen name="SelectLanguage" component={SelectLanguage} />
        <Stack.Screen
          name="SubscriptionPayment"
          component={SubscriptionPayment}
        />
      </Stack.Navigator>
    </View>
  );
};
