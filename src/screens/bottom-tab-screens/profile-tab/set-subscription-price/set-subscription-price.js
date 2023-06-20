import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Alert, ScrollView, View} from 'react-native';
import {connect} from 'react-redux';
import APP_API from '../../../../store/api-calls';
import {Styles as styles} from './style';
import {CustomHeader} from '../../../../components/molecules/header/header-1x';
import {mvs} from '../../../../services/metrices';
import PrimaryButton from '../../../../components/buttons/primary-button';
import PrimaryInput from '../../../../components/input/primary-input';
import Spinner from 'react-native-loading-spinner-overlay';
import CustomAlertModal from '../../../../components/modals/custom-alert';
import SERVICES from '../../../../services/common-services';
import Regular from '../../../../typo-graphy/regular-text';
import {useTranslation} from 'react-i18next';
const SubscriptionPrice = props => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  const {update_subscription_price, user_info} = props;
  const [spinner, setSpinner] = useState(false);
  const [show, setShow] = useState(false);
  const [price, setPrice] = useState(0);
  const priceText = t('common:Price');
  const priceGreateThanZeroText = t('common:PriceGreaterZero');
  const updatePrice = async () => {
    if (price < 1) {
      Alert.alert(priceText, priceGreateThanZeroText);
      return;
    }
    var payload = {
      userId: user_info?.id,
      price: price,
    };
    setSpinner(true);
    const res = await update_subscription_price(payload);
    setSpinner(false);
    if (res?.data?.succeeded) {
      setShow(true);
    }
    if (res?.response?.data?.Message) {
      Alert.alert(priceText, res?.response?.data?.Message + '');
    }
  };
  return (
    <View style={{...styles.container}}>
      <CustomHeader title={t('common:setSubcriptionPrice')} allowBackBtn />
      <Spinner visible={spinner} textContent={''} textStyle={{color: '#FFF'}} />
      <ScrollView contentContainerStyle={{flexGrown: 1, flex: 1}}>
        <View style={{...styles.body}}>
          <View style={styles.input_container}>
            <PrimaryInput
              icon={''}
              inputType="numeric"
              onChange={val => setPrice(val)}
              placeholder={t('common:enterSubscriptionPrice')}
            />
            {price > 0 && (
              <Regular
                label={`${t('common:youWillGet')} ${
                  parseFloat(price) * 0.8
                }GNF`}
                size={mvs(12)}
                style={{marginTop: mvs(10), alignSelf: 'flex-end'}}
              />
            )}
            <PrimaryButton
              title={t('common:saveChanges')}
              style={{marginTop: mvs(40)}}
              onClick={() => updatePrice()}
            />
          </View>
        </View>
      </ScrollView>
      <CustomAlertModal
        visible={show}
        onOk={() => setShow(false)}
        title={t('common:subscriptionPriceUpdatedSuccessfully')}
      />
    </View>
  );
};

const mapStateToProps = store => ({
  user_info: store.state.user_info,
});

const mapDispatchToProps = {
  update_subscription_price: payload =>
    APP_API.update_subscription_price(payload),
};
export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionPrice);
