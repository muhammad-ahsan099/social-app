import React from 'react';
import { StyleSheet, TouchableOpacity ,View} from 'react-native';
import colors from '../../services/colors';
import { mvs } from '../../services/metrices';
import Regular from '../../typo-graphy/regular-text';
import ImagePlaceholder from '../atoms/image-placeholder';
import { User } from '../../assets/images';
import SemiBold from '../../typo-graphy/semibold-text';
import Row from '../atoms/row';
import { CircularDotMenu } from '../../assets/svgs';
const SubscriptionItem = ({
    name="@username23",
    payment='$12.00/mo',
    renewDate='renews on 1/05/22',
    style,
    onClick,
    imageUrl="",
    ...props
}) => {
    return (
       <TouchableOpacity  onPress={onClick}>
             <Row style={{...styles.container,...style}}>
                <ImagePlaceholder uri={User} containerStyle={{...styles.image}}/>
                 <View style={{...styles.info}}>
                    <SemiBold label={name} size={15} color={colors.lightgrey1} style={{}}/>
                    <Regular label={payment} size={15} color={colors.white} style={{marginTop:mvs(4)}}/>
                    <Regular label={renewDate} color={colors.lightgrey1}
                     size={11} style={{marginTop:mvs(4)}}/>
                </View>
                <TouchableOpacity>
                    <CircularDotMenu/>
                </TouchableOpacity>
            </Row>
       </TouchableOpacity>
    );
};
export default SubscriptionItem;
const styles = StyleSheet.create({
    container: {
      alignItems:'center',
      paddingHorizontal:mvs(20),
      marginTop:mvs(18),
      height:mvs(100),
      borderWidth:1,
      borderRadius:mvs(10),
      borderColor:colors.lightgrey1,
    },
    image:{
      height:mvs(52),
      width:mvs(52),
      borderRadius:mvs(1000)
    },
    info:{
        marginHorizontal:mvs(14),
        flex:1,
    }
});