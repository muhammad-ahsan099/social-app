import {StyleSheet} from 'react-native';
import colors from '../../../services/colors';
import {mvs} from '../../../services/metrices';

export const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: mvs(25),
  },
  body: {
    flex: 1,
    paddingHorizontal: mvs(18),
    paddingTop: mvs(5),
  },
  tabView: {
    alignSelf: 'center',
    width: '95%',
    backgroundColor: colors.lightBlack,
    height: mvs(32),
    borderRadius: 15,
    flexDirection: 'row',
    marginBottom: mvs(20),
    alignItems: 'center',
    marginTop: mvs(12),
    marginHorizontal: mvs(18),
  },
  selectedTabButton: {
    backgroundColor: colors.lightgrey1,
    width: '50%',
    borderRadius: 7,
    height: mvs(32),
    marginTop: 0,
  },
  unSelectedTabButton: {
    backgroundColor: colors.lightBlack,
    width: '50%',
    height: mvs(32),
    marginTop: 0,
    borderRadius: 7,
  },
  textStylye: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '500',
  },
  itemStyle: {
    height: mvs(90),
    borderBottomColor: colors.secondary,
    borderBottomWidth: 1,
    justifyContent: 'center',
    marginTop: 0,
  },
  centered: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
});
