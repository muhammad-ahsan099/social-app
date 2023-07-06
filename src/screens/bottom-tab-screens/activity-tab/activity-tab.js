import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {ScrollView, View, FlatList, StatusBar} from 'react-native';
import {connect} from 'react-redux';
import SearchItem from '../../../components/user-cards/search-item';
import APP_API from '../../../store/api-calls';
import {Styles as styles} from './style';
import PrimaryButton from '../../../components/buttons/primary-button';
import Regular from '../../../typo-graphy/regular-text';
import moment from 'moment';
import colors from '../../../services/colors';
import {useTranslation} from 'react-i18next';
import {mvs} from '../../../services/metrices';
const ActivityTab = props => {
  const {t} = useTranslation();
  const {
    get_chat_list,
    chat_list,
    notifications,
    get_all_notifications,
    user_info,
  } = props;
  const navigation = useNavigation();
  const [selectedTab, setSelectedTab] = React.useState('activity');

  const onActivity = async () => {
    setSelectedTab('activity');
    await getNotificationList();
  };
  const onMessage = async () => {
    setSelectedTab('msgs');
    await getChatList();
  };
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    await getChatList();
    await getNotificationList();
  };
  const getChatList = async () => {
    await get_chat_list();
  };
  const getNotificationList = async () => {
    await get_all_notifications();
  };
  const onNotificationClick = async item => {
    if (item?.liveStreaming) {
      navigation?.navigate('AudiencePage', {
        userID: user_info?.id,
        userName: user_info?.userName,
        liveID: item?.liveStreaming?.liveId,
      });
    }
  };
  return (
    <View style={{...styles.container}}>
      <StatusBar barStyle="light-content" backgroundColor={'black'} />
      <Regular
        label={t('common:activity')}
        size={17}
        style={{alignSelf: 'center'}}
      />
      <View style={styles.tabView}>
        <PrimaryButton
          onClick={() => onActivity()}
          style={
             styles.selectedTabButton
            // selectedTab == 'activity'
            //   ? styles.selectedTabButton
            //   : styles.unSelectedTabButton  
          }
          titleStyle={styles.textStylye}
          title={t('common:activity')}
        />
        {/* <PrimaryButton
          onClick={() => onMessage()}
          style={
            selectedTab == 'msgs'
              ? styles.selectedTabButton
              : styles.unSelectedTabButton
          }
          titleStyle={styles.textStylye}
          title={t('common:messages')}
        /> */}
      </View>

      <View style={styles.body}>
        {selectedTab == 'activity' ? (
          notifications?.length > 0 ? (
            <FlatList
              data={notifications}
              renderItem={({item, index}) => (
                <SearchItem
                  onClick={() => onNotificationClick(item)}
                  key={index + '_' + item?.notification?.id}
                  style={styles.itemStyle}
                  nameLines={2}
                  nameSize={mvs(14)}
                  msgStyle={{
                    color: item?.notification?.isSeen
                      ? colors.lightgrey1
                      : colors.white,
                  }}
                  imageUrl={item?.user?.profile}
                  name={item?.notification?.description}
                  msg={item?.user?.userName}
                  msgTime={item?.notification?.createdAt}
                />
              )}
            />
          ) : (
            <View style={styles.centered}>
              <Regular
                label={t('common:allNotificationsAppearHere')}
                style={{textAlign: 'center'}}
                color={colors.white}
                numberOfLines={2}
                size={mvs(21)}
              />
            </View>
          )
        ) : chat_list?.length > 0 ? (
          <FlatList
            data={chat_list}
            renderItem={({item, index}) => (
              <SearchItem
                onClick={() =>
                  navigation.navigate('Conversation', {user: item})
                }
                key={index + '_' + item}
                style={styles.itemStyle}
                nameLines={2}
                nameSize={13}
                imageUrl={item?.image}
                msgStyle={{
                  color: item?.lastMessage?.isSeen
                    ? colors.lightgrey1
                    : colors.white,
                }}
                name={item?.userName}
                msgTime={item?.lastMessage?.createdAt}
                msg={item?.lastMessage?.description}
              />
            )}
          />
        ) : (
          <View style={styles.centered}>
            <Regular
              label={t('common:allChatsAppearHere')}
              style={{textAlign: 'center'}}
              color={colors.white}
              numberOfLines={2}
              size={mvs(21)}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const mapStateToProps = store => ({
  user_info: store.state.user_info,
  chat_list: store.state.chat_list,
  notifications: store.state.notifications,
});

const mapDispatchToProps = {
  get_chat_list: () => APP_API.get_chat_list(),
  get_all_notifications: () => APP_API.get_all_notifications(),
};
export default connect(mapStateToProps, mapDispatchToProps)(ActivityTab);
