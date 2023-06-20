import {StyleSheet} from 'react-native';
import colors from '../../../../services/colors';
import {mvs} from '../../../../services/metrices';

export const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: mvs(25),
  },
  body: {
    flex: 1,
    paddingHorizontal: mvs(18),
    paddingTop: mvs(20),
  },
  input_container: {
    marginTop: mvs(3),
  },
  image: {
    marginTop: mvs(15),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: colors.lightgrey1,
    height: mvs(200),
    borderRadius: mvs(15),
    backgroundColor: colors.secondary,
  },
  success: {
    flex: 1,
    paddingHorizontal: mvs(22),
    alignItems: 'center',
    justifyContent: 'center',
  },
  successText: {
    lineHeight: mvs(23),
    marginTop: mvs(11),
    textAlign: 'center',
  },
});
