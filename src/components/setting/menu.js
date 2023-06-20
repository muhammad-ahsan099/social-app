import React from 'react';
import {StyleSheet, View, Modal} from 'react-native';
import colors from '../../services/colors';
import SERVICES from '../../services/common-services';
import {mvs} from '../../services/metrices';
import TransparentView from '../atoms/transparent-view';
import MenuButton from '../buttons/menu-button';
const ProfileMenu = ({
  style,
  isVisible = false,
  isMe = false,
  isFollow = false,
  isBlock = false,
  onCancel,
  onBlock,
  onReport,
  onSetting,
  onEdit,
  onFollow,
  ...props
}) => {
  return (
    <Modal visible={isVisible} transparent={true}>
      <TransparentView style={{bottom: mvs(15), left: mvs(18), right: mvs(18)}}>
        <View
          style={{backgroundColor: colors.lightBlack, borderRadius: mvs(10)}}>
          {isMe ? (
            <>
              <MenuButton
                title={SERVICES.translate('editProfile')}
                onClick={onEdit}
                style={styles.btnBlock}
              />
              <MenuButton
                title={SERVICES.translate('settings')}
                onClick={onSetting}
                style={styles.btnReport}
              />
            </>
          ) : (
            <>
              <MenuButton
                title={
                  isBlock
                    ? SERVICES.translate('unBlockAccount')
                    : SERVICES.translate('blockAccount')
                }
                onClick={onBlock}
                style={styles.btnBlock}
              />
              <MenuButton
                title={
                  isFollow
                    ? SERVICES.translate('unFollow')
                    : SERVICES.translate('follow')
                }
                onClick={onFollow}
                style={styles.btnReport}
              />
              <MenuButton
                title={SERVICES.translate('report')}
                onClick={onReport}
                style={styles.btnReport}
              />
            </>
          )}
        </View>
        <View style={styles.btnCancelView}>
          <MenuButton
            title={SERVICES.translate('cancel')}
            onClick={onCancel}
            style={{backgroundColor: colors.lightBlack1}}
            titleStyle={{color: colors.blue}}
          />
        </View>
      </TransparentView>
    </Modal>
  );
};
export default ProfileMenu;
const styles = StyleSheet.create({
  btnReport: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderTopColor: colors.lightgrey1,
    borderTopWidth: 1,
  },

  btnCancelView: {
    borderRadius: mvs(10),
    marginTop: mvs(10),
    backgroundColor: colors.lightBlack1,
    marginBottom: mvs(22),
  },
  btnBlock: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
});
