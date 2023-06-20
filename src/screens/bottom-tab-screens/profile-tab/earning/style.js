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
    paddingHorizontal: mvs(23),
  },
  cameraButton: {
    alignSelf: 'center',
    height: mvs(74),
    width: mvs(74),
    backgroundColor: colors.secondary,
    borderRadius: mvs(1000),
    justifyContent: 'center',
    alignItems: 'center',
  },
  input_container: {
    paddingVertical: mvs(20),
  },
  earn: {
    backgroundColor: colors.white,
    marginTop: mvs(50),
    borderRadius: mvs(10),
    marginHorizontal: mvs(20),
  },
  blnc: {
    marginTop: mvs(10),
    paddingBottom: mvs(40),
    borderBottomWidth: mvs(1),
    borderColor: colors.white,
  },
  balance: {
    backgroundColor: colors.primary,
    //height: '100%',
    paddingVertical: mvs(45),
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: mvs(10),
    borderTopLeftRadius: mvs(20),
    borderBottomLeftRadius: mvs(20),
  },
});
