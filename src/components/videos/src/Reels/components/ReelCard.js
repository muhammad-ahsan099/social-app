// packages Imports
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {View, StyleSheet, Dimensions, Text, Pressable, TouchableOpacity} from 'react-native';
import Slider from '@react-native-community/slider';
import Video from 'react-native-video';
import helper from '../utils/helper';
import { mvs } from '../../../../../services/metrices';
import IconTitle from '../../../../icon-title';
import Row from '../../../../atoms/row';
import Light from '../../../../../typo-graphy/light-text';
import colors from '../../../../../services/colors';
import ImagePlaceholder from '../../../../atoms/image-placeholder';
import SemiBold from '../../../../../typo-graphy/semibold-text';
import Regular from '../../../../../typo-graphy/regular-text';
import { Drop } from '../../../../../assets/svgs';
import { URLS } from '../../../../../store/api-urls';
import AnimatedLoader from "react-native-animated-loader";
// Screen Dimensions

const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;

const ReelCard=({
  content,
  userName,
  isLikeByMe,
  isSavedByMe,
  userImage,
  ViewableItem,
  liked = false,
  disliked = false,
  index,

  // Container Props
  backgroundColor = 'black',

  // Header Props
  headerTitle = 'Reels',
  headerIconName,
  headerIconColor,
  headerIconSize,
  headerIcon,
  headerComponent,
  onHeaderIconPress = () => {},

  // Options Props
  optionsComponent,
  pauseOnOptionsShow = true,
  onSharePress = () => {},
  onCommentPress = () => {},
  onLikePress = () => {},
  onSavePress = () => {},

  // Player Props
  onFinishPlaying = () => {},

  // Slider Props
  minimumTrackTintColor = 'white',
  maximumTrackTintColor = 'grey',
  thumbTintColor = 'white',

  // Time Props
  timeElapsedColor = 'white',
  totalTimeColor = 'white',
  refresh=false
}) =>{
  // ref for Video Player
  const VideoPlayer = useRef(null);
  const [spinner,setSpinner]=useState(false);
  // States
  const [VideoDimensions, SetVideoDimensions] = useState({
    width: ScreenWidth,
    height: ScreenWidth,
  });
  const [Progress, SetProgress] = useState(0);
  const [Duration, SetDuration] = useState(0);
  const [Paused, SetPaused] = useState(false);
  const [ShowOptions, SetShowOptions] = useState(false);
  //console.log("--------------Screen Refreshed--------------",refresh)
  const[save]=useState(isSavedByMe)
  // Play/Pause video according to viisibility
  useEffect(() => {
    setSpinner(true)
    setInterval(() => {
      setSpinner(false)
    }, 5000);
    if (ViewableItem === content?.id) SetPaused(false);
    else SetPaused(true);
  }, [ViewableItem]);

  // Pause when use toggle options to True
  useEffect(() => {
    setSpinner(false)
    if (pauseOnOptionsShow) {
      if (ShowOptions) SetPaused(true);
      else SetPaused(false);
    }
  }, [ShowOptions, pauseOnOptionsShow,save]);

  // Callback for Seek Update
  const SeekUpdate = useCallback(
    async seekTime => {
      try {
        if (VideoPlayer.current)
          VideoPlayer.current.seek((seekTime * Duration) / 100 / 1000);
      } catch (error) {}
    },
    [Duration, ShowOptions],
  );

  // Callback for PlayBackStatusUpdate
  const PlayBackStatusUpdate = playbackStatus => {
    try {
      let currentTime = Math.round(playbackStatus.currentTime);
      let duration = Math.round(playbackStatus.seekableDuration);
      if (currentTime)
        if (duration) SetProgress((currentTime / duration) * 100);
    } catch (error) {}
  };
  // function for getting video dimensions on load complete
  const onLoadComplete = event => {
    const {naturalSize} = event;

    try {
      const naturalWidth = naturalSize.width;
      const naturalHeight = naturalSize.height;
      if (naturalWidth > naturalHeight) {
        SetVideoDimensions({
          width: ScreenWidth,
          height: ScreenWidth * (naturalHeight / naturalWidth),
        });
      } else {
        SetVideoDimensions({
          width: ScreenHeight * (naturalWidth / naturalHeight),
          height: ScreenHeight,
        });
      }
      SetDuration(event.duration * 1000);
    } catch (error) {}
  };

  // function for showing options
  const onMiddlePress = async () => {
    try {
      SetShowOptions(!ShowOptions);
    } catch (error) {}
  };

  // fuction to Go back 10 seconds
  const onFirstHalfPress = async () => {
    try {
      if (VideoPlayer.current) {
        let toSeek = Math.floor((Progress * Duration) / 100) / 1000;
        if (toSeek > 10) VideoPlayer.current.seek(toSeek - 10);
      }
    } catch (error) {}
  };

  // fuction to skip 10 seconds
  const onSecondHalfPress = async () => {
    try {
      if (VideoPlayer.current) {
        let toSeek = Math.floor((Progress * Duration) / 100) / 1000;
        VideoPlayer.current.seek(toSeek + 10);
      }
    } catch (error) {}
  };

  // Manage error here
  const videoError = error => {
    console.log(error)
  };
  const video={uri:`${URLS.image_url}${content.path}`}
  // useMemo for Slider url.imgeurl
  const GetSlider = useMemo(
    () => (
      <View style={styles.SliderContainer}>
        <Text style={[styles.TimeOne, {color: timeElapsedColor}]}>
          {helper.GetDurationFormat(Math.floor((Progress * Duration) / 100))}
        </Text>
        <Slider
          style={{height: 40, width: '100%'}}
          minimumValue={0}
          maximumValue={100}
          minimumTrackTintColor={minimumTrackTintColor}
          maximumTrackTintColor={maximumTrackTintColor}
          thumbTintColor={thumbTintColor}
          value={Progress}
          onSlidingComplete={data => SeekUpdate(data)}
        />
        <Text style={[styles.TimeTwo, {color: totalTimeColor}]}>
          {helper.GetDurationFormat(Duration || 0)}
        </Text>
      </View>
    ),
    [
      Duration,
      Progress,
      ShowOptions,
      thumbTintColor,
      totalTimeColor,
      timeElapsedColor,
      minimumTrackTintColor,
      maximumTrackTintColor,
    ],
  );

  // useMemo for Slider
  const GetHeader = useMemo(
    () => (
      <View style={styles.top}>
              <Row alignItems='center'>
                <ImagePlaceholder uri={{uri:`${URLS.image_url}${userImage}`}} containerStyle={styles.image} />
                <Light size={mvs(12)} label={userName} 
                 style={{ marginLeft: mvs(10), position: 'absolute', bottom: 10, left: mvs(60) }} />

                <SemiBold style={{ marginTop: mvs(-10) }} size={mvs(15)} label={userName} />

                <TouchableOpacity style={styles.ddown}>
                  <Regular color={colors.white} style={{
                  }} label={'Home'} />
                  <Drop />
                </TouchableOpacity>

              </Row>
     </View>
    ),
    [
      ShowOptions,
      headerComponent,
      headerIcon,
      headerIconColor,
      headerIconName,
      headerIconSize,
      headerTitle,
      onHeaderIconPress,
    ],
  );

  // useMemo for Options
  // console.log("----"+content.comments)
  const GetButtons = useMemo(
    () => (
      <View style={{...styles.OptionsContainer}}>
        {optionsComponent ? null : (
          <>
        <IconTitle icon='Rect' style={{ marginTop: mvs(3)}} />
        <IconTitle icon='Chat' title={content?.comments+''} onClick={()=>onCommentPress(content?.id)}/>
        <IconTitle icon={isLikeByMe?'BlueHeart':'Heart'} title={content?.likes+''} onClick={()=>onLikePress(content?.id,isLikeByMe)}/>
        <IconTitle icon='Share' title={''} onClick={()=>onSharePress(content?.id,content?.path)}/>
        <IconTitle icon={isSavedByMe?'BlueSave':'Save'} title='Save' onClick={()=>onSavePress(content?.id,isSavedByMe)}/>
          </>
        )}
      </View>
    ),
    [ShowOptions, optionsComponent, liked, disliked],
  );

  return (
    <Pressable
      style={[styles.container, {backgroundColor: backgroundColor}]}
      onPress={onMiddlePress}>
      <Pressable style={styles.FirstHalf} onPress={onFirstHalfPress} />
      <Pressable style={styles.SecondHalf} onPress={onSecondHalfPress} />
      <Video
        ref={VideoPlayer}
        source={video}
        style={VideoDimensions}
        resizeMode="contain"
        onError={videoError}
        playInBackground={false}
        progressUpdateInterval={1000}
        paused={Paused}
        muted={false}
        repeat={true}
        onLoad={onLoadComplete}
        onProgress={PlayBackStatusUpdate}
        onEnd={() => onFinishPlaying(index)}
      />

      {true ? (
        <>
          {GetHeader}
          {GetButtons}
          {/* {GetSlider} */}
        </>
      ) : null}
      <AnimatedLoader
        visible={spinner}
        // overlayColor="rgba(255,255,255,0.75)"
        source={require("../../../../../assets/gif/play.json")}
        animationStyle={styles.lottie}
        // speed={1}
      />
    </Pressable>
  );
}

