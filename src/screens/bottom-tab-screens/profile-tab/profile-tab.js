import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { FlatList, StatusBar, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { CircularDotMenu, Dots, Photos, WhiteBack } from '../../../assets/svgs';
import { Music } from '../../../assets/svgs/setting-icons';
import Row from '../../../components/atoms/row';
import ImageModal from '../../../components/modals/image-modal';
import ProfileMenu from '../../../components/setting/menu';
import UserAudios from '../../../components/setting/user-audios';
import UserImage from '../../../components/setting/user-image';
import UserInfo from '../../../components/setting/user-info';
import UserVideo from '../../../components/setting/user-video';
import colors from '../../../services/colors';
import { mvs } from '../../../services/metrices';
import APP_API from '../../../store/api-calls';
import { URLS } from '../../../store/api-urls';
import { content_types } from '../../../store/constant-data';
import Bold from '../../../typo-graphy/bold-text';
import { Styles as styles } from './style';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import Regular from '../../../typo-graphy/regular-text';
const ProfileTab = props => {
  const { user_info, user_profile, profile, delete_content } = props;
  const navigation = useNavigation();
  const [numCols] = useState(3);
  const [menu, setMenu] = useState(false);
  const [imageUri, setImageUri] = useState('');
  const [imageObject, setImageObject] = useState({});
  const [showImage, setShowImage] = useState(false);
  const [photos, setPhotos] = useState(true);
  const [spinner, setSpinner] = useState(false);
  useFocusEffect(
    React.useCallback(() => {
      get_profile();
    }, []),
  );
  const get_profile = async () => {
    await profile(user_info?.id);
  };
  function showFullImage(uri, item) {
    setImageUri(uri);
    setImageObject(item);
    setShowImage(true);
  }
  const deleteContent = async () => {
    setShowImage(false);
    setSpinner(true);
    await delete_content(imageObject?.content?.id);
    await profile(user_info?.id);
    setSpinner(false);
  };
  const deleteAudioContent = async id => {
    setSpinner(true);
    await delete_content(id);
    await profile(user_info?.id);
    setSpinner(false);
  };
  return (
    <View style={{ ...styles.container }}>
      {/* <StatusBar barStyle="light-content" backgroundColor={'black'} /> */}
      <Spinner visible={spinner} textContent={''} textStyle={{ color: '#FFF' }} />
      <Row style={styles.header_back}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <WhiteBack />
        </TouchableOpacity>
        <Bold label={user_profile?.user?.userName} color={colors.white} />
        <TouchableOpacity onPress={() => setMenu(true)}>
          <CircularDotMenu />
        </TouchableOpacity>
      </Row>
      <View style={styles.body}>
        <UserInfo user_profile={user_profile} />
        <View style={styles.bottomTab}>
          <TouchableOpacity
            onPress={() => setPhotos(true)}
            style={photos ? styles.active : styles.inactive}>
            <Photos />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setPhotos(false)}
            style={photos ? styles.inactive : styles.active}>
            <Music />
          </TouchableOpacity>
        </View>
      </View>
      {photos ? (
        user_profile?.videos?.length > 0 ? (
          <FlatList
            numColumns={numCols}
            contentContainerStyle={{
              paddingBottom: mvs(20),
            }}
            key={numCols}
            data={user_profile?.videos}
            renderItem={({ item, index }) =>
              item?.content?.type == content_types.photo ? (
                <UserImage
                  user_profile={user_profile}
                  showPrivate={false}
                  viewerType={item?.content?.viewerType}
                  key={index}
                  imageUrl={`${URLS.image_url}${item?.content?.path}`}
                  onClick={() =>
                    showFullImage(
                      `${URLS.image_url}${item?.content?.path}`,
                      item,
                    )
                  }
                />
              ) : (
                <UserVideo
                  showPrivate={false}
                  item={item}
                  user_profile={user_profile}
                  key={index}
                  index={index}
                />
              )
            }
          />
        ) : (
          <View style={styles.centered}>
            <Regular
              label={'User Videos and Photos will appear here'}
              style={styles.emptyText}
              numberOfLines={2}
            />
          </View>
        )
      ) : (
        <UserAudios
          showDelete={true}
          onDelete={id => deleteAudioContent(id)}
          imageUrl={`${URLS.image_url}${user_info?.profile}`}
          user_profile={user_profile}
        />
      )}
      <ProfileMenu
        isVisible={menu}
        onSetting={() => {
          setMenu(false);
          navigation.navigate('Setting');
        }}
        onEdit={() => {
          setMenu(false);
          navigation.navigate('EditProfile');
        }}
        isFollow={user_profile?.isFollowByMe}
        isBlock={user_profile?.isBlockByMe}
        onCancel={() => setMenu(false)}
        isMe={true}
      />

      <ImageModal
        visible={showImage}
        showDelete={true}
        imageUri={imageUri}
        onDelete={() => deleteContent()}
        onOk={() => setShowImage(false)}
      />
    </View>
  );
};

const mapStateToProps = store => ({
  user_info: store.state.user_info,
  user_profile: store.state.my_info,
});

const mapDispatchToProps = {
  profile: userId => APP_API.profile(userId, true),
  delete_content: id => APP_API.delete_content(id),
};
export default connect(mapStateToProps, mapDispatchToProps)(ProfileTab);
