import {number} from 'prop-types';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { fonts } from '../assets/fonts';
import { mvs } from '../services/metrices';
import colors from './../services/colors';

type FcProps = {
  label?: string | number;
  numberOfLines?: number;
  color?: string;
  lineHeight?:number
  size?: number ;
  onPress?: () => void;
  style?: object;
  children?: any;
};
const Regular: React.FC<FcProps> = ({
  label,
  numberOfLines = 1,
  size=mvs(15),
  color=colors.white,
  style,
  children,
  lineHeight,
  ...props
}) => {
  return (
    <Text
      numberOfLines={numberOfLines}
      {...props}
      style={{...styles.label,lineHeight:lineHeight, color: color, fontSize: size, ...style}}>
      {label}
      {children}
    </Text>
  );
};

export default Regular;

const styles = StyleSheet.create({
  label: {
    fontFamily: fonts.regular,
    fontSize: mvs(15),
    color: colors.headerTitle, //default color
  },
});
