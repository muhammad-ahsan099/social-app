import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import Bold from '../../typo-graphy/bold-text';
import colors from '../../services/colors';
import {mvs, width} from '../../services/metrices';
import PrimaryButton from '../buttons/primary-button';
import SeconderyInput from '../input/secondery-input';
import {Cross} from '../../assets/svgs';
const EditKeyModal = ({
  title = '',
  value = '',
  visible,
  onChangeTxt,
  onContinuePress,
}) => {
  return (
    <ReactNativeModal isVisible={visible} style={{margin: 0}}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.cross} onPress={onContinuePress}>
          <Cross />
        </TouchableOpacity>
        <Bold label={title} size={mvs(18)} style={{marginLeft: mvs(6)}} />
        <SeconderyInput
          multiline={title == 'Bio' ? true : false}
          icon={''}
          placeholder={title}
          value={value}
          style={title == 'Bio' ? styles.description : styles.input}
          onChange={onChangeTxt}
        />

        <PrimaryButton
          title={'Continue'}
          onClick={onContinuePress}
          style={styles.button}
        />
      </View>
    </ReactNativeModal>
  );
};
export default EditKeyModal;
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: width,
    //height: mvs(250),
    borderBottomWidth: mvs(0.7),
    borderTopColor: colors.lightgrey,
    backgroundColor: colors.background,
    borderTopLeftRadius: mvs(20),
    borderTopRightRadius: mvs(20),
    padding: 10,
    alignSelf: 'center',
    backgroundColor: colors.lightBlack,
    paddingTop: mvs(30),
    paddingHorizontal: mvs(20),
  },

  description: {
    height: 100,
    alignItems: 'flex-start',
  },
  input: {
    alignItems: 'flex-start',
    paddingLeft: mvs(10),
  },
  button: {
    marginVertical: mvs(18),
  },
  cross: {
    position: 'absolute',
    right: mvs(10),
    top: mvs(10),
  },
});
