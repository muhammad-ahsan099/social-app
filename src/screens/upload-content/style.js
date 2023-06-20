import { StyleSheet } from "react-native";
import colors from "../../services/colors";
import { mvs } from "../../services/metrices";
// import colors from "../../../../services/colors";
// import { mvs } from "../../../../services/metrices";

export const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingTop: mvs(25),
    },
    input_container: {
        marginTop: mvs(3),
    },
    image: {
        marginTop: mvs(42),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: colors.grey,
        height: mvs(200),
        borderRadius: mvs(10),
        marginHorizontal: mvs(18),
        backgroundColor: colors.secondary
    },
    button:
    {
        maginVertical: mvs(45),
        marginHorizontal: mvs(18)
    },
    description:
    {
        height: 100,
        alignItems: 'flex-start'
    },
    input:
    {

        marginHorizontal: mvs(18)
    }
});