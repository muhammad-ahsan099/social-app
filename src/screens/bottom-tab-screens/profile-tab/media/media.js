import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import APP_API from '../../../../store/api-calls';
import {Styles as styles} from './style';
import {CustomHeader} from '../../../../components/molecules/header/header-1x';
import Video from 'react-native-video';
import {mvs} from '../../../../services/metrices';
import {PlayBank} from '../../../../assets/svgs';
import Row from '../../../../components/atoms/row';
import {URLS} from '../../../../store/api-urls';
import Regular from '../../../../typo-graphy/regular-text';
import SERVICES from '../../../../services/common-services';

const Media = props => {
  const {get_save_media, user_info, save_media} = props;
  const navigation = useNavigation();
  const videoRef = useRef(null);
  useEffect(() => {
    getUserSaveMedia();
  }, []);
  const getUserSaveMedia = async () => {
    await get_save_media();
    console.log('result' + JSON.stringify(save_media));
  };
  return (
    <View style={{...styles.container}}>
      <CustomHeader title={SERVICES.translate('savedMedia')} allowBackBtn />
      <View style={{...styles.body}}>
        <FlatList
          numColumns={3}
          data={save_media}
          renderItem={({item, index}) => (
            <TouchableOpacity key={index} style={styles.videItem}>
              <Video
                ref={videoRef}
                source={{uri: `${URLS.image_url}${item.path}`}}
                style={styles.backgroundVideo}
                muted={true}
                repeat={false}
                resizeMode={'cover'}
                rate={1.0}
                ignoreSilentSwitch={'obey'}
              />
              <Row style={{alignSelf: 'flex-end', alignItems: 'center'}}>
                <PlayBank />
                <Regular
                  label={item?.likes}
                  size={12.3}
                  style={{marginLeft: mvs(8)}}
                />
              </Row>
              <Regular label={item?.description} size={11} numberOfLines={2} />
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

const mapStateToProps = store => ({
  user_info: store.state.user_info,
  save_media: store.state.save_media,
});

const mapDispatchToProps = {
  get_save_media: () => APP_API.get_save_media(),
};
export default connect(mapStateToProps, mapDispatchToProps)(Media);
