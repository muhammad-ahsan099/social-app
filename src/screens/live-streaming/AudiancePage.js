import React from 'react';
import {StyleSheet, View} from 'react-native';
import ZegoUIKitPrebuiltLiveStreaming, {
  AUDIENCE_DEFAULT_CONFIG,
} from '@zegocloud/zego-uikit-prebuilt-live-streaming-rn';
import SECRET from '../../store/secrets';
import {URLS} from '../../store/api-urls';
import {connect} from 'react-redux';
const AudiencePage = props => {
  const {route, user_info} = props;
  const {params} = route;
  const {userID, userName, liveID} = params;

  return (
    <View style={styles.container}>
      <ZegoUIKitPrebuiltLiveStreaming
        appID={SECRET.appId}
        appSign={SECRET.appSignin}
        userID={userID + ''}
        userName={userName}
        profileUrl={`${URLS.image_url}${user_info?.profile}`}
        liveID={liveID + ''}
        config={{
          ...AUDIENCE_DEFAULT_CONFIG,
          onLeaveLiveStreaming: () => {
            props.navigation.goBack();
          },
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0,
  },
  avView: {
    flex: 1,
    width: '100%',
    height: '100%',
    zIndex: 1,
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: 'red',
  },
  ctrlBar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: 50,
    width: '100%',
    height: 50,
    zIndex: 2,
  },
  ctrlBtn: {
    flex: 1,
    width: 48,
    height: 48,
    marginLeft: 37 / 2,
    position: 'absolute',
  },
});
const mapStateToProps = store => ({
  user_info: store.state.user_info,
});

const mapDispatchToProps = {
  end_live: id => APP_API.end_live(id),
};
export default connect(mapStateToProps, mapDispatchToProps)(AudiencePage);
