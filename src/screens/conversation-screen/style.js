import {StyleSheet} from 'react-native';
import colors from '../../services/colors';
import {mvs} from '../../services/metrices';

export const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: mvs(10),
  },
  body: {
    flex: 1,
    paddingHorizontal: mvs(27),
    paddingTop: mvs(15),
    paddingBottom: mvs(100),
  },
  bottomView: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
  },
  sendMessageView: {
    height: mvs(64),
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopColor: colors.lightgrey1,
    borderTopWidth: 1,
    paddingHorizontal: mvs(18),
    backgroundColor: colors.background,
  },
  backgroundVideo: {
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'stretch',
    bottom: 0,
    right: 0,
  },
  videoItem: {
    flex: 1,
    maxWidth: '100%',
    borderWidth: 0.3,
    borderColor: colors.white,
    height: mvs(200),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
