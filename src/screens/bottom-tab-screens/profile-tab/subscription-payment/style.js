import {StyleSheet} from 'react-native';
import colors from '../../../../services/colors';
import {mvs} from '../../../../services/metrices';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: mvs(25),
  },
  body: {
    flex: 1,
    paddingHorizontal: mvs(23),
    paddingTop: mvs(10),
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
  image: {
    height: mvs(70),
    width: mvs(70),
    borderRadius: 1000,
  },
  profileView: {
    flex: 1,
    backgroundColor: colors.lightBlack,
    borderRadius: mvs(20),
    paddingHorizontal: mvs(15),
    marginLeft: mvs(5),
    paddingVertical: mvs(10),
  },
  paymentView: {
    backgroundColor: colors.primary,
    borderRadius: mvs(20),
    paddingHorizontal: mvs(15),
    marginLeft: mvs(5),
    paddingVertical: mvs(15),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: mvs(15),
  },
  active: {
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginHorizontal: mvs(5),
    borderRadius: mvs(10),
    paddingVertical: mvs(15),
  },
  inactive: {
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginHorizontal: mvs(5),
    borderRadius: mvs(10),
    paddingVertical: mvs(15),
  },
});
