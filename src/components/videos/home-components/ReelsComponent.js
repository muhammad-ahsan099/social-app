import React, {useRef, useState, useCallback} from 'react';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import SingleReel from './SingleReel';
import GestureRecognizer from 'react-native-swipe-gestures';
import {useNavigation} from '@react-navigation/native';

const ReelsComponent = ({
  videos,
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

  const handleChangeIndexValue = ({index}) => {
    setCurrentIndex(index);
  };

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
        <SingleReel
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

  return (
    <SwiperFlatList
      vertical={true}
      scrollToIndex={currentIndex}
      onChangeIndex={handleChangeIndexValue}
      data={videos}
      ref={listRef}
      renderItem={renderItem}
      keyExtractor={(item, index) => index}
    />
  );
};

export default React.memo(ReelsComponent);
