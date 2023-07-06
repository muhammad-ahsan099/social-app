import React, {useEffect, useRef, useState} from 'react';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import UserSingleReel from './UserSingleReel';
import {useNavigation} from '@react-navigation/native';
const UserReelsComponent = ({
  videos,
  onSharePress = () => {},
  onCommentPress = () => {},
  onLikePress = () => {},
  onSavePress = () => {},
  onDeletePress = () => {},
  isFocus,
  currentVideoIndex,
  user_info,
}) => {
  const [currentIndex, setCurrentIndex] = useState(currentVideoIndex);
  const listRef = useRef(null);
  const navigation = useNavigation();
  const handleChangeIndexValue = ({index}) => {
    setCurrentIndex(index);
  };
  useEffect(() => {
    listRef?.current?.scrollToIndex({index: currentIndex});
  }, []);
  const viewProfile = item => {
    navigation.navigate('UserProfile', {
      isMe: false,
      id: item?.content?.userId,
    });
  };
  const subscribe = async item => {
    navigation.navigate('Subscribe', {
      id: item?.content?.userId,
    });
  };
  const renderItem = ({item, index}) => {
    console.log("Index: ", index, "Current Index: ", currentIndex);
    return(
    <UserSingleReel
      item={item?.content}
      index={index}
      user_info={user_info}
      isLikeByMe={item?.isLikeByMe}
      isSavedByMe={item?.isSavedByMe}
      isExpiredSubscriptions={item?.isExpired}
      isSubscribedByMe={item?.isSubscribedByMe}
      userImage={item?.userImage}
      userName={item?.userName}
      currentIndex={currentIndex}
      onCommentPress={id => onCommentPress(id)}
      onDeletePress={() => onDeletePress(item)}
      onLikePress={(id, isLikeByMe) => onLikePress(id, isLikeByMe)}
      onSavePress={(id, isSavedByMe) => onSavePress(id, isSavedByMe)}
      onSharePress={(id, path) => onSharePress(id, path)}
      onUserPress={() => viewProfile(item)}
      onSubscribePress={() => subscribe(item)}
      isFocus={isFocus}
    />
  )};
  return (
    <SwiperFlatList
      vertical={true}
      onChangeIndex={handleChangeIndexValue}
      data={videos}
      ref={listRef}
      renderItem={renderItem}
      keyExtractor={(item, index) => index}
    />
  );
};

export default React.memo(UserReelsComponent);
