import React, { useEffect, useRef, useState } from 'react';
import { Animated, TextInput, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Ad, EmojiWhite, InviteUser, UpArrow } from '../../../assets/svgs';
import { mvs } from '../../../services/metrices';
import Medium from '../../../typo-graphy/medium-text';
import Regular from '../../../typo-graphy/regular-text';
import ImagePlaceholder from '../../atoms/image-placeholder';
import Row from '../../atoms/row';
import colors from './../../../services/colors';
const CollapsibleView = ({isExpand=false}) => {
 
  const list = [0, 1, 2,3,4,5,6];
  const [collapsed, setCollapsed] = useState(true);
  const [rotate, setRotate] = useState(true);
  const animationHeight = useRef(new Animated.Value(0)).current;
  const rotation = useRef(new Animated.Value(0)).current;

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
    setRotate(!rotate);
  };

  const collapseView = () => {
    Animated.timing(animationHeight, {
      duration: 500,
      toValue: mvs(58),
      useNativeDriver: false
    }).start();
  };

  const expandView = () => {
    Animated.timing(animationHeight, {
      duration: 500,
      toValue: mvs(300),
      useNativeDriver: false
    }).start();
  };

  const Down = () => {
    Animated.timing(rotation, {
      duration: 300,
      toValue: 1,
      useNativeDriver: true
    }).start();
  };

  const Right = () => {
    Animated.timing(rotation, {
      duration: 300,
      toValue: 0,
      useNativeDriver: true
    }).start();
  };

  useEffect(() => {
    if (collapsed) {
      collapseView();
    } else {
      expandView();
    }
  }, [collapsed]);

  useEffect(() => {
    if (rotate) {
      Right();
    } else {
      Down();
    }
  }, [rotate]);

  const rotationValue = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });
  React.useEffect(()=>{
    toggleCollapsed();
  },[isExpand])

  return (
      <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, }}>
        {collapsed && <TouchableOpacity style={{ alignSelf: 'flex-end', paddingHorizontal: mvs(18), marginBottom: mvs(11) }}>
          <InviteUser />
        </TouchableOpacity>}
        <Animated.View style={{ maxHeight: animationHeight, backgroundColor: `${colors.black}70`, }}>
          <View style={{ paddingVertical: mvs(13), alignItems: 'center', }}>
            <TouchableOpacity onPress={toggleCollapsed} style={{ position: 'absolute', right: mvs(18), top: mvs(15) }}>
              <Animated.View style={{ transform: [{ rotate: rotationValue }] }}>
                <UpArrow />
              </Animated.View>
            </TouchableOpacity>
            <View>
              <Regular style={{ alignSelf: 'center' }} label={'57 comments'} />
            </View>
            {!collapsed && <Animated.View style={{ width: '100%',marginTop:mvs(10) }}>
              <ScrollView contentContainerStyle={{paddingBottom:mvs(40),paddingHorizontal:mvs(18)}}>
                {list?.map((item, index) => <TouchableOpacity style={{ flexDirection: 'row', marginTop: mvs(20) }}>
                  <ImagePlaceholder containerStyle={{ height: mvs(32), width: mvs(32), borderRadius: mvs(16), }} />
                  <View style={{ marginLeft: mvs(11) }}>
                    <Medium color={colors.BBBDC3} size={mvs(13)} label={'martini_rond'} />
                    <Regular size={mvs(15)} label={'How neatly I write the date in my book  '} />
                  </View>
                </TouchableOpacity>)}
              </ScrollView>
            </Animated.View>}
          </View>
        </Animated.View>
       {!isExpand&&<Row style={{ backgroundColor: colors.B091831, paddingTop: mvs(15), paddingHorizontal: mvs(18), height: mvs(83) }}>
          <TextInput placeholderTextColor={colors.B6B7992} style={{ flex: 1, color: colors.B6B7992, padding: 0 }} placeholder={'Add comment...'} />
          <Row>
            <TouchableOpacity style={{ marginLeft: mvs(22) }}>
              <Ad />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: mvs(22) }}>
              <EmojiWhite />
            </TouchableOpacity>
          </Row>
        </Row>}
      </View>
  );
};

export default CollapsibleView;
