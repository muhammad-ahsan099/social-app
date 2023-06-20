import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import colors from '../../services/colors';
import {mvs} from '../../services/metrices';
import Regular from '../../typo-graphy/regular-text';
import moment from 'moment';
import Row from '../atoms/row';
const PaymentItem = ({
  name = 'Michael Ross',
  addedOn = '06/12/21',
  date = '12/22',
  item,
  style,
  onClick,
  imageUrl = '',
  ...props
}) => {
  const time = moment(item?.createdAt).format('DD/mm/yyyy');
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={{...styles.container, ...style}}
      onPress={onClick}>
      <Row style={{alignItems: 'center'}}>
        <Regular label={item?.accountHolder} size={mvs(16)} />
        <Regular label={'Added on ' + time} size={10} />
      </Row>
      <Row style={{alignItems: 'center'}}>
        <Regular label={'IBAN Numer'} size={mvs(12)} />
        <Regular label={item?.ibanNumber} size={mvs(11)} />
      </Row>
      <Row style={{alignItems: 'center'}}>
        <Regular label={'Account Numer'} size={mvs(12)} />
        <Regular label={item?.accountNumber} size={mvs(11)} />
      </Row>
    </TouchableOpacity>
  );
};
export default PaymentItem;
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: mvs(16),
    paddingVertical: mvs(13),
    marginTop: mvs(18),
    height: mvs(100),
    borderWidth: 1,
    borderRadius: mvs(10),
    borderColor: colors.lightgrey1,
    justifyContent: 'space-between',
  },
  image: {
    height: mvs(52),
    width: mvs(52),
    borderRadius: mvs(1000),
  },
  info: {
    marginHorizontal: mvs(14),
    flex: 1,
  },
});
