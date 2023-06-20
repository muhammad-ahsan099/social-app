import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import colors from '../../services/colors';
import {mvs} from '../../services/metrices';
import Row from '../atoms/row';
import Regular from '../../typo-graphy/regular-text';
import {Edit} from '../../assets/svgs';
import {useTranslation} from 'react-i18next';
import {URLS} from '../../store/api-urls';
import SemiBold from '../../typo-graphy/semibold-text';
import Medium from '../../typo-graphy/medium-text';
import FastImage from 'react-native-fast-image';
const UserInfo = ({user_profile = {}}) => {
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <Row style={{paddingTop: mvs(0)}} alignItems="center">
        {user_profile?.user?.profile ? (
          <FastImage
            source={{
              uri: `${URLS.image_url}${user_profile?.user?.profile}`,
            }}
            style={styles.image}
          />
        ) : (
          <View style={styles.empty_image}></View>
        )}
        <View style={styles.center}>
          <SemiBold size={mvs(12)} label={user_profile?.user?.following} />
          <Medium size={mvs(12)} label={t('common:following')} />
        </View>
        <View style={styles.center}>
          <SemiBold size={mvs(12)} label={user_profile?.user?.superFans} />
          <Medium size={mvs(12)} label={t('common:userSuperFans')} />
        </View>
        <View style={styles.center}>
          <SemiBold size={mvs(12)} label={user_profile?.user?.followers} />
          <Medium size={mvs(12)} label={t('common:followers')} />
        </View>
      </Row>

      <View style={{paddingTop: mvs(10)}}>
        <SemiBold
          label={user_profile?.user?.fullName || user_profile?.user?.userName}
          size={mvs(14)}
        />
        <SemiBold
          label={t('common:about')}
          size={mvs(12)}
          style={{marginTop: mvs(5)}}
        />
        <Regular
          size={mvs(12)}
          numberOfLines={3}
          style={{marginTop: mvs(4)}}
          label={
            user_profile?.user?.about && user_profile?.user?.about != 'null'
              ? user_profile?.user?.about
              : 'Videhope user'
          }
        />
      </View>
    </View>
  );
};
export default UserInfo;
const styles = StyleSheet.create({
  container: {
    marginVertical: mvs(10),
    paddingHorizontal: mvs(10),
  },
  image: {
    height: mvs(70),
    width: mvs(70),
    borderRadius: mvs(1000),
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  empty_image: {
    height: mvs(70),
    width: mvs(70),
    borderRadius: mvs(1000),
    backgroundColor: colors.lightBlack,
    borderWidth: 0.5,
    borderColor: colors.white,
  },
});
