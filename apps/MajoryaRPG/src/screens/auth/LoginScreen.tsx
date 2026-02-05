import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, SafeAreaView, Dimensions, Animated, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Video from 'react-native-video';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { authService } from '../../services/auth';

const INTRO_HOLD_MS = 6000;
const FADE_OUT_MS = 3000;
const BANNER_HEIGHT = 200; // Adjusted for Login Screen

export function LoginScreen() {
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
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

  const contentOpacity = transition.interpolate({
    inputRange: [0, 0.6, 1],
    outputRange: [0, 0.2, 1],
  });

  const contentTranslateY = transition.interpolate({
    inputRange: [0, 1],
    outputRange: [60, 0],
  });

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);
    try {
      await authService.signIn(email, password);
    } catch (error: any) {
      Alert.alert('Erro no Login', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await authService.signInWithGoogle();
    } catch (error: any) {
      // Ignore cancellation error
      if (error.code !== '12501') { // 12501 is basic cancellation on Android often
         Alert.alert('Erro no Login com Google', error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.videoContainer, { height: videoHeight }]}>
        <Video
          source={require('../../assets/dragon_intro.mp4')}
          style={styles.video}
          resizeMode="contain"
          repeat
          volume={volume}
          muted={false}
          ignoreSilentSwitch="ignore"
        />
        {/* Adds a gradient overlay for better text readability later if needed */}
        <Animated.View style={[styles.overlay, { opacity: transition }]} /> 
      </Animated.View>

      <Animated.View
        style={[
          styles.content,
          { opacity: contentOpacity, transform: [{ translateY: contentTranslateY }] },
        ]}
      >
        <Text style={styles.title}>Majorya RPG</Text>
        
        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu e-mail"
          placeholderTextColor={colors.textSecondary}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Text style={styles.label}>Senha</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Digite sua senha"
            placeholderTextColor={colors.textSecondary}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity 
            style={styles.eyeIcon} 
            onPress={() => setShowPassword(!showPassword)}
          >
            <Text style={{ fontSize: 20 }}>{showPassword ? '🙈' : '👁️'}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.forgotButton} 
          onPress={() => navigation.navigate('ForgotPassword')}
        >
          <Text style={styles.forgotText}>Esqueci minha senha</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.button} 
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Entrando...' : 'Entrar'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.googleButton} 
          onPress={handleGoogleLogin}
          disabled={loading}
        >
          <Text style={styles.googleButtonText}>Entrar com Google</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.linkButton} 
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.linkText}>Não tem conta? Cadastre-se</Text>
        </TouchableOpacity>
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
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: colors.background, // Ensure background is solid for form
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 40,
    fontFamily: 'Rye-Regular',
  },
  label: {
    color: colors.textPrimary,
    marginBottom: 8,
    fontSize: 16,
    fontFamily: 'Lato-Bold',
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    color: colors.textPrimary,
    borderWidth: 1,
    borderColor: colors.secondary,
    fontFamily: 'Lato-Regular',
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Lato-Bold',
  },
  googleButton: {
    backgroundColor: '#DB4437',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#DB4437',
  },
  googleButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'Lato-Bold',
  },
  linkButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  linkText: {
    color: colors.secondary,
    fontSize: 14,
    fontFamily: 'Lato-Regular',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  passwordInput: {
    flex: 1,
    padding: 12,
    color: colors.textPrimary,
    fontFamily: 'Lato-Regular',
  },
  eyeIcon: {
    padding: 10,
  },
  forgotButton: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotText: {
    color: colors.secondary,
    fontSize: 14,
    fontFamily: 'Lato-Regular',
    textDecorationLine: 'underline',
  },
});
