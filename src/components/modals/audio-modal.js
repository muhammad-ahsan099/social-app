import React from 'react';
import {StyleSheet, View} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import {AudioPlayer} from 'react-native-simple-audio-player';
import colors from '../../services/colors';
import {mvs} from '../../services/metrices';
const AudioModal = ({
  visible,
  onOk,
  url = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
}) => {
  console.log('Audio url is ==> ', url);
  return (
    <ReactNativeModal
      isVisible={visible}
      onBackButtonPress={onOk}
      onBackdropPress={onOk}
      style={{margin: 0}}>
      <View style={styles.container}>
        <AudioPlayer url={url} />
      </View>
    </ReactNativeModal>
  );
};
export default AudioModal;
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: colors.lightBlack,
    borderRadius: mvs(15),
    padding: 10,
    paddingHorizontal: mvs(22),
    alignItems: 'center',
    alignSelf: 'center',
    flex: 1,
    paddingVertical: mvs(25),
    left: 10,
    right: 10,
  },
});
