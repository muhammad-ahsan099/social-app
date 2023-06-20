//core
import React from 'react';
import {
    StyleSheet, TouchableOpacity, View
} from 'react-native';
// import colors from '../../config/colors';
import { mvs } from '../../services/metrices';
import Regular from '../../typo-graphy/regular-text';
import colors from '../../services/colors';
// import { getScaleValueFromWidthPer, HP, palette } from "../config";
//exnternal
//internal imports
const BottomMenu =({colors,...props}) => {
  const {
    state: {index, routes},
    navigation,
    descriptors,
    style
  } = props;
  return (index===2?null:
    <View
      style={{
        flexDirection: 'row',
        justifyContent:'space-between',
        height: mvs(76),
        paddingHorizontal:mvs(17),
        backgroundColor: colors.black,
        alignItems:'center',
        ...colors.shadow,
        borderTopWidth:0.2,
        borderTopColor:colors.lightgrey1,
        ...style,
        // position:'absolute',
        // bottom:0,
        // right:0,
        // left:0
      }}>
      {routes.map((route, idx) => {
        const {options} = descriptors[route.key];

        const isFocused = index === idx;

        const icon =
          options.tabBarIcon !== undefined
            ? options.tabBarIcon(isFocused, 'white', 10)
            : null;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            activeOpacity={1}
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            key={route.key}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              // flex: 1,
              backgroundColor: `transparent`,
              alignItems: 'center',
              justifyContent: 'space-between',
              
            }}>
            <View style={styles.customIcon}>
              {icon}
              <Regular
                //label={route.name}
                label={''}
                style={{
                  fontSize: mvs(10),
                  color: colors.headerTitle,
                  color: isFocused ? colors.white : colors.lightgrey1,
                  textAlign: 'center',
                }}
              />
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  customIcon: {
    height: mvs(65),
    // width: mvs(83),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BottomMenu;
