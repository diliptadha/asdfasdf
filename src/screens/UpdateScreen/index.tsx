import React from 'react';
import {useState} from 'react';
import {Text, View, ImageBackground, Alert} from 'react-native';
import {Input, Button} from 'react-native-elements';
import {styles} from './style';
import Loader from '../../components/Loader';
import {isEmailValid, isPasswordValid} from '../../Validation/Valid';
import IMAGES from '../../constants/Images';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-easy-icon';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UpdateScreen = ({route, navigation}) => {
  const user = route?.params?.user;
  const [name, setName] = useState(user?.name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [password, setPassword] = useState('');

  const handleEdit = async () => {
    try {
      const body = {name, email, password};
      await axios
        .put(
          `https://wardrobe-backend-production.up.railway.app/edit/user/${user?.id}`,
          body,
        )
        .then(res => {
          console.log(res?.data, 'handleSignup');
          AsyncStorage.setItem('userDetails', JSON.stringify(res?.data));
          Alert.alert('The profile has been updated!', '', [
            {
              text: 'OK',
              style: 'default',
              onPress: () => {
                navigation.goBack();
              },
            },
          ]);
        });
    } catch (error) {
      console.log(error?.response?.data);
    }
  };
  return (
    <View style={styles.container}>
      <View style={{paddingHorizontal: 15}}>
        <TouchableOpacity
          style={{width: '10%'}}
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon type="ionicon" name="chevron-back" size={34} />
        </TouchableOpacity>
        <Text style={styles.header}>Edit Profile</Text>
      </View>

      <View>
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
            isPasswordValid(password) ? (password === '' ? false : true) : false
          }
          style={styles.inputPass}
          placeholderTextColor={'rgba(0,0,0,0.3)'}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          onPress={handleEdit}
          disabledTitleStyle={{color: 'rgba(0,0,0,0.6)'}}
          buttonStyle={[styles.buttonAuth]}
          disabledStyle={{backgroundColor: 'rgba(0,0,0,0.3)'}}
          // disabled={!name || isEmailValid(email) || isPasswordValid(password)}
          title={'Edit'}
          titleStyle={styles.buttonText}
        />
      </View>
    </View>
  );
};

export default UpdateScreen;
