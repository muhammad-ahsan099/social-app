import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../../services/colors';
import { mvs } from '../../services/metrices';
import Bold from '../../typo-graphy/bold-text';
import Regular from '../../typo-graphy/regular-text';

const MenuButton = ({
    title="Button",
    style,
    titleStyle,
    onClick,
    ...props
}) => {
  
    return (
       <TouchableOpacity style={{...styles.container,...style}} onPress={onClick}>
            <Regular label={title} size={20} style={{...styles.textStyle,...titleStyle}}/>
       </TouchableOpacity>
    );
};
export default MenuButton;
const styles = StyleSheet.create({
    container: {
        backgroundColor:colors.lightBlack,
        justifyContent:'center',
        alignItems:'center',
        height:mvs(60),
        borderRadius:mvs(10)
    },
    textStyle:{
      color:colors.white
    }
});