import React from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import colors from '../../services/colors';
import {mvs} from '../../services/metrices';
import Row from '../atoms/row';
import * as SVG from '../../assets/svgs';
import Regular from '../../typo-graphy/regular-text';
const SeconderyInput = ({
  icon = 'User',
  placeholder = 'Enter Text',
  style,
  inputStyle,
  secureTextEntry = false,
  onChange,
  showCancel = false,
  onCancelClick,
  multiline = false,
  onTouch,
  rightIcon,
  isEditable = true,
  onRightIconClick,
  value = '',
  label,
  labelStyle,
}) => {
  const Icon = SVG[icon];
  const RightIcon = SVG[rightIcon];
  return (
    <View style={{marginTop: mvs(11)}}>
      {label && (
        <Regular
          label={label}
          color={colors.white}
          style={{marginLeft: 5, ...labelStyle}}
        />
      )}
      <Row style={{...styles.container, ...style}}>
        {Icon && <Icon />}
        <TextInput
          value={value}
          multiline={multiline}
          onChangeText={onChange}
          placeholder={placeholder}
          onTouchStart={onTouch}
          placeholderTextColor={colors.lightgrey1}
          secureTextEntry={secureTextEntry}
          editable={isEditable}
          style={{...styles.input, ...inputStyle}}
        />
        {RightIcon && (
          <TouchableOpacity onPress={onRightIconClick}>
            <RightIcon />
          </TouchableOpacity>
        )}
        {showCancel && (
          <TouchableOpacity onPress={onCancelClick}>
            <SVG.Cross />
          </TouchableOpacity>
        )}
      </Row>
    </View>
  );
};
export default SeconderyInput;
const styles = StyleSheet.create({
  container: {
    height: mvs(42),
    borderRadius: mvs(32),
    ...colors.shadow,
    backgroundColor: colors.secondary,
    marginTop: mvs(3),
    alignItems: 'center',
    paddingHorizontal: mvs(12),
  },
  input: {
    flex: 1,
    color: colors.lightgrey1,
    paddingHorizontal: mvs(15),
  },
});
