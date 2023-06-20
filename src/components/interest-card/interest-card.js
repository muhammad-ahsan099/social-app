import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../../services/colors';
import { mvs } from '../../services/metrices';
import * as SVG from '../../assets/svgs/interest-icons'
import Regular from '../../typo-graphy/regular-text';
const InterestCard = ({
    title="Sports",
    style,
    titleStyle,
    onClick,
    icon="Sport",
    isSelected=false,
    ...props
}) => {

    const Icon=SVG[icon]
    return (
       <TouchableOpacity style={{...styles.container,borderWidth:isSelected?1:0,...style}} onPress={onClick}>
             <Icon/>
            <Regular label={title} size={16} style={{...styles.textStyle,color:isSelected?colors.white:colors.lightBlue1,...titleStyle}}/>
       </TouchableOpacity>
    );
};
export default InterestCard;
const styles = StyleSheet.create({
    container: {
      flex:1,
      height:mvs(134),
      borderRadius:mvs(8),
      ...colors.shadow,
      borderColor:colors.white,
      backgroundColor:colors.secondary,
      marginVertical:mvs(15),
      alignItems:'center',
      justifyContent:'center',marginRight:mvs(18)
    },
    textStyle:{
      color:colors.lightBlue1,
      marginTop:mvs(10)
    }
});