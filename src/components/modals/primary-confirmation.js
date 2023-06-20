import React from 'react';
import {StyleSheet, View} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import Bold from '../../typo-graphy/bold-text';
import colors from '../../services/colors';
import {mvs} from '../../services/metrices';
import PrimaryButton from '../buttons/primary-button';
import Regular from '../../typo-graphy/regular-text';
import SERVICES from '../../services/common-services';
const PrimaryConfirmation = ({
  title = '',
  subtitle = '',
  visible,
  setVisible = bool => {},
  onCancel,
  onOk,
}) => {
  return (
    <ReactNativeModal
      isVisible={visible}
      onBackdropPress={() => setVisible(false)}
      style={{margin: 0}}>
      <View style={styles.container}>
        <Bold label={title} size={mvs(22)} color={colors.white} />
        <Regular
          label={subtitle}
          size={mvs(15)}
          color={colors.white}
          numberOfLines={4}
          style={styles.description}
        />
        <PrimaryButton
          title={SERVICES.translate('yes')}
          onClick={onOk}
          style={styles.button}
        />
        <PrimaryButton
          title={SERVICES.translate('cancel')}
          onClick={onCancel}
          style={{...styles.button, backgroundColor: colors.lightgrey2}}
          titleStyle={{color: colors.black}}
        />
      </View>
    </ReactNativeModal>
  );
};
export default PrimaryConfirmation;
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
    right: mvs(30),
    left: mvs(30),
  },
  description: {
    marginVertical: mvs(15),
    textAlign: 'center',
    alignSelf: 'center',
    width: mvs(250),
    lineHeight: mvs(19),
  },
  button: {
    width: '100%',
  },
});
