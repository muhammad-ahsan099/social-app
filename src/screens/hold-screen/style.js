import { StyleSheet } from "react-native";
import colors from "../../services/colors";
import { mvs } from "../../services/metrices";

export const Signin_Styles = StyleSheet.create({
    container:{
     flex:1,
      backgroundColor:colors.background,
      paddingTop:mvs(0),
    },
    body:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    holdText:{
        lineHeight:mvs(23),marginTop:mvs(27),textAlign:'center',width:mvs(278)
    }
});