import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import colors from '../../services/colors';
import {mvs} from '../../services/metrices';
import ImagePlaceholder from '../atoms/image-placeholder';
import {STORAGE_URL, URLS} from '../../store/api-urls';
import Row from '../atoms/row';
import Regular from '../../typo-graphy/regular-text';
import Video from 'react-native-video';
import {Play} from '../../assets/svgs';
import convertToProxyURL from 'react-native-video-cache';
import FastImage from 'react-native-fast-image';
const Left = ({
  type = 'text',
  imageUrl = '',
  content = 'Hello! my dear friend how are u i am waiting',
  messageFile,
}) => {
  const [isplaying, setPlaying] = useState(false);
  return (
    <Row style={{...styles.container}}>
      <FastImage
        // source={{uri: `${URLS.image_url}${imageUrl}`}}
        source={{uri: `${STORAGE_URL}${imageUrl}`}}
        style={type == 'text' ? styles.image : styles.videoImage}
      />
      {type == 'text' ? (
        <View style={styles.textView}>
          <Regular
            size={12}
            label={content}
            color={colors.black}
            numberOfLines={10}
          />
        </View>
      ) : (
        <TouchableOpacity
          style={styles.videoItem}
          onPress={() => setPlaying(!isplaying)}>
          <Video
            // source={{uri: convertToProxyURL(`${URLS.image_url}${messageFile}`)}}
            source={{uri: convertToProxyURL(`${STORAGE_URL}${messageFile}`)}}
            style={styles.backgroundVideo}
            muted={!isplaying}
            repeat={false}
            paused={!isplaying}
            resizeMode={'cover'}
            rate={1.0}
            ignoreSilentSwitch={'obey'}
          />
          {!isplaying && <Play />}
        </TouchableOpacity>
      )}
    </Row>
  );
};
export default Left;
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: mvs(8),
    alignSelf: 'flex-start',
  },
  image: {
    height: mvs(31),
    width: mvs(31),
    borderRadius: mvs(1000),
    marginTop: mvs(10),
  },
  videoImage: {
    height: mvs(31),
    width: mvs(31),
    borderRadius: mvs(1000),
    alignSelf: 'flex-start',
  },
  textView: {
    padding: mvs(12),
    backgroundColor: colors.white,
    borderRadius: mvs(8),
    marginHorizontal: mvs(8),
    maxWidth: '50%',
    marginTop: mvs(11),
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
  videoItem: {
    flex: 1,
    maxWidth: '50%',
    borderWidth: 0.3,
    borderColor: colors.white,
    height: mvs(300),
    justifyContent: 'center',
    padding: mvs(8),
    alignItems: 'center',
    marginHorizontal: mvs(8),
  },
});
