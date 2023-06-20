import { StyleSheet } from "react-native";
import colors from "../../../../services/colors";
import { mvs } from "../../../../services/metrices";

export const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    topView: {
        flex: 2.5, backgroundColor: colors.sky,
    },
    body: {
        flex: 7.5,
        paddingHorizontal: mvs(22),
        paddingTop: mvs(67),
    },
    cameraButton: {
        alignSelf: 'center',
        position: 'absolute',
        bottom: mvs(-55),
        zIndex: 1
    },
    input_container: {
        paddingVertical: mvs(20)
    },
    line: {
        height: 1,
        borderWidth: 1,
        borderColor: colors.lightgrey1,
        marginVertical: mvs(18)
    },
    imgStyle: {
        width: mvs(90),
        height: mvs(90),
        borderRadius: mvs(1000),
        backgroundColor: '#000',
        justifyContent: 'center', alignItems: 'center'
    }

});