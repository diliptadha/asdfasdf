import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-easy-icon';
import ROUTES from '../constants/routes';
import HomeScreen from '../screens/HomeScreen';
import LogOutfitScreen from '../screens/LogOutfitScreen';
import ProfileScreen from '../screens/ProfileScreen';
import {IconType} from 'react-native-easy-icon/src/Icon';
import ProfileStack from './ProfileStack';
import {Platform, TouchableOpacity} from 'react-native';
import ActionSheet from 'react-native-action-sheet';
import {useNavigation} from '@react-navigation/native';
import AddStack from './AddStack';
import BrowseClothingScreen from '../screens/BrowseClothingScreen';
import ClothingStack from './ClothingStack';
import LogStack from './LogStack';
const Tab = createBottomTabNavigator();

export default function BottomTabBar() {
  const navigation = useNavigation();
  // eslint-disable-next-line react/no-unstable-nested-components
  const TabBarButton = () => {
    return (
      <TouchableOpacity
        style={{
          height: 38,
          width: 38,
          marginHorizontal: 16,
          marginTop: Platform.OS === 'ios' ? 4 : 18,
        }}
        onPress={() => {
          ActionSheet.showActionSheetWithOptions(
            {
              options: ['Add Clothing', 'Add Outfit', 'Cancel'],
              cancelButtonIndex: 2,
            },
            buttonIndex => {
              switch (buttonIndex) {
                case 0: {
                  navigation.navigate(ROUTES.ADD_STACK, {
                    screen: ROUTES.ADD_CLOTHING_SCREEN,
                  });
                  break;
                }
                case 1: {
                  navigation.navigate(ROUTES.ADD_STACK, {
                    screen: ROUTES.ADD_OUTFIT_SCREEN,
                  });
                  break;
                }
              }
            },
          );
        }}>
        <Icon
          type={'ionicon'}
          name={'add-circle'}
          size={38}
          color={'#426bf2'}
        />
      </TouchableOpacity>
    );
  };

  return (
    <Tab.Navigator
      initialRouteName={ROUTES.HOME_SCREEN}
      sceneContainerStyle={{paddingTop: Platform.OS === 'ios' ? 50 : 0}}
      screenOptions={({route, navigation}) => ({
        tabBarActiveTintColor: '#426bf2',
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarIcon: ({focused, color}) => {
          let iconName;
          let type: IconType = '';
          let size = 0;

          if (route.name === ROUTES.HOME_SCREEN) {
            type = 'material-community';
            iconName = focused ? 'tshirt-crew' : 'tshirt-crew-outline';
            size = 32;
          } else if (route.name === ROUTES.CLOTHING_STACK) {
            type = focused ? 'font-awesome' : 'antdesign';
            iconName = 'filter';
            size = 28;
          } else if (route.name === ROUTES.ADD_STACK) {
            type = 'ionicon';
            iconName = focused ? 'add-circle' : 'add-circle-outline';
            size = 38;
          } else if (route.name === ROUTES.LOG_STACK) {
            type = 'ionicon';
            iconName = focused ? 'calendar-clear' : 'calendar-clear-outline';
            size = 28;
          } else if (route.name === ROUTES.PROFILE_STACK) {
            type = 'font-awesome';
            iconName = focused ? 'user' : 'user-o';
            size = focused ? 32 : 28;
          }

          return (
            <Icon type={type} name={iconName ?? ''} size={size} color={color} />
          );
        },
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {height: 90, paddingTop: 15},
      })}>
      <Tab.Screen name={ROUTES.HOME_SCREEN} component={HomeScreen} />
      <Tab.Screen name={ROUTES.CLOTHING_STACK} component={ClothingStack} />
      <Tab.Screen
        name={ROUTES.ADD_STACK}
        component={AddStack}
        options={{
          // eslint-disable-next-line react/no-unstable-nested-components
          tabBarButton: () => <TabBarButton />,
        }}
      />
      <Tab.Screen name={ROUTES.LOG_STACK} component={LogStack} />
      <Tab.Screen name={ROUTES.PROFILE_STACK} component={ProfileStack} />
    </Tab.Navigator>
  );
}
