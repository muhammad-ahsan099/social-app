import React, {useState} from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import {mvs, width} from '../../services/metrices';
import {styles} from './style';
import {img1, img2, collage} from '../../assets/images';
import colors from '../../services/colors';
import PrimaryButton from './../../components/buttons/primary-button';
import Bold from './../../typo-graphy/bold-text';
import Medium from '../../typo-graphy/medium-text';
import Regular from '../../typo-graphy/regular-text';
import SemiBold from './../../typo-graphy/semibold-text';
import LinearGradient from 'react-native-linear-gradient';
import {useIsFocused} from '@react-navigation/native';
import SERVICES from '../../services/common-services';
import {useTranslation} from 'react-i18next';
const Onboarding = ({navigation, route}) => {
  const {t} = useTranslation();
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const isFocus = useIsFocused();
  console.log(currentIndex);
  const ref = React.useRef(null);
  const [current, setCurrent] = React.useState(0);
  const [data, setData] = useState([
    {
      key: 1,
      title: SERVICES.translate('create'),
      description: SERVICES.translate('yourCommunityOf'),
      details: SERVICES.translate('superfans'), //create your community of superfans
      image: img1,
    },
    {
      key: 2,
      title: SERVICES.translate('becomeA'),
      description: SERVICES.translate('superfansOfYour'),
      details: SERVICES.translate('favouriteCreators'),
      image: img2,
    },
    {
      key: 3,
      title: SERVICES.translate('selectContent'),
      description: SERVICES.translate('typeBasedOn'),
      details: SERVICES.translate('interests'),
      image: collage,
    },
  ]);
  const renderItem = ({item}) => {
    let img = item?.image;
    //  if(item?.key===3)
    // {
    //    if(current===0){
    //     img=img30;
    //    }
    //    else if(current===1){
    //     img=img31;
    //    }
    //    else if(current===2){
    //     img=img32;
    //    }
    //    else if(current===3){
    //     img=img33;
    //    }
    //    else if(current===4){
    //     img=img34;
    //    }
    //    else if(current===5){
    //     img=img35;
    //    }
    // }
    return (
      <View style={styles.slide}>
        <Image
          source={img}
          resizeMode="stretch"
          style={{height: '100%', width: width}}
        />
        <LinearGradient
          start={{x: 1, y: 0}}
          end={{x: 0, y: 1}}
          colors={[`${colors.black}50`, `${colors.black}50`]}
          style={{
            position: 'absolute',
            ...StyleSheet.absoluteFillObject,
          }}></LinearGradient>
      </View>
    );
  };
  _renderPagination = activeIndex => {
    return (
      <View style={styles.paginationContainer}>
        <LinearGradient
          start={{x: 1, y: 0}}
          end={{x: 0, y: 1}}
          colors={[`${colors.black}`, `${colors.black}90`, `${colors.black}`]}
          style={styles.linearGradient}>
          <View>
            <View style={styles.paginationDots}>
              {data.length > 1 &&
                data.map((_, i) => (
                  <TouchableOpacity
                    key={i}
                    style={[
                      styles.dot,
                      i === activeIndex
                        ? {backgroundColor: colors.primary}
                        : {backgroundColor: colors.white},
                    ]}
                    onPress={() => ref?.current?.slider?.goToSlide(i, true)}
                  />
                ))}
            </View>
            <View style={{alignItems: 'center'}}>
              <Medium
                size={mvs(18)}
                color={colors.white}
                label={data[activeIndex]?.title}
                style={{textAlign: 'center'}}
              />
              <Bold size={mvs(25)} label={data[activeIndex]?.description} />
              <Medium
                size={mvs(16)}
                color={colors.white}
                label={data[activeIndex]?.details}
                style={{textAlign: 'center'}}
              />
              <PrimaryButton
                onClick={() => navigation?.navigate('Signup')}
                style={{width: mvs(264), fontSize: mvs(70), height: mvs(42)}}
                title={t('common:createAnAccount')}
              />
              <Regular
                style={{marginTop: mvs(10), fontSize: mvs(12)}}
                label={t('common:ifHaveAnAccount')}>
                <SemiBold
                  onPress={() => navigation?.navigate('Signin')}
                  style={{color: colors.primary}}
                  label={t('common:signIn')}
                />
              </Regular>
            </View>
          </View>
        </LinearGradient>
      </View>
    );
  };

  React.useEffect(() => {
    const timeoutID = setTimeout(() => {
      if (isFocus) {
        setCurrent(current >= 5 ? 0 : current + 1);
      }
    }, 3000);
    return () => {
      clearTimeout(timeoutID);
    };
  }, [current, isFocus]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={'black'} />
      {/* <StatusBar hidden/> */}
      <AppIntroSlider
        style={{}}
        // showSkipButton={true}
        onSlideChange={(a, b) => {
          console.log('a,b', a, b);
          setCurrentIndex(a);
          // if(a>b){
          //   setCurrentIndex(a)
          //   console.log('a= ',a);
          // }else{
          //   console.log('b= ',b);
          //   setCurrentIndex(b)
          // }
        }}
        ref={ref}
        showPrevButton
        dotStyle={styles.dotStyles}
        activeDotStyle={styles.sliderStyle}
        renderItem={renderItem}
        data={data}
        // renderSkipButton={() => {
        //   return (
        //     <Text
        //       onPress={() => navigation.navigate('SocialLogin')}
        //       style={styles.skipText}>
        //       Skip
        //     </Text>
        //   );
        // }}
        renderPagination={_renderPagination}
        // renderNextButton={() => {
        //   return (
        //     <PrimaryButton onClick={() => {
        //       ref?.current?.goToSlide(currentIndex + 1)
        //       setCurrentIndex(currentIndex + 1)
        //     }} textStyle={{ color: colors.white }} title={'Next'} style={{ ...styles.nextButton }} />
        //   );
        // }}
        // renderPrevButton={() => {
        //   return (
        //     <PrimaryButton onClick={() => {
        //       ref?.current?.goToSlide(currentIndex - 1);
        //       setCurrentIndex(currentIndex - 1)
        //     }} textStyle={{ color: colors.B383838 }} title={'Back'} style={{ ...styles.nextButton, backgroundColor: colors.white }} />
        //   );
        // }}
      />
    </View>
  );
};
export default Onboarding;
