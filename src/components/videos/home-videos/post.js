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
import {
  BlueHeart,
  BlueSave,
  Chat,
  Heart,
  Play,
  Save,
  Share,
  Speaker,
  SpeakerOff,
  SuperFan,
} from '../../../assets/svgs';
import colors from '../../../services/colors';
import SERVICES from '../../../services/common-services';
import {mvs} from '../../../services/metrices';
import {URLS} from '../../../store/api-urls';
import {content_types} from '../../../store/constant-data';
import Bold from '../../../typo-graphy/bold-text';
import IconTitle from '../../icon-title';
import {useTranslation} from 'react-i18next';
import UserInfoHeader from './user-info-header';
import Regular from '../../../typo-graphy/regular-text';
import Row from '../../atoms/row';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Post = ({
  item,
  index,
  currentIndex,
  isLikeByMe = false,
  isSavedByMe = false,
  isExpiredSubscriptions=false,
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
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isMuted, setMuted] = useState(true);
  const [like, setLike] = useState(isLikeByMe);
  const [save, setSave] = useState(isSavedByMe);
  const [isSubscribed] = useState(isSubscribedByMe);
  const [isExpiredSubscription] = useState(isExpiredSubscriptions);
  const [totalLikes, setTotalLikes] = useState(item?.likes);
  const [postHeight, setPostHeight] = useState(windowHeight / 3);
  const {t} = useTranslation();
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
  const onLoadComplete = event => {
    console.log('Event is ====> ', event?.naturalSize);
    const height = event?.naturalSize?.height;
    const width = event?.naturalSize?.width;
    const ratio = height / width;
    setPostHeight(ratio * windowWidth);
  };
  //console.log("App State--->",AppState.currentState)

  return (
    <View>
      <UserInfoHeader
        userImage={userImage}
        userName={userName}
        onUserPress={onUserPress}
        createdAt={item?.createdAt}
      />
      {item?.viewerType == 'Private' &&
      item?.userId != user_info?.id &&
      // isSubscribed == false || !isExpiredSubscription ? (
      isSubscribed == false || isExpiredSubscription == true ? (

        <View style={styles.container}>
          <TouchableOpacity activeOpacity={0.98} style={styles.private}>
            <View opacity={0.95} style={styles.private_view}>
              <TouchableOpacity
                style={styles.superfan}
                onPress={onSubscribePress}>
                <SuperFan />
                <Bold
                  label={t('common:seeContent')}
                  color={colors.white}
                  size={mvs(20)}
                  numberOfLines={2}
                  style={styles.superfanText}
                />
              </TouchableOpacity>
            </View>
            <View style={{height: mvs(350)}}>
              {item?.type == content_types.video ? (
                <Video
                  repeat={false}
                  playInBackground={false}
                  playWhenInactive={false}
                  resizeMode="cover"
                  paused={true}
                  source={{
                    uri: convertToProxyURL(`${URLS.image_url}${item?.path}`),
                  }}
                  muted={false}
                  style={styles.content}
                />
              ) : (
                <FastImage
                  source={{uri: `${URLS.image_url}${item?.path}`}}
                  style={styles.content}
                />
              )}
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <View
          style={{
            ...styles.container,
            height: postHeight,
          }}>
          {loading && item?.type == content_types.video && (
            <BarIndicator
              color={colors.primary}
              size={mvs(40)}
              count={5}
              style={styles.loader}
            />
          )}
          {!loading &&
            item?.type == content_types.video &&
            !isPlaying &&
            item?.id == currentIndex && (
              <TouchableOpacity
                style={{...styles.playIcon, top: postHeight / 2 - 30}}
                onPress={() => setIsPlaying(!isPlaying)}>
                <Play />
              </TouchableOpacity>
            )}
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => setIsPlaying(!isPlaying)}
            style={{
              width: '100%',
              height: '100%',
            }}>
            {item?.type == content_types.video && (
              <TouchableOpacity
                style={styles.speaker}
                onPress={() => setMuted(!isMuted)}>
                {isMuted ? <SpeakerOff /> : <Speaker />}
              </TouchableOpacity>
            )}
            {item?.type == content_types.video ? (
              <Video
                //videoRef={videoRef}
                onBuffer={onBuffer}
                onError={onError}
                onLoad={onLoadComplete}
                repeat={true}
                playInBackground={false}
                playWhenInactive={false}
                //resizeMode="stretch"
                paused={!isPlaying || item?.id != currentIndex}
                source={{
                  uri: convertToProxyURL(`${URLS.image_url}${item?.path}`),
                }}
                muted={isMuted}
                style={{
                  width: '100%',
                  height: '100%',
                }}
              />
            ) : (
              <FastImage
                source={{uri: `${URLS.image_url}${item?.path}`}}
                style={{...styles.content}}
                resizeMode="contain"
                onLoad={event => {
                  const {width, height} = event.nativeEvent;
                  const ratio = height / width;
                  setPostHeight(ratio * windowWidth);
                }}
              />
            )}
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.actions}>
        <Row alignItems="center" style={{width: '20%'}}>
          <TouchableOpacity
            onPress={() => {
              onLikePress(item?.id, like);
              setLike(!like);
              if (like) {
                setTotalLikes(totalLikes - 1);
              } else {
                setTotalLikes(totalLikes + 1);
              }
            }}>
            {like ? <BlueHeart /> : <Heart />}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onCommentPress(item?.id)}>
            <Chat />
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={() => onSharePress(item?.id, item?.path)}>
            <Share />
          </TouchableOpacity> */}
        </Row>
        {/* <TouchableOpacity
          onPress={() => {
            onSavePress(item?.id, save);
            setSave(!save);
          }}>
          {save ? <BlueSave /> : <Save />}
        </TouchableOpacity> */}
      </View>
      <Regular
        style={styles.likes}
        label={totalLikes + 'likes'}
        numberOfLines={2}
      />
      <Regular
        style={styles.description}
        label={item?.description}
        numberOfLines={2}
      />
      {item?.comments > 0 && (
        <TouchableOpacity onPress={() => onCommentPress(item?.id)}>
          <Regular
            style={{
              ...styles.comments,
              color: colors.lightgrey1,
              marginTop: mvs(2),
            }}
            label={`View all ${item?.comments} comments`}
            numberOfLines={2}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default React.memo(Post);
const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: mvs(460),
  },
  actions: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: mvs(15),
    justifyContent: 'space-between',
    paddingHorizontal: mvs(10),
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
  private: {
    width: '100%',
    height: mvs(450),
    position: 'absolute',
    backgroundColor: colors.lightBlack,
    alignItems: 'center',
    justifyContent: 'center',
  },
  private_view: {
    width: '100%',
    height: '100%',
    backgroundColor: colors.lightBlack,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  superfan: {
    backgroundColor: colors.black,
    width: '65%',
    height: mvs(220),
    borderRadius: mvs(30),
    elevation: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  superfanText: {
    textAlign: 'center',
    width: mvs(180),
    marginTop: mvs(10),
  },
  content: {
    width: '100%',
    height: '100%',
  },
  loader: {
    position: 'absolute',
    alignSelf: 'center',
    top: '45%',
    zIndex: 1,
  },
  playIcon: {
    position: 'absolute',
    alignSelf: 'center',
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: mvs(15),
    backgroundColor: colors.primary,
    borderRadius: mvs(1000),
    //marginTop: -50,
  },
  description: {
    color: colors.white,
    fontSize: mvs(14),
    marginHorizontal: mvs(10),
    marginTop: mvs(5),
    width: '100%',
  },
  likes: {
    color: colors.white,
    fontSize: mvs(16),
    fontWeight: 'bold',
    marginHorizontal: mvs(10),
  },
  comments: {
    color: colors.lightgrey1,
    fontSize: mvs(16),
    fontWeight: '500',
    marginHorizontal: mvs(10),
    marginTop: mvs(2),
  },
  speaker: {
    position: 'absolute',
    bottom: mvs(20),
    right: mvs(7),
    zIndex: 1003,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightBlack,
    padding: mvs(7),
    borderRadius: mvs(1000),
  },
});
