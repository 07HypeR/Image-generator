import {
  ActivityIndicator,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {colors, fontFamily} from '../theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ImageCard from '../components/ImageCard';
import {api} from '../utils/api';

const HomeScreen = () => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState('');

  const handleOpenLink = () => {
    //Open Link
    const url = 'https://github.com/07HypeR';
    Linking.openURL(url).catch(err => console.error('An error occurred', err));
  };

  const handleGenerateImage = async () => {
    try {
      if (!prompt.length) {
        ToastAndroid.show(
          'Please enter the prompt to generate image',
          ToastAndroid.SHORT,
        );
        return;
      }
      setIsLoading(true);
      const response = await api.post('/generate-image', {prompt: prompt});
      console.log('Response is here:', response.data);

      setImage(response.data.imageUrl);
      setIsLoading(false);
      ToastAndroid.show('Image generated successfully!', ToastAndroid.SHORT);
    } catch (error) {
      ToastAndroid.show('Something went wrong!', ToastAndroid.SHORT);
      setIsLoading(false);
    }
  };

  const handleClearPrompt = () => {
    setPrompt('');
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.primary}}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        {/* Logo Container */}
        <View style={styles.appLogoContainer}>
          <Text style={styles.appName}>DreamAI</Text>
          <TouchableOpacity onPress={handleOpenLink}>
            <Text style={styles.madeBy}>
              Made by {''}
              <Text style={[styles.madeBy, {textDecorationLine: 'underline'}]}>
                Stoic
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
        {/* input container */}
        <View style={styles.textInputWrapper}>
          <View style={styles.textInputContainer}>
            <TextInput
              placeholder="Enter your prompt.."
              placeholderTextColor={'#808080'}
              multiline
              style={styles.textInput}
              value={prompt}
              onChangeText={setPrompt}
            />
            {prompt ? (
              <TouchableOpacity
                style={styles.clearButton}
                onPress={handleClearPrompt}>
                <Icon name={'close'} size={24} color={'#fff'} />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>

        {/* generate button */}
        <TouchableOpacity
          style={styles.generateButton}
          onPress={handleGenerateImage}>
          {isLoading ? (
            <ActivityIndicator size={'small'} color={'#fff'} />
          ) : (
            <Text style={styles.generateText}>Generate</Text>
          )}
        </TouchableOpacity>

        {/* description */}
        {!image && (
          <Text style={styles.description}>
            Generate images in real-time. Enter a prompt and generate images in
            milliseconds as you type. Powered by Flux on Together Al.
          </Text>
        )}

        {image && (
          <View style={styles.imageWrapper}>
            <ImageCard
              item={{imageUrl: image, prompt: 'Generate an ai Image'}}
            />
          </View>
        )}

        {/* footer */}
        {!image && (
          <View style={styles.footer}>
            <Text style={styles.poweredText}>
              Powered by Together.ai & Flux
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#1E1E1E',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    paddingBottom: 30,
  },
  appLogoContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  appName: {
    color: '#fff',
    fontFamily: fontFamily.bold,
    fontSize: 32,
    textAlign: 'center',
  },
  madeBy: {
    color: '#808080',
    fontSize: 12,
    fontFamily: fontFamily.regular,
    marginTop: 5,
  },

  // input container
  textInputWrapper: {
    marginTop: 20,
  },
  textInputContainer: {
    position: 'relative',
  },
  textInput: {
    width: '100%',
    height: 120,
    borderWidth: 2,
    borderColor: '#565656',
    borderRadius: 10,
    backgroundColor: '#222',
    color: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontFamily: fontFamily.regular,
    fontSize: 16,
  },
  clearButton: {
    position: 'absolute',
    right: 10,
    top: 10,
  },

  // generate button
  generateButton: {
    marginTop: 10,
    backgroundColor: '#000',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderBottomWidth: 10,
    borderColor: '#f8f2f2',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 7,
    elevation: 11,
  },
  generateText: {
    color: '#fff',
    fontFamily: fontFamily.semiBold,
    fontSize: 20,
  },
  description: {
    color: '#808080',
    fontFamily: fontFamily.regular,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 20,
  },
  footer: {
    alignItems: 'center',
    marginTop: 30,
  },
  poweredText: {
    color: '#808080',
    fontFamily: fontFamily.regular,
    fontSize: 12,
  },
  imageWrapper: {
    marginTop: 20,
    alignItems: 'center',
  },
});
