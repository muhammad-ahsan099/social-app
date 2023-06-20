import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../services/colors';
const TransparentView = ({
    style,
    children,
}) => {
    return (
        <View style={[styles.container,style]}>
            {children}
        </View>
    );
};
export default TransparentView;
const styles = StyleSheet.create({
    container:{
        backgroundColor:colors.transparent,
        position:'absolute'
    }
});