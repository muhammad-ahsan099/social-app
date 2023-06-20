import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView, View, TouchableOpacity, Image, Alert } from 'react-native';
import { Styles as styles } from './style';
import { CustomHeader } from '../../components/molecules/header/header-1x';
import { Upload } from '../../assets/svgs/setting-icons';
import Regular from '../../typo-graphy/regular-text';
import APP_API from '../../store/api-calls';
import colors from '../../services/colors';
import { mvs } from '../../services/metrices';
import PrimaryInput from '../../components/input/primary-input';
import DocumentPicker from 'react-native-document-picker';
import PrimaryButton from '../../components/buttons/primary-button';
import PrimaryDropdown from '../../components/modals/primary-dropdown';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import SERVICES from '../../services/common-services';
import { useTranslation } from 'react-i18next';
import CustomAlertModal from '../../components/modals/custom-alert';
import BecomeCreatorModal from '../../components/modals/become-creator-modal';
const UploadContent = props => {
  const { t } = useTranslation();
  const publicText = t(`common:public`);
  const privateText = t(`common:private`);
  const uploadContentText = t(`common:uploadContent`);
  const selectViewerTypeText = t(`common:selectViewerType`);
  const selectContentText = t(`common:selectContent`);
  const contentUploadedSuccessfully = t(`common:contentUploadedSuccessfully`);

  const { navigation, upload_content, user_info, route } = props;
  const [spinner, setSpinner] = React.useState(false);
  const [payload, setPayload] = React.useState({
    Amount: '0',
    ViewerType: 'Public',
    UserId: user_info?.id,
    Description: '',
    Type: route?.params?.video ? route?.params?.video?.type : '',
    ContentFile: route?.params?.video ? route?.params?.video : {},
  });
  const [show, setShow] = React.useState(false);
  const ViewersType = [
    { id: 1, type: publicText, value: 'Public' },
    { id: 2, type: privateText, value: 'Private' },
  ];
  const [isRefresh, setRefresh] = useState(false);
  const [viwerType, setViewerType] = useState(publicText);
  const [visible, setVisible] = useState(false);
  const [creatorAlert, setCreatorAlert] = useState(false);
  const selectPic = async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
        type: [DocumentPicker.types.allFiles],
      });
      var data = payload;
      if (response[0]?.type.includes('image')) {
        data.Type = 'Image';
      }
      if (response[0]?.type.includes('audio')) {
        data.Type = 'Audio';
      }
      if (response[0]?.type.includes('video')) {
        data.Type = 'Video';
      }
      console.log('Selected Video  ==> ', response[0]);
      data.ContentFile = response[0];
      setPayload(data);
      setRefresh(!isRefresh);
    } catch (err) {
      console.warn(err);
    }
  };
  const UploadContent = async () => {
    console.log(payload);
    if (!payload?.ContentFile?.uri) {
      Alert.alert(uploadContentText, selectContentText);
      return;
    }
    if (payload?.ViewerType.length < 1) {
      Alert.alert(uploadContentText, selectViewerTypeText);
      return;
    }
    setSpinner(true);
    var res = await upload_content(payload);
    setSpinner(false);
    if (res?.data?.succeeded == true) {
      //Alert.alert(uploadContentText, contentUploadedSuccessfully);
      setVisible(true);
    } else if (res?.response?.data?.Message) {
      if (res?.response?.data?.Message?.includes('You are not creator')) {
        setCreatorAlert(true);
      }
      // Alert.alert(uploadContentText, res?.response?.data?.Message);
    } else if (res?.data?.succeeded == false) {
      Alert.alert(uploadContentText, res?.data?.message);
    }
  };

  return (
    <View style={{ ...styles.container }}>
      <CustomHeader title={uploadContentText} allowBackBtn />
      <ScrollView contentContainerStyle={{ flexGrown: 1 }}>
        <View style={styles.input_container}>
          <TouchableOpacity style={styles.image} onPress={() => selectPic()}>
            {!payload.ContentFile.uri ? (
              <>
                <Upload />
                <Regular
                  size={14}
                  color={colors.lightgrey}
                  label={t(`common:chooseFromGallery`)}
                  style={{ marginTop: mvs(13) }}
                />
              </>
            ) : (
              <Image
                source={{ uri: payload.ContentFile.uri }}
                style={{ width: '100%', height: '100%', borderRadius: mvs(15) }}
                resizeMode="cover"
              />
            )}
          </TouchableOpacity>
          <View style={{ marginTop: mvs(42) }}>
            <View style={styles.input}>
              <TouchableOpacity onPress={() => setShow(true)}>
                <PrimaryInput
                  icon={''}
                  placeholder={viwerType}
                  rightIcon={'Dropdown'}
                  isEditable={false}
                  onRightIconClick={() => setShow(true)}
                  onChange={val => setPayload({ ...payload, ViewerType: val })}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.input}>
              <PrimaryInput
                icon={''}
                multiline={true}
                placeholder={t(`common:description`)}
                style={styles.description}
                onChange={val => setPayload({ ...payload, Description: val })}
              />
            </View>
          </View>
          <View style={styles.button}>
            <PrimaryButton
              title={t(`common:post`)}
              onClick={() => UploadContent()}
            />
          </View>
        </View>
      </ScrollView>
      <PrimaryDropdown
        title={t(`common:selectViewerType`)}
        visible={show}
        items={ViewersType}
        onBackdropPress={() => setShow(false)}
        setValue={item => {
          setShow(false);
          setPayload({ ...payload, ViewerType: item?.value });
          setViewerType(item?.type);
        }}
      />
      <Spinner
        visible={spinner}
        textContent={t(`common:uploading`)}
        textStyle={{ color: '#FFF' }}
      />
      <CustomAlertModal
        title={contentUploadedSuccessfully}
        visible={visible}
        onOk={() => navigation.replace('BottomTab')}
      />
      <BecomeCreatorModal
        visible={creatorAlert}
        onCancel={() => setCreatorAlert(false)}
        onOk={() => {
          setCreatorAlert(false);
          navigation.replace('BeACreator');
        }}
      />
    </View>
  );
};

const mapStateToProps = store => ({
  user_info: store.state.user_info,
  // home_posts: store.state.home_posts,
});

const mapDispatchToProps = {
  upload_content: payload => APP_API.upload_content(payload),
};
export default connect(mapStateToProps, mapDispatchToProps)(UploadContent);
