import { StyleSheet } from "react-native";
import colors from "../../services/colors";
import { mvs } from "../../services/metrices";

export const Signin_Styles = StyleSheet.create({
    container:{
     flex:1,
      backgroundColor:colors.background,
      paddingTop:mvs(172),
    },
    body:{
        flex:1,
        paddingHorizontal:mvs(22),
        alignItems:'center',
        justifyContent:'center'
    }
});