import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Alert, ScrollView, View} from 'react-native';
import {Styles as styles} from './style';
import APP_API from '../../store/api-calls';
import {CustomHeader} from '../../components/molecules/header/header-1x';
import SettingItem from '../../components/setting/setting-item';
import PrimaryModal from '../../components/modals/primary-modal';
import Spinner from 'react-native-loading-spinner-overlay';
import SERVICES from '../../services/common-services';

const ReportContent = props => {
  const [spinner, setSpinner] = useState(false);
  const {user_info, route, report_content} = props;
  const navigation = useNavigation();
  const reportContentText = SERVICES.translate('reportContent');
  const reportContentSuccessfully = SERVICES.translate(
    'reportContentSuccessfully',
  );
  const [report, setReports] = useState([
    {id: 1, title: SERVICES.translate('falseInformation')},
    {id: 2, title: SERVICES.translate('minorSafety')},
    {id: 3, title: SERVICES.translate('bullyingOrHarassment')},
    {id: 4, title: SERVICES.translate('pronographyAndNudity')},
    {id: 5, title: SERVICES.translate('voilentAndGraphicContent')},
    {id: 6, title: SERVICES.translate('hateSpeechAndSymbols')},
    {id: 7, title: SERVICES.translate('terrorism')},
    {id: 8, title: SERVICES.translate('selfHarmAndDangerousAct')},
    {id: 9, title: SERVICES.translate('scamAndFraud')},
    {id: 8, title: SERVICES.translate('intellectualPropertyViolation')},
    {id: 8, title: SERVICES.translate('saleofIllegalOrRegulatedGood')},
    {id: 8, title: SERVICES.translate('Something else')},
  ]);
  const [description, setDescription] = useState('');
  const [show, setShow] = React.useState(false);
  const [toptitle, setTitle] = useState('');
  const showState = title => {
    setTitle(title);
    setShow(true);
  };
  const reportContent = async () => {
    setSpinner(true);
    var payload = {
      contentId: route.params.id,
      reportById: user_info?.id,
      reason: toptitle,
      description: description,
    };
    report_content(payload)
      .then(res => {
        setSpinner(false);
        Alert.alert(reportContentText, reportContentSuccessfully);
        setShow(false);
      })
      .catch(err => console.log(err));
  };
  return (
    <View style={{...styles.container}}>
      <CustomHeader title={SERVICES.translate('report')} allowBackBtn />
      <ScrollView contentContainerStyle={{flexGrown: 1}}>
        <View style={styles.body}>
          {report.map((item, index) => (
            <SettingItem
              key={index}
              title={item.title}
              icon=""
              rightIcon={'RightVector'}
              onClick={() => showState(item.title)}
              onRightIconClick={() => showState(item.title)}
            />
          ))}
        </View>
      </ScrollView>
      <PrimaryModal
        visible={show}
        title={SERVICES.translate('reportContent')}
        subTitle={toptitle}
        setValue={item => {
          setShow(false);
        }}
        onBackdropPress={() => setShow(false)}
        onChangeTxt={val => setDescription(val)}
        onReportPress={() => reportContent()}
      />
      <Spinner visible={spinner} textContent={''} textStyle={{color: '#FFF'}} />
    </View>
  );
};
const mapStateToProps = store => ({
  user_info: store.state.user_info,
});
const mapDispatchToProps = {
  report_content: payload => APP_API.report_content(payload),
};
export default connect(mapStateToProps, mapDispatchToProps)(ReportContent);
