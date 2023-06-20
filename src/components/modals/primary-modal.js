import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import Bold from '../../typo-graphy/bold-text';
import Regular from '../../typo-graphy/regular-text';
import colors from '../../services/colors';
import {mvs, width} from '../../services/metrices';
import Row from '../atoms/row';
import PrimaryInput from '../input/primary-input';
import PrimaryButton from '../buttons/primary-button';
import SERVICES from '../../services/common-services';
const PrimaryModal = ({
  title = '',
  subTitle = '',
  value,
  setValue = arg => {},
  visible,
  onChangeTxt,
  setVisible = bool => {},
  onReportPress,
  items = [],
  onBackdropPress,
}) => {
  return (
    <ReactNativeModal
      isVisible={visible}
      onBackdropPress={onBackdropPress}
      style={{margin: 0}}>
      <View style={styles.container}>
        {items && (
          <>
            <Bold
              label={title}
              size={mvs(18)}
              style={{marginTop: mvs(1), alignSelf: 'center'}}
            />

            <Regular
              label={SERVICES.translate('reportReason')}
              size={mvs(15)}
              color={colors.lightgrey1}
              numberOfLines={1}
              style={{marginTop: mvs(10)}}
            />
            <Regular
              label={subTitle}
              size={mvs(15)}
              color={colors.lightgrey1}
              numberOfLines={2}
            />
            <PrimaryInput
              multiline={true}
              icon={''}
              placeholder={SERVICES.translate('description')}
              style={styles.description}
              onChange={onChangeTxt}
            />
            {/* <View style={styles.butonMain}> */}
            <PrimaryButton
              title={SERVICES.translate('report')}
              onClick={onReportPress}
              style={styles.button}
            />
            {/* </View> */}
          </>
        )}
      </View>
    </ReactNativeModal>
  );
};
export default PrimaryModal;
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: width,
    borderBottomWidth: mvs(0.7),
    borderTopColor: colors.lightgrey,
    backgroundColor: colors.lightBlack,
    borderTopLeftRadius: mvs(20),
    borderTopRightRadius: mvs(20),
    padding: 10,
    //alignItems: 'center',
    alignSelf: 'center',
  },
  PAYMENTDROPDOWN: {
    justifyContent: 'space-between',
    height: mvs(50),
    alignItems: 'center',
    borderRadius: 10,
    top: mvs(8),
    borderBottomWidth: 0.9,
    borderColor: colors.gray,
    paddingHorizontal: mvs(11),
    paddingVertical: mvs(10),
  },
  butonMain: {},
  description: {
    height: 100,
    alignItems: 'flex-start',
  },
  button: {
    flex: 1,
    width: width - 18,
    marginVertical: mvs(18),
  },
  reasonName: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 30,
  },
});
