import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import {
  Alert,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import DatePicker from 'react-native-date-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import { Button } from 'react-native-elements';
import ImageUpload from '../../components/ImageUpload';
import ROUTES from '../../constants/routes';
import { styles } from './style';

const colors = [
  {
    name: 'black',
    color: '#000000',
  },
  {
    name: 'brown',
    color: '#3d2a22',
  },
  {
    name: 'navyBlue',
    color: '#01085c',
  },
  {
    name: 'gray',
    color: '#808080',
  },
  {
    name: 'white',
    color: '#ffffff',
  },
  {
    name: 'beige',
    color: '#edebc0',
  },
  {
    name: 'oliveGreen',
    color: '#455e37',
  },
  {
    name: 'green',
    color: '#1ac41a',
  },
  {
    name: 'orange',
    color: '#e38c1b',
  },
  {
    name: 'burgundy',
    color: '#800020',
  },
  {
    name: 'red',
    color: '#e00707',
  },
  {
    name: 'purple',
    color: '#ae8bc9',
  },
  {
    name: 'blue',
    color: '#0722ed',
  },
  {
    name: 'pink',
    color: '#f20aee',
  },
];

const AddClothingScreen = ({route}) => {
  const cloth = route?.params;
  const navigation = useNavigation();
  const [type, setType] = useState('');
  const [typeOptions, setTypeOptions] = useState([
    {label: 'Top', value: 'Top'},
    {label: 'Bottom', value: 'Bottom'},
    {label: 'Footwear', value: 'Footwear'},
    {label: 'Accessories', value: 'Accessory'},
  ]);
  const [showType, setShowType] = useState(false);
  const [color, setColor] = useState('');
  const [brand, setBrand] = useState('');
  const [purchaseDate, setPurchaseDate] = useState(new Date());
  const [image, setImage] = useState('');

  useFocusEffect(
    useCallback(() => {
      console.log(cloth, 'params');
      setImage(cloth?.image || '');
      setType(cloth?.type || '');
      setColor(cloth?.colour || '');
      setBrand(cloth?.brand || '');
      setPurchaseDate(
        cloth?.datePurchased ? new Date(cloth?.datePurchased) : new Date(),
      );
      return () => {};
    }, [cloth]),
  );

  const onOpenSelectDate = (date: Date) => {
    setPurchaseDate(date);
  };

  const isFieldsEmpty = () => {
    return (
      image === '' ||
      type === '' ||
      color === '' ||
      brand === '' ||
      purchaseDate.toISOString() === ''
    );
  };
  async function getBlob(fileUri: string) {
    const resp = await fetch(fileUri);
    const imageBody = await resp.blob();
    return imageBody;
  }

  const handleEditClothing = async () => {
    try {
      const imageBody = await getBlob(image);
      const user = await AsyncStorage.getItem('userDetails');
      const userId = user ? JSON.parse(user)?.id : '';
      const fileName = new Date().toISOString();
      const form = new FormData();
      form.append('userId', userId);
      form.append('type', type.toUpperCase());
      form.append('brand', brand);
      form.append('colour', color);
      form.append('datePurchased', purchaseDate.toISOString());
      form.append('image', {
        uri: image,
        name: fileName,
        type: imageBody.type,
      });
      console.log(form);

      await axios
        .put(
          `https://wardrobe-backend-production.up.railway.app/item/${cloth?.id}`,
          form,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        )
        .then(res => {
          console.log(res.data);
          setImage('');
          setType('');
          setColor('');
          setBrand('');
          setPurchaseDate(new Date());
          navigation.navigate(ROUTES.CLOTHING_STACK, {
            screen: ROUTES.BROWSE_CLOTHING_SCREEN,
          });
          setTimeout(() => {
            Alert.alert('The item has been updated!');
          }, 500);
        });
    } catch (error) {
      console.error(error?.response?.data);
    }
  };

  const handleAddClothing = async () => {
    try {
      const imageBody = await getBlob(image);
      const user = await AsyncStorage.getItem('userDetails');
      const userId = user ? JSON.parse(user)?.id : '';
      const fileName = new Date().toISOString();
      const form = new FormData();
      form.append('userId', userId);
      form.append('type', type.toUpperCase());
      form.append('brand', brand);
      form.append('colour', color);
      form.append('datePurchased', purchaseDate.toISOString());
      form.append('image', {
        uri: image,
        name: fileName,
        type: imageBody.type,
      });
      console.log(form);

      await axios
        .post('https://wardrobe-backend-production.up.railway.app/item', form, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(res => {
          console.log(res.data);
          setImage('');
          setType('');
          setColor('');
          setBrand('');
          setPurchaseDate(new Date());
          navigation.navigate(ROUTES.CLOTHING_STACK);
          setTimeout(() => {
            Alert.alert('The item has been added!');
          }, 500);
        });
    } catch (error) {
      console.error(error?.response?.data);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{paddingBottom: 60}}
        style={[styles.container, {paddingHorizontal: 20}]}>
        <Text style={styles.title}>{cloth ? 'Edit' : 'Add'} Clothing</Text>
        <View style={styles.fieldContainer}>
          <ImageUpload
            croppedImage={image}
            setCroppedImage={setImage}
            onImageUpload={() => {}}
          />
          <View style={styles.tipsContainer}>
            <Text style={styles.allText}>{'Tips:'}</Text>
            <Text style={styles.tipsPoints}>
              {
                '➤ Make sure that the clothing is not folded, \nand is clearly visible. \n➤ Make sure that the background is plain, preferably white. \n➤ Keep the item in the center'
              }
            </Text>
          </View>
        </View>
        <View style={[styles.fieldContainer, {zIndex: 1}]}>
          <Text style={styles.allText}>Type:</Text>
          <DropDownPicker
            style={[styles.dropDownContainer]}
            placeholderStyle={styles.dropDownPlaceholder}
            dropDownContainerStyle={styles.dropDownContainer}
            showBadgeDot={false}
            listMode="SCROLLVIEW"
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
            placeholder={'Select type'}
            closeAfterSelecting={true}
          />
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.allText}>Colour:</Text>
          <View style={styles.colorContainer}>
            {colors.slice(0, 7).map(c => (
              <TouchableOpacity
                key={c.name}
                style={[styles.colorButton, {backgroundColor: c.color}]}
                onPress={() => setColor(c.name)}>
                {color === c.name && <View style={styles.colorOverlay} />}
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.colorContainer}>
            {colors.slice(7).map(c => (
              <TouchableOpacity
                key={c.name}
                style={[styles.colorButton, {backgroundColor: c.color}]}
                onPress={() => setColor(c.name)}>
                {color === c.name && <View style={styles.colorOverlay} />}
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.allText}>Brand:</Text>
          <TextInput
            placeholder="Enter brand name"
            style={styles.textInput}
            value={brand}
            onChangeText={text => setBrand(text)}
          />
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.allText}>Date Purchased:</Text>
          <View
            style={{
              backgroundColor:
                Platform.OS === 'android'
                  ? 'rgba(66, 107, 242, 0.5)'
                  : 'transparent',
              borderRadius: 16,
            }}>
            <DatePicker
              mode="date"
              open={true}
              date={purchaseDate}
              onDateChange={onOpenSelectDate}
              testID="dateTimePicker"
              style={{alignSelf: 'center'}}
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button
          onPress={cloth ? handleEditClothing : handleAddClothing}
          buttonStyle={styles.addButton}
          disabled={isFieldsEmpty()}
          title={cloth ? 'Update' : 'Add'}
          titleStyle={styles.buttonText}
        />
      </View>
    </View>
  );
};

export default AddClothingScreen;
