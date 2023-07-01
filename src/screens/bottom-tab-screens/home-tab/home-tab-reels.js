import React, { useEffect, useState } from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  AppState,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { connect } from 'react-redux';
import PrimaryShare from '../../../components/modals/primary-share';
import ContentComments from '../../../components/molecules/collapseable-view/content-comments';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Spinner from 'react-native-loading-spinner-overlay';
import ReelsComponent from '../../../components/videos/home-components/ReelsComponent';
import APP_API from '../../../store/api-calls';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import Share from 'react-native-share';
import { URLS } from '../../../store/api-urls';
import convertToProxyURL from 'react-native-video-cache';
import { mvs } from '../../../services/metrices';
import colors from '../../../services/colors';
import Regular from '../../../typo-graphy/regular-text';
import { Drop } from '../../../assets/svgs';
import PrimaryDropdown from '../../../components/modals/primary-dropdown';
import notifee, { AndroidImportance } from '@notifee/react-native';
import SERVICES from '../../../services/common-services';
import { shuffle } from 'lodash';
import HomeVideos from '../../../components/videos/home-videos/home-videos';
const HomeReels = ({ refresh_screen = false, ...props }) => {
  const {
    user_info,
    getVideos,
    videos,
    home_content,
    get_comments,
    getcomments,
    send,
    get_chat_list,
    chat_list,
    save,
    un_save,
    comment,
    like_content,
    update_fcm,
    unlike_content,
    get_profile,
  } = props;
  const [newComment, setNewComment] = React.useState(false);
  const [shareModal, setShareModal] = useState(false);
  const [comment_sent, setComment] = useState(SERVICES.translate('addComment'));
  const navigation = useNavigation();
  const [contentId, setContentId] = useState(0);
  const [isRefresh, setRefresh] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [url, setUrl] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [homeVideos, setHomeVideos] = useState([]);
  const [type, setType] = useState(SERVICES.translate('home'));
  const [aState, setAppState] = useState(AppState.currentState);
  const [show, setShow] = React.useState(false);
  const ViewersType = [
    { id: 1, type: SERVICES.translate('home') },
    { id: 2, type: SERVICES.translate('following') },
    { id: 3, type: SERVICES.translate('superfans') },
  ];
  useEffect(() => {
    get_profile(user_info?.id);
    getHomeVideos(), get_fcm();
    const appStateListener = AppState.addEventListener(
      'change',
      nextAppState => {
        console.log('Next AppState is: ', nextAppState);
        setAppState(nextAppState);
      },
    );
    return () => {
      appStateListener?.remove();
    };
  }, [isRefresh, refresh_screen]);
  useEffect(() => {
    const subscribe = messaging().onMessage(async remoteMessage => {
      // Get the message body
      console.log('remoteMessage==> ', remoteMessage);
      if (remoteMessage?.data != undefined) {
        let message_body = remoteMessage?.data;
        let message_type = message_body?.Type;
        if (message_type == 'Message') {
          onDisplayNotification('New Message', 'You have one new message');
        }
      }
    });
    return subscribe;
  }, []);
  const onDisplayNotification = async (title, body) => {
    console.log('Displaying Notification ');
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
    });
    notifee.displayNotification({
      title: title,
      body: body,
      android: {
        channelId: channelId,
      },
    });
  };
  const shareData = async action => {
    Share.shareSingle({
      title: 'Vide Hope',
      message: 'VideHope Content',
      url: `${URLS.image_url}${url}`,
      social:
        action == 'FACEBOOK'
          ? Share.Social.FACEBOOK
          : action == 'WHATSAPP'
            ? Share.Social.WHATSAPP
            : action == 'MESSENGER'
              ? Share.Social.MESSENGER
              : action == 'TWITTER'
                ? Share.Social.TWITTER
                : Share.Social.INSTAGRAM,
    });
  };
  // const getHomeVideos = async () => {
  //   setSpinner(true);
  //   var res = await getVideos({ page: 1, pageSize: 10 });
  //   setSpinner(false);
  //   if (res?.data?.data) {
  //     var shuffledList = shuffle(res?.data?.data);
  //     setHomeVideos(shuffledList);
  //   }
  // };
  const loadMoreVideos = () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      getHomeVideos(nextPage);
    }
  };

  const getHomeVideos = async (page = 1) => {
    setSpinner(true);
    var res = await getVideos({ page, pageSize: 6 });
    setSpinner(false);
    // console.log("Res of Get Videos: ", res.data.data);
    if (res?.data?.data) {
      var shuffledList = shuffle(res?.data?.data?.results);
      if (page == 1) {
        setHomeVideos(shuffledList);
      } else {
        setHomeVideos(homeVideos.concat(shuffledList));
      }
      setCurrentPage(page);
      setTotalPages(
        res?.data?.data?.totalRecords /
        res?.data?.data?.itemsPerPage
      );

    }
  };

  const get_fcm = async () => {
    const payLoad = {
      userId: user_info?.id,
      fcm: (await messaging().getToken()).toString(),
    };
    update_fcm(payLoad)
      .then(res => {
        if (res?.data?.succeeded == true) {
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  const get_video_comments = id => {
    setSpinner(true);
    // console.log("======"+id)
    setContentId(id);
    // console.log("============="+id)
    get_comments(id)
      .then(res => {
        if (res?.data?.succeeded == true) {
          setSpinner(false);
          console.log('comments', getcomments);
        }
      })
      .catch(err => console.log(err));
    setNewComment(true);
  };
  const likeContent = async (id, isLikeByMe) => {
    console.log('-------' + isLikeByMe);
    var payload = { userId: user_info?.id, contentId: id };
    if (isLikeByMe) {
      unlike_content(payload)
        .then(res => {
          if (res?.data.succeeded == true) {
            //setRefresh(!isRefresh);
          }
        })
        .catch(err => console.log(err));
    } else {
      like_content(payload)
        .then(res => {
          if (res?.data.succeeded == true) {
            // setRefresh(!isRefresh);
          }
        })
        .catch(err => console.log(err));
    }
  };
  const shareContent = async (id, path) => {
    setUrl(path);
    setShareModal(true);
    setContentId(id);
    await get_chat_list();
  };
  const commentContent = async () => {
    setSpinner(true);
    var payload = {
      userId: user_info?.id,
      description: comment_sent,
      contentId: contentId,
    };
    comment(payload)
      .then(res => {
        if (res?.data?.succeeded == true) {
          setComment('Add comment...');
          get_video_comments(contentId);
          setSpinner(false);
          //setRefresh(!isRefresh);
        }
      })
      .catch(err => console.log(err));
  };
  const saveMedia = async (id, isSavedByMe) => {
    var payload = { userId: user_info?.id, contentId: id };
    console.log('------------' + id + '-------' + isSavedByMe);
    if (isSavedByMe) {
      un_save(payload)
        .then(res => {
          if (res?.data.succeeded == true) {
            // setRefresh(!isRefresh);
          }
        })
        .catch(err => console.log(err));
    } else {
      save(payload)
        .then(res => {
          if (res?.data.succeeded == true) {
            // setRefresh(!isRefresh);
          }
        })
        .catch(err => console.log(err));
    }
  };
  // console.log("===="+JSON.stringify(videos))
  const reportContent = () => {
    setShareModal(false);
    navigation.navigate('ReportContent', { isMe: false, id: contentId });
  };

  const sendContent = userId => {
    setSpinner(true);
    var payLoad = {
      To: userId,
      From: user_info?.id,
      Type: 'video',
      Description: 'desMsg',
      MessageFile: url,
      IsSeen: false,
    };
    // console.log("---------------------------------------"+url)
    send(payLoad)
      .then(res => {
        if (res?.data?.succeeded == true) {
          ToastAndroid.show(
            SERVICES.translate('sendContentSuccessfuly'),
            ToastAndroid.LONG,
          );
          setShareModal(false);
          setSpinner(false);
        }
      })
      .catch(err => console.log(err));
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* <TouchableOpacity style={styles.ddown} onPress={() => setShow(true)}>
          <Regular label={type} style={{ marginRight: mvs(10) }} />
          <Drop />
        </TouchableOpacity> */}
      </View>
      {console.log("Home Videos 0 Index [0]: ", homeVideos)}
      {
        <HomeVideos
          user_info={user_info}
          videos={homeVideos}
          onRefresh={getHomeVideos}
          loadMoreVideos={loadMoreVideos}
          onCommentPress={id => get_video_comments(id)}
          onLikePress={(id, isLikeByMe) => likeContent(id, isLikeByMe)}
          onSavePress={(id, isSavedByMe) => saveMedia(id, isSavedByMe)}
          onSharePress={(id, path) => shareContent(id, path)}
          isFocus={useIsFocused()}
        />
      }
      <ContentComments
        placeholder={comment_sent}
        isExpand={newComment}
        onBlur={() => setNewComment(false)}
        comments={getcomments}
        onSend={() => commentContent()}
        onChange={val => setComment(val)}
      />

      <PrimaryShare
        visible={shareModal}
        contact={chat_list}
        onBlur={() => setShareModal(false)}
        username={user_info?.userName}
        onReportPress={() => reportContent()}
        onSavePress={() => downloadFile()}
        onSendPress={userId => sendContent(userId)}
        onAppPress={action => {
          shareData(action);
        }}
      />
      <Spinner
        visible={spinner}
        textContent={SERVICES.translate('loading')}
        textStyle={{ color: '#FFF' }}
      />
      <PrimaryDropdown
        title={SERVICES.translate('selectOneOption')}
        visible={show}
        items={ViewersType}
        onBackdropPress={() => setShow(false)}
        setValue={item => {
          setShow(false);
          setType(item?.type);
          getHomeVideos();
        }}
      />
    </View>
  );
};
const mapStateToProps = store => ({
  user_info: store.state.user_info,
  videos: store.state.home_content?.items,
  home_content: store.state.home_content?.items,
  totalRecords: store.state.home_content?.totalRecords,
  getcomments: store.state.getcomments,
  chat_list: store.state.chat_list,
});
const mapDispatchToProps = {
  getVideos: (params) => APP_API.home_content(params),
  get_comments: payload => APP_API.get_comments(payload),
  comment: payload => APP_API.comment(payload),
  like_content: payload => APP_API.like_content(payload),
  unlike_content: payload => APP_API.unlike_content(payload),
  save: payload => APP_API.save(payload),
  un_save: payload => APP_API.un_save(payload),
  update_fcm: payload => APP_API.update_fcm(payload),
  get_chat_list: () => APP_API.get_chat_list(),
  send: payload => APP_API.send(payload),
  get_profile: payload => APP_API.profile(payload),
};
export default connect(mapStateToProps, mapDispatchToProps)(HomeReels);
const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight,
    //backgroundColor: 'white',
    position: 'relative',
    backgroundColor: 'black',
  },
  header: {
    position: 'absolute',
    top: 10,
    right: 10,
    left: 0,
    zIndex: 1000,
    padding: 10,
    alignItems: 'flex-end',
  },
  ddown: {
    //width: mvs(125),
    paddingVertical: mvs(10),
    paddingHorizontal: mvs(10),
    backgroundColor: colors.lightBlack,
    borderRadius: 10,
    borderColor: colors.lightBlue,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 0.3,
  },
});
