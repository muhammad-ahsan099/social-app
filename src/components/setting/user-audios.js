import React, { useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import colors from '../../services/colors';
import { mvs } from '../../services/metrices';
import AudioItem from '../music/audio';
import Sound from 'react-native-sound';
import { useState } from 'react';
import { URLS } from '../../store/api-urls';
import Regular from '../../typo-graphy/regular-text';
import RNFetchBlob from 'rn-fetch-blob';
import AudioModal from '../modals/audio-modal';
const UserAudios = ({
  profileAudios,
  getProfileAudios,
  audioSpinner,
  loadMoreAudios,
  user_profile,
  imageUrl,
  showDelete = false,
  onDelete = arg => { },
}) => {
  const [isPlaying, setPlaying] = useState(false);
  const [currentTrackId, setCurrentTrackId] = useState(-1);
  const [sounds, setSounds] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedAudio, setSelectedAudio] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    //getSounds();
  }, []);
  const getSounds = async () => {
    var mySounds = [];
    for (var i = 0; i < user_profile?.audios?.length; i++) {
      const cachedFilePath = await cacheAudioFile(
        `${URLS.image_url}${user_profile?.audios[i]?.content?.path}`,
        user_profile?.audios[i]?.content?.path,
      );
      var sound = new Sound(`${cachedFilePath}`, Sound.MAIN_BUNDLE, error => {
        if (error) {
          return;
        }
      });
      mySounds.push(sound);
    }
    setSounds(mySounds);
    setLoading(false);
  };
  const playAudio = async path => {
    const cachedFilePath = await cacheAudioFile(
      `${URLS.image_url}${path}`,
      path,
    );
    setSelectedAudio(cachedFilePath);
    setShowModal(true);
  };
  const cacheAudioFile = async (audioUrl, name) => {
    const path = RNFetchBlob.fs.dirs.CacheDir + '/' + name;

    const fileExists = await RNFetchBlob.fs.exists(path);
    if (fileExists) {
      return path;
    }

    // Download and cache the file
    const response = await RNFetchBlob.config({
      fileCache: true,
      path,
    }).fetch('GET', audioUrl);

    return response.path();
  };
  return loading ? (
    <View style={styles.centered}>
      <Regular label={'Loading....'} style={{ marginTop: mvs(-50) }} />
    </View>
  ) : profileAudios?.results?.length > 0 ? (
    <View>
      <FlatList
        numColumns={1}
        contentContainerStyle={{
          paddingBottom: mvs(20),
          marginTop: mvs(5),
          paddingHorizontal: mvs(10),
        }}
        onEndReached={loadMoreAudios}
        onRefresh={getProfileAudios}
        refreshing={audioSpinner}
        key={1}
        data={profileAudios?.results}
        renderItem={({ item, index }) => (
          <AudioItem
            key={index}
            name={item?.content?.description || user_profile?.user?.userName}
            imageUrl={imageUrl}
            duration={item?.content?.createdAt}
            onClick={() => playAudio(`${item?.content?.path}`)}
            showDelete={showDelete}
            onDelete={() => onDelete(item?.content?.id)}
            isPlaying={index == currentTrackId ? true : false}
          />
        )}
      />
      <AudioModal
        visible={showModal}
        url={selectedAudio}
        onOk={() => setShowModal(false)}
      />
    </View>
  ) : (
    <View style={styles.centered}>
      <Regular
        label={'User Audios will appear here'}
        style={{ marginTop: mvs(-50) }}
      />
    </View>
  );
};
export default UserAudios;
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
  centered: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
});
