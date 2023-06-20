import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Delete, Pause, Play} from '../../assets/svgs';
import colors from '../../services/colors';
import {mvs} from '../../services/metrices';
import Medium from '../../typo-graphy/medium-text';
import Row from '../atoms/row';
import moment from 'moment';
const AudioItem = ({
  name = 'Chill',
  duration = '343',
  style,
  nameStyle,
  durationStyle,
  imageStyle,
  onClick,
  imageUrl = 'Sport',
  nameLines = 1,
  nameSize = 12,
  isPlaying = false,
  showDelete = false,
  onDelete,
  ...props
}) => {
  const time = moment(duration)?.fromNow();
  return (
    <Row style={{...styles.container, ...style}}>
      <FastImage
        source={{uri: imageUrl}}
        style={{...styles.image, ...imageStyle}}
      />
      <Row style={{...styles.borderBottom, ...styles.info}}>
        <View style={{flex: 1}}>
          <Medium
            label={name}
            size={nameSize}
            numberOfLines={nameLines}
            color={colors.white}
            style={{...nameStyle}}
          />
          <Medium
            label={time}
            size={mvs(14)}
            color={colors.lightgrey1}
            style={{marginTop: mvs(2), ...durationStyle}}
          />
        </View>
        {isPlaying ? (
          <TouchableOpacity onPress={onClick}>
            <Pause />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={onClick}>
            <Play />
          </TouchableOpacity>
        )}
        {showDelete && (
          <TouchableOpacity
            onPress={onDelete}
            style={{marginHorizontal: mvs(10)}}>
            <Delete />
          </TouchableOpacity>
        )}
      </Row>
    </Row>
  );
};
export default AudioItem;
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: mvs(4),
    marginTop: mvs(10),
    height: mvs(52),
    zIndex: 1,
  },
  image: {
    height: mvs(50),
    width: mvs(45),
    borderRadius: mvs(1000),
  },
  info: {
    marginLeft: mvs(15),
    flex: 1,
    paddingBottom: mvs(8),
  },
  borderBottom: {
    borderBottomColor: colors.lightgrey1,
    borderBottomWidth: 1,
    flex: 1,
  },
});
