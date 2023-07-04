import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import colors from '../../services/colors';
import {mvs} from '../../services/metrices';
import {STORAGE_URL, URLS} from '../../store/api-urls';
import Bold from '../../typo-graphy/semibold-text';
import PrimaryButton from '../buttons/primary-button';
const UserItem = ({style, titleStyle, onClick, item, ...props}) => {
  return (
    <TouchableOpacity style={{...styles.container, ...style}} onPress={onClick}>
      {item?.profile ? (
        <FastImage
          // source={{uri: `${URLS.image_url}${item?.profile}`}}
          source={{uri: `${STORAGE_URL.image_url}${item?.profile}`}}
          style={styles.imageStyle}
        />
      ) : (
        <View style={styles.empty_image}></View>
      )}
      {item?.fullName && (
        <Bold
          size={mvs(10)}
          color={colors.blue}
          label={item?.fullName}
          numberOfLines={1}
          style={styles.email}
        />
      )}
      <Bold
        size={mvs(10)}
        color={colors.white}
        label={item?.userName}
        style={styles.title}
      />
      <PrimaryButton
        onClick={onClick}
        title="View Profile"
        style={{height: mvs(30), marginTop: mvs(10)}}
        titleStyle={{fontSize: mvs(12)}}
      />
    </TouchableOpacity>
  );
};
export default UserItem;
const styles = StyleSheet.create({
  container: {
    borderRadius: mvs(10),
    ...colors.shadow,
    backgroundColor: colors.secondary,
    paddingHorizontal: mvs(20),
    paddingBottom: mvs(15),
    marginTop: mvs(15),
    borderWidth: mvs(0.7),
    borderColor: colors.line,
    paddingTop: mvs(20),
    width: '50%',
  },
  imageStyle: {
    alignSelf: 'center',
    borderRadius: mvs(1000),
    height: mvs(93),
    width: mvs(93),
  },
  empty_image: {
    height: mvs(93),
    width: mvs(93),
    borderRadius: mvs(1000),
    backgroundColor: colors.lightBlack,
    borderWidth: 0.5,
    borderColor: colors.white,
    alignSelf: 'center',
  },
  title: {
    textAlign: 'center',
    maxWidth: mvs(120),
    marginTop: mvs(6),
    alignSelf: 'center',
  },
  email: {
    textAlign: 'center',
    width: mvs(130),
    marginTop: mvs(10),
    alignSelf: 'center',
  },
});
