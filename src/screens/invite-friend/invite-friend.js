import { useNavigation } from '@react-navigation/native';
import React, {  useState ,useEffect} from 'react';
import {View ,TouchableOpacity,FlatList} from 'react-native';
import { Styles as styles } from './style';
import { CustomHeader } from '../../components/molecules/header/header-1x';
import APP_API from '../../store/api-calls';
import SemiBold from '../../typo-graphy/semibold-text';
import { Upload } from '../../assets/svgs/setting-icons';
import { connect } from 'react-redux';
import Regular from '../../typo-graphy/regular-text';
import colors from '../../services/colors';
import SearchItem from '../../components/user-cards/search-item';
import { mvs } from '../../services/metrices';
import PrimaryInput from '../../components/input/primary-input';



const InviteFriend = props => {
   
    const{navigation,search,search_users,save_history,user_info,fetch_history,history,fetch_category,categories}=props
    const[showCancel,setShowCancel]=useState(false)
    const onSearch=async(val)=>{
      search({username:val})
      .then(res=>{
        console.log(search_users)
      }).catch(err=>console.log(err))
    }
    const onSearchUserClick=async(user)=>{
      save_history({user_id:user_info?.id,search_id:user?.id})
      .then(res=>{
         if(res?.data?.status==true){
          navigation.navigate("UserProfile",{isMe:false,id:user?.id})
         }
      }).catch(err=>console.log(err))
    }

     return (
        <View style={{ ...styles.container}}>
            <CustomHeader title='Invite Friends To Livestream' allowBackBtn />
            <PrimaryInput placeholder='Search your friend' icon='Search'
                style={styles.search_box} showCancel={showCancel} 
                onCancelClick={()=>setShowCancel(false)}
                onChange={(val)=>onSearch(val)}
                onTouch={()=>setShowCancel(true)}/>

            {!showCancel? <>
                    <View style={{height:mvs(50)}}>
                
                    </View>
                    </>:
                    <View style={{...styles.body,paddingTop:0}}>
                    <FlatList
                    contentContainerStyle={{paddingBottom:10}}
                    data={search_users}
                    renderItem={({ item }) => 
                    <SearchItem name={item?.username} imageUrl={item?.image} onClick={()=>onSearchUserClick(item)}/>
                    }
                    />
                    </View>
                }  

        </View>
    )
}
const mapStateToProps = store => ({
    user_info: store.state.user_info,
    search_users:store.state.search_users,
    history:store.state.search_history,
    categories:store.state.categories
  });
  
  const mapDispatchToProps = {
    search: payload => APP_API.search_user(payload),
    save_history:payload=>APP_API.set_search_history(payload),
    fetch_history:payload=>APP_API.fetch_search_history(payload),
    fetch_category:payload=>APP_API.fetch_categories(payload),
  };
  export default connect(mapStateToProps, mapDispatchToProps)(InviteFriend);

