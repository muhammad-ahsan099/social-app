import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../../services/colors';
import { mvs } from '../../services/metrices';
import Bold from '../../typo-graphy/bold-text';
import * as SVG from '../../assets/svgs'
const SocialButton = ({
    title="Button",
    style,
    titleStyle,
    onClick,
    icon="Apple",
    ...props
}) => {
     const Icon=SVG[icon];
    return (
       <TouchableOpacity style={{...styles.container,...style}} onPress={onClick}>
            <Icon/>
            <Bold label={title} size={16} style={{...styles.textStyle,...titleStyle}}/>
       </TouchableOpacity>
    );
};
export default SocialButton;
const styles = StyleSheet.create({
    container: {
      height:mvs(44),
      borderRadius:mvs(8),
      ...colors.shadow,
      backgroundColor:colors.background,
      marginTop:mvs(8),
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center',
      borderWidth:1,
      borderColor:colors.lightgrey1
    },
    textStyle:{
      color:colors.white,
      marginLeft:mvs(8)
    }
});