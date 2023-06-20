import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import ReactNativeModal from 'react-native-modal';
import {Back, Delete} from '../../assets/svgs';
import colors from '../../services/colors';
import {mvs} from '../../services/metrices';

const ImageModal = ({
  visible,
  onOk,
  imageUri,
  showDelete = false,
  onDelete,
}) => {
  return (
    <ReactNativeModal
      isVisible={visible}
      onBackdropPress={onOk}
      style={{margin: 0}}>
      <View style={styles.container}>
        <TouchableOpacity onPress={onOk} style={styles.back}>
          <Back />
        </TouchableOpacity>
        {showDelete && (
          <TouchableOpacity onPress={onDelete} style={styles.delete}>
            <Delete />
          </TouchableOpacity>
        )}
        <FastImage
          source={{uri: imageUri}}
          style={{width: '100%', height: '100%', borderRadius: mvs(15)}}
          resizeMode="contain"
        />
      </View>
    </ReactNativeModal>
  );
};
export default ImageModal;
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: colors.lightBlack,
    flex: 1,
    borderRadius: mvs(15),
    ...StyleSheet.absoluteFillObject,
    top: mvs(5),
    bottom: mvs(5),
    left: mvs(5),
    right: mvs(5),
    padding: 0,
  },
  back: {
    position: 'absolute',
    top: mvs(10),
    left: mvs(10),
    zIndex: 100,
  },
  delete: {
    position: 'absolute',
    top: mvs(10),
    right: mvs(10),
    zIndex: 100,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    padding: mvs(12),
    borderRadius: mvs(1000),
  },
});
