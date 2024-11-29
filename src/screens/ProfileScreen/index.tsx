import React, {useCallback, useState} from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import Icon from 'react-native-easy-icon';
import ROUTES from '../../constants/routes';
import {styles} from './style';
import {Button} from 'react-native-elements';

const ProfileScreen = ({navigation}) => {
  const [userDetails, setUserDetails] = useState({});

  useFocusEffect(
    useCallback(() => {
      init();
      return () => {};
    }, []),
  );
  const init = async () => {
    const user = await AsyncStorage.getItem('userDetails');
    setUserDetails(JSON.parse(user));
  };

  const handleSignOut = () => {
    Alert.alert('Are you sure you want to sign out?', '', [
      {
        text: 'Yes',
        style: 'cancel',
        onPress: () => {
          navigation?.replace(ROUTES.AUTH_STACK);
          AsyncStorage.removeItem('userDetails');
        },
      },
      {
        text: 'No',
        onPress: () => console.log('cancel Pressed'),
        style: 'destructive',
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>My Profile</Text>
        <View style={styles.userInfoContainer}>
          <Icon
            type="font-awesome"
            name="user-circle"
            size={48}
            color="#426bf2"
            style={styles.icon}
          />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{userDetails?.name}</Text>
            <Text style={styles.userEmail}>{userDetails?.email}</Text>
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          onPress={() => {
            navigation?.navigate(ROUTES.UPDATE_SCREEN, {
              user: userDetails,
            });
          }}
          buttonStyle={styles.borderedButton}
          title="Edit Profile"
          titleStyle={styles.borderedButtonText}
        />
        <Button
          onPress={handleSignOut}
          buttonStyle={[styles.buttonAuth]}
          title="Sign Out"
          titleStyle={styles.buttonText}
        />
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
