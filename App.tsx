import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

const App = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Icon name="API" size={30} color={'red'} />
      <Text style={styles.text}>App</Text>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  text: {
    fontSize: 99,
  },
});
