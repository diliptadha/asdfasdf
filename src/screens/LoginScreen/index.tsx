import React from 'react';
import {useState} from 'react';
import {Text, View, ImageBackground, Alert} from 'react-native';
import {Input, Button} from 'react-native-elements';
import {styles} from './style';
import Loader from '../../components/Loader';
import {isEmailValid, isPasswordValid} from '../../Validation/Valid';
import IMAGES from '../../constants/Images';
import {useNavigation} from '@react-navigation/native';
import ROUTES from '../../constants/routes';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const body = {email, password};
      console.log(body);
      await axios
        .post(
          'https://wardrobe-backend-production.up.railway.app/login',
          body,
          {
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          },
        )
        .then(res => {
          console.log(res.data, 'login response');
          AsyncStorage.setItem('userDetails', JSON.stringify(res?.data));
          navigation.replace(ROUTES.HOME_STACK);
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      Alert.alert(error?.response?.data?.message || 'Something went wrong!');
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={IMAGES.AUTH_BG}
        style={styles.wrapperPage}
        resizeMode="cover">
        <View style={styles.container}>
          <Text style={styles.header}>Login</Text>
          <Input
            placeholder="Email"
            maxLength={32}
            autoCorrect={false}
            value={email}
            errorStyle={styles.error}
            inputContainerStyle={styles.inputContainer}
            onChangeText={text => {
              setEmail(text);
            }}
            error={isEmailValid(email) ? (email === '' ? false : true) : false}
            errorMessage={
              isEmailValid(email) ? (
                email === '' ? (
                  false
                ) : (
                  <Text>Please enter a valid email</Text>
                )
              ) : (
                false
              )
            }
            style={styles.email}
            placeholderTextColor={'rgba(0,0,0,0.3)'}
          />
          <Input
            placeholder="Password"
            maxLength={25}
            autoCorrect={false}
            secureTextEntry={true}
            value={password}
            errorStyle={styles.error}
            inputContainerStyle={styles.inputContainer}
            onChangeText={pwd => {
              setPassword(pwd);
            }}
            errorMessage={
              isPasswordValid(password) ? (
                password === '' ? (
                  false
                ) : (
                  <Text>
                    The password must be at least 8 characters long and contain
                    lowercase and capital letters and numbers.
                  </Text>
                )
              ) : (
                false
              )
            }
            error={
              isPasswordValid(password)
                ? password === ''
                  ? false
                  : true
                : false
            }
            style={styles.inputPass}
            placeholderTextColor={'rgba(0,0,0,0.3)'}
          />
          <Text style={styles.text}>
            Don't have an account?
            <Text
              style={styles.registerText}
              onPress={() => {
                navigation.navigate(ROUTES.SIGN_UP_SCREEN);
              }}>
              {' '}
              Register
            </Text>
          </Text>

          <View style={styles.buttonContainer}>
            <Button
              onPress={() => {
                handleLogin();
                // navigation.replace(ROUTES.HOME_STACK);
              }}
              buttonStyle={[
                styles.buttonAuth,
                {
                  opacity:
                    isPasswordValid(password) || isEmailValid(email) ? 0.8 : 1,
                },
              ]}
              disabled={isPasswordValid(password) || isEmailValid(email)}
              title="Enter Wardrobe"
              titleStyle={styles.buttonText}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;
