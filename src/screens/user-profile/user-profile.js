import {useNavigation} from '@react-navigation/native';
import React, {useState, useRef, useEffect} from 'react';
import convertToProxyURL from 'react-native-video-cache';
import {useFocusEffect} from '@react-navigation/native';
import {
  Image,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  View,
  ToastAndroid,
} from 'react-native';
import {connect} from 'react-redux';
import APP_API from '../../store/api-calls';
import {Styles as styles} from './style';
import {mvs} from '../../services/metrices';
import {Dots, Photos, PlayBank, SuperFan, WhiteBack} from '../../assets/svgs';
import Regular from '../../typo-graphy/regular-text';
import Spinner from 'react-native-loading-spinner-overlay';
import LinearGradient from 'react-native-linear-gradient';
import PrimaryButton from '../../components/buttons/primary-button';
import SemiBold from '../../typo-graphy/semibold-text';
import Row from '../../components/atoms/row';
import Medium from '../../typo-graphy/medium-text';
import {AddFriend, Back, CircularDotMenu} from '../../assets/svgs';
import colors from '../../services/colors';
import AudioItem from '../../components/music/audio';
import ProfileMenu from '../../components/setting/menu';
import Video from 'react-native-video';
import {URLS} from '../../store/api-urls';
import ReportModal from '../../components/molecules/modals/report-modal';
import Bold from '../../typo-graphy/bold-text';
import SERVICES from '../../services/common-services';
import ImageModal from '../../components/modals/image-modal';
import {useTranslation} from 'react-i18next';
import UserInfo from '../../components/setting/user-info';
import {Music} from '../../assets/svgs/setting-icons';
import UserAudios from '../../components/setting/user-audios';
import UserVideo from '../../components/setting/user-video';
import UserImage from '../../components/setting/user-image';
import {content_types} from '../../store/constant-data';
import ReactGA from 'react-ga';

