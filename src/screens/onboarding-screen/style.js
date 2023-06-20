import {StyleSheet} from 'react-native';
import { mvs } from '../../services/metrices';
import colors from './../../services/colors';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  slide: {
    width: '100%',
    alignItems:'center',
    // height: mvs(300),
  },
  linearGradient:{
    borderTopLeftRadius:mvs(30),
    borderTopRightRadius:mvs(30),
    paddingBottom:mvs(40),

  },
  slideImage: {
    alignSelf: 'center',
    marginTop: mvs(94),
    width: '94%',
    resizeMode: 'contain',
    // height: '40%',
  },
  slideTitle: {
    fontSize: 14,
    paddingHorizontal: mvs(20),
    marginTop: mvs(55),
    color: colors.black,
    // fontFamily: fonts.extraBold,
  },
  slideText: {
    paddingHorizontal: mvs(22),
    marginTop: mvs(20),
    color: colors.black,
    // fontFamily: fonts.semiBold,
    fontSize: 14,
  },
  nextButton: {
    width: mvs(144),
    height: mvs(51),
    backgroundColor: colors.primary,
    borderRadius: mvs(15),
  },
  txtButton: {
    textAlign: 'center',
    // fontFamily: fonts.semiBold,
    color: colors.black,
    fontSize:14,
    marginTop: mvs(15),
  },
  sliderStyle: {
    backgroundColor: colors.B383838,
    marginBottom: mvs(220),
    width: mvs(10),
    height: mvs(10),
  },
  dotStyles: {
    marginBottom: mvs(220),
    backgroundColor: colors.border,
    width: mvs(10),
    height: mvs(10),
  },
  skipText: {
    // fontFamily: fonts.bold,
    color: colors.black,
    fontSize: 14,
    marginTop: mvs(20),
    marginLeft: mvs(14),
  },


  slide: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: colors.black,
  },
  image: {
    width: 320,
    height: 320,
    marginVertical: 32,
  },
  text: {
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  title: {
    fontSize: 22,
    color: 'white',
    textAlign: 'center',
  },
  paginationContainer: {
    position: 'absolute',
    width:'100%',
    borderTopLeftRadius:mvs(30),
    borderTopRightRadius:mvs(30),
    bottom: 0,
  },
  paginationDots: {
    height: 16,
    margin: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
  },
  buttonContainer: {
    // flexDirection: 'row',
    marginHorizontal: 24,
  },
  button: {
    flex: 1,
    paddingVertical: 20,
    marginHorizontal: 8,
    borderRadius: 24,
    backgroundColor: '#1cb278',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
  },
});
