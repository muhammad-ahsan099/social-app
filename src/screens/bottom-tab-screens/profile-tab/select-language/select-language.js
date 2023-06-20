import React from 'react';
import {View} from 'react-native';

import Selector from '../../../../components/atoms/language-selector';

export default function SelectLanguage() {
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Selector />
    </View>
  );
}
