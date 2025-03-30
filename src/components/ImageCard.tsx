import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {fontFamily} from '../theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ImageCard = ({item}) => {
  return (
    <View style={styles.imageCard}>
      {/* image */}
      <Image source={{uri: item.imageUrl}} style={styles.image} />
      {/* prompt */}
      <Text style={styles.promptText}>{item?.prompt || 'No Prompt'}</Text>

      {/* button container */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.actionButton}>
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
});
