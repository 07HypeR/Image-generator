import {Alert, PermissionsAndroid, Platform} from 'react-native';

export const requestWriteStoragePermission = async () => {
  try {
    if (Number(Platform.Version) >= 33) {
      return true;
    }

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Dream AI Storage Permission',
        message:
          'Dream AI needs access to your storage ' +
          'to download the pictures.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the storage');
      return true;
    } else {
      Alert.alert(
        'Permission Denied',
        'Please allow storage permission to download the pictures.',
        [{text: 'OK'}],
      );
      console.log('Storage permission denied');
      return false;
    }
  } catch (err) {
    console.warn(err);
    Alert.alert(
      'Error',
      'There was an issue requesting storage permission. Please try again.',
      [{text: 'OK'}],
    );
  }
};
