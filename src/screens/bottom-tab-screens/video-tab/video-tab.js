import React, {useRef} from 'react';
import {StatusBar, StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  Camera,
  useCameraDevices,
  CameraProps,
} from 'react-native-vision-camera';
import {connect} from 'react-redux';
import {Gallery, Live, MainCamera, WhiteCross} from '../../../assets/svgs';
import ComingSoonModal from '../../../components/modals/coming-soon';
import colors from '../../../services/colors';
import SERVICES from '../../../services/common-services';
import {mvs} from '../../../services/metrices';
import APP_API from '../../../store/api-calls';
import Regular from '../../../typo-graphy/regular-text';
import Row from './../../../components/atoms/row';
import {styles} from './style';
import {useTranslation} from 'react-i18next';
import RNFS from 'react-native-fs';
import uuid from 'react-native-uuid';
import PrimaryConfirmation from '../../../components/modals/primary-confirmation';
const VideoTab = props => {
  const {t} = useTranslation();
  const {start_live, user_info, navigation} = props;
  const loadingText = t('common:loading');
  React.useEffect(() => {
    try {
      (async () => {
        const newCameraPermission = await Camera.requestCameraPermission();
        const newMicrophonePermission =
          await Camera.requestMicrophonePermission();
      })();
    } catch (error) {
      console.log('Error ==> ', error);
    }
  }, []);
  const devices = useCameraDevices('wide-angle-camera');
  const device = devices.back;
  const camera = useRef(null);
  const [comingSoon, setComingSoon] = React.useState(false);
  const [start, setStart] = React.useState(false);
  const [confirm, setConfirm] = React.useState(false);
  const [fronCamera, setFrontCamera] = React.useState(false);
  const [recordedVideo, setRecordedVideo] = React.useState({});
  const onStart = async () => {
    try {
      camera?.current?.startRecording({
        flash: 'on',
        onRecordingFinished: video => {
          setRecordedVideo(video);
          setConfirm(true);
        },
        onRecordingError: error => console.error('error', error),
      });
      setStart(true);
    } catch (error) {
      console.log('error::', error);
    }
  };
  const onStop = async () => {
    try {
      await camera?.current?.stopRecording();
      setStart(false);
    } catch (error) {
      console.log('error::', error);
    }
  };
  const togglePlay = () => {
    if (start) {
      onStop();
    } else {
      onStart();
    }
  };
  const startLiveStream = async () => {
    var liveId = String(Math.floor(Math.random() * 10000));
    var payload = {
      creatorId: user_info?.id,
      liveId: liveId,
    };
    const res = await start_live(payload);
    if (res?.data?.data) {
      props?.navigation?.navigate('HostPage', {
        userID: user_info?.id,
        userName: user_info?.userName,
        liveID: liveId,
      });
    }
  };
  // React.useEffect(()=>{
  //   props?.navigation?.setOptions({tabBarVisible: false});
  // },[])
  const uploadContent = async () => {
    // var filename = uuid.v4() + '_recordVideo.mp4';
    // var path = `${RNFS?.PicturesDirectoryPath}/${filename}`;
    // await RNFS.moveFile(recordedVideo?.path, path);
    setConfirm(false);
    navigation.navigate('UploadContent', {
      video: {
        uri: recordedVideo?.path,
        type: 'Video',
        name: 'recordedVideo',
      },
    });
  };
  if (device == null)
    return (
      <View>
        <Regular label={loadingText} />
      </View>
    );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={'black'} />
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={fronCamera ? devices.front : devices.back}
        isActive={true}
        video={true}
        audio={true}
        {...CameraProps}
      />
      <Row alignItems="flex-end" style={{paddingHorizontal: mvs(20)}}>
        <TouchableOpacity
          onPress={() => setComingSoon(true)}
          style={{paddingBottom: mvs(10)}}>
          <Live />
        </TouchableOpacity>
        <TouchableOpacity style={{}} onPress={() => togglePlay()}>
          <MainCamera fill={start ? 'red' : null} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props?.navigation?.navigate('UploadContent')}>
          <Gallery />
        </TouchableOpacity>
      </Row>
      <TouchableOpacity
        onPress={() => props?.navigation?.goBack()}
        style={{top: mvs(30), position: 'absolute', left: mvs(32)}}>
        <WhiteCross />
      </TouchableOpacity>
      {start && (
        <Row
          alignItems="center"
          style={{top: mvs(30), position: 'absolute', right: mvs(32)}}>
          <Regular
            label={'Recording started '}
            color={colors.primary}
            size={mvs(14)}
          />
          <View style={styles.redDot}></View>
        </Row>
      )}
      <ComingSoonModal visible={comingSoon} onOk={() => setComingSoon(false)} />
      <PrimaryConfirmation
        visible={confirm}
        subtitle={t('common:doYouWantVideoUpload')}
        title={t('common:uploadVideo')}
        onCancel={() => setConfirm(false)}
        onOk={() => uploadContent()}
      />
    </View>
  );
};

const mapStateToProps = store => ({
  user_info: store.state.user_info,
});

const mapDispatchToProps = {
  start_live: payload => APP_API.start_live(payload),
};
export default connect(mapStateToProps, mapDispatchToProps)(VideoTab);
