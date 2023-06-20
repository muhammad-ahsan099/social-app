import { StatusBar, StyleSheet ,Dimensions} from "react-native";
import colors from "../../../services/colors";
import { height, mvs, width } from "../../../services/metrices";
// import { SafeAreaView, } from 'react-native-safe-area-context';

export const Styles = StyleSheet.create({
    container:{
     flex:1,
      backgroundColor:colors.background,
    },
    body:{
        flex:1,
          height:height-(2*StatusBar.currentHeight),
        // width:width,
        // paddingHorizontal:mvs(22),
        // paddingTop:mvs(50),
        // paddingBottom:mvs(81)
     
    },
    // Later on in your styles..

    backgroundVideo: {
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      backgroundColor: colors.black,
    },
    image:{
      height:mvs(62),
      width:mvs(62),
      borderRadius:mvs(31),
      backgroundColor:colors.tranparency
    },
    top:{ position: 'absolute',top:mvs(25), alignSelf: 'center', backgroundColor: colors.transparent, width: '100%',paddingHorizontal:mvs(22) },
    
    bottom_container:
    {
   
    paddingVertical:mvs(20),
    paddingHorizontal:mvs(0),
    backgroundColor:colors.tranparency,
    borderTopLeftRadius:mvs(36),
    borderTopRightRadius:mvs(36),
    zIndex:1,
    left:0,
    right:0,
    position:'absolute',
    bottom:-10,
  },
  ddown:{ 
    width:mvs(120),
    paddingVertical:mvs(10),
    paddingHorizontal:mvs(10),
    backgroundColor:colors.lightBlack,
    borderRadius:10,
    borderColor:colors.lightBlue,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    borderWidth:0.3 
   },
   
});