import { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { authService } from '../services/auth';

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export function HomeScreen({ navigation }: HomeScreenProps) {
  const [playerName, setPlayerName] = useState('');
  const [masterKey, setMasterKey] = useState('');

  const handleLogin = () => {
    if (!playerName.trim()) return;
    navigation.navigate('PlayerHome');
  };

  const handleLogout = async () => {
    try {
      await authService.signOut();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const userEmail = authService.getCurrentUser()?.email;

  return (
    <View style={styles.container}>
      {/* Header Placeholder since no snapshot exists */}
      <View style={styles.header}>
         <Text style={styles.headerTitle}>Majorya RPG</Text>
         {userEmail && <Text style={styles.subtitle}>{userEmail}</Text>}
         <Pressable
           style={({ pressed }) => [styles.logoutButton, pressed && styles.buttonPressed]}
           onPress={handleLogout}
         >
           <Text style={styles.logoutText}>Sair</Text>
         </Pressable>
      </View>

      <View style={styles.loginContainer}>
        <Text style={styles.loginTitle}>Entrar na Sessão</Text>
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
          <Text style={styles.buttonText}>Começar</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    height: 200,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
  },
  headerTitle: {
    ...typography.h1,
    color: colors.primary,
    fontFamily: 'Rye-Regular',
  },
  loginContainer: {
    padding: spacing.lg,
    gap: spacing.md,
    marginTop: spacing.xl,
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
    marginBottom: spacing.sm,
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
  logoutButton: {
    position: 'absolute',
    right: 20,
    top: 50,
    padding: 8,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
  },
  logoutText: {
    color: colors.primary,
    fontWeight: 'bold',
    fontFamily: 'Lato-Bold',
  },
});
