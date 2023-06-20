import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import APP_API from '../../../../store/api-calls';
import { Styles as styles } from './style';
import { CustomHeader } from '../../../../components/molecules/header/header-1x';
import Row from '../../../../components/atoms/row';
import { mvs } from '../../../../services/metrices';
import PrimaryButton from '../../../../components/buttons/primary-button';
import PrimaryInput from '../../../../components/input/primary-input';
const NewPayment = props => {
  const navigation = useNavigation();
  return (
    <View style={{ ...styles.container}}>
    <CustomHeader title='Add New Card' allowBackBtn />
      
      <ScrollView contentContainerStyle={{flexGrown:1,flex:1}}>
        <View style={{...styles.body,paddingLeft:23}}>
          <View style={styles.input_container}>
              <PrimaryInput  icon={" "} placeholder="Name On Card"/>
              <PrimaryInput  icon={" "} placeholder="Card Number"/>
              <Row>
                <PrimaryInput  icon={" "} placeholder="Expiry Date" style={{flex:1,marginRight:mvs(4)}}/>
                <PrimaryInput  icon={" "} placeholder="CVV" style={{flex:1,marginLeft:mvs(4)}}/>
              </Row>
               <PrimaryButton title='Add New Card' style={{marginTop:mvs(55)}}
                onClick={()=>console.log("card added")}/>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = store => ({
  user_info: store.state.user_info,
});

const mapDispatchToProps = {
  signin: payload => APP_API.signin(payload),
};
export default connect(mapStateToProps, mapDispatchToProps)(NewPayment);
