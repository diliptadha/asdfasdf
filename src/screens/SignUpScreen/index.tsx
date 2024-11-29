import React from 'react';
import {useState} from 'react';
import {Text, View, ImageBackground, Alert} from 'react-native';
import {Input, Button} from 'react-native-elements';
import {styles} from './style';
import Loader from '../../components/Loader';
import {isEmailValid, isPasswordValid} from '../../Validation/Valid';
import IMAGES from '../../constants/Images';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ROUTES from '../../constants/routes';
import {useNavigation} from '@react-navigation/native';

const SignUpScreen = ({}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const handleSignup = async () => {
    try {
      // setIsLoading(true);
      const body = {name, email, password};
      await axios
        .post(
          'https://wardrobe-backend-production.up.railway.app/register',
          body,
        )
        .then(res => {
          console.log(res?.data, 'handleSignup');
          Alert.alert('The user has been registered!');
          //Alert.alert(response?.data?.message)
          // AsyncStorage.setItem('userDetails', JSON.stringify(res?.data));
          navigation.goBack();
          // setIsLoading(false);
        });
    } catch (error) {
      console.log(error?.response?.data);
      Alert.alert(error?.response?.data?.message || 'Something went wrong!');
      // setIsLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={IMAGES.AUTH_BG}
        style={styles.wrapperPage}
        resizeMode="cover">
        {isLoading ? (
          <Loader />
        ) : (
          <View style={styles.container}>
            <Text style={styles.header}>Register</Text>
            <Input
              placeholder="Name"
              maxLength={32}
              autoCorrect={false}
              value={name}
              errorStyle={styles.error}
              inputContainerStyle={styles.inputContainer}
              onChangeText={text => {
                setName(text);
              }}
              style={styles.name}
              placeholderTextColor={'rgba(0,0,0,0.3)'}
            />
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
              error={
                isEmailValid(email) ? (email === '' ? false : true) : false
              }
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
                      The password must be at least 8 characters long and
                      contain lowercase and capital letters and numbers.
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
            <Input
              placeholder="Confirm password"
              maxLength={25}
              autoCorrect={false}
              secureTextEntry={true}
              value={confirmPassword}
              errorStyle={styles.error}
              inputContainerStyle={styles.inputContainer}
              onChangeText={pwd => {
                setConfirmPassword(pwd);
              }}
              errorMessage={
                password && confirmPassword && confirmPassword !== password ? (
                  <Text>The password are not same.</Text>
                ) : (
                  false
                )
              }
              error={
                password && confirmPassword && confirmPassword !== password
                  ? true
                  : false
              }
              style={styles.inputPass}
              placeholderTextColor={'rgba(0,0,0,0.3)'}
            />
            <Text style={styles.text}>
              Already have an account?
              <Text
                style={styles.registerText}
                onPress={() => {
                  navigation.navigate(ROUTES.LOGIN_SCREEN);
                }}>
                {' '}
                Login
              </Text>
            </Text>
            <View style={styles.buttonContainer}>
              <Button
                onPress={() => {
                  handleSignup();
                }}
                buttonStyle={[
                  styles.buttonAuth,
                  {
                    opacity:
                      isPasswordValid(password) || isEmailValid(email)
                        ? 0.8
                        : 1,
                  },
                ]}
                disabled={
                  !name ||
                  isEmailValid(email) ||
                  isPasswordValid(password) ||
                  password !== confirmPassword
                }
                title={'Sign Up'}
                titleStyle={styles.buttonText}
              />
            </View>
          </View>
        )}
      </ImageBackground>
    </View>
  );
};

export default SignUpScreen;
