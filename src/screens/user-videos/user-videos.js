import React, {useEffect, useState} from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
  AppState,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import PrimaryShare from '../../components/modals/primary-share';
import ContentComments from '../../components/molecules/collapseable-view/content-comments';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Spinner from 'react-native-loading-spinner-overlay';
import APP_API from '../../store/api-calls';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import Share from 'react-native-share';
import {URLS} from '../../store/api-urls';
import {mvs} from '../../services/metrices';
import colors from '../../services/colors';
import PrimaryDropdown from '../../components/modals/primary-dropdown';
import UserReelsComponent from '../../components/videos/user-components/UserReelsComponent';
import {Back} from '../../assets/svgs';
import PrimaryConfirmation from '../../components/modals/primary-confirmation';
const UserReels = props => {
  const {
    route,
    user_info,
    get_comments,
    getcomments,
    send,
    get_chat_list,
    chat_list,
    save,
    un_save,
    comment,
    like_content,
    delete_content,
    unlike_content,
  } = props;
  const {currentIndex, videos} = route.params;
  const [userVideos, setVideos] = useState(videos);
  const [newComment, setNewComment] = React.useState(false);
  const [shareModal, setShareModal] = useState(false);
  const [comment_sent, setComment] = useState('Add comment...');
  const navigation = useNavigation();
  const [content, setContent] = useState();
  const [contentId, setContentId] = useState(0);
  const [isRefresh, setRefresh] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [url, setUrl] = useState();
  const [type, setType] = useState('Home');
  const [aState, setAppState] = useState(AppState.currentState);
  const [show, setShow] = React.useState(false);
  const [showDelete, setShowDelete] = React.useState(false);
  const ViewersType = [
    {id: 1, type: 'Home'},
    {id: 2, type: 'Following'},
    {id: 3, type: 'Subscribers'},
  ];
  useEffect(() => {
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
  }, [isRefresh]);
  const shareData = async action => {
    Share.shareSingle({
      title: 'VideHope',
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
    var payload = {userId: user_info?.id, contentId: id};
    if (isLikeByMe) {
      unlike_content(payload)
        .then(res => {
          if (res?.data.succeeded == true) {
            setRefresh(!isRefresh);
          }
        })
        .catch(err => console.log(err));
    } else {
      like_content(payload)
        .then(res => {
          if (res?.data.succeeded == true) {
            setRefresh(!isRefresh);
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
          setRefresh(!isRefresh);
        }
      })
      .catch(err => console.log(err));
  };
  const saveMedia = async (id, isSavedByMe) => {
    var payload = {userId: user_info?.id, contentId: id};
    console.log('------------' + id + '-------' + isSavedByMe);
    if (isSavedByMe) {
      un_save(payload)
        .then(res => {
          if (res?.data.succeeded == true) {
            setRefresh(!isRefresh);
          }
        })
        .catch(err => console.log(err));
    } else {
      save(payload)
        .then(res => {
          if (res?.data.succeeded == true) {
            setRefresh(!isRefresh);
          }
        })
        .catch(err => console.log(err));
    }
  };
   //console.log("===="+JSON.stringify(videos))
  const reportContent = () => {
    setShareModal(false);
    navigation.navigate('ReportContent', {isMe: false, id: contentId});
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
     console.log("---------------------------------------"+url)
    send(payLoad)
      .then(res => {
        if (res?.data?.succeeded == true) {
          ToastAndroid.show('Send Content Successfuly!', ToastAndroid.LONG);
          setShareModal(false);
          setSpinner(false);
        }
      })
      .catch(err => console.log(err));
  };
  const deleteVideo = async item => {
    setContent(item);
    setShowDelete(true);
  };
  const confirmDelete = async () => {
    setSpinner(true);
    console.log(content);
    await delete_content(content?.content?.id);
    var all_videos = userVideos;
    if (!all_videos?.indexOf(content) < 0) {
      console.log('Index Found');
      all_videos?.slice(all_videos?.indexOf(content), 1);
    }
    setVideos(all_videos);
    setSpinner(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header_back}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Back />
        </TouchableOpacity>
      </View>
      <UserReelsComponent
        videos={userVideos}
        user_info={user_info}
        currentVideoIndex={currentIndex}
        onCommentPress={id => get_video_comments(id)}
        onDeletePress={item => deleteVideo(item)}
        onLikePress={(id, isLikeByMe) => likeContent(id, isLikeByMe)}
        onSavePress={(id, isSavedByMe) => saveMedia(id, isSavedByMe)}
        onSharePress={(id, path) => shareContent(id, path)}
        isFocus={useIsFocused()}
      />
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
        textContent={'Loading...'}
        textStyle={{color: '#FFF'}}
      />
      <PrimaryDropdown
        title="Select One Option"
        visible={show}
        items={ViewersType}
        onBackdropPress={() => setShow(false)}
        setValue={item => {
          setShow(false);
          setType(item?.type);
        }}
      />
      <PrimaryConfirmation
        visible={showDelete}
        subtitle={'Are you sure you want to delete video?'}
        title={'Delete Video'}
        onCancel={() => setShowDelete(false)}
        onOk={() => {
          setShowDelete(false);
          confirmDelete();
        }}
      />
    </View>
  );
};
const mapStateToProps = store => ({
  user_info: store.state.user_info,
  getcomments: store.state.getcomments,
  chat_list: store.state.chat_list,
});
const mapDispatchToProps = {
  get_comments: payload => APP_API.get_comments(payload),
  comment: payload => APP_API.comment(payload),
  like_content: payload => APP_API.like_content(payload),
  unlike_content: payload => APP_API.unlike_content(payload),
  save: payload => APP_API.save(payload), 
  un_save: payload => APP_API.un_save(payload),
  update_fcm: payload => APP_API.update_fcm(payload),
  get_chat_list: () => APP_API.get_chat_list(),
  send: payload => APP_API.send(payload),
  delete_content: id => APP_API.delete_content(id),
};
export default connect(mapStateToProps, mapDispatchToProps)(UserReels);
const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: 'white',
    position: 'relative',
    backgroundColor: 'black',
  },
  header: {
    position: 'absolute',
    top: 10,
    right: 0,
    left: 0,
    zIndex: 1000,
    padding: 10,
    alignItems: 'flex-end',
  },
  ddown: {
    width: mvs(125),
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
  header_back: {
    position: 'absolute',
    top: mvs(10),
    left: mvs(10),
    right: mvs(10),
    zIndex: 1,
    alignItems: 'flex-start',
  },
});
