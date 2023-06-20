import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../../services/colors';
import { mvs } from '../../services/metrices';
import Bold from '../../typo-graphy/bold-text';

const PrimaryButton = ({
    title="Button",
    style,
    titleStyle,
    onClick,
    ...props
}) => {
  
    return (
       <TouchableOpacity style={{...styles.container,...style}} onPress={onClick}>
            <Bold label={title} size={16} style={{...styles.textStyle,...titleStyle}}/>
       </TouchableOpacity>
    );
};
export default PrimaryButton;
const styles = StyleSheet.create({
    container: {
      height:mvs(50),
      borderRadius:mvs(100),
      ...colors.shadow,
      backgroundColor:colors.primary,
      marginTop:mvs(26),
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center'
    },
    textStyle:{
      color:colors.white
    }
});