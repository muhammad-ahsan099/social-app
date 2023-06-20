import React, {useRef, useState} from 'react';
import {
  AppState,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {BarIndicator} from 'react-native-indicators';
import Video from 'react-native-video';
import convertToProxyURL from 'react-native-video-cache';
import {SuperFan} from '../../../assets/svgs';
import colors from '../../../services/colors';
import SERVICES from '../../../services/common-services';
import {mvs} from '../../../services/metrices';
import {URLS} from '../../../store/api-urls';
import {content_types} from '../../../store/constant-data';
import Bold from '../../../typo-graphy/bold-text';
import IconTitle from '../../icon-title';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const SingleReel = ({
  item,
  index,
  currentIndex,
  isLikeByMe = false,
  isSavedByMe = false,
  isSubscribedByMe = false,
  userImage,
  userName,
  onSharePress = () => {},
  onCommentPress = () => {},
  onLikePress = () => {},
  onSavePress = () => {},
  onSubscribePress,
  onUserPress,
  isFocus,
  user_info,
}) => {
  const videoRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [isPause, setPause] = useState(false);
  const [like, setLike] = useState(isLikeByMe);
  const [save, setSave] = useState(isSavedByMe);
  const [isSubscribed, setSubscribed] = useState(isSubscribedByMe);
  const [totalLikes, setTotalLikes] = useState(item?.likes);

  const onBuffer = buffer => {
    if (buffer?.isBuffering) {
      console.log('buffring', buffer);
      setLoading(buffer?.isBuffering);
    } else {
      console.log('buffring stopped', buffer);
      setLoading(buffer?.isBuffering);
    }
  };
  const onError = error => {
    console.log('error', error);
  };
  const onLoadComplete = event => {};
  //console.log("App State--->",AppState.currentState)
  return item?.viewerType == 'Private' &&
    item?.userId != user_info?.id &&
    isSubscribed == false ? (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.98}
        onPress={() => setPause(!isPause)}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          backgroundColor: colors.lightBlack,
        }}>
        <View opacity={0.95} style={styles.private_view}>
          <TouchableOpacity style={styles.superfan} onPress={onSubscribePress}>
            <SuperFan />
            <Bold
              label={SERVICES.translate('seeContent')}
              color={colors.white}
              size={mvs(20)}
              numberOfLines={2}
              style={styles.superfanText}
            />
          </TouchableOpacity>
        </View>
        {item?.type == content_types.video ? (
          <Video
            repeat={false}
            playInBackground={false}
            playWhenInactive={false}
            resizeMode="cover"
            paused={true}
            source={{uri: convertToProxyURL(`${URLS.image_url}${item?.path}`)}}
            muted={false}
            style={styles.content}
          />
        ) : (
          <FastImage
            source={{uri: `${URLS.image_url}${item?.path}`}}
            style={styles.content}
          />
        )}
      </TouchableOpacity>
      <View style={styles.bottom_user_view}>
        <View style={{}}>
          <TouchableOpacity style={{width: 150}} onPress={onUserPress}>
            <View
              style={{width: 150, flexDirection: 'row', alignItems: 'center'}}>
              <View style={styles.profile_view}>
                <FastImage
                  source={{uri: `${URLS.image_url}${userImage}`}}
                  style={styles.profile}
                />
              </View>
              <Text style={{color: 'white', fontSize: 16}}>{userName}</Text>
            </View>
          </TouchableOpacity>
          <Text style={{color: 'white', fontSize: 14, marginHorizontal: 10}}>
            {item?.description}
          </Text>
        </View>
      </View>
    </View>
  ) : (
    <View style={styles.container}>
      {loading && item?.type == content_types.video && (
        <BarIndicator
          color={colors.primary}
          size={40}
          count={5}
          style={{position: 'absolute', top: '45%', zIndex: 1}}
        />
      )}
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => setPause(!isPause)}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
        }}>
        {item?.type == content_types.video ? (
          <Video
            videoRef={videoRef}
            onBuffer={onBuffer}
            onError={onError}
            onLoad={onLoadComplete}
            repeat={true}
            playInBackground={false}
            playWhenInactive={false}
            resizeMode="cover"
            paused={
              currentIndex == index &&
              isPause == false &&
              isFocus == true &&
              AppState.currentState == 'active'
                ? false
                : true
            }
            source={{uri: convertToProxyURL(`${URLS.image_url}${item?.path}`)}}
            muted={false}
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
            }}
            bufferConfig={{
              minBufferMs: 15000,
              maxBufferMs: 50000,
              bufferForPlaybackMs: 2500,
              bufferForPlaybackAfterRebufferMs: 5000,
            }}
          />
        ) : (
          <FastImage
            source={{uri: `${URLS.image_url}${item?.path}`}}
            style={{...styles.content, zIndex: 0}}
          />
        )}
      </TouchableOpacity>
      <View style={styles.bottom_user_view}>
        <View style={{}}>
          <TouchableOpacity style={{width: 150}} onPress={onUserPress}>
            <View
              style={{width: 150, flexDirection: 'row', alignItems: 'center'}}>
              <View style={styles.profile_view}>
                <FastImage
                  source={{uri: `${URLS.image_url}${userImage}`}}
                  style={styles.profile}
                />
              </View>
              <Text style={{color: 'white', fontSize: 16}}>{userName}</Text>
            </View>
          </TouchableOpacity>
          <Text style={{color: 'white', fontSize: 14, marginHorizontal: 10}}>
            {item?.description}
          </Text>
        </View>
      </View>
      <View style={styles.actions}>
        <IconTitle
          icon={like ? 'BlueHeart' : 'Heart'}
          title={totalLikes + ''}
          onClick={() => {
            onLikePress(item?.id, like);
            setLike(!like);
            if (like) {
              setTotalLikes(totalLikes - 1);
            } else {
              setTotalLikes(totalLikes + 1);
            }
          }}
        />
        <IconTitle
          icon="Chat"
          title={item?.comments + ''}
          style={{marginTop: 25}}
          onClick={() => onCommentPress(item?.id)}
        />
        <IconTitle
          icon="Share"
          title={''}
          onClick={() => onSharePress(item?.id, item?.path)}
          style={{marginTop: 25}}
        />
        <IconTitle
          icon={save ? 'BlueSave' : 'Save'}
          title={SERVICES.translate('save')}
          onClick={() => {
            onSavePress(item?.id, save);
            setSave(!save);
          }}
          style={{marginTop: 25}}
        />
      </View>
    </View>
  );
};

export default React.memo(SingleReel);
const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actions: {
    position: 'absolute',
    bottom: mvs(120),
    right: mvs(20),
    zIndex: 100,
  },
  profile: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 100,
  },
  profile_view: {
    width: mvs(32),
    height: mvs(32),
    borderRadius: 100,
    backgroundColor: 'white',
    margin: mvs(10),
  },
  bottom_user_view: {
    position: 'absolute',
    width: windowWidth,
    zIndex: 1,
    bottom: mvs(100), //edited
    padding: mvs(10),
  },
  lottie: {
    width: 100,
    height: 100,
  },
  private_view: {
    position: 'absolute',
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.lightBlack,
    justifyContent: 'center',
    alignItems: 'center',
  },
  superfan: {
    backgroundColor: colors.black,
    width: '65%',
    height: mvs(220),
    borderRadius: mvs(30),
    marginBottom: mvs(60),
    elevation: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  superfanText: {
    textAlign: 'center',
    width: mvs(180),
    marginTop: mvs(10),
  },
  content: {width: '100%', height: '100%', position: 'absolute', zIndex: -1},
});
