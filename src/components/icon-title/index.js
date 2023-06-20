import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as SVGS from '../../assets/svgs';
import { mvs } from '../../services/metrices';
import Regular from '../../typo-graphy/regular-text';
const IconTitle = ({
    icon='Rect',
    title='',
    style,
    onClick
}) => {
    const Icon=SVGS[icon]; 
    return (
        <TouchableOpacity onPress={onClick} style={{alignItems:'center',flex:1 ,...style}}>
            <Icon/>
            {!title?null:<Regular label={title} style={{marginTop: mvs(5),}}/>}
        </TouchableOpacity>
    );
};
export default IconTitle;