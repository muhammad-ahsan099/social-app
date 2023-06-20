import { StyleSheet } from "react-native";
import colors from "../../../../services/colors";
import { mvs } from "../../../../services/metrices";

export const Styles = StyleSheet.create({
    container:{
     flex:1,
      backgroundColor:colors.background,
      paddingTop:mvs(50),
    },
    body:{
        flex:1,
        paddingHorizontal:mvs(27),
        paddingTop:mvs(15),
        paddingBottom:mvs(100)
    },
    sendMessageView:{
        height:mvs(64),
        alignItems:'center',
        justifyContent:'space-between',
        borderTopColor:colors.lightgrey1,
        borderTopWidth:1,
        position:'absolute',
        width:'100%',
        bottom:0,
        paddingHorizontal:mvs(18),
        backgroundColor:colors.background
    }
});