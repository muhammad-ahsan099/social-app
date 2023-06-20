import React, {useState, useEffect} from 'react';
import {ScrollView, View} from 'react-native';
import {Styles as styles} from './style';
import {CustomHeader} from '../../components/molecules/header/header-1x';
import Bold from '../../typo-graphy/bold-text';
import Regular from '../../typo-graphy/regular-text';
import colors from '../../services/colors';
import {mvs} from '../../services/metrices';
import Row from '../../components/atoms/row';
import PrimaryRadioButton from '../../components/buttons/primary-radio';
import PrimaryConfirmation from '../../components/modals/primary-confirmation';
import PrimaryButton from '../../components/buttons/primary-button';
import {FlatList} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import APP_API from '../../store/api-calls';
import {CommonActions} from '@react-navigation/native';
import Spinner from 'react-native-loading-spinner-overlay';
import CustomAlertModal from '../../components/modals/custom-alert';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SERVICES from '../../services/common-services';
const DeleteAccount = props => {
  const {delete_account, user_info} = props;
  const [spinner, setSpinner] = useState(false);
  const reasonsData = [
    {
      id: 1,
      title: SERVICES.translate('safetyOrPrivacyConcerns'),
      isSelected: true,
    },
    {
      id: 2,
      title: SERVICES.translate('troubleGettingStarted'),
      isSelected: false,
    },
    {
      id: 3,
      title: SERVICES.translate('iHaveMultipleAccounts'),
      isSelected: false,
    },
    {id: 4, title: SERVICES.translate('anotherReason'), isSelected: false},
  ];
  const [reason, setReason] = useState(reasonsData);
  const [reasonTitle, setReasonTitle] = useState(
    SERVICES.translate('safetyOrPrivacyConcerns'),
  );
  const [isChange, setChnage] = useState(false);
  const setSelected = index => {
    for (var i = 0; i < reason.length; i++) {
      reason[i].isSelected = false;
    }
    reason[index].isSelected = true;
    console.log(reason);
    setReason(reason);
    setReasonTitle(reason[index]?.title);
    setChnage(!isChange);
  };
  const [show, setShow] = React.useState(false);
  const [showAlert, setShowAlert] = React.useState(false);
  useEffect(() => {}, [isChange]);
  const ConfirmDelete = async () => {
    var payload = {
      userId: user_info?.id,
      reason: reasonTitle,
    };
    setSpinner(true);
    const res = await delete_account(payload);
    console.log('Delete Response ====> ', res?.data);
    setSpinner(false);
    if (res?.data?.succeeded) {
      setShowAlert(true);
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
      <CustomHeader
        title={SERVICES.translate('deleteMyAccount')}
        allowBackBtn
      />
      <Spinner
        visible={spinner}
        cancelable={true}
        textContent={''}
        textStyle={{color: '#FFF'}}
      />
      <ScrollView contentContainerStyle={{flexGrown: 1}}>
        <View style={styles.input_container}>
          <Bold
            label={SERVICES.translate('whyLeaving')}
            size={mvs(13)}
            style={{alignSelf: 'center'}}
            numberOfLines={1}
          />
          <Regular
            label={SERVICES.translate('weAreSorryToSeeYouGo')}
            size={mvs(16)}
            color={colors.lightgrey1}
            numberOfLines={10}
            style={{
              alignSelf: 'center',
              marginTop: mvs(10),
              textAlign: 'center',
              lineHeight: mvs(20),
            }}
          />
          <FlatList
            data={reason}
            keyExtractor={item => item.id}
            renderItem={({item, index}) => (
              <View>
                <Row style={styles.row2} alignItems="center">
                  <Regular
                    label={item.title}
                    size={mvs(16)}
                    color={colors.lightgrey1}
                    numberOfLines={2}
                    style={{flex: 1}}
                  />

                  <PrimaryRadioButton
                    onClick={() => setSelected(index)}
                    isSelected={item.isSelected}
                  />
                </Row>
                <View style={styles.line}></View>
              </View>
            )}
          />
          <Regular
            label={SERVICES.translate('provideDetails')}
            size={mvs(13)}
            color={colors.lightgrey}
            numberOfLines={2}
            style={styles.text1}
          />

          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Regular
              label={SERVICES.translate('onceDelete')}
              size={mvs(18)}
              color={colors.lightgrey1}
              numberOfLines={10}
              style={styles.text2}
            />
          </View>
          <PrimaryButton
            title={SERVICES.translate('deleteMyAccount')}
            onClick={() => setShow(true)}
            style={styles.text2}
          />
        </View>
      </ScrollView>
      <PrimaryConfirmation
        visible={show}
        subtitle={SERVICES.translate('confirmDeleteAccount')}
        title={SERVICES.translate('deleteAccount')}
        onCancel={() => setShow(false)}
        onOk={() => {
          setShow(false);
          ConfirmDelete();
        }}
      />
      <CustomAlertModal
        visible={showAlert}
        title={SERVICES.translate('deletedAccountSuccessAlert')}
        onOk={() => {
          setShowAlert(false);
          SignOut();
        }}
      />
    </View>
  );
};
const mapStateToProps = store => ({
  user_info: store.state.user_info,
});

const mapDispatchToProps = {
  delete_account: payload => APP_API.delete_account(payload),
};
export default connect(mapStateToProps, mapDispatchToProps)(DeleteAccount);
