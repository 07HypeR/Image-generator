import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors, fontFamily} from '../theme';

const LikeScreen = () => {
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
        LikeScreen
      </Text>
    </View>
  );
};

export default LikeScreen;

const styles = StyleSheet.create({});
