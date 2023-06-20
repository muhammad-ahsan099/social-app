import React, {useRef} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {mvs} from '../../services/metrices';
import {URLS} from '../../store/api-urls';
import convertToProxyURL from 'react-native-video-cache';
import {useNavigation} from '@react-navigation/native';
import Video from 'react-native-video';
import Row from '../atoms/row';
import {PlayBank, SuperFan} from '../../assets/svgs';
import Bold from '../../typo-graphy/bold-text';
import Regular from '../../typo-graphy/regular-text';
import colors from '../../services/colors';
import {useTranslation} from 'react-i18next';
const UserVideo = ({item, showPrivate = true, user_profile, index}) => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const videoRef = useRef(null);
  return (
    <TouchableOpacity
      style={styles.photoStyle}
      onPress={() =>
        navigation.navigate('UserVideos', {
          currentIndex: index,
          videos: user_profile?.videos,
        })
      }>
      {showPrivate == true && item?.content?.viewerType == 'Private' && (
        <View style={styles.private_view}>
          <TouchableOpacity
            style={styles.superfan}
            onPress={() =>
              navigation.navigate('Subscribe', {
                id: user_profile?.user?.id,
              })
            }>
            <SuperFan width={mvs(47)} height={mvs(47)} />
            <Bold
              label={t('common:seeContent')}
              color={colors.white}
              size={mvs(10)}
              numberOfLines={2}
              style={styles.superfanText}
            />
          </TouchableOpacity>
        </View>
      )}
      <Video
        ref={videoRef}
        source={{
          uri: convertToProxyURL(`${URLS.image_url}${item?.content?.path}`),
        }}
        style={styles.backgroundVideo} 
        muted={true}
        repeat={false}
        resizeMode={'cover'}
        rate={1.0}
        paused={
          item?.content?.viewerType == 'Private' && showPrivate == true
            ? true
            : false
        }
        ignoreSilentSwitch={'obey'}
      />
      <Row
        style={{
          alignSelf: 'flex-end',
          alignItems: 'center',
          marginTop: 10,
          marginRight: 10,
        }}>
        <PlayBank />
        {/* <Regular label={'121'} size={12.3} style={{marginLeft: mvs(8)}} /> */}
      </Row>
    </TouchableOpacity>
  );
};
export default UserVideo;
const styles = StyleSheet.create({
  photoStyle: {
    width: '33.33%',
    height: mvs(163),
    borderWidth: 0.1,
    borderColor: colors.white,
  },
  backgroundVideo: {
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'stretch',
    bottom: 0,
    right: 0,
  },
  private_view: {
    position: 'absolute',
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.lightBlack,
    zIndex: 100,
  },
  superfan: {
    backgroundColor: colors.black,
    width: '100%',
    height: mvs(163),
    marginBottom: mvs(60),
    elevation: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.3,
    borderColor: colors.white,
  },
  superfanText: {
    textAlign: 'center',
    width: mvs(100),
    marginTop: mvs(10),
  },
});
