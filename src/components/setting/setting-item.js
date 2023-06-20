import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {mvs} from '../../services/metrices';
import Row from '../atoms/row';
import * as SVG from '../../assets/svgs/setting-icons';
import Regular from '../../typo-graphy/regular-text';
const SettingItem = ({
  icon = 'Bank',
  title = 'Bank Details',
  style,
  titleStyle,
  onClick,
  rightIcon,
  onRightIconClick,
}) => {
  const Icon = SVG[icon];
  const RightIcon = SVG[rightIcon];
  return (
    <TouchableOpacity onPress={onClick}>
      <Row style={{...styles.container, ...style}}>
        {Icon && <Icon width={mvs(23)} />}
        <Regular
          label={title}
          size={15}
          numberOfLines={2}
          style={{...styles.textStyle, ...titleStyle}}
        />
        {RightIcon && (
          <TouchableOpacity onPress={onRightIconClick}>
            <RightIcon />
          </TouchableOpacity>
        )}
      </Row>
    </TouchableOpacity>
  );
};
export default SettingItem;
const styles = StyleSheet.create({
  container: {
    height: mvs(52),
    alignItems: 'center',
  },
  textStyle: {
    flex: 1,
    marginHorizontal: mvs(10),
  },
});
