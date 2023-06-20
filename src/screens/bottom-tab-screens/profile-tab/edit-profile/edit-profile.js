import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import APP_API from '../../../../store/api-calls';
import { Styles as styles } from './style';
import { CustomHeader } from '../../../../components/molecules/header/header-1x';
import { mvs } from '../../../../services/metrices';
import { Bg } from '../../../../assets/images';
import { Camera, WhiteCamera } from '../../../../assets/svgs';
import ProfileItem from '../../../../components/setting/profile-item';
import PrimaryButton from '../../../../components/buttons/primary-button';
import Regular from '../../../../typo-graphy/regular-text';
import { URLS } from '../../../../store/api-urls';
import SERVICES from '../../../../services/common-services';
import EditKeyModal from '../../../../components/modals/edit-key';
import Spinner from 'react-native-loading-spinner-overlay';
import { useTranslation } from 'react-i18next';
const EditProfile = props => {
  const { t } = useTranslation();
  const { user_info, update_profile } = props;
  const navigation = useNavigation();
  const [key, setKey] = useState();
  const [keyValue, setKeyValue] = useState();
  const [open, setOpen] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [payload, setPayload] = useState({
    Email: user_info?.email,
    Username: user_info?.userName,
    FullName: user_info?.fullName,
    About: user_info?.about,
    Profile: null,
  });

  const update = async () => {
    console.log('Payload is ==> ', payload);
    setSpinner(true);
    const res = await update_profile(payload);
    setSpinner(false);

    if (res?.data?.succeeded) {
      Alert.alert(
        t('common:updateAccount') + '',
        t('common:accountUpdatedSuccessfully') + '',
      );
    }
    if (res?.response?.data?.Message) {
      Alert.alert(t('common:updateAccount') + '', res?.response?.data?.Message);
    }
  };
  const moveTo = async (mkey, mValue) => {
    if (mkey != 'Password') {
      setKey(mkey);
      setKeyValue(mValue);
      setTimeout(() => {
        setOpen(true);
      }, 1000)

    }
  };
  useEffect(() => { }, [refresh]);
  const selectPic = async () => {
    const image = await SERVICES._returnImageGallery();
    console.log(image);
    if (image != undefined) {
      setPayload({ ...payload, Profile: image });
    }
  };
  function updateValue() {
    //console.log('Value is ==> ', val);
    if (key == 'Username') {
      setPayload({ ...payload, Username: keyValue });
    } else if (key == 'Bio') {
      setPayload({ ...payload, About: keyValue });
    } else if (key == 'FullName') {
      setPayload({ ...payload, FullName: keyValue });
    }
    setRefresh(!refresh);
  }
  return (
    <View style={{ ...styles.container }}>
      <ScrollView contentContainerStyle={{ flex: 1, flexGrow: 1 }}>
        <View style={styles.topView}>
          <CustomHeader title=" " allowBackBtn style={{ marginTop: mvs(30) }} />
          <Spinner
            visible={spinner}
            textContent={''}
            textStyle={{ color: '#FFF' }}
          />
          <TouchableOpacity
            style={styles.cameraButton}
            onPress={() => selectPic()}>
            {payload?.Profile == null ? (
              <ImageBackground
                source={{ uri: `${URLS.image_url}${user_info?.profile}` }}
                resizeMode='contain'
                style={styles.imgStyle}
                blurRadius={0.5}
                borderRadius={10000}>
                <WhiteCamera />
              </ImageBackground>
            ) : (
              <ImageBackground
                source={{ uri: payload?.Profile?.uri }}
                resizeMode="center"
                style={styles.imgStyle}
                blurRadius={0.5}
                borderRadius={10000}>
                <WhiteCamera />
              </ImageBackground>
            )}
            <Regular
              label={t('common:changePhoto')}
              size={10}
              style={{ alignSelf: 'center', marginTop: 5 }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.body}>
          <ProfileItem
            keyName={t('common:email')}
            value={payload?.Email}
            editable={false}
          />
          <ProfileItem
            onClick={() => moveTo('Username', payload?.Username)}
            keyName={t('common:username')}
            value={payload?.Username}
            editable={false}
          />
          <ProfileItem
            onClick={() => moveTo('FullName', payload?.FullName)}
            keyName={t('common:fullName')}
            value={payload?.FullName ? payload?.FullName : t('common:fullName')}
            editable={true}
          />
          <ProfileItem
            onClick={() => moveTo('Bio', payload?.About)}
            keyName={t('common:bio')}
            value={payload?.About ? payload?.About : t('common:addYourBio')}
            editable={true}
          />

          <View style={styles.line}></View>

          <ProfileItem
            onClick={() => navigation.navigate('ChangePassword')}
            keyName={t('common:password')}
            value={'**********'}
            editable={true}
          />
          <PrimaryButton
            title={t('common:saveChanges')}
            onClick={() => update()}
            style={{ marginTop: mvs(50) }}
          />
        </View>
      </ScrollView>
      <EditKeyModal
        visible={open}
        title={key}
        value={keyValue}
        onChangeTxt={val => setKeyValue(val)}
        onContinuePress={() => {
          setOpen(false);
          updateValue();
        }}
      />
    </View>
  );
};

const mapStateToProps = store => ({
  user_info: store.state.user_info,
});

const mapDispatchToProps = {
  update_profile: payload => APP_API.update_profile(payload),
};
export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
