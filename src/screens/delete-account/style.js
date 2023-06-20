import {StyleSheet} from 'react-native';
import colors from '../../services/colors';
import {mvs, width} from '../../services/metrices';
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
    paddingBottom: mvs(60),
  },
  row: {
    alignItems: 'center',
    marginHorizontal: mvs(45),
    marginVertical: mvs(20),
  },
  text: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: mvs(20),
    marginVertical: mvs(-15),
  },

  line: {
    borderTopWidth: 1,
    borderColor: colors.lightgrey1,
    marginHorizontal: mvs(18),
    height: 0,
  },
  line1: {
    borderTopWidth: 1,
    borderColor: colors.lightgrey1,
    marginVertical: mvs(20),
    marginHorizontal: mvs(18),
    height: 0,
  },
  row1: {
    marginVertical: mvs(60),
    marginHorizontal: mvs(30),
  },
  row2: {
    marginVertical: mvs(15),
    marginHorizontal: mvs(30),
  },
  text1: {
    marginVertical: mvs(20),
    marginHorizontal: mvs(18),
    textAlign: 'center',
  },
  text2: {
    marginHorizontal: mvs(18),
    lineHeight: mvs(24),
    textAlign: 'center',
  },
});
