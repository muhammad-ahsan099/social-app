import {useNavigation} from '@react-navigation/native';
import React, {useRef, useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import APP_API from '../../../../store/api-calls';
import {Styles as styles} from './style';
import {CustomHeader} from '../../../../components/molecules/header/header-1x';
import {ms, mvs} from '../../../../services/metrices';
import Regular from '../../../../typo-graphy/regular-text';
import colors from '../../../../services/colors';
import Right from '../../../../components/conversation/right';
import Left from '../../../../components/conversation/left';
import Row from '../../../../components/atoms/row';
import {Emoji, Send} from '../../../../assets/svgs';
import ProfileMenu from '../../../../components/setting/menu';
import SERVICES from '../../../../services/common-services';
const ReportProblem = props => {
  const navigation = useNavigation();
  const [menu, setMenu] = useState(false);
  const flatList = useRef();
  const {send, get_messages, user_info, message} = props;
  const [isRefresh, setRefresh] = useState(false);
  const [desMsg, setDesMsg] = useState('');
  useEffect(() => {
    getMessages();
  }, [isRefresh]);
  const getMessages = async () => {
    // console.log("User info")
    await get_messages(user_info?.id);
    //flatList?.current?.scrollToEnd({animated: true});
  };
  const onSendMessage = async () => {
    var payLoad = {
      To: 0,
      From: user_info?.id,
      Type: 'text',
      Description: desMsg,
      IsSeen: false,
      IsToAdmin: true,
      IsFromAdmin: false,
    };
    await send(payLoad);
    setDesMsg('');
    setRefresh(!isRefresh);
  };
  return (
    <View style={{...styles.container}}>
      <CustomHeader title={SERVICES.translate('howCanIHelpYou')} allowBackBtn />

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
                imageUrl={'admin'}
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

      <Row style={styles.sendMessageView}>
        <TextInput
          value={desMsg}
          placeholder={SERVICES.translate('sendAMessage')}
          style={{flex: 1, color: colors.white}}
          placeholderTextColor={colors.lightgrey1}
          onChangeText={val => setDesMsg(val)}
        />
        {/* <TouchableOpacity style={{marginHorizontal: mvs(15)}}>
          <Emoji />
        </TouchableOpacity> */}
        <TouchableOpacity onPress={() => onSendMessage()}>
          <Send />
        </TouchableOpacity>
      </Row>
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
  message: store.state.admin_messages,
});

const mapDispatchToProps = {
  get_messages: id => APP_API.get_admin_messages(id),
  send: payload => APP_API.send(payload),
};
export default connect(mapStateToProps, mapDispatchToProps)(ReportProblem);