// Exports
export default ReelCard;

// Stylesheet
const styles = StyleSheet.create({
  container: {
    width: ScreenWidth,
    height: ScreenHeight,
    justifyContent: 'center',
  },
  SliderContainer: {
    position: 'absolute',
    width: ScreenWidth,
    height: 55,
    bottom: 0,
    zIndex: 100,
  },
  lottie: {
    width: 100,
    height: 100
  },
  TimeOne: {
    color: 'grey',
    position: 'absolute',
    left: 15,
    fontSize: 13,
    bottom: 5,
  },
  TimeTwo: {
    color: 'grey',
    position: 'absolute',
    right: 15,
    fontSize: 13,
    bottom: 5,
  },
  OptionsContainer: {
    position: 'absolute',
    right: 20,
    bottom: 100,
    zIndex: 100,
    height:mvs(350),
    justifyContent:'space-between'
  },
  HeaderContainer: {
    position: 'absolute',
    width: ScreenWidth,
    top: 0,
    height: 50,
    zIndex: 100,
  },
  FirstHalf: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: ScreenWidth * 0.25,
    height: ScreenHeight,
    zIndex: 99,
  },
  SecondHalf: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: ScreenWidth * 0.25,
    height: ScreenHeight,
    zIndex: 99,
  },
  bottom_container:
  {
  paddingVertical:mvs(20),
  paddingHorizontal:mvs(0),
  backgroundColor:colors.tranparency,
  borderTopLeftRadius:mvs(36),
  borderTopRightRadius:mvs(36),
  zIndex:1,
  left:0,
  right:0,
  bottom:0,
},
image:{
  height:mvs(62),
  width:mvs(62),
  borderRadius:mvs(31),
  backgroundColor:colors.tranparency
},
top:{
  position: 'absolute',
  width: ScreenWidth,
  top: 0,
  height: 60,
  zIndex: 100,
   alignSelf: 'center', 
   backgroundColor: colors.transparent,
   paddingHorizontal:mvs(22),
   },
   ddown:{ 
    backgroundColor:colors.tranparency, 
    width: mvs(90), 
    borderRadius: mvs(5), 
    paddingHorizontal: mvs(10),
    alignItems: 'center', 
    paddingVertical: mvs(5),
    flexDirection: 'row',
    justifyContent: 'space-between'
   }
});
