import {StyleSheet} from 'react-native';
import colors from '../../../services/colors';
import {mvs} from '../../../services/metrices';

export const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: mvs(12),
  },
  body: {
    flex: 1,
    //paddingHorizontal:mvs(19),
    paddingTop: mvs(10),
  },
  interest_item: {
    paddingHorizontal: mvs(25),
    marginLeft: mvs(18),
    borderRadius: mvs(40),
    borderColor: colors.white,
    paddingVertical: mvs(1),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    height: mvs(38),
  },
  search_box: {
    marginHorizontal: mvs(18),
    marginTop: mvs(10),
    marginBottom: mvs(20),
  },
  input_container: {
    paddingVertical: mvs(20),
  },
  recent_search: {
    height: mvs(180),
    borderBottomColor: colors.secondary,
    borderBottomWidth: 1,
  },
});
