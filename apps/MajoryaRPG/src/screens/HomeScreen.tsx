import { useEffect, useRef, useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Animated,
  Dimensions,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Video from 'react-native-video';
import { RootStackParamList } from '../navigation/AppNavigator';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

const INTRO_HOLD_MS = 6000;
const FADE_OUT_MS = 3000;
const BANNER_HEIGHT = 540;

export function HomeScreen({ navigation }: HomeScreenProps) {
  const [playerName, setPlayerName] = useState('');
  const [masterKey, setMasterKey] = useState('');
  const [volume, setVolume] = useState(1);

  const screenHeight = Dimensions.get('window').height;
  const transition = useRef(new Animated.Value(0)).current;
  const volumeAnim = useRef(new Animated.Value(1)).current;
  const volumeListener = useRef<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(transition, {
        toValue: 1,
        duration: FADE_OUT_MS,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }).start();

      Animated.timing(volumeAnim, {
        toValue: 0,
        duration: FADE_OUT_MS,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }).start();
    }, INTRO_HOLD_MS);

    volumeListener.current = volumeAnim.addListener(({ value }) => {
      setVolume(value);
    });

    return () => {
      clearTimeout(timer);
      if (volumeListener.current) {
        volumeAnim.removeListener(volumeListener.current);
      }
    };
  }, [transition, volumeAnim]);

  const videoHeight = transition.interpolate({
    inputRange: [0, 1],
    outputRange: [screenHeight, BANNER_HEIGHT],
  });

  const loginOpacity = transition.interpolate({
    inputRange: [0, 0.6, 1],
    outputRange: [0, 0.2, 1],
  });

  const loginTranslateY = transition.interpolate({
    inputRange: [0, 1],
    outputRange: [60, 0],
  });

  const handleLogin = () => {
    if (!playerName.trim()) return;
    navigation.navigate('PlayerHome');
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.videoContainer, { height: videoHeight }]}>
        <Video
          source={require('../assets/dragon_intro.mp4')}
          style={styles.video}
          resizeMode="contain"
          repeat
          volume={volume}
          muted={false}
          ignoreSilentSwitch="ignore"
        />
      </Animated.View>

      <Animated.View
        style={[
          styles.loginContainer,
          { opacity: loginOpacity, transform: [{ translateY: loginTranslateY }] },
        ]}
      >
        <Text style={styles.loginTitle}>Bem-vindo a Majória</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome do jogador"
          placeholderTextColor={colors.textSecondary}
          value={playerName}
          onChangeText={setPlayerName}
        />
        <TextInput
          style={styles.input}
          placeholder="Chave do mestre"
          placeholderTextColor={colors.textSecondary}
          value={masterKey}
          onChangeText={setMasterKey}
          secureTextEntry
        />
        <Pressable
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>Entrar</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  videoContainer: {
    width: '100%',
    overflow: 'hidden',
    backgroundColor: '#000000',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
    gap: spacing.md,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  loginContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: spacing.lg,
    padding: spacing.lg,
    gap: spacing.md,
  },
  title: {
    color: colors.textPrimary,
    textAlign: 'center',
  },
  subtitle: {
    color: colors.textSecondary,
    textAlign: 'center',
  },
  button: {
    width: '100%',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  buttonPressed: {
    opacity: 0.85,
  },
  buttonText: {
    color: colors.background,
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
  },
  loginTitle: {
    ...typography.subtitle,
    color: colors.textPrimary,
  },
  input: {
    borderWidth: 2,
    borderColor: colors.accent,
    backgroundColor: '#000000',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    ...typography.body,
    color: colors.ctaText,
  },
});