const UserProfile = props => {
  const {
    route,
    user_info,
    user_profile,
    profile,
    follow,
    unfollow,
    block,
    unblock,
    report_user,
  } = props;
  const {t} = useTranslation();
  const unfollowedText = t('common:unfollowed');
  const followedText = t('common:followed');
  const unBlockedText = t('common:unBlocked');
  const blockedText = t('common:blocked');
  const reportedUserText = t('common:reported');
  const seeContextText = t('common:seeContent');

  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = React.useState('Photos');
  const [report, setReport] = useState(false);
  const [numCols] = useState(3);
  const [menu, setMenu] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [description, setDescription] = useState();
  const videoRef = useRef(null);
  const [imageUri, setImageUri] = useState('');
  const [showImage, setShowImage] = useState(false);
  const [photos, setPhotos] = useState(true);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    ReactGA.pageview("window.location.pathname");
    console.log("xsaxa");
    get_profile();
  }, []);
  const get_profile = async () => {
    console.log('Getting user Profile ', route.params.id);
    setSpinner(true);
    await profile(route.params.id);
    setSpinner(false);
  };

  const becomeSuperFan = async () => {
    if (!user_profile?.isSubscribedByMe) {
      navigation.navigate('Subscribe', {
        id: user_profile?.user?.id,
      });
    }
  };
  const onFollow = async () => {
    setLoading(true);
    var payload = {
      followById: user_info?.id,
      userId: user_profile?.user?.id,
    };
    if (user_profile?.isFollowByMe) {
      await unfollow(payload);
    } else {
      await follow(payload);
    }
    await profile(route.params.id);
    setLoading(false);
  };
  const blockUnBlock = async () => {
    setLoading(true);
    var payload = {
      blockById: user_info?.id,
      userId: user_profile?.user?.id,
    };
    if (user_profile?.isBlockByMe) {
      await unblock(payload);
    } else {
      await block(payload);
    }
    await profile(route.params.id);
    setLoading(false);
  };
  const reportUser = async () => {
    setLoading(true);
    var payload = {
      reason: description,
      userId: user_profile?.user?.id,
      reportById: user_info?.id,
    };
    const res = await report_user(payload);
    setLoading(false);
    if (res?.data?.succeeded == true) {
      ToastAndroid.show(
        reportedUserText + ' ' + user_profile?.user?.userName,
        ToastAndroid.LONG,
      );
      setReport(false);
    }
  };
  function showFullImage(uri) {
    setImageUri(uri);
    setShowImage(true);
  }
  return (
    <View style={{...styles.container}}>
      {spinner ? (
        <Spinner
          visible={spinner}
          textContent={t('common:loading')}
          textStyle={{color: '#FFF'}}
        />
      ) : (
        <>
          <Spinner
            visible={loading}
            textContent={''}
            textStyle={{color: '#FFF'}}
          />
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
            <Row style={styles.buttonView} alignItems="center">
              <PrimaryButton
                title={t('common:message')}
                onClick={() =>
                  navigation.navigate('Conversation', {
                    user: user_profile?.user,
                  })
                }
                style={styles.superFanBtn}
                titleStyle={{fontSize: mvs(11)}}
              />
              <PrimaryButton
                title={
                  user_profile?.isSubscribedByMe
                    ? t('common:subscribed')
                    : t('common:userSuperFans')
                }
                onClick={() => becomeSuperFan()}
                style={{
                  ...styles.superFanBtn,
                  backgroundColor: colors.primary,
                  borderWidth: 0,
                }}
                titleStyle={{fontSize: mvs(11)}}
              />
              <PrimaryButton
                title={
                  !user_profile?.isFollowByMe
                    ? t('common:follow')
                    : t('common:unFollow')
                }
                onClick={() => onFollow()}
                style={{
                  ...styles.superFanBtn,
                  backgroundColor: colors.primary,
                  borderWidth: 0,
                }}
                titleStyle={{fontSize: mvs(11)}}
              />
            </Row>
            <View style={styles.line}></View>
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
                  marginTop: mvs(5),
                }}
                key={numCols}
                data={user_profile?.videos}
                renderItem={({item, index}) =>
                  item?.content?.type == content_types.photo ? (
                    <UserImage
                      user_profile={user_profile}
                      showPrivate={
                        user_profile?.isSubscribedByMe ? false : true
                      }
                      viewerType={item?.content?.viewerType}
                      key={index}
                      imageUrl={`${URLS.image_url}${item?.content?.path}`}
                      onClick={() =>
                        showFullImage(`${URLS.image_url}${item?.content?.path}`)
                      }
                    />
                  ) : (
                    <UserVideo
                      showPrivate={
                        user_profile?.isSubscribedByMe ? false : true
                      }
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
              imageUrl={`${URLS.image_url}${user_profile?.user?.profile}`}
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
            onFollow={() => {
              setMenu(false);
              onFollow();
            }}
            onBlock={() => {
              setMenu(false);
              blockUnBlock();
            }}
            onReport={() => {
              setMenu(false);
              setReport(true);
            }}
            isFollow={user_profile?.isFollowByMe}
            isBlock={user_profile?.isBlockByMe}
            onCancel={() => setMenu(false)}
            isMe={route.params.isMe}
          />
          <ReportModal
            visible={report}
            title={t('common:reportUser')}
            Name={user_profile?.user?.userName}
            onChangeText={val => setDescription(val)}
            onTouch={() => reportUser()}
          />
          <ImageModal
            visible={showImage}
            imageUri={imageUri}
            onOk={() => setShowImage(false)}
          />
        </>
      )}
    </View>
  );
};

const mapStateToProps = store => ({
  user_info: store.state.user_info,
  user_profile: store.state.profile,
});

const mapDispatchToProps = {
  profile: userId => APP_API.profile(userId, false),
  follow: payload => APP_API.follow(payload),
  unfollow: payload => APP_API.unfollow(payload),
  block: payload => APP_API.block_user(payload),
  unblock: payload => APP_API.unblock_user(payload),
  report_user: payload => APP_API.report_user(payload),
};
export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
