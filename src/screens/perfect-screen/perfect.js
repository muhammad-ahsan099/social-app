import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {ScrollView, View} from 'react-native';
import {Signin_Styles as styles} from './style';
import PrimaryButton from '../../components/buttons/primary-button';
import colors from '../../services/colors';
import Bold from '../../typo-graphy/bold-text';
import {mvs} from '../../services/metrices';
import Regular from '../../typo-graphy/regular-text';
import ImagePlaceholder from '../../components/atoms/image-placeholder';
import {VectoryImage} from '../../assets/images';
import SERVICES from '../../services/common-services';
const Perfect = props => {
  const navigation = useNavigation();
  const {route} = props;
  return (
    <View style={{...styles.container}}>
      <ScrollView contentContainerStyle={{flexGrown: 1}}>
        <View style={styles.body}>
          <ImagePlaceholder
            uri={VectoryImage}
            containerStyle={{height: mvs(140), width: mvs(140)}}
          />
          <Bold
            label={SERVICES.translate('perfect')}
            style={{marginTop: mvs(11)}}
            color={colors.white}
            size={24}
          />
          <Regular
            numberOfLines={2}
            size={16}
            style={{lineHeight: mvs(23), marginTop: mvs(11)}}
            label={SERVICES.translate('passwordUpdatedSuccessfully')}
          />
          {route?.params?.changePassword ? (
            <PrimaryButton
              title={SERVICES.translate('goBack')}
              onClick={() => {
                navigation.goBack();
              }}
              style={{width: '100%', marginTop: mvs(41)}}
            />
          ) : (
            <PrimaryButton
              title={SERVICES.translate('continue')}
              onClick={() => {
                navigation.navigate('Signin');
              }}
              style={{width: '100%', marginTop: mvs(41)}}
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};
export default Perfect;
