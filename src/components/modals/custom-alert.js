import React from 'react';
import {StyleSheet, View} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import colors from '../../services/colors';
import {mvs} from '../../services/metrices';
import PrimaryButton from '../buttons/primary-button';
import Bold from '../../typo-graphy/bold-text';
import {SuperFan} from '../../assets/svgs';
const CustomAlertModal = ({visible, onOk, title = ''}) => {
  return (
    <ReactNativeModal
      isVisible={visible}
      onBackdropPress={onOk}
      style={{margin: 0}}>
      <View style={styles.container}>
        <SuperFan style={{alignSelf: 'center'}} />
        <Bold
          label={title}
          size={mvs(20)}
          color={colors.white}
          numberOfLines={2}
          style={styles.description}
        />
        <PrimaryButton title="Continue" onClick={onOk} style={styles.button} />
      </View>
    </ReactNativeModal>
  );
};
export default CustomAlertModal;
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
  },
  description: {
    marginVertical: mvs(15),
    textAlign: 'center',
    alignSelf: 'center',
    lineHeight: mvs(23),
  },
  button: {
    width: '100%',
    marginTop: mvs(10),
  },
});
