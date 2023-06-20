import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, FlatList} from 'react-native';
import ReelCard from './ReelCard';
import { useNavigation } from '@react-navigation/native';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
const ScreenHeight = Dimensions.get('window').height;

const Reels=({
  videos,
  backgroundColor = 'black',
  headerTitle,
  headerIconName,
  headerIconColor,
  headerIconSize,
  headerIcon,
  headerComponent,
  onHeaderIconPress,
  optionsComponent,
  pauseOnOptionsShow,
  onSharePress,
  onCommentPress,
  onLikePress,
  onSavePress,
  onFinishPlaying,
  minimumTrackTintColor,
  maximumTrackTintColor,
  thumbTintColor,
  timeElapsedColor,
  totalTimeColor,
  refresh=false
})=> {
  const [isRefresh,setRefresh]=useState(refresh)
  useEffect(()=>{
  },[isRefresh])
  const navigation = useNavigation();
  const FlatlistRef = useRef(null);
  const [ViewableItem, SetViewableItem] = useState('');
  const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 70});
  const applyProps = {
    backgroundColor: backgroundColor,
    headerTitle: headerTitle,
    headerIconName: headerIconName,
    headerIconColor: headerIconColor,
    headerIconSize: headerIconSize,
    headerIcon: headerIcon,
    headerComponent: headerComponent,
    onHeaderIconPress: onHeaderIconPress,
    optionsComponent: optionsComponent,
    pauseOnOptionsShow: pauseOnOptionsShow,
    onSharePress: onSharePress,
    onCommentPress: onCommentPress,
    onLikePress: onLikePress,
    onSavePress: onSavePress,
    onFinishPlaying: onFinishPlaying,
    minimumTrackTintColor: minimumTrackTintColor,
    maximumTrackTintColor: maximumTrackTintColor,
    thumbTintColor: thumbTintColor,
    timeElapsedColor: timeElapsedColor,
    totalTimeColor: totalTimeColor,
  };

  // Viewable configuration
  const onViewRef = useRef(viewableItems => {
    if (viewableItems?.viewableItems?.length > 0)
      SetViewableItem(viewableItems.viewableItems[0].item?.content?.id || 0);
  });
  const onSwipeLeft=(item)=>
  {
    navigation.navigate("UserProfile",{isMe:false,id:item?.content?.userId})
  }
  const onSwipeRight=(id)=>
  {
    navigation.navigate("Video");
  }
  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80
  };
  return (
    <FlatList
      ref={FlatlistRef}
      data={videos}
      contentContainerStyle={{flexGrow:1}}
      keyExtractor={item => item.id}
      renderItem={({item, index}) => (
        <GestureRecognizer
          key={index}
          onSwipeLeft={() => onSwipeLeft(item)}
          onSwipeRight={() => onSwipeRight(item)}
          config={config}
          >
          <ReelCard
          {...item}
          refresh={refresh}
          index={index}
          content={item?.content}
          isLikeByMe={item?.isLikeByMe}
          isSavedByMe={item?.isSavedByMe}
          ViewableItem={ViewableItem}
          onFinishPlaying={index => {
            if (index !== videos.length - 1) {
              // @ts-ignore: Object is possibly 'null'.
              FlatlistRef.current.scrollToIndex({
                index: index + 1,
              });
            }
          }}
          {...applyProps}
        />
        </GestureRecognizer>
         
      )}
      getItemLayout={(_data, index) => ({
        length: ScreenHeight,
        offset: ScreenHeight * index,
        index,
      })}
      pagingEnabled
      decelerationRate={0.9}
      onViewableItemsChanged={onViewRef.current}
      viewabilityConfig={viewConfigRef.current}
    />
  );
}

export default Reels;
