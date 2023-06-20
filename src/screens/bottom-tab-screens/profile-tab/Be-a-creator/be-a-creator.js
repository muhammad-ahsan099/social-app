import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Alert, Image, ScrollView, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import APP_API from '../../../../store/api-calls';
import { Styles as styles } from './style';
import Spinner from 'react-native-loading-spinner-overlay';
import { CustomHeader } from '../../../../components/molecules/header/header-1x';
import { mvs } from '../../../../services/metrices';
import PrimaryButton from '../../../../components/buttons/primary-button';
import PrimaryInput from '../../../../components/input/primary-input';
import Regular from '../../../../typo-graphy/regular-text';
import colors from '../../../../services/colors';
import { Upload } from '../../../../assets/svgs/setting-icons';
import Bold from '../../../../typo-graphy/bold-text';
import ImagePlaceholder from '../../../../components/atoms/image-placeholder';
import { VectoryImage } from '../../../../assets/images';
import SERVICES from '../../../../services/common-services';
import { useTranslation } from 'react-i18next';
const BeCreator = props => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const beACreatorText = t('common:beACreator');
  const frontIdAlert = t('common:frontIdAlert');
  const backIdAlert = t('common:backIdAlert');
  const selfiAlert = t('common:selfiAlert');
  const { user_info, be_a_creator } = props;
  const [frontSide, setFrontSide] = React.useState();
  const [backSide, setBackSide] = React.useState();
  const [selfi, setSelfi] = React.useState();
  const [name, setName] = React.useState(user_info?.name);
  const [isSubmitted, setSubmitted] = React.useState(
    user_info?.creator != null ? true : false,
  );
  const [spinner, setSppiner] = React.useState(false);
  const pickImage = async side => {
    const image = await SERVICES._returnImageGallery();
    console.log(image);
    if (image != undefined) {
      if (side == 'front') {
        setFrontSide(image);
      } else {
        setBackSide(image);
      }
    }
  };
  const takeSelfi = async () => {
    const image = await SERVICES._returnImageCamera();
    console.log(image);
    if (image != undefined) {
      setSelfi(image);
    }
  };
  const submitRequest = async () => {
    if (!selfi?.uri) {
      Alert.alert(beACreatorText, selfiAlert);
      return;
    }
    if (!frontSide?.uri) {
      Alert.alert(beACreatorText, frontIdAlert);
      return;
    }
    if (!backSide?.uri) {
      Alert.alert(beACreatorText, backIdAlert);
      return;
    }
    var payload = {
      Name: name,
      Profile: selfi,
      FrontSideIdCard: frontSide,
      BackSideIdCard: backSide,
      UserId: user_info?.id,
    };
    console.log('Payload is ==> ', payload);
    setSppiner(true);
    const res = await be_a_creator(payload);
    setSppiner(false);
    if (res?.data?.succeeded) {
      setSubmitted(true);
    }
    if (res?.response?.data?.Message) {
      Alert.alert(beACreatorText, res?.response?.data?.Message);
    }
  };
  return (
    <View style={{ ...styles.container }}>
      <CustomHeader title={beACreatorText} allowBackBtn />
      <ScrollView
        contentContainerStyle={{ flexGrown: 1, paddingBottom: mvs(60) }}>
        <View style={{ ...styles.body }}>
          {isSubmitted ? (
            <View style={styles.success}>
              <ImagePlaceholder
                uri={VectoryImage}
                containerStyle={{ height: mvs(140), width: mvs(140) }}
              />
              <Bold
                label={t('common:perfect')}
                style={{ marginTop: mvs(11) }}
                color={colors.white}
                size={mvs(24)}
              />
              <Regular
                numberOfLines={2}
                size={mvs(16)}
                style={{
                  lineHeight: mvs(23),
                  marginTop: mvs(11),
                  textAlign: 'center',
                }}
                label={
                  !user_info?.isCreator
                    ? t('common:creatorRequestSubimttedSuccessfully')
                    : t('common:creatorRequestApprovedSuccessfully')
                }
              />
              <PrimaryButton
                title={t('common:goBack')}
                onClick={() => {
                  navigation.goBack();
                }}
                style={{ width: '100%', marginTop: mvs(41) }}
              />
            </View>
          ) : (
            <View style={styles.input_container}>
              <PrimaryInput
                icon={''}
                placeholder={t('common:name')}
                onChange={val => setName(val)}
              />

              <TouchableOpacity
                style={styles.image}
                onPress={() => takeSelfi()}>
                {!selfi ? (
                  <>
                    <Upload />
                    <Regular
                      size={15}
                      color={colors.lightgrey1}
                      label={t('common:takeASelfie')}
                      style={{ marginTop: mvs(13) }}
                    />
                  </>
                ) : (
                  <Image
                    source={{ uri: selfi.uri }}
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: mvs(15),
                    }}
                  />
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.image}
                onPress={() => pickImage('front')}>
                {!frontSide ? (
                  <>
                    <Upload />
                    <Regular
                      size={15}
                      color={colors.lightgrey1}
                      label={t('common:uploadFrontSideIDCard')}
                      numberOfLines={2}
                      style={{ marginTop: mvs(13) }}
                    />
                  </>
                ) : (
                  <Image
                    source={{ uri: frontSide.uri }}
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: mvs(15),
                    }}
                  />
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.image}
                onPress={() => pickImage('back')}>
                {!backSide ? (
                  <>
                    <Upload />
                    <Regular
                      size={15}
                      color={colors.lightgrey1}
                      label={t('common:uploadBackSideIDCard')}
                      style={{ marginTop: mvs(13), textAlign: 'center' }}
                      numberOfLines={5}
                    />
                  </>
                ) : (
                  <Image
                    source={{ uri: backSide.uri }}
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: mvs(15),
                    }}
                  />
                )}
              </TouchableOpacity>
              <PrimaryButton
                title={t('common:submit')}
                style={{ marginTop: mvs(40) }}
                onClick={() => submitRequest()}
              />
            </View>
          )}
        </View>
      </ScrollView>
      <Spinner visible={spinner} textContent={''} textStyle={{ color: '#FFF' }} />
    </View>
  );
};

const mapStateToProps = store => ({
  user_info: store.state.user_info,
});

const mapDispatchToProps = {
  be_a_creator: payload => APP_API.be_a_creator(payload),
};
export default connect(mapStateToProps, mapDispatchToProps)(BeCreator);
