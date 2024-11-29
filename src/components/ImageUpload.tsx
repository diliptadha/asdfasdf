import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
/* eslint-disable react-native/no-inline-styles */
import {Dispatch, SetStateAction, useState} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import React from 'react';
import Icon from 'react-native-easy-icon';
import ActionSheet from 'react-native-action-sheet';
import axios from 'axios';

type props = {
  croppedImage: string;
  setCroppedImage: Dispatch<SetStateAction<string>>;
  onImageUpload: (value: string) => void;
};
const WIDTH = Dimensions.get('window').width;

const ImageUpload = ({croppedImage, setCroppedImage, onImageUpload}: props) => {
  const [uploading, setUploading] = useState(false);

  const androidOptions = {
    ignoreAndroidSystemSettings: true,
  };
  const iOSOptions = {
    enableVibrateFallback: true,
  };
  const options = Platform.OS === 'ios' ? iOSOptions : androidOptions;

  const showOptionsActionSheet = () => {
    ActionSheet.showActionSheetWithOptions(
      {
        options: ['Camera', 'Photo Library', 'Cancel'],
        cancelButtonIndex: 2,
      },
      buttonIndex => {
        switch (buttonIndex) {
          case 0: {
            openCamera();
            break;
          }
          case 1: {
            openGallery();
            break;
          }
        }
      },
    );
  };

  const openCamera = () => {
    let options: any = {
      // mediaType: type,
      maxWidth: 600,
      maxHeight: 600,
      quality: 1,
    };

    launchCamera(options, (response: any) => {
      // console.log("Response = ", response);
      if (response.didCancel) {
        console.log('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        Alert.alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        Alert.alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        Alert.alert(response.errorMessage);
        return;
      }

      const uploadableFile = {
        uri: response.assets[0].uri,
        name: response.assets[0].fileName,
        type: response.assets[0].type,
      };
      // setFile(uploadableFile);
      setCroppedImage(uploadableFile.uri);
      console.log('uploadableFile: ' + JSON.stringify(uploadableFile));
      // uploadFile(uploadableFile.uri);
    });
  };
  const openGallery = () => {
    let options: any = {
      // mediaType: type,
      maxWidth: 600,
      maxHeight: 600,
      quality: 1,
    };

    launchImageLibrary(options, (response: any) => {
      // console.log("Response = ", response);
      if (response.didCancel) {
        console.log('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        Alert.alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        Alert.alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        Alert.alert(response.errorMessage);
        return;
      }

      const uploadableFile = {
        uri: response.assets[0].uri,
        name: response.assets[0].fileName,
        type: response.assets[0].type,
      };
      // setFile(uploadableFile);
      setCroppedImage(uploadableFile.uri);
      console.log('uploadableFile: ' + JSON.stringify(uploadableFile));
    });
  };


  async function getBlob(fileUri: string) {
    const resp = await fetch(fileUri);
    const imageBody = await resp.blob();
    return imageBody;
  }

  const uploadImageToBucket = (
    s3BucketUrl: string,
    imageType: string,
    file: any,
    accessUrl: string,
  ) => {
    console.log('imageType: ' + imageType);
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', imageType);

    const requestOptions: any = {
      method: 'PUT',
      headers: myHeaders,
      body: file,
      redirect: 'follow',
    };
    console.log('requestOptions: ' + JSON.stringify(requestOptions));

    fetch(s3BucketUrl, requestOptions)
      .then(response => {
        console.log('S3 bucket upload response: ' + JSON.stringify(response));
        console.log('s3BucketUrl ' + s3BucketUrl);
        console.log('accessUrl ' + accessUrl);
        setCroppedImage(accessUrl);
        onImageUpload(accessUrl);
        setUploading(false);
      })
      .catch(err => {
        console.log(err);
        setUploading(false);
      });
  };

  const renderItem = ({item}) => (
    <View>
      <TouchableOpacity style={styles.multiButton}>
        {!item ? (
          <Icon type="antdesign" name="plus" style={{height: 18, width: 18}} />
        ) : (
          <Image source={{uri: item?.url}} style={[styles.image]} />
        )}
        {uploading && (
          <View style={styles.uploadingOverlay}>
            <Text style={styles.uploadingText}>Uploading...</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );

  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={showOptionsActionSheet}>
        {!croppedImage ? (
          <Icon type="antdesign" name="plus" size={18} />
        ) : (
          croppedImage && (
            <Image
              source={{uri: croppedImage}}
              style={[styles.image, {height: 190}]}
            />
          )
        )}
        {/* {uploading && (
          <View style={[styles.uploadingOverlay, {height: 190}]}>
            <Text style={styles.uploadingText}>Uploading...</Text>
          </View>
        )} */}
      </TouchableOpacity>
    </View>
  );
};

export default ImageUpload;

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 10,
    height: 190,
    borderColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    width: WIDTH - 44,
    alignSelf: 'center',
    backgroundColor:'#fff'
  },
  multiButton: {
    borderRadius: 12,
    borderWidth: 1,
    height: 135,
    borderColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    width: WIDTH / 4,
  },
  image: {
    height: 135,
    width: WIDTH - 44,
    resizeMode: 'cover',
    borderRadius: 12,
  },
  uploadingOverlay: {
    width: WIDTH - 44,
    height: 170,
    borderRadius: 12,
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    // top: 0,
    // bottom: 0,
    // margin: 'auto',
  },
  overlayWithImage: {
    width: WIDTH / 1.3,
    height: WIDTH / 1.3,
    top: 45,
  },
  uploadingText: {
    color: '#fff',
    fontSize: 16,
    opacity: 0.8,
  },
});
