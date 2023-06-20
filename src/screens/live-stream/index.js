import React, {useRef} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {connect} from 'react-redux';
import {Stream, WhiteCross} from '../../assets/svgs';
import Row from '../../components/atoms/row';
import CollapsibleView from '../../components/molecules/collapseable-view';
import {mvs} from '../../services/metrices';
import APP_API from '../../store/api-calls';
import Regular from '../../typo-graphy/regular-text';
import ButtonsModal from './../../components/molecules/modals/buttons-modal';
const LiveStream = props => {
  React.useEffect(() => {
    (async () => {
      const newCameraPermission = await Camera.requestCameraPermission();
      const newMicrophonePermission =
        await Camera.requestMicrophonePermission();
    })();
  }, []);
  const [buttonModal, setButtonModal] = React.useState(false);
  const devices = useCameraDevices();
  const device = devices.back;
  const camera = useRef(null);
  const [start, setStart] = React.useState(false);
  const onStart = async () => {
    try {
      camera?.current?.startRecording({
        flash: 'on',
        onRecordingFinished: video => console.log('video', video),
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

  if (device == null)
    return (
      <View>
        <Regular label={'Loading'} />
      </View>
    );
  return (
    <View style={{flex: 1, paddingBottom: mvs(40)}}>
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        video={true}
        audio={true}
      />

      <Row style={{marginTop: mvs(30), paddingHorizontal: mvs(20)}}>
        <TouchableOpacity onPress={() => setButtonModal(true)}>
          <WhiteCross />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}}>
          <Stream />
        </TouchableOpacity>
      </Row>
      <CollapsibleView isExpand={buttonModal} />
      <ButtonsModal
        {...props}
        setVisible={setButtonModal}
        visible={buttonModal}
      />
    </View>
  );
};

const mapStateToProps = store => ({
  // home_posts: store.state.home_posts,
});

const mapDispatchToProps = {
  signin: payload => APP_API.signin(payload),
};
export default connect(mapStateToProps, mapDispatchToProps)(LiveStream);
