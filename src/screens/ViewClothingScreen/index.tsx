import { View, Text, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import React, { useCallback, useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-easy-icon';
import { styles } from './style';
import { Button, Image } from 'react-native-elements';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ROUTES from '../../constants/routes';

const ViewClothingScreen = ({ route }) => {
  const [loading, setLoading] = useState(false);
  const cloth = route?.params?.cloth;
  const navigation = useNavigation();

  const formatDate = () => {
    const date = new Date(cloth?.datePurchased);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;

    return formattedDate;
  };
  const formateType = () => {
    switch (cloth?.type) {
      case 'TOP':
        return 'Top';
      case 'BOTTOM':
        return 'Bottom';
      case 'FOOTWEAR':
        return 'Footwear';
      case 'ACCESSORY':
        return 'Accessory';
      default:
        break;
    }
  };
  const formatColor = () => {
    switch (cloth?.colour) {
      case 'black':
        return '#000000';
      case 'brown':
        return '#3d2a22';
      case 'navyBlue':
        return '#01085c';
      case 'gray':
        return '#808080';
      case 'white':
        return '#ffffff';
      case 'beige':
        return '#edebc0';
      case 'oliveGreen':
        return '#455e37';
      case 'green':
        return '#1ac41a';
      case 'orange':
        return '#e38c1b';
      case 'burgundy':
        return '#800020';
      case 'red':
        return '#e00707';
      case 'purple':
        return '#ae8bc9';
      case 'blue':
        return '#0722ed';
      case 'pink':
        return '#f20aee';
      default:
        return '';
    }
  };

  const handleDeleteItem = () => {
    Alert.alert('Are you sure you want to delete the item?', '', [
      {
        text: 'Yes',
        style: 'cancel',
        onPress: () => {
          handleDelete();
        },
      },
      {
        text: 'No',
        onPress: () => console.log('cancel Pressed'),
        style: 'destructive',
      },
    ]);
  };

  const handleDelete = async () => {
    try {
      setLoading(true)
      await axios
        .delete(
          `https://wardrobe-backend-production.up.railway.app/item/${cloth?.id}`,
          {
            headers: {
              Accept: 'application/json',
            },
          },
        )
        .then(res => {
          console.log(res?.data, 'outfits data');
          navigation.goBack();
          Alert.alert('The item has been deleted!');
        });
    } catch (error) {
      console.log(error?.response?.data);
    }
  };

  return loading ? (
    <View style={styles.centerContainer}>
      <ActivityIndicator size={'large'} color={'#426bf2'} />
    </View>
  ) : (
    <View style={styles.container}>
      <View style={styles.backContainer}>
        <TouchableOpacity
          style={styles.back}
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon type="ionicon" name="chevron-back" size={34} />
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 20 }}
        style={styles.content}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: cloth?.image }} style={styles.image} />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => {
              navigation.navigate(ROUTES.ADD_STACK, {
                screen: ROUTES.ADD_CLOTHING_SCREEN,
                params: cloth,
              });
            }}
            buttonStyle={styles.addButton}
            title="Edit"
            titleStyle={styles.buttonText}
          />
          <Button
            onPress={handleDeleteItem}
            buttonStyle={[
              styles.addButton,
              {
                backgroundColor: 'transparent',
                borderWidth: 1,
                borderColor: 'gray',
              },
            ]}
            title="Delete"
            titleStyle={[styles.buttonText, { color: 'black' }]}
          />
        </View>
        <View style={styles.detailsGrid}>
          <View>
            <Text style={styles.text}>
              Type: <Text style={styles.description}>{formateType()}</Text>
            </Text>
            <Text style={styles.text}>
              Date: <Text style={styles.description}>{formatDate()}</Text>
            </Text>
          </View>
          <View>
            <Text style={styles.text}>
              Brand: <Text style={styles.description}>{cloth?.brand}</Text>
            </Text>
            <View style={styles.colorConatiner}>
              <Text style={styles.text}>Colour: </Text>
              <View
                style={[
                  styles.color,
                  {
                    backgroundColor: formatColor(),
                  },
                ]}
              />
            </View>
          </View>
        </View>
        <Text style={styles.text}>
          Worn:{' '}
          <Text style={styles.description}>
            {cloth?.usage === 0
              ? "You haven't worn this yet!"
              : `${cloth?.usage} times`}
          </Text>
        </Text>
      </ScrollView>
    </View>
  );
};

export default ViewClothingScreen;
