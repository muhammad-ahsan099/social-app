import React from 'react';
import {  TextInput, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { EmojiWhite, Send } from '../../../assets/svgs';
import { mvs } from '../../../services/metrices';
import Medium from '../../../typo-graphy/medium-text';
import { URLS } from '../../../store/api-urls';
import Regular from '../../../typo-graphy/regular-text';
import ImagePlaceholder from '../../atoms/image-placeholder';
import Row from '../../atoms/row';
import colors from './../../../services/colors';
import Modal  from 'react-native-modal';
const ContentComments = ({isExpand=false,onSend,onChange,comments=[],placeholder,onBlur}) => {
  return (
      <Modal transparent={true} visible={isExpand} onBackdropPress={onBlur} style={{}}>
        <View style={{ position: 'absolute', bottom: 0, left: -20, right: -20}}>
         <View style={{ backgroundColor: `${colors.black}99`, }}>
          <View style={{ paddingVertical: mvs(13), alignItems: 'center',maxHeight:mvs(300) }}>
            <View>
              <Regular style={{ alignSelf: 'center' }} label={comments?.length+' comments'} />
            </View>
             <View style={{ width: '100%',marginTop:mvs(10) }}>
              <ScrollView contentContainerStyle={{paddingBottom:mvs(40),paddingHorizontal:mvs(18)}}>
                {comments?.map((item, index) => 
                <TouchableOpacity key={index} style={{ flexDirection: 'row', marginTop: mvs(20) }}>
                  <ImagePlaceholder containerStyle={{ height: mvs(32), width: mvs(32), borderRadius: mvs(16), }} uri={{uri:`${URLS.image_url}${item?.userImage}`}}/>
                  <View style={{ marginLeft: mvs(11) }}>
                    <Medium color={colors.BBBDC3} size={mvs(13)} label={item?.userName} />
                    <Regular size={mvs(15)} label={item?.description} />
                  </View>
                </TouchableOpacity>)}
              </ScrollView>
            </View>
          </View>
        </View>
         <Row style={{ backgroundColor: colors.B091831, paddingTop: mvs(15), paddingHorizontal: mvs(18), height: mvs(83),marginBottom:mvs(55) }}>
          <TextInput placeholderTextColor={colors.B6B7992} 
          style={{ flex: 1, color: colors.B6B7992, padding: 0 }}
           placeholder={'type here'} onChangeText={onChange}/>
          <Row>
            <TouchableOpacity style={{ marginLeft: mvs(22) }}>
              <EmojiWhite />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: mvs(22) }} onPress={onSend}>
              <Send />
            </TouchableOpacity>
          </Row>
        </Row>
      </View>
      </Modal>
      
  );
};

export default ContentComments;
