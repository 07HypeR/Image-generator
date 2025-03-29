import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors, fontFamily} from '../theme';

const HomeScreen = () => {
  return (
    <View>
      <Text
        style={{
          fontSize: 30,
          textAlign: 'center',
          marginTop: 100,
          color: colors.primary,
          fontFamily: fontFamily.regular,
        }}>
        HomeScreen
      </Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
