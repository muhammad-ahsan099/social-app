import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {FlatList, Image, TextInput, TouchableOpacity, View} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {connect} from 'react-redux';
import {Cross, Emoji, GalleryOption, Send} from '../../assets/svgs';
import Row from '../../components/atoms/row';
import Left from '../../components/conversation/left';
import Right from '../../components/conversation/right';
import {CustomHeader} from '../../components/molecules/header/header-1x';
import ProfileMenu from '../../components/setting/menu';
import colors from '../../services/colors';
import {mvs} from '../../services/metrices';
import APP_API from '../../store/api-calls';
import {Styles as styles} from './style';
const Conversation = props => {
  const {route, get_messages, message, user_info, send} = props;
  const navigation = useNavigation();
  const videoRef = useRef(null);
  const flatList = useRef();
  const [desMsg, setDesMsg] = useState('');
  const [menu, setMenu] = useState(false);
  const [file, setFile] = useState({});
  const [type, setType] = useState('text');
  const [isplaying, setPlaying] = useState(false);
  const [isRefresh, setRefresh] = useState(false);
  useEffect(() => {
    getMessages();
  }, [isRefresh]);
  const getMessages = async () => {
    await get_messages(
      route?.params?.user?.id
        ? route?.params?.user?.id
        : route?.params?.user?.userId,
    );
  };
  const onSendMessage = async () => {
    var payLoad = {
      To: route?.params?.user?.id
        ? route?.params?.user?.id
        : route?.params?.user?.userId,
      From: user_info?.id,
      Type: type,
      Description: desMsg,
      IsSeen: false,
      IsToAdmin: false,
      IsFromAdmin: false,
    };
    if (type == 'video') {
      payLoad.MessageFile = file;
    }
    console.log('Payload is ==> ', payLoad);
    await send(payLoad);
    setDesMsg('');
    setFile({});
    setRefresh(!isRefresh);
  };
  const selectPic = async () => {
    try {
      const response = await DocumentPicker.pick({
        presentationStyle: 'fullScreen',
        type: [DocumentPicker.types.video],
      });
      console.log('Video ===> ', response[0]);
      setFile(response[0]);
      if (response[0]?.type.includes('video')) {
        setType('video');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const removeFile = async () => {
    setPlaying(false);
    setFile({});
  };
  const onBuffer = buffer => {
    if (buffer?.isBuffering) {
      console.log('buffring', buffer);
    } else {
      console.log('buffring stopped', buffer);
    }
  };
  const onError = error => {
    console.log('error', error);
  };
  return (
    <View style={{...styles.container}}>
      <CustomHeader
        title={route?.params?.user?.userName}
        allowBackBtn
        spacebetween
        showMenu={true}
        onMenuClick={() => setMenu(true)}
      />
      <View style={styles.body}>
        <FlatList
          data={message}
          ref={flatList}
          contentContainerStyle={{paddingBottom: mvs(20)}}
          onContentSizeChange={() =>
            flatList?.current?.scrollToEnd({animated: true})
          }
          renderItem={({item}) =>
            item.to == user_info?.id ? (
              <Left
                messageFile={item?.messageFile}
                content={item?.description}
                type={item.type}
                imageUrl={route?.params?.user?.image}
              />
            ) : (
              <Right
                messageFile={item?.messageFile}
                content={item?.description}
                type={item.type}
                imageUrl={user_info?.profile}
              />
            )
          }
        />
      </View>

      <View style={styles.bottomView}>
        {file?.uri && (
          <TouchableOpacity
            style={styles.videoItem}
            onPress={() => setPlaying(!isplaying)}>
            <Image
              source={{uri: file?.uri}}
              style={{width: '100%', height: '100%', alignSelf: 'center'}}
            />

            {/* <Video
              videoRef={videoRef}
              onBuffer={onBuffer}
              onError={onError}
              source={{uri: file?.uri}}
              style={styles.backgroundVideo}
              muted={false}
              repeat={false}
              paused={false}
              resizeMode={'cover'}
            /> */}
            {/* {!isplaying && <Play />} */}
            <TouchableOpacity
              onPress={() => removeFile()}
              style={{position: 'absolute', top: 0, right: 0}}>
              <Cross />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
        <Row style={styles.sendMessageView}>
          <TextInput
            multiline={true}
            value={desMsg}
            placeholder={'Send a message'}
            style={{flex: 1, color: colors.white}}
            placeholderTextColor={colors.lightgrey1}
            onChangeText={val => setDesMsg(val)}
          />
          <TouchableOpacity style={{marginHorizontal: mvs(15)}}>
            <Emoji />
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginRight: mvs(15)}}
            onPress={() => selectPic()}>
            <GalleryOption />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onSendMessage()}>
            <Send />
          </TouchableOpacity>
        </Row>
      </View>

      <ProfileMenu
        isMe={false}
        isVisible={menu}
        onCancel={() => setMenu(false)}
      />
    </View>
  );
};

const mapStateToProps = store => ({
  user_info: store.state.user_info,
  message: store.state.message,
});

const mapDispatchToProps = {
  signin: payload => APP_API.signin(payload),
  get_messages: id => APP_API.get_messages(id),
  send: payload => APP_API.send(payload),
};
export default connect(mapStateToProps, mapDispatchToProps)(Conversation);
