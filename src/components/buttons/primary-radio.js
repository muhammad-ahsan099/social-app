import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import colors from '../../services/colors';
import {mvs} from '../../services/metrices';
import Row from '../atoms/row';
import Regular from '../../typo-graphy/regular-text';
const PrimaryRadioButton = ({isSelected = false, style, onClick, label}) => {
  return (
    <Row alignItems="center">
      <TouchableOpacity
        style={{...styles.container, ...style}}
        onPress={onClick}>
        {isSelected && <View style={styles.mainRed}></View>}
      </TouchableOpacity>
      {label && (
        <Regular
          label={label}
          color={colors.white}
          size={mvs(13)}
          style={{marginLeft: mvs(6)}}
        />
      )}
    </Row>
  );
};
export default PrimaryRadioButton;
const styles = StyleSheet.create({
  container: {
    height: mvs(25),
    width: mvs(25),
    borderRadius: mvs(1000),
    ...colors.shadow,
    borderWidth: 2,
    backgroundColor: colors.shadow,
    borderColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainWhite: {
    height: mvs(15),
    width: mvs(15),
    borderRadius: mvs(1000),
    backgroundColor: colors.white,
  },
  mainRed: {
    height: mvs(15),
    width: mvs(15),
    borderRadius: mvs(1000),
    backgroundColor: colors.primary,
  },
});
