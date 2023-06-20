import React, {useEffect, useState} from 'react';
import {Alert, ScrollView, View} from 'react-native';
import {connect} from 'react-redux';
import APP_API from '../../../../store/api-calls';
import {Styles as styles} from './style';
import {CustomHeader} from '../../../../components/molecules/header/header-1x';
import SubscriptionItem from '../../../../components/setting/subscription';
import Spinner from 'react-native-loading-spinner-overlay';
import CustomAlertModal from '../../../../components/modals/custom-alert';
import SERVICES from '../../../../services/common-services';
const Subscriptions = props => {
  const {
    subscriptions,
    get_subscriptions,
    renew_subscription,
    unsubscribe,
    user_info,
  } = props;
  const renewSubscriptionAlert = SERVICES.translate(
    'renewSubscriptionSuccessfully',
  );
  const unsubscribedSuccessfully = SERVICES.translate(
    'unsubscribedSuccessfully',
  );
  const subscription = SERVICES.translate('Subscription');
  const [refresh, setRefresh] = useState(false);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');
  const [spinner, setSpinner] = useState(false);
  useEffect(() => {
    getData();
  }, [refresh]);
  const getData = async () => {
    await get_subscriptions();
  };
  const renewSubscription = async id => {
    setSpinner(true);
    const res = await renew_subscription(id);
    setSpinner(false);
    if (res?.data?.succeeded) {
      showAlert(renewSubscriptionAlert);
    }
    if (res?.response?.data?.Message) {
      Alert.alert(subscription, res?.response?.data?.Message);
    }
  };
  const onUnSubscribe = async userId => {
    var payload = {
      userId: userId,
      superFanId: user_info?.id,
    };
    setSpinner(true);
    const res = await unsubscribe(payload);
    setSpinner(false);
    if (res?.data?.succeeded) {
      showAlert(unsubscribedSuccessfully);
    }
    if (res?.response?.data?.Message) {
      Alert.alert(subscription, res?.response?.data?.Message);
    }
  };
  function refreshScreen() {
    setShow(false);
    setRefresh(!refresh);
  }
  function showAlert(msg) {
    setMessage(msg);
    setShow(true);
    setRefresh(!refresh);
  }
  return (
    <View style={{...styles.container}}>
      <CustomHeader
        title={SERVICES.translate('manageSubscription')}
        allowBackBtn
      />
      <Spinner visible={spinner} textContent={''} textStyle={{color: '#FFF'}} />
      <ScrollView contentContainerStyle={{flexGrown: 1, flex: 1}}>
        <View style={styles.body}>
          {subscriptions.map((item, index) => (
            <SubscriptionItem
              key={index}
              item={item}
              onUnSubscribe={() => onUnSubscribe(item?.userId)}
              onRenew={() => renewSubscription(item?.subscription?.id)}
            />
          ))}
        </View>
      </ScrollView>
      <CustomAlertModal
        visible={show}
        title={message}
        onOk={() => refreshScreen()}
      />
    </View>
  );
};

const mapStateToProps = store => ({
  user_info: store.state.user_info,
  subscriptions: store.state.subscriptions,
});

const mapDispatchToProps = {
  get_subscriptions: payload => APP_API.get_subscriptions(payload),
  renew_subscription: id => APP_API.renew_subscription(id),
  unsubscribe: payload => APP_API.unsubscribe(payload),
};
export default connect(mapStateToProps, mapDispatchToProps)(Subscriptions);
