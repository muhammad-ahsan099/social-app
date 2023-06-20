import React from 'react';
import {StyleSheet, View} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import colors from '../../services/colors';
import {mvs} from '../../services/metrices';
import PrimaryButton from '../buttons/primary-button';
import Bold from '../../typo-graphy/bold-text';
import {SuperFan} from '../../assets/svgs';
import {useTranslation} from 'react-i18next';
const BecomeCreatorModal = ({visible, onOk, onCancel}) => {
  const {t} = useTranslation();
  return (
    <ReactNativeModal
      isVisible={visible}
      onBackdropPress={onOk}
      style={{margin: 0}}>
      <View style={styles.container}>
        <SuperFan style={{alignSelf: 'center'}} />
        <Bold
          label={t('common:becomeCreatorAlert')}
          size={mvs(15)}
          color={colors.white}
          numberOfLines={3}
          style={styles.description}
        />
        <PrimaryButton
          title={t('common:becomeACreator')}
          onClick={onOk}
          style={styles.button}
        />
        <PrimaryButton
          title={t('common:cancel')}
          onClick={onCancel}
          style={{...styles.button, backgroundColor: colors.lightgrey2}}
          titleStyle={{color: colors.black}}
        />
      </View>
    </ReactNativeModal>
  );
};
export default BecomeCreatorModal;
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
    left: mvs(10),
    right: mvs(10),
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
