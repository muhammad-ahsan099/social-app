import React from 'react';
import {StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import colors from '../../services/colors';
import {mvs} from '../../services/metrices';
import Row from '../atoms/row';
import * as SVG from '../../assets/svgs';
const PrimaryInput = ({
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
  inputType = 'default',
}) => {
  const Icon = SVG[icon];
  const RightIcon = SVG[rightIcon];
  return (
    <Row style={{...styles.container, ...style}}>
      {Icon && <Icon />}
      <TextInput
        multiline={multiline}
        onChangeText={onChange}
        placeholder={placeholder}
        onTouchStart={onTouch}
        keyboardType={inputType}
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
  );
};
export default PrimaryInput;
const styles = StyleSheet.create({
  container: {
    height: mvs(42),
    borderRadius: mvs(32),
    ...colors.shadow,
    backgroundColor: colors.secondary,
    marginTop: mvs(14),
    alignItems: 'center',
    paddingHorizontal: mvs(12),
  },
  input: {
    flex: 1,
    color: colors.lightgrey1,
    paddingHorizontal: mvs(15),
  },
});
