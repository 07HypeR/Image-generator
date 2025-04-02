import {
  Alert,
  Image,
  Modal,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {fontFamily} from '../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {requestWriteStoragePermission} from '../utils';
import ReactNativeBlobUtil from 'react-native-blob-util';

const ImageCard = ({item}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  // // for ios permission
  // const askPermission = permission => {
  //   request(permission).then(result => {
  //     console.log('result', result);
  //   });
  // };

  const handleDownload = async () => {
    // android permission
    const granted = await requestWriteStoragePermission();
    if (!granted) {
      return;
    }
    // download the file
    const imageUrl = item.imageUrl;
    console.log('imageUrl:', imageUrl);

    let PictureDir = ReactNativeBlobUtil.fs.dirs.PictureDir;
    console.log('PictureDir:', PictureDir);

    const filePath = `${PictureDir}/download_image_${Date.now()}.png`;
    console.log('filePath:', filePath);
    setIsDownloading(true);

    ReactNativeBlobUtil.config({
      path: filePath,
      appendExt: 'png',
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path: filePath,
        description: 'Downloading Image',
        mime: 'image/png',
        mediaScannable: true,
      },
    })
      .fetch('GET', imageUrl)
      .progress({interval: 100}, (received, total) => {
        let percentage = Math.floor((received / total) * 100);
        setDownloadProgress(percentage);
      })
      .then(res => {
        ToastAndroid.show('Image Download Successfully', ToastAndroid.SHORT);

        copyMediaToStorage(filePath, filePath);
        setIsDownloading(false);
        setDownloadProgress(0);
      })
      .catch(error => {
        console.log('error', error);
        setIsDownloading(false);
        //set
      });
  };

  const copyMediaToStorage = async (filePath: string, filename: string) => {
    try {
      await ReactNativeBlobUtil.MediaCollection.copyToMediaStore(
        {
          name: filename,
          parentFolder: 'dreamai',
          mimeType: 'image/png',
        },
        'Download',
        filePath,
      );
    } catch (error) {
      Alert.alert('An error occured while Saving');
    }
  };
  return (
    <View style={styles.imageCard}>
      {/* image */}
      <Image source={{uri: item.imageUrl}} style={styles.image} />

      {/* prompt */}
      <Text style={styles.promptText}>{item?.prompt || 'No Prompt'}</Text>

      {/* button container */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={handleDownload}>
          <Ionicons name={'download-outline'} size={20} color={'#fff'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name={'share-social-outline'} size={20} color={'#fff'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <AntDesign name={'copy1'} size={20} color={'#fff'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <AntDesign name={'hearto'} size={20} color={'#fff'} />
        </TouchableOpacity>
      </View>

      {/* modal container */}
      <Modal transparent={true} visible={isDownloading} animationType="fade">
        <View style={styles.overlay}>
          <View style={styles.progressContainer}>
            <Text style={styles.progressTitle}>Downloading Image</Text>
            <Text style={styles.progressText}>{downloadProgress}%</Text>
            <Text style={styles.progressDescription}>
              Please wait while we downloading your image.
            </Text>
            <View style={styles.progressBarContainer}>
              <View
                style={[styles.progressBar, {width: `${downloadProgress}%`}]}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ImageCard;

const styles = StyleSheet.create({
  imageCard: {
    width: '100%',
    padding: 15,
    backgroundColor: '#333',
    marginBottom: 20,
    borderRadius: 8,
  },
  image: {
    width: '100%',
    height: 350,
    borderRadius: 8,
  },
  promptText: {
    marginTop: 10,
    color: '#fff',
    fontFamily: fontFamily.regular,
    fontSize: 16,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  actionButton: {
    padding: 10,
    backgroundColor: '#444',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 50,
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  progressContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: '#222',
    borderRadius: 10,
    alignItems: 'center',
  },
  progressTitle: {
    color: '#fff',
    fontFamily: fontFamily.bold,
    fontSize: 18,
    marginBottom: 10,
  },
  progressText: {
    color: '#fff',
    fontFamily: fontFamily.bold,
    fontSize: 24,
    marginBottom: 10,
  },
  progressDescription: {
    color: '#fff',
    fontFamily: fontFamily.regular,
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
  },
  progressBarContainer: {
    width: '100%',
    height: 10,
    backgroundColor: '#444',
    borderRadius: 5,
    marginTop: 10,
  },
  progressBar: {
    height: 10,
    backgroundColor: '#76c7c0',
    borderRadius: 5,
  },
});
