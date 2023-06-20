import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View ,FlatList, Alert, ToastAndroid} from 'react-native';
import { connect } from 'react-redux';
import APP_API from '../../store/api-calls';
import { Signin_Styles as styles } from './style';
import PrimaryButton from '../../components/buttons/primary-button';
import colors from '../../services/colors';
import Bold from '../../typo-graphy/bold-text';
import { mvs } from '../../services/metrices';
import Spinner from 'react-native-loading-spinner-overlay';
import InterestCard from '../../components/interest-card/interest-card';
import Regular from '../../typo-graphy/regular-text';
const Interests = props => {
  const {user_info,update_interest}=props
  const navigation = useNavigation();
  const [onSelect,setSelect]=useState(false);
  const[count,setCount]=useState(0);
  const [spinner,setSpinner]=useState(false);
  useEffect(()=>{

  },[onSelect])
  const[interests,setInterests]=useState(
    [{id:1,title:'Sports' ,icon:'Sport',selected:false},
    {id:2,title:'Music/Dance' ,icon:'Music',selected:false},
    {id:3,title:'News' ,icon:'News',selected:false},
    {id:4,title:'Photography' ,icon:'Photography',selected:false},
    {id:5,title:'Cooking' ,icon:'Cooking',selected:false},
    {id:6,title:'Crypto' ,icon:'Crypto',selected:false},
    {id:7,title:'DIY' ,icon:'Diy',selected:false},
    {id:8,title:'Wedding' ,icon:'Wedding',selected:false},
    ]);
   const selectInterest=async(index,isSelected)=>{
         if(isSelected){
          setCount(count-1)
         }else if(count<5){
          setCount(count+1)
         }else{
          Alert.alert("Interests","You Can Select Maximum 5")
          return
         }
         interests[index].selected=!isSelected;
         setInterests(interests)
         setSelect(!onSelect);
    }
    const saveInterests=async()=>{
      setSpinner(true);
      var selected=[];
      for(var i=0;i<interests.length;i++){
        if(interests[i].selected==true){
          selected.push(interests[i].title)
        }
      }
      const payLoad={userId:user_info?.id,interests:selected.toString()}
      update_interest(payLoad).then(res=>{
        if(res?.data?.succeeded==true){
            setSpinner(false)
            ToastAndroid.show("Save Interest Successfully!",ToastAndroid.LONG)
          //navigation.navigate("Hold")
        }
      }).catch(err=>{
        console.log(err)
      })
  }
  return (
    <View style={{ ...styles.container}}>
     
        <View style={styles.body}>
          <Bold label={"Select Your Interests"} numberOfLines={2} 
           color={colors.white} size={42}/>
           <Regular label={'you can select upto max 5'} color={colors.lightgrey1} size={16} style={{marginBottom:mvs(11)}}/>
           <FlatList
                contentContainerStyle={{paddingBottom:mvs(50)}}
                data={interests}
                numColumns={2}
                renderItem={({ item,index }) => 
                    <InterestCard 
                     title={item.title} 
                     icon={!item.selected?item.icon: `${item.icon}s`} 
                     isSelected={item.selected} onClick={()=>selectInterest(index,item.selected)}/>
                }
            />
          
        </View>
        <Spinner
          visible={spinner}
          textContent={'Loading...'}
          textStyle={{color: '#FFF'}}
        />
      <PrimaryButton title='Contiue' onClick={()=>saveInterests()} 
           style={{position:'absolute',bottom:0,width:'100%',borderRadius:0}}/>
    </View>
  );
};

const mapStateToProps = store => ({
  user_info: store.state.user_info,
});

const mapDispatchToProps = {
  update_interest: payload => APP_API.update_interest(payload),
};
export default connect(mapStateToProps, mapDispatchToProps)(Interests);
