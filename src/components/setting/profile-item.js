import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import colors from '../../services/colors';
import {mvs} from '../../services/metrices';
import Row from '../atoms/row';
import Regular from '../../typo-graphy/regular-text';
import {Edit} from '../../assets/svgs';
const ProfileItem = ({
  keyName = 'Name',
  value = 'kamran khan',
  keyStyle,
  valueStyle,
  onClick,
  editable = true,
}) => {
  return (
    <Row style={styles.container} alignItems="center">
      <Regular size={15} label={keyName} style={{...keyStyle}} />
      {!editable ? (
        <Regular
          size={mvs(12)}
          label={value}
          color={colors.lightgrey1}
          style={{...valueStyle}}
        />
      ) : (
        <Row
          alignItems="center"
          style={{width: '80%', justifyContent: 'flex-end'}}>
          <Regular
            size={mvs(12)}
            label={value}
            color={colors.lightgrey1}
            style={{...valueStyle}}
          />
          <TouchableOpacity onPress={onClick} style={styles.edit}>
            <Edit />
          </TouchableOpacity>
        </Row>
      )}
    </Row>
  );
};
export default ProfileItem;
const styles = StyleSheet.create({
  container: {
    marginVertical: mvs(17),
    paddingHorizontal: mvs(10),
  },
  edit: {
    marginLeft: mvs(10),
  },
});
