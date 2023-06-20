import {StyleSheet} from 'react-native';
import colors from '../../../../services/colors';
import {mvs, width} from '../../../../services/metrices';

export const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: mvs(20),
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
  wallet: {
    backgroundColor: colors.white,
    marginTop: mvs(30),
    borderRadius: mvs(20),
    paddingLeft: mvs(10),
  },
  blnc: {
    backgroundColor: colors.primary,
    paddingHorizontal: mvs(10),
    borderRadius: mvs(20),
  },
  button: {
    marginTop: mvs(40),
    marginHorizontal: mvs(25),
  },
  bottom: {
    backgroundColor: colors.background,
    borderBottomWidth: mvs(1),
    borderBottomColor: colors.grey,
  },
  cw: {
    marginTop: mvs(2),
    textAlign: 'center',
  },
  imageStyle: {
    alignSelf: 'center',
    height: mvs(300),
  },
  paymentView: {
    backgroundColor: colors.primary,
    borderRadius: mvs(20),
    paddingHorizontal: mvs(15),
    marginLeft: mvs(5),
    paddingVertical: mvs(15),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: mvs(35),
  },
});
