import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import colors from '../../services/colors';
import {mvs} from '../../services/metrices';
import SemiBold from '../../typo-graphy/semibold-text';
import Row from '../atoms/row';
import {URLS} from '../../store/api-urls';
import Bold from '../../typo-graphy/bold-text';
import moment from 'moment';
import SERVICES from '../../services/common-services';
import FastImage from 'react-native-fast-image';
const SubscriptionItem = ({style, onRenew, onUnSubscribe, item}) => {
  return (
    <TouchableOpacity>
      <Row style={{...styles.container, ...style}}>
        <FastImage
          source={{uri: `${URLS.image_url}${item?.userImage}`}}
          style={{...styles.image}}
        />
        <Row style={{...styles.info}} alignItems="center">
          <View style={{flex: 1}}>
            <SemiBold
              label={item?.username}
              size={mvs(14)}
              color={colors.black}
              style={{}}
            />
            <Bold
              label={item?.subscription?.amount + ' GNF / mo'}
              size={mvs(11)}
              color={colors.lightgrey1}
              style={{}}
            />
            {item?.subscription?.isExpired ? (
              <Bold
                numberOfLines={2}
                label={
                  `${SERVICES.translate('expiredOn')}\n` +
                  moment(item?.subscription?.expirationDate).format(
                    'DD-MM-YYYY',
                  )
                }
                size={mvs(11)}
                color={colors.red}
                style={{lineHeight: mvs(14)}}
              />
            ) : (
              <Bold
                numberOfLines={2}
                label={
                  `${SERVICES.translate('renewsOn')}\n` +
                  moment(item?.subscription?.expirationDate).format(
                    'DD-MM-YYYY',
                  )
                }
                size={mvs(11)}
                color={colors.primary}
                style={{lineHeight: mvs(14)}}
              />
            )}
          </View>

          {item?.subscription?.isExpired ? (
            <TouchableOpacity onPress={onRenew} style={styles.button}>
              <SemiBold
                label={SERVICES.translate('renew')}
                size={10}
                color={colors.white}
                style={{}}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.button} onPress={onUnSubscribe}>
              <SemiBold
                label={SERVICES.translate('unsubscribe')}
                size={10}
                color={colors.white}
                style={{}}
              />
            </TouchableOpacity>
          )}
        </Row>
      </Row>
    </TouchableOpacity>
  );
};
export default SubscriptionItem;
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: mvs(4),
    marginTop: mvs(23),
    height: mvs(100),
    backgroundColor: colors.white,
    borderWidth: 1,
    borderRadius: mvs(40),
    borderColor: colors.lightgrey1,
  },
  image: {
    height: mvs(88),
    width: mvs(74),
    borderRadius: mvs(30),
  },
  info: {
    marginHorizontal: mvs(8),
    flex: 1,
  },
  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: mvs(20),
    paddingVertical: mvs(8),
    borderRadius: mvs(40),
  },
});
