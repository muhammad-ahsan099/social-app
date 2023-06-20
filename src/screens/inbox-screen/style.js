import { StyleSheet } from "react-native";
import colors from "../../services/colors";
import { mvs } from "../../services/metrices";

export const Styles = StyleSheet.create({
    container:{
     flex:1,
      backgroundColor:colors.background,
      paddingTop:mvs(52),
    },
    body:{
        flex:1,
        paddingHorizontal:mvs(19),
        paddingTop:mvs(15),
    },
    itemStyle:{
        height:mvs(90),
        borderBottomColor:colors.secondary,
        borderWidth:1,
        justifyContent:'center',marginTop:0
    },
    search_box:{
        marginHorizontal:mvs(18),
        marginTop:mvs(20),
        marginBottom:mvs(20)
    },
    input_container:{
         paddingVertical:mvs(20)
    },
    recent_search:{
        height:mvs(180),
        borderBottomColor:colors.secondary,
        borderBottomWidth:1
    }
});