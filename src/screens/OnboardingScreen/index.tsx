import React from 'react';
import {Text, View, ImageBackground} from 'react-native';
import {Button} from 'react-native-elements';
import {styles} from './style';
import IMAGES from '../../constants/Images';
import {useNavigation} from '@react-navigation/native';
import ROUTES from '../../constants/routes';

const OnboardingScreen = ({}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={IMAGES.BG}
        style={styles.wrapperPage}
        resizeMode="cover">
        <View style={styles.container}>
          <View>
            <Text style={styles.header}>
              {'Welcome to \nyour Virtual Wardrobe'}
            </Text>
            <Text style={styles.subTitle}>
              {"The most sustainable piece of clothing \nis the one you already own."}
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              onPress={() => {
                navigation.navigate(ROUTES.LOGIN_SCREEN);
              }}
              buttonStyle={[styles.buttonAuth]}
              title="Get Started"
              titleStyle={styles.buttonText}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default OnboardingScreen;
