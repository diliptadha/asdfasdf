import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import {useFocusEffect} from '@react-navigation/native';
import {FlatList} from 'react-native';
import {Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {styles} from './style';
import Icon from 'react-native-easy-icon';

const HomeScreen = () => {
  const [loading, setLoading] = useState(false);
  const [outfits, setOutfits] = useState([]);
  const [userDetails, setUserDetails] = useState({});

  const getOutfits = async user => {
    try {
      await axios
        .get('https://wardrobe-backend-production.up.railway.app/outfits', {
          headers: {
            Accept: 'application/json',
            Authorization: user?.id,
          },
        })
        .then(res => {
          setLoading(false);
          console.log(res?.data, 'outfits data');
          setOutfits(res?.data);
        });
    } catch (error) {
      console.log(error?.response?.data, 'getOutfits');
      setLoading(false);
    }
  };
  const getAlerts = async user => {
    try {
      await axios
        .get(
          `https://wardrobe-backend-production.up.railway.app/getFutureOutfit?currentDate=${new Date().toISOString()}`,
          {
            headers: {
              Accept: 'application/json',
              Authorization: user?.id,
            },
          },
        )
        .then(res => {
          console.log(res?.data, 'getAlerts data');
          if (res?.data !== '') {
            Alert.alert(res?.data);
          }
        });
    } catch (error) {
      console.log(error?.response?.data);
    }
  };

  const init = async () => {
    setLoading(true);
    const user = await AsyncStorage.getItem('userDetails');
    setUserDetails(JSON.parse(user));
    getOutfits(JSON.parse(user));
  };

  useEffect(() => {
    const alertInit = async () => {
      setLoading(true);
      const user = await AsyncStorage.getItem('userDetails');
      setUserDetails(JSON.parse(user));
      getAlerts(JSON.parse(user));
    };
    alertInit();
  }, []);

  useFocusEffect(
    useCallback(() => {
      init();
      return () => {};
    }, []),
  );

  const handleDeleteOutfit = outfitId => {
    Alert.alert('Are you sure you want to delete outfit?', '', [
      {
        text: 'Yes',
        style: 'cancel',
        onPress: () => {
          handleDelete(outfitId);
        },
      },
      {
        text: 'No',
        onPress: () => console.log('cancel Pressed'),
        style: 'destructive',
      },
    ]);
  };

  const handleDelete = async outfitId => {
    try {
      setLoading(true)
      await axios
        .delete(
          `https://wardrobe-backend-production.up.railway.app/outfits/${outfitId}`,
          {
            headers: {
              Accept: 'application/json',
            },
          },
        )
        .then(res => {
          console.log(res?.data, 'outfits data');
          setLoading(false)
          Alert.alert('The outfit has been deleted!');
          init();
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
      <View style={styles.titleContainer}>
        <Text style={styles.welcomeTitle}>Welcome,</Text>
        <Text style={styles.name}>{`${userDetails?.name}!`}</Text>
      </View>
      {outfits?.length === 0 ? (
        <View style={styles.centerContainer}>
          <Text style={styles.emptyTitle}>
            {
              "You haven't created an outfit yet. \nTap on the '+' button to start"
            }
          </Text>
        </View>
      ) : (
        <FlatList
          data={outfits}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <View style={styles.imageContainer}>
              <TouchableOpacity
                onPress={() => {
                  handleDeleteOutfit(item?.id);
                }}
                style={styles.delete}>
                <Icon
                  type="material"
                  name="delete-outline"
                  size={24}
                  color="white"
                />
              </TouchableOpacity>
              <View style={styles.imageGrid}>
                <View>
                  {item?.top?.isDeleted && (
                    <View style={styles.deletedImage}>
                      <Text style={styles.deletedItemText}>
                        deleted item
                      </Text>
                    </View>
                  )}
                  <Image
                    source={{uri: item?.top?.image}}
                    style={styles.image}
                  />
                </View>
                <View>
                  {item?.bottom?.isDeleted && (
                    <View style={styles.deletedImage}>
                      <Text style={styles.deletedItemText}>
                        deleted item
                      </Text>
                    </View>
                  )}
                  <Image
                    source={{uri: item?.bottom?.image}}
                    style={styles.image}
                  />
                </View>
              </View>
              <View style={styles.imageGrid}>
                <View>
                  {item?.footwear?.isDeleted && (
                    <View style={styles.deletedImage}>
                      <Text style={styles.deletedItemText}>
                        deleted item
                      </Text>
                    </View>
                  )}
                  <Image
                    source={{uri: item?.footwear?.image}}
                    style={styles.image}
                  />
                </View>
                {item?.accessory?.image && (
                  <View>
                    {item?.accessory?.isDeleted && (
                      <View style={styles.deletedImage}>
                        <Text style={styles.deletedItemText}>
                          deleted item
                        </Text>
                      </View>
                    )}
                    <Image
                      source={{uri: item?.accessory?.image}}
                      style={styles.image}
                    />
                  </View>
                )}
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default HomeScreen;
