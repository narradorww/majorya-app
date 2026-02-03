import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={[typography.title, styles.title]}>Majorya RPG</Text>
      <Text style={[typography.body, styles.subtitle]}>
        Escolha seu perfil para começar.
      </Text>

      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        onPress={() => navigation.navigate('PlayerHome')}
      >
        <Text style={styles.buttonText}>Sou Jogador</Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        onPress={() => navigation.navigate('GmHome')}
      >
        <Text style={styles.buttonText}>Sou Mestre</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
    gap: spacing.md,
  },
  title: {
    color: colors.textPrimary,
  },
  subtitle: {
    color: colors.textSecondary,
    textAlign: 'center',
  },
  button: {
    width: '100%',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 10,
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
});
