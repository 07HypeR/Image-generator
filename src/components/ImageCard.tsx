import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ImageCard = ({item}) => {
  return (
    <View style={{flex: 1}}>
      <Image source={{uri: item.imageUrl}} style={{height: 200, width: 200}} />
    </View>
  );
};

export default ImageCard;

const styles = StyleSheet.create({});
