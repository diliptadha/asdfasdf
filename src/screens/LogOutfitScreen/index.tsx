import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import React, { useCallback, useState } from 'react';
import axios from 'axios';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native';
import { Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './style';
import Icon from 'react-native-easy-icon';
import ROUTES from '../../constants/routes';

const LogOutfitScreen = () => {
  const [loading, setLoading] = useState(false);
  const [outfits, setOutfits] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const navigation = useNavigation();

  const getOutfits = async user => {
    try {
      await axios
        .get(
          'https://wardrobe-backend-production.up.railway.app/outfits?logOutfitData=true',
          {
            headers: {
              Accept: 'application/json',
              Authorization: user?.id,
            },
          },
        )
        .then(res => {
          setLoading(false);
          console.log(
            res?.data?.filter(item => item?.log === true),
            'outfits data',
          );
          setOutfits(res?.data?.filter(item => item?.log === true));
        });
    } catch (error) {
      console.log(error?.response?.data);
      setLoading(false);
    }
  };

  const init = async () => {
    setLoading(true);
    const user = await AsyncStorage.getItem('userDetails');
    setUserDetails(JSON.parse(user));
    getOutfits(JSON.parse(user));
  };

  useFocusEffect(
    useCallback(() => {
      init();
      return () => { };
    }, []),
  );

  const formatDate = logDate => {
    const date = new Date(logDate);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const formattedDate = `${day}-${month}-${year}`;

    return formattedDate;
  };

  return loading ? (
    <View style={styles.centerContainer}>
      <ActivityIndicator size={'large'} color={'#426bf2'} />
    </View>
  ) : (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.welcomeTitle}>Logged Outfits</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(ROUTES.ADD_LOG_OUTFIT_SCREEN);
          }}>
          <Icon
            type={'ionicon'}
            name={'add-circle'}
            size={46}
            color={'#426bf2'}
          />
        </TouchableOpacity>
      </View>
      {outfits?.length === 0 ? (
        <View style={styles.centerContainer}>
          <Text style={styles.emptyTitle}>
            {
              "You haven't logged an outfit yet. \nTap on the '+' button in the corner to start."
            }
          </Text>
        </View>
      ) : (
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={outfits}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View>
              <Text style={styles.date}>{formatDate(item?.logDate)}</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.subListContainer}>

                <View style={styles.imageContainer}>
                  {item?.top?.isDeleted && (
                    <View style={styles.deletedImage}>
                      <Text style={styles.deletedItemText}>
                        deleted item
                      </Text>
                    </View>
                  )}
                  <Image source={{ uri: item?.top?.image }} style={styles.image} />
                </View>

                <View style={styles.imageContainer}>
                  {item?.bottom?.isDeleted && (
                    <View style={styles.deletedImage}>
                      <Text style={styles.deletedItemText}>
                      deleted item
                      </Text>
                    </View>
                  )}
                  <Image source={{ uri: item?.bottom?.image }} style={styles.image} />
                </View>

                <View style={styles.imageContainer}>
                  {item?.footwear?.isDeleted && (
                    <View style={styles.deletedImage}>
                      <Text style={styles.deletedItemText}>
                      deleted item
                      </Text>
                    </View>
                  )}
                  <Image source={{ uri: item?.footwear?.image }} style={styles.image} />
                </View>

                {item?.accessory?.image && (
                  <View style={styles.imageContainer}>
                    {item?.accessory?.isDeleted && (
                      <View style={styles.deletedImage}>
                        <Text style={styles.deletedItemText}>
                        deleted item
                        </Text>
                      </View>
                    )}
                    <Image
                      source={{ uri: item?.accessory?.image }}
                      style={styles.image}
                    />
                  </View>
                )}
              </ScrollView>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default LogOutfitScreen;
