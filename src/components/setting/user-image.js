import React from 'react';
import {StyleSheet, TouchableOpacity, Image, View} from 'react-native';
import {mvs} from '../../services/metrices';
import colors from '../../services/colors';
import FastImage from 'react-native-fast-image';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import Bold from '../../typo-graphy/bold-text';
import {SuperFan} from '../../assets/svgs';
const UserImage = ({
  imageUrl = '',
  viewerType = 'Public',
  showPrivate = false,
  onClick,
  user_profile,
}) => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={styles.photoStyle} onPress={onClick}>
      {showPrivate == true && viewerType == 'Private' && (
        <View style={styles.private_view}>
          <TouchableOpacity
            style={styles.superfan}
            onPress={() =>
              navigation.navigate('Subscribe', {
                id: user_profile?.user?.id,
              })
            }>
            <SuperFan width={mvs(47)} height={mvs(47)} />
            <Bold
              label={t('common:seeContent')}
              color={colors.white}
              size={mvs(10)}
              numberOfLines={2}
              style={styles.superfanText}
            />
          </TouchableOpacity>
        </View>
      )}
      <FastImage
        source={{uri: imageUrl}}
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    </TouchableOpacity>
  );
};
export default UserImage;
const styles = StyleSheet.create({
  photoStyle: {
    width: '33.33%',
    height: mvs(163),
    borderWidth: 0.1,
    borderColor: colors.white,
  },

  private_view: {
    position: 'absolute',
    ...StyleSheet.absoluteFill,
    backgroundColor: colors.lightBlack,
    zIndex: 100,
  },
  superfan: {
    backgroundColor: colors.black,
    width: '100%',
    height: mvs(163),
    marginBottom: mvs(60),
    elevation: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.3,
    borderColor: colors.white,
  },
  superfanText: {
    textAlign: 'center',
    width: mvs(100),
    marginTop: mvs(10),
  },
});
