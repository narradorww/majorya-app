import React, { useRef } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, StatusBar } from 'react-native';
// @ts-ignore - react-native-video types might be missing or need config
import Video, { VideoRef } from 'react-native-video';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { colors } from '../theme/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'Intro'>;

const introVideo = require('../assets/dragon_intro.mp4');

export function IntroScreen({ navigation }: Props) {
  const videoRef = useRef<VideoRef>(null);

  const handleFinish = () => {
    navigation.replace('Home');
  };

  return (
    <TouchableWithoutFeedback onPress={handleFinish}>
      <View style={styles.container}>
        <StatusBar hidden />
        <Video
          ref={videoRef}
          source={introVideo}
          style={styles.backgroundVideo}
          resizeMode="contain" // Ensures formatting fits entirely on screen
          onEnd={handleFinish}
          onError={(e: any) => console.log('Video Error:', e)}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000', // Black background for letterboxing
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
