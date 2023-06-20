import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  FlatList,
} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import Regular from '../../typo-graphy/regular-text';
import colors from '../../services/colors';
import {URLS} from '../../store/api-urls';
import {mvs, width} from '../../services/metrices';
import Row from '../atoms/row';
import {useTranslation} from 'react-i18next';
import {
  Download,
  Bookmark,
  Report,
  NotInterested,
  ReportStory,
  FaceBookIcon,
  WhatsAppIcon,
  MessengerIcon,
  TwitterIcon,
  InstaIcon,
} from '../../assets/images';
import {RightVector} from '../../assets/svgs/setting-icons';
import ImagePlaceholder from '../atoms/image-placeholder';
import Bold from '../../typo-graphy/bold-text';
import {Cross} from '../../assets/svgs';
const PrimaryShare = ({
  contact,
  onSavePress,
  onSendPress = () => {},
  onReportPress,
  visible,
  onBlur,
  onAppPress = () => {},
}) => {
  const {t} = useTranslation();
  const socialOptions = [
    {id: 1, icon: FaceBookIcon, action: 'FACEBOOK'},
    {id: 2, icon: WhatsAppIcon, action: 'WHATSAPP'},
    {id: 3, icon: MessengerIcon, action: 'MESSENGER'},
    {id: 4, icon: TwitterIcon, action: 'TWITTER'},
    {id: 5, icon: InstaIcon, action: 'INSTAGRAM'},
  ];
  return (
    <ReactNativeModal
      isVisible={visible}
      onBackdropPress={onBlur}
      style={{margin: 0}}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.cross} onPress={onBlur}>
          <Cross />
        </TouchableOpacity>
        <Bold label={t('common:shareContent')} color={colors.white} />
        <Row alignItems="center" style={styles.row}>
          <Image
            style={{
              tintColor: colors.white,
              width: mvs(20),
              height: mvs(25),
              alignSelf: 'center',
            }}
            source={Report}
            resizeMode="stretch"
          />
          <TouchableOpacity
            style={{flex: 1, marginHorizontal: mvs(19)}}
            onPress={onReportPress}>
            <Regular
              size={14}
              color={colors.white}
              label={t('common:report')}
            />
          </TouchableOpacity>
        </Row>
        <FlatList
          contentContainerStyle={{marginVertical: mvs(8)}}
          data={socialOptions}
          horizontal
          renderItem={({item, index}) => (
            <TouchableOpacity
              key={index}
              style={{marginRight: mvs(15)}}
              onPress={() => onAppPress(item?.action)}>
              <Image
                style={{width: mvs(50), height: mvs(50), borderRadius: 1000}}
                source={item?.icon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}
        />
      </View>
    </ReactNativeModal>
  );
};
export default PrimaryShare;
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: width,
    borderBottomWidth: mvs(0.7),
    borderTopColor: colors.lightgrey,
    backgroundColor: colors.lightBlack,
    borderTopLeftRadius: mvs(30),
    borderTopRightRadius: mvs(30),
    padding: 15,
    alignItems: 'center',
    alignSelf: 'center',
    paddingTop: mvs(23),
  },
  PAYMENTDROPDOWN: {
    justifyContent: 'space-between',
    height: mvs(50),
    alignItems: 'center',
    borderRadius: 10,
    top: mvs(8),
    borderBottomWidth: 0.9,
    borderColor: colors.gray,
    paddingHorizontal: mvs(11),
    paddingVertical: mvs(10),
  },
  butonMain: {},
  description: {
    height: 100,
    alignItems: 'flex-start',
  },
  button: {
    flex: 1,
    width: width - 18,
    marginVertical: mvs(18),
  },
  reasonName: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 30,
  },
  row: {
    marginBottom: mvs(7),
    paddingLeft: mvs(5),
    marginTop: mvs(10),
    paddingBottom: mvs(10),
    borderBottomColor: colors.white,
    borderBottomWidth: 0.5,
  },
  cross: {
    position: 'absolute',
    right: mvs(10),
    top: mvs(10),
  },
});
