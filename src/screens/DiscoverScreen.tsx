import {RefreshControl, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {fontFamily} from '../theme';
import {FlatList} from 'react-native';
import ImageCard from '../components/ImageCard';

const DiscoverScreen = () => {
  const [refreshing, setRefreshing] = useState(false);

  const data = [
    {
      imageUrl:
        'https://m.media-amazon.com/images/S/pv-target-images/16627900db04b76fae3b64266ca161511422059cd24062fb5d900971003a0b70._SX1080_FMjpg_.jpg',
      prompt: 'Generate an ai Image',
      id: 1,
    },
    {
      imageUrl:
        'https://m.media-amazon.com/images/S/pv-target-images/16627900db04b76fae3b64266ca161511422059cd24062fb5d900971003a0b70._SX1080_FMjpg_.jpg',
      prompt: 'Generate an ai Image',
      id: 2,
    },
    {
      imageUrl:
        'https://m.media-amazon.com/images/S/pv-target-images/16627900db04b76fae3b64266ca161511422059cd24062fb5d900971003a0b70._SX1080_FMjpg_.jpg',
      prompt: 'Generate an ai Image',
      id: 3,
    },
  ];

  const onRefresh = () => {
    setRefreshing(true);
    // I will make an api call here
    // setRefreshing(false);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Discover</Text>
      <View style={{height: 15}} />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        renderItem={({item, index}) => {
          return <ImageCard item={item} />;
        }}
        keyExtractor={item => item.id}
        contentContainerStyle={{paddingBottom: 50}}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={'#3B82F6'}
          />
        }
      />
    </View>
  );
};

export default DiscoverScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    paddingHorizontal: 20,
  },
  title: {
    color: '#fff',
    fontFamily: fontFamily.bold,
    textAlign: 'center',
    marginTop: 50,
    fontSize: 28,
  },
});
