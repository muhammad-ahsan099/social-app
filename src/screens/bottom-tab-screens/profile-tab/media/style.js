import { StyleSheet } from "react-native";
import colors from "../../../../services/colors";
import { mvs } from "../../../../services/metrices";

export const Styles = StyleSheet.create({
    container:{
      flex:1,
      backgroundColor:colors.background,
    },
    body:{
        flex:1,
        backgroundColor:colors.background,
        paddingTop:mvs(34)
    },
    backgroundVideo: {
        height:'100%',
        position: "absolute",
        top: 0,
        left: 0,
        alignItems: "stretch",
        bottom: 0,
        right: 0
    },
    videItem:{
        flex:1,
        borderWidth:0.3,
        borderColor:colors.white,
        height:mvs(182),
        justifyContent:'space-between',padding:mvs(8)
    }
    
});