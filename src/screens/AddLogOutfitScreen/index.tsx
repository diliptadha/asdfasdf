import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-easy-icon';
import { Button } from 'react-native-elements';
import { styles } from './style';

const AddLogOutfitScreen = () => {
  const [loading, setLoading] = useState(false);
  const [outfits, setOutfits] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [page, setPage] = useState(1);
  const [outfitId, setOutfitId] = useState('');
  const [logDate, setLogDate] = useState(new Date());
  const navigation = useNavigation();

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
      return () => {};
    }, []),
  );

  const handleNext = () => {
    switch (page) {
      case 1:
        setPage(2);
        break;
      case 2:
        handleLogOutfit();
        break;
      default:
        break;
    }
  };
  const onOpenSelectDate = (date: Date) => {
    setLogDate(date);
  };
  const handleLogOutfit = async () => {
    setLoading(true);
    try {
      await axios
        .put(
          `https://wardrobe-backend-production.up.railway.app/outfits/${outfitId}`,
          {
            log: true,
            logDate: [logDate.toISOString()],
          },
        )
        .then(res => {
          console.log(res?.data, 'handleLogOutfit');
          navigation.goBack();
          setLoading(false);
          setTimeout(() => {
            Alert.alert('The outfit has been logged!');
          }, 500);
        });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return loading ? (
    <View style={styles.centerContainer}>
      <ActivityIndicator size={'large'} color={'#426bf2'} />
    </View>
  ) : (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        {page === 2 && (
          <TouchableOpacity
            style={styles.backContainer}
            onPress={() => {
              setPage(1);
            }}>
            <Icon type="ionicon" name="chevron-back" size={34} />
          </TouchableOpacity>
        )}
        <Text style={styles.title}>Log Outfit</Text>
      </View>

      {page === 1 ? (
        <View style={styles.innerContainer}>
          <Text style={styles.subTitle}>Select Outfit: </Text>
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
                <TouchableOpacity
                  style={styles.imageContainer}
                  onPress={() => {
                    setOutfitId(item?.id);
                  }}>
                  {item?.id === outfitId && (
                    <View style={styles.checkbox}>
                      <Icon
                        type="antdesign"
                        name="check"
                        size={20}
                        color="white"
                      />
                    </View>
                  )}
                  <View style={styles.imageGrid}>
                    <View>
                      {item?.top?.isDeleted && (
                        <View style={styles.deletedImage}>
                          <Text style={styles.deletedItemText}>
                            Item has deleted
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
                            Item has deleted
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
                            Item has deleted
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
                              Item has deleted
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
                </TouchableOpacity>
              )}
            />
          )}
        </View>
      ) : (
        <View style={styles.innerContainer}>
          <Text style={styles.subTitle}>Select Log Date: </Text>
          <View
            style={{
              backgroundColor:
                Platform.OS === 'android'
                  ? 'rgba(66, 107, 242, 0.5)'
                  : 'transparent',
              borderRadius: 16,
              alignItems:'center'
            }}>
            <DatePicker
              mode="date"
              open={true}
              date={logDate}
              onDateChange={onOpenSelectDate}
              testID="dateTimePicker"
              style={styles.dateContainer}
            />
          </View>
        </View>
      )}
      <View style={styles.buttonContainer}>
        <Button
          onPress={handleNext}
          buttonStyle={styles.addButton}
          disabled={!outfitId}
          title={page === 2 ? 'Save' : 'Next'}
          titleStyle={styles.buttonText}
        />
      </View>
    </View>
  );
};

export default AddLogOutfitScreen;
