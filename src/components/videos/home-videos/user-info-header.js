import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {mvs} from '../../../services/metrices';
import {URLS} from '../../../store/api-urls';
import Regular from '../../../typo-graphy/regular-text';
import Row from '../../atoms/row';
import moment from 'moment';
import {colors} from 'react-native-swiper-flatlist/src/themes';
const UserInfoHeader = ({
  userImage = '',
  userName = '',
  onUserPress,
  createdAt,
}) => {
  const time = createdAt ? moment(createdAt)?.fromNow() : moment().fromNow();
  return (
    <TouchableOpacity onPress={onUserPress} style={styles.container}>
      <Row alignItems="center" style={{justifyContent: 'flex-start'}}>
        {userImage ? (
          <FastImage
            source={{uri: `${URLS.image_url}${userImage}`}}
            style={styles.image}
          />
        ) : (
          <View style={styles.empty_image}></View>
        )}
        <View style={{marginLeft: mvs(10)}}>
          <Regular
            style={{color: colors.white, fontSize: mvs(11)}}
            label={userName}
          />
          <Regular
            style={{color: colors.gray, fontSize: mvs(11)}}
            label={time}
          />
        </View>
      </Row>
    </TouchableOpacity>
  );
};
export default UserInfoHeader;
const styles = StyleSheet.create({
  container: {
    marginVertical: mvs(10),
    paddingHorizontal: mvs(10),
  },
  image: {
    height: mvs(32),
    width: mvs(32),
    borderRadius: mvs(1000),
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  empty_image: {
    height: mvs(32),
    width: mvs(32),
    borderRadius: mvs(1000),
    backgroundColor: colors.gray,
    borderWidth: 0.5,
    borderColor: colors.white,
  },
});
