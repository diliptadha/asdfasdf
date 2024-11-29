import {View, Text} from 'react-native';
import React, {useCallback} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import ROUTES from '../../constants/routes';
import { styles } from './style';

const SplashScreen = () => {
  const [userDetails, setUserDetails] = React.useState();
  const navigation = useNavigation();

  const init = async () => {
    const user = await AsyncStorage.getItem('userDetails');
    console.log(user, 'userrrr');
    setUserDetails(JSON.parse(user));
    if (JSON.parse(user)) {
      navigation.navigate(ROUTES.HOME_STACK);
    } else {
      navigation.navigate(ROUTES.AUTH_STACK);
    }
  };
  useFocusEffect(
    useCallback(() => {
      init();
      return () => {};
    }, []),
  );
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Virtual Wardrobe</Text>
      <Text style={styles.subTitle}>{"(Psst... you should not be here!)"}</Text>
      <Text style={styles.subTitle}>{"(Leave this page to reload)"}</Text>
    </View>
  );
};

export default SplashScreen;
