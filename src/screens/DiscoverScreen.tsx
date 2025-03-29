import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors, fontFamily} from '../theme';

const DiscoverScreen = () => {
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
        DiscoverScreen
      </Text>
    </View>
  );
};

export default DiscoverScreen;

const styles = StyleSheet.create({});
