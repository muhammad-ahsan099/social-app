import moment from 'moment';
import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import colors from '../../services/colors';
import {mvs} from '../../services/metrices';
import {URLS} from '../../store/api-urls';
import Regular from '../../typo-graphy/regular-text';
import SemiBold from '../../typo-graphy/semibold-text';
import Row from '../atoms/row';
const SearchItem = ({
  name = '@username23',
  msg = 'Sunshine',
  msgTime,
  style,
  nameStyle,
  msgStyle,
  imageStyle,
  onClick,
  imageUrl = 'Sport',
  nameLines = 1,
  nameSize = 13,
  ...props
}) => {
  const timeOfMsg = msgTime ? moment(msgTime).calendar() : '';
  return (
    <TouchableOpacity onPress={onClick} style={{...styles.container, ...style}}>
      <Row alignItems="center">
        <FastImage
          resizeMode="cover"
          source={{uri: `${URLS.image_url}${imageUrl}`}}
          style={{...styles.image, ...imageStyle}}
        />
        <View style={{...styles.info}}>
          <SemiBold
            label={name}
            size={nameSize}
            numberOfLines={nameLines}
            color={colors.white}
            style={{...nameStyle}}
          />
          <Regular
            label={msg}
            size={13}
            color={colors.lightgrey1}
            style={{marginTop: mvs(4), ...msgStyle}}
          />
        </View>
      </Row>
      {msgTime && (
        <View style={{alignItems: 'flex-end'}}>
          <Regular label={timeOfMsg} size={10} color={colors.lightgrey1} />
        </View>
      )}
    </TouchableOpacity>
  );
};
export default SearchItem;
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: mvs(4),
    marginTop: mvs(18),
    height: mvs(52),
  },
  image: {
    height: mvs(50),
    width: mvs(50),
    borderRadius: mvs(1000),
    backgroundColor: colors.lightBlack,
  },
  info: {
    marginHorizontal: mvs(10),
    flex: 1,
  },
});
