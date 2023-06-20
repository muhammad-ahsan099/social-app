import { StyleSheet } from "react-native";
import colors from "../../../../services/colors";
import { mvs, width } from "../../../../services/metrices";

export const Styles = StyleSheet.create({
    container:{
     flex:1,
      backgroundColor:colors.background,
      paddingTop:mvs(25),
    },
    body:{
        flex:1,
        paddingHorizontal:mvs(23),
        paddingBottom:mvs(20)
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
    },
    wallet:
    {
        backgroundColor:colors.white,
        marginTop:mvs(30),
        borderRadius:mvs(20),
        paddingLeft:mvs(10),
    },
    blnc:
    {
        backgroundColor:colors.primary,
        paddingHorizontal:mvs(10),
        paddingVertical:mvs(50),
        borderRadius:mvs(20),
    },
    button:
    {
        marginTop:mvs(40),
        marginHorizontal:mvs(35)
    },
    bottom:
    {
        backgroundColor:colors.background,
        borderBottomWidth:mvs(1),
        borderBottomColor:colors.grey
    },
    bottom1:
    {
        marginLeft:mvs(-13),
        width:150
    },
    cw:
    {
        marginTop:mvs(20),
        textAlign:'center',
    },
    imageStyle:
    {
        alignSelf:'center',
        width:width-50,
        height:mvs(380),
        marginTop:mvs(-30)
    }
});