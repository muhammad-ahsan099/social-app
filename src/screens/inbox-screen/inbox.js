import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { ScrollView, View ,FlatList} from 'react-native';
import { connect } from 'react-redux';
import APP_API from '../../store/api-calls';
import { Styles as styles } from './style';
import { CustomHeader } from '../../components/molecules/header/header-1x';
import SearchItem from '../../components/user-cards/search-item';
import PrimaryInput from '../../components/input/primary-input';
import colors from '../../services/colors';
const MyInbox = props => {
  const navigation = useNavigation();
  const[showCancel,setShowCancel]=useState(false)
  const[friends,setFriends]=useState([
   {id:1,name:'@vansessa34',lastMsg:'Angelina: What’s that 😹 👀?',time:'Today 12:54',isSeen:false},
   {id:2,name:'@Margarita43',lastMsg:'Margarita: Hell yeah 😊',time:'Today 12:54',isSeen:true},
   {id:3,name:'@vansessa34',lastMsg:'Angelina: What’s that?',time:'Today 12:54',isSeen:true},
   {id:4,name:'@vansessa34',lastMsg:'Angelina: What’s that?',time:'Sunday 12:54',isSeen:true},
  ]);
  return (
    <View style={{ ...styles.container}}>
     <CustomHeader title='Inbox' allowBackBtn />
     <PrimaryInput placeholder='Search Friends' icon='Search'
       style={styles.search_box} showCancel={showCancel} 
       onCancelClick={()=>setShowCancel(false)}
       onTouch={()=>setShowCancel(true)}/>
      <ScrollView contentContainerStyle={{flexGrown:1}}>
        <View style={styles.body}>
        <FlatList
              data={friends}
              renderItem={({ item }) => 
                  <SearchItem 
                   onClick={()=>navigation.navigate("Conversation")}
                   style={styles.itemStyle}
                   nameLines={2}
                   nameSize={15}
                   msgStyle={{color:item.isSeen?colors.lightgrey1:colors.white}}
                   name={item.name} 
                   msgTime={item.time}
                   msg={item.lastMsg}/>
              }
            />
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
export default connect(mapStateToProps, mapDispatchToProps)(MyInbox);
