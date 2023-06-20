import React, {useRef, useState, useCallback, useEffect} from 'react';
import {Alert, FlatList} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';
import {useNavigation} from '@react-navigation/native';
import Post from './post';
import {mvs} from '../../../services/metrices';
import {content_types} from '../../../store/constant-data';
const HomeVideos = ({
  videos,
  loadMoreVideos = () => {},
  onSharePress = () => {},
  onCommentPress = () => {},
  onLikePress = () => {},
  onSavePress = () => {},
  isFocus,
  user_info,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigation = useNavigation();
  const listRef = useRef(null);
  const viewConfigRef = React.useRef({viewAreaCoveragePercentThreshold: 80});
  const viewProfile = item => {
    if (item?.content?.userId == user_info?.id) {
      navigation.navigate('Profile');
    } else {
      navigation.navigate('OtherUserProfile', {
        isMe: false,
        id: item?.content?.userId,
      });
    }
  };
  const subscribe = async item => {
    navigation.navigate('Subscribe', {
      id: item?.content?.userId,
    });
  };

  const openCamera = () => {
    navigation.navigate('Video');
  };

  const config = {
    velocityThreshold: 1.0,
    directionalOffsetThreshold: 40,
  };
  const renderItem = useCallback(
    ({item, index}) => (
      <GestureRecognizer
        key={index}
        onSwipeLeft={() => viewProfile(item)}
        onSwipeRight={() => openCamera(item)}
        config={config}>
        <Post
          item={item?.content}
          index={index}
          isLikeByMe={item?.isLikeByMe}
          isSavedByMe={item?.isSavedByMe}
          isSubscribedByMe={item?.isSubscribedByMe}
          userImage={item?.userImage}
          userName={item?.userName}
          currentIndex={currentIndex}
          onCommentPress={id => onCommentPress(id)}
          onLikePress={(id, isLikeByMe) => onLikePress(id, isLikeByMe)}
          onSavePress={(id, isSavedByMe) => onSavePress(id, isSavedByMe)}
          onSharePress={(id, path) => onSharePress(id, path)}
          onUserPress={() => viewProfile(item)}
          onSubscribePress={() => subscribe(item)}
          isFocus={isFocus}
          user_info={user_info}
        />
      </GestureRecognizer>
    ),
    [
      currentIndex,
      isFocus,
      onCommentPress,
      onLikePress,
      onSavePress,
      onSharePress,
      openCamera,
      subscribe,
      viewProfile,
      user_info,
    ],
  );
  const onViewCallBack = React.useCallback(viewableItems => {
    var items = viewableItems?.viewableItems;
    console.log("assssssss");
    items?.forEach(item => {
      const post = item?.item;
      if (post) {
        if (item?.isViewable) {
          setCurrentIndex(post?.content?.id);
        } else {
        }
      }
    });
  }, []);
  return (
    <FlatList
      key={'flatlist'}
      data={videos}
      contentContainerStyle={{paddingBottom: mvs(130)}}
      ref={listRef}
      renderItem={renderItem}
      keyExtractor={(item, index) => index}
      onViewableItemsChanged={onViewCallBack}
      initialNumToRender={videos?.length}
      viewabilityConfig={viewConfigRef.current}
      onEndReached={loadMoreVideos}
      onEndReachedThreshold={0.5}
    />
  );
};

export default React.memo(HomeVideos);
