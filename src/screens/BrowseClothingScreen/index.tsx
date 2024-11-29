import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-easy-icon';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import ROUTES from '../../constants/routes';
import { styles } from './style';
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BrowseClothingScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const [cloths, setCloths] = useState([]);
  const [type, setType] = useState('');
  const [typeOptions, setTypeOptions] = useState([
    { label: 'All', value: '' },
    { label: 'Top', value: 'top' },
    { label: 'Bottom', value: 'bottom' },
    { label: 'Footwear', value: 'footwear' },
    { label: 'Accessories', value: 'accessory' },
  ]);
  const [showType, setShowType] = useState(false);
  const [usage, setUsage] = useState('');
  const [usageOptions, setUsageOptions] = useState([
    { label: 'Recently Bought', value: '' },
    { label: 'Least Used', value: 'asc' },
    { label: 'Most Used', value: 'desc' },
  ]);
  const [showUsage, setShowUsage] = useState(false);

  const handleCategoryPress = item => {
    navigation.navigate(ROUTES.VIEW_CLOTHING_SCREEN, { cloth: item });
  };

  const getClothing = async user => {
    try {
      let url = 'https://wardrobe-backend-production.up.railway.app/item';
      if (type !== '' && usage !== '') {
        url += `?type=${type}&usage=${usage}`;
      } else if (type !== '') {
        url += `?type=${type}`;
      } else if (usage !== '') {
        url += `?usage=${usage}`;
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
    }, [type, usage]),
  );

  const renderIcon = () => {
    let icon = { type: '', name: '', color: '' };
    switch (usage) {
      case 'asc':
        icon = {
          type: 'antdesign',
          name: 'arrowup',
          color: 'green',
        };
        break;
      case 'desc':
        icon = {
          type: 'antdesign',
          name: 'arrowdown',
          color: 'red',
        };
        break;
      default:
        icon = {
          type: 'font-awesome5',
          name: 'history',
          color: '#426bf2',
        };
        break;
    }
    return icon;
  };

  return loading ? (
    <View style={styles.centerContainer}>
      <ActivityIndicator size={'large'} color={'#426bf2'} />
    </View>
  ) : (
    <View style={styles.container}>
      <View style={{ padding: 20, zIndex: 1 }}>
        <DropDownPicker
          style={[styles.dropDownContainer]}
          placeholderStyle={styles.dropDownPlaceholder}
          dropDownContainerStyle={styles.dropDownContainer}
          showBadgeDot={false}
          open={showType}
          value={type}
          items={typeOptions}
          setOpen={setShowType}
          setValue={setType}
          setItems={setTypeOptions}
          showTickIcon={true}
          multiple={false}
          onChangeValue={text => {
            setType(text);
          }}
          placeholder={'Select Type'}
          closeAfterSelecting={true}
        />
        <DropDownPicker
          style={styles.usageDropDownContainer}
          placeholderStyle={styles.dropDownPlaceholder}
          dropDownContainerStyle={[styles.usageDropDownContainer, { top: -1 }]}
          showBadgeDot={false}
          open={showUsage}
          value={usage}
          items={usageOptions}
          setOpen={setShowUsage}
          setValue={setUsage}
          setItems={setUsageOptions}
          showTickIcon={true}
          multiple={false}
          onChangeValue={text => {
            setUsage(text);
          }}
          placeholder={'Select Usage'}
          closeAfterSelecting={true}
        />
      </View>

      {cloths?.length === 0 ? (
        <View style={styles.centerContainer}>
          <Text style={styles.emptyTitle}>
            {"You haven't added an item yet. \nTap on the '+' button to start"}
          </Text>
        </View>
      ) : (
          <FlatList
            data={cloths}
            contentContainerStyle={styles.listContainer}
            columnWrapperStyle={styles.columnWrapper}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.imageContainer}
                onPress={() => {
                  handleCategoryPress(item);
                }}>
                <View style={styles.filterIconContainer}>
                  <Icon
                    type={renderIcon().type}
                    name={renderIcon().name}
                    size={15}
                    color={renderIcon().color}
                  />
                </View>
                <Image source={{ uri: item?.image }} style={styles.image} />
              </TouchableOpacity>
            )}
          />
      )}
    </View>
  );
};

export default BrowseClothingScreen;
