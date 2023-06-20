import React from 'react';
import { StyleSheet, View } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import colors from '../../../services/colors';
import { mvs, width } from '../../../services/metrices';
import Bold from '../../../typo-graphy/bold-text';
import PrimaryButton from '../../buttons/primary-button';
import PrimaryInput from '../../input/primary-input';
import Row from '../../atoms/row';
import SecondaryButton from './../../buttons/secondary-button';
const ReportModal = ({
    visible,
    Name='',
    title='',
    onTouch,
    onChangeText,
    ...props
}) => {
    return (
        <ReactNativeModal
            propagateSwipe
            isVisible={visible}
            onBackdropPress={() => setVisible(false)}
            onSwipeComplete={() => setVisible(false)}
            swipeDirection='up'
            style={{ margin: 0 }}>
            <View style={styles.container}>
                <Bold label={title} size={mvs(24)} color={colors.white} numberOfLines={1} style={{alignSelf:'center',marginTop:mvs(30)}}/>
                <Bold label={Name} size={mvs(18)} color={colors.lightgrey1} numberOfLines={1} style={{alignSelf:'center',marginTop:mvs(10)}}/>
                <PrimaryInput multiline={true} icon={"Description"} placeholder="Description" onChange={onChangeText} style={{height:mvs(100),alignItems:'flex-start',alignSelf:'center'}} inputStyle={{color:colors.white}}/>
                <PrimaryButton title='Report' onClick={onTouch}/>
            </View>
        </ReactNativeModal>
    );
};
export default ReportModal;
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        width: width,
        // backgroundColor: colors.white,
        borderTopLeftRadius: mvs(15),
        borderTopRightRadius: mvs(15),
        backgroundColor:colors.background,
        paddingHorizontal: mvs(17),
        paddingBottom:mvs(17),
        alignSelf: 'center',
    },
   
});