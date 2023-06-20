import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import Bold from '../../typo-graphy/bold-text';
import colors from '../../services/colors';
import {mvs, width} from '../../services/metrices';
import Row from '../atoms/row';
const PrimaryDropdown = ({
  title = 'Select Vehicle Type',
  setValue = arg => {},
  visible,
  onBackdropPress,
  items = [],
}) => {
  return (
    <ReactNativeModal
      isVisible={visible}
      onBackdropPress={onBackdropPress}
      style={{margin: 0}}>
      <View style={styles.container}>
        {items && (
          <>
            <Bold label={title} color={colors.white} size={16} />

            {items?.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={{width: '100%'}}
                onPress={() => {
                  setValue(item);
                }}>
                <Row style={{...styles.PAYMENTDROPDOWN}}>
                  <Bold
                    label={item?.type || item?.title}
                    color={colors.white}
                    size={17}
                  />
                  <View></View>
                </Row>
              </TouchableOpacity>
            ))}
          </>
        )}
      </View>
    </ReactNativeModal>
  );
};
export default PrimaryDropdown;
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: width,
    backgroundColor: colors.lightBlack,
    borderTopLeftRadius: mvs(15),
    borderTopRightRadius: mvs(15),
    padding: 10,
    alignItems: 'center',
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
});
