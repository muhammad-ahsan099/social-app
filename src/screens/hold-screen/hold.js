import React, {  } from 'react';
import { ScrollView, View } from 'react-native';
import { Signin_Styles as styles } from './style';
import Regular from '../../typo-graphy/regular-text';
import { HoldIcon } from '../../assets/svgs';
const Hold = props => {
  const {navigation} = props;
  React.useEffect(() => {
      setTimeout(() => {
           navigation.replace('BottomTab')
      }, 3000);
  }, []);
  return (
    <View style={{ ...styles.container}}>
     
      <ScrollView contentContainerStyle={{flexGrown:1,flex:1}}>
        <View style={styles.body}>
         <HoldIcon/>
         <Regular numberOfLines={2} size={16} 
            style={styles.holdText}
            label={'Hold tight we’re setting up the stage for you'}/>
      
        </View>
      </ScrollView>
    </View>
  );
};

export default Hold;
