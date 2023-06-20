//import liraries
import React, {useState} from 'react';
import {View, ScrollView, Alert} from 'react-native';
import {connect} from 'react-redux';
import {mvs} from '../../services/metrices';
import {useNavigation} from '@react-navigation/native';
import styles from './otp-styles';
import {Logo} from '../../assets/svgs';
import {OtpInput} from '../../components/molecules/otp-input/otp-input';
import {CustomHeader} from '../../components/molecules/header/header-1x';
import PrimaryButton from '../../components/buttons/primary-button';
import SemiBold from '../../typo-graphy/semibold-text';
import {useTranslation} from 'react-i18next';
const Otp = props => {
  const {t} = useTranslation();
  const {route} = props;
  const {email, otp} = route.params;
  const navigation = useNavigation();
  const [value, setValue] = React.useState('');
  const [isMatch, setIsMatch] = React.useState(true);

  const verify = () => {
    if (value == otp) {
      navigation.navigate('NewPassword', {email: email});
    } else {
      Alert.alert(t('common:alert'), t('common:incorrectCode'));
      setIsMatch(false);
    }
  };

  return (
    <View style={{...styles.conntainer}}>
      <CustomHeader title={t('common:emailVerification')} allowBackBtn />
      <Logo style={{marginTop: mvs(20), alignSelf: 'center'}} />
      <SemiBold
        label={t('common:sentcodeOnEmail')}
        style={{
          marginTop: mvs(20),
          alignSelf: 'center',
          width: mvs(250),
          textAlign: 'center',
        }}
        numberOfLines={3}
      />
      <View style={styles.body}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <View style={{paddingHorizontal: mvs(60)}}></View>
          <OtpInput isMatch={isMatch} value={value} setValue={setValue} />
          <PrimaryButton
            title={t('common:continue')}
            style={{marginTop: mvs(46), marginHorizontal: mvs(37)}}
            onClick={() => verify()}
          />
        </ScrollView>
      </View>
    </View>
  );
};

const mapStateToProps = store => ({});

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(Otp);
