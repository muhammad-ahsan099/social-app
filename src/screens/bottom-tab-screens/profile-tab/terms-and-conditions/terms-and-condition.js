import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {ScrollView, View} from 'react-native';
import {Styles as styles} from './style';
import {CustomHeader} from '../../../../components/molecules/header/header-1x';
import Bold from '../../../../typo-graphy/bold-text';
import {mvs} from '../../../../services/metrices';
import Regular from '../../../../typo-graphy/regular-text';
import SERVICES from '../../../../services/common-services';

const TermsConditions = props => {
  const navigation = useNavigation();

  return (
    <View style={{...styles.container}}>
      <CustomHeader title={SERVICES.translate('terms')} allowBackBtn />

      <ScrollView contentContainerStyle={{flexGrown: 1}}>
        <View style={styles.body}>
          <Bold label={SERVICES.translate('terms')} size={30} />
          <View style={{marginTop: mvs(30)}}>
            <Regular
              numberOfLines={100}
              size={16}
              style={{lineHeight: mvs(28)}}
              label={
                'Exercitation eu commodo culpa veniam. Ipsum et irure deserunt eu laboris occaecat magna exercitation eu ipsum veniam aliqua. Excepteur sit et veniam adipisicing fugiat do aute nisi veniam occaecat ut est nostrud deserunt. Enim anim duis sint ipsum enim. Cupidatat elit veniam sit qui tempor sint voluptate minim.\n\nipsum proident proident. Nulla do nisi dolor occaecat irure do dolor cillum deserunt. Tempor elit sit ea laborum aliquip. Reprehenderit Lorem id et sunt sunt. Minim elit officia commodo laborum cillum magna ut commodo pariatur sint amet ex Lorem. Dolore non occaecat laboris cupidatat eu tempor cupidatat. Aliquip qui aliqua officia elit aliquip in dolor commodo. Non veniam incididunt do nisi sunt cupidatat non nulla.'
              }
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default TermsConditions;
