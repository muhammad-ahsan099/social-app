import { StyleSheet } from "react-native";
import colors from "../../services/colors";
import { mvs } from "../../services/metrices";

export const Styles = StyleSheet.create({
    container:{
     flex:1,
      backgroundColor:colors.background,
      paddingTop:mvs(25),
    },
    body:{
        flex:1,
        paddingHorizontal:mvs(22),
        paddingTop:mvs(150),
    },
    cameraButton:{
        alignSelf: 'center',
        height:mvs(74),
        width:mvs(74),
        backgroundColor:colors.secondary,
        borderRadius:mvs(1000),
        justifyContent:'center',
        alignItems: 'center',
    },
    input_container:{
        
        paddingVertical:mvs(20)
    }
});