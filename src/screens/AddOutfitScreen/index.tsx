import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, { useCallback, useState } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { styles } from './style';
import ROUTES from '../../constants/routes';
import { Button } from 'react-native-elements';
import Icon from 'react-native-easy-icon';

const AddOutfitScreen = () => {
  const [cloths, setCloths] = useState([]);
  const [type, setType] = useState('TOP');
  const [page, setPage] = useState(1);
  const [topId, setTopId] = useState('');
  const [bottomId, setBottomId] = useState('');
  const [footwearId, setFootwearId] = useState('');
  const [accessoryId, setAccessoryId] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [userDetails, setUserDetails] = useState({});

  const handleSelectCloth = item => {
    switch (page) {
      case 1:
        setTopId(item?.id);
        break;
      case 2:
        setBottomId(item?.id);
        break;
      case 3:
        setFootwearId(item?.id);
        break;
      case 4:
        setAccessoryId(item?.id);
        break;
      default:
        break;
    }
  };

  const handleNext = () => {
    switch (page) {
      case 1:
        setPage(2);
        setType('BOTTOM');
        break;
      case 2:
        setPage(3);
        setType('FOOTWEAR');
        break;
      case 3:
        setPage(4);
        setType('ACCESSORY');
        break;
      case 4:
        handleAddOutfit();
        break;
      default:
        break;
    }
  };

  const handleAddOutfit = async () => {
    setLoading(true);
    const itemArr = [topId, bottomId, footwearId];
    if (accessoryId !== '') {
      itemArr.push(accessoryId);
    }
    const data = {
      itemIds: itemArr,
      userId: userDetails?.id,
    };
    try {
      await axios
        .post(
          'https://wardrobe-backend-production.up.railway.app/outfits',
          data,
        )
        .then(res => {
          console.log(res?.data);
          setPage(1);
          setType('TOP');
          setTopId('');
          setBottomId('');
          setFootwearId('');
          setAccessoryId('');
          setLoading(false);
          navigation.navigate(ROUTES.HOME_SCREEN);

          setTimeout(() => {
            Alert.alert('The outfit has been added!');
          }, 500);
        });
      console.log(data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const getClothing = async user => {
    try {
      let url = 'https://wardrobe-backend-production.up.railway.app/item';
      if (type !== '') {
        url += `?type=${type}`;
      }
      console.log(user, 'urrlll');
      await axios
        .get(url, {
          headers: {
            Accept: 'application/json',
            Authorization: user?.id,
          },
        })
        .then(res => {
          setLoading(false);
          // console.log(res?.data, 'clothing data');
          setCloths(res?.data?.filter(item => item?.isDeleted === false));
        });
    } catch (error) {
      setLoading(false);
      console.log(error?.response?.data);
    }
  };

  const init = async () => {
    setLoading(true);
    const user = await AsyncStorage.getItem('userDetails');
    setUserDetails(JSON.parse(user));
    getClothing(JSON.parse(user));
  };

  useFocusEffect(
    useCallback(() => {
      init();
      return () => { };
    }, [page, type]),
  );
  const formateType = () => {
    switch (type) {
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

  const isFieldsEmpty = () => {
    switch (page) {
      case 1:
        return topId === '';
      case 2:
        return bottomId === '';
      case 3:
        return footwearId === '';
      default:
        return false;
    }
  };

  return loading ? (
    <View style={styles.centerContainer}>
      <ActivityIndicator size={'large'} color={'#426bf2'} />
    </View>
  ) : (
    <View style={styles.container}>
      <Text style={styles.title}>Add Outfit</Text>
      <Text style={styles.subTitle}>{`Select ${formateType()}: `}</Text>
      <FlatList
        data={cloths}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        renderItem={({ item }) => (
          <View>
            {(item?.id === topId ||
              item?.id === bottomId ||
              item?.id === footwearId ||
              item?.id === accessoryId) && (
                <View style={styles.checkbox}>
                  <Icon type="antdesign" name="check" size={16} color="white" />
                </View>
              )}
            <TouchableOpacity
              style={styles.imageContainer}
              onPress={() => {
                handleSelectCloth(item);
              }}>
              <Image source={{ uri: item?.image }} style={styles.image} />
            </TouchableOpacity>
          </View>
        )}
      />
      <View style={styles.buttonContainer}>
        <Button
          onPress={handleNext}
          buttonStyle={styles.addButton}
          disabled={isFieldsEmpty()}
          title={page === 4 ? 'Add' : 'Next'}
          titleStyle={styles.buttonText}
        />
      </View>
    </View>
  );
};

export default AddOutfitScreen;
