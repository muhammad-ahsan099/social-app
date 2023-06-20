import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Back, CircularDotMenu } from '../../../assets/svgs';
import Regular from '../../../typo-graphy/regular-text';
import { mvs } from '../../../services/metrices';
import { useNavigation } from '@react-navigation/native';
import colors from '../../../services/colors';
import Bold from '../../../typo-graphy/bold-text';
import SemiBold from '../../../typo-graphy/semibold-text';
export const CustomHeader = ({
  // navigation,
  route,
  title = '',
  allowBackBtn = false,
  spacebetween = false,
  post = false,
  userIcon = false,
  style,
  uri,
  loading,
  isShowDelete=false,
  onPost,
  showMenu=false,
  onMenuClick,
  onPressDelete,titleStyle
}) => {
  const navigation=useNavigation();
  return (
    <View style={[styles.CONTAINER, style, {  }]}>
      <View style={{}}>
        {allowBackBtn && (
          <View style={{ flexDirection: 'row', justifyContent:'space-between'}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Back />
            </TouchableOpacity>
            {!spacebetween && (
              <View style={{  alignItems: 'center',width:mvs(250),justifyContent:'center'}}>
                <SemiBold
                  label={title}
                  style={{ ...styles.TITLE, color: colors?.white, }}
                />
              </View>
            )}
          </View>
        )}
      </View>
      {spacebetween && (
        <SemiBold
          label={title}
          style={{ ...styles.TITLE, color: colors?.gray,...titleStyle }}
        />
      )}
       {showMenu && (
         <TouchableOpacity onPress={onMenuClick}>
           <CircularDotMenu />
         </TouchableOpacity>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  CONTAINER: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: mvs(65),
    paddingHorizontal: mvs(18),
    borderBottomLeftRadius: mvs(20),
    borderBottomRightRadius: mvs(20),
    zIndex:1,
  },
  TITLE: {
    fontSize: mvs(17),
    alignSelf: 'center',
    marginBottom:mvs(20)
  }
});
