import React, {useEffect, useState} from 'react';
import {View, FlatList, StatusBar} from 'react-native';
import {connect} from 'react-redux';
import PrimaryInput from '../../../components/input/primary-input';
import APP_API from '../../../store/api-calls';
import SemiBold from '../../../typo-graphy/semibold-text';
import Spinner from 'react-native-loading-spinner-overlay';
import {Styles as styles} from './style';
import {mvs} from '../../../services/metrices';
import UserItem from '../../../components/user-cards/user';
import {useTranslation} from 'react-i18next';
const DiscoverTab = props => {
  const {t} = useTranslation();
  const {navigation, search_users, fetch_users} = props;
  const [showCancel, setShowCancel] = useState(false);
  const [spinner, setSpinner] = useState(false);
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setSpinner(true);
    await fetch_users('');
    setSpinner(false);
  };
  const onSearchUser = async val => {
    await fetch_users(val);
  };

  return (
    <View style={{...styles.container}}>
      <StatusBar barStyle="light-content" backgroundColor={'black'} />
      <SemiBold
        label={t(`common:discover`)}
        size={mvs(17)}
        style={{alignSelf: 'center'}}
      />
      <PrimaryInput
        placeholder={t(`common:searchCreators`)}
        icon="Search"
        style={styles.search_box}
        showCancel={showCancel}
        onCancelClick={() => setShowCancel(false)}
        onChange={val => onSearchUser(val)}
        onTouch={() => setShowCancel(true)}
      />

      <View style={{...styles.body, paddingTop: 0}}>
        <FlatList
          contentContainerStyle={{
            paddingBottom: 100,
            paddingHorizontal: mvs(17),
          }}
          data={search_users}
          numColumns={2}
          renderItem={({item, index}) => (
            <UserItem
              style={
                index % 2 == 0 ? {marginRight: mvs(5)} : {marginLeft: mvs(5)}
              }
              item={item}
              title={item?.userName}
              imageUrl={item?.profile}
              onClick={() =>
                navigation.navigate('OtherUserProfile', {
                  isMe: false,
                  id: item?.id,
                })
              }
            />
          )}
        />
      </View>
      <Spinner
        visible={spinner}
        textContent={t(`common:loading`)}
        textStyle={{color: '#FFF'}}
      />
    </View>
  );
};

const mapStateToProps = store => ({
  user_info: store.state.user_info,
  search_users: store.state.search_users,
  // user_find:store.state.user_find
});

const mapDispatchToProps = {
  // search_user: (payload) => APP_API.search_user(payload),
  fetch_users: name => APP_API.fetch_users(name),
};
export default connect(mapStateToProps, mapDispatchToProps)(DiscoverTab);
