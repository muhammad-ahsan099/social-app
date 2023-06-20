import React from 'react';
import {StyleSheet, View} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import colors from '../../../services/colors';
import {mvs, width} from '../../../services/metrices';
import SecondaryButton from './../../buttons/secondary-button';
const ButtonsModal = ({visible, onCancel, onEnd}) => {
  return (
    <ReactNativeModal
      isVisible={visible}
      onBackdropPress={onCancel}
      style={{margin: 0}}>
      <View style={styles.container}>
        <SecondaryButton onClick={onEnd} title="End livestream" />
        <SecondaryButton
          onClick={onCancel}
          titleStyle={{color: colors.blue}}
          title="Cancel"
        />
      </View>
    </ReactNativeModal>
  );
};
export default ButtonsModal;
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: width,
    // backgroundColor: colors.white,
    borderTopLeftRadius: mvs(15),
    borderTopRightRadius: mvs(15),
    paddingHorizontal: mvs(17),
    paddingBottom: mvs(17),
    alignSelf: 'center',
  },
});
