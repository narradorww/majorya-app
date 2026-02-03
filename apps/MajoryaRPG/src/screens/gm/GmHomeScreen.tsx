import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

export type GmHomeScreenProps = NativeStackScreenProps<RootStackParamList, 'GmHome'>;

export function GmHomeScreen({ navigation }: GmHomeScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={[typography.title, styles.title]}>Área do Mestre</Text>

      <Pressable
        style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
        onPress={() => navigation.navigate('GmSessions')}
      >
        <Text style={styles.cardTitle}>Sessões</Text>
        <Text style={styles.cardSubtitle}>Registro de sessões e resumos.</Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
        onPress={() => navigation.navigate('GmAdventures')}
      >
        <Text style={styles.cardTitle}>Aventuras</Text>
        <Text style={styles.cardSubtitle}>Arcos, capítulos e checkpoints.</Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
        onPress={() => navigation.navigate('GmNpcs')}
      >
        <Text style={styles.cardTitle}>NPCs</Text>
        <Text style={styles.cardSubtitle}>Personagens de apoio e relações.</Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
        onPress={() => navigation.navigate('GmCreatures')}
      >
        <Text style={styles.cardTitle}>Criaturas</Text>
        <Text style={styles.cardSubtitle}>Bestiário e estatísticas.</Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
        onPress={() => navigation.navigate('GmMaps')}
      >
        <Text style={styles.cardTitle}>Mapas</Text>
        <Text style={styles.cardSubtitle}>Notas, mapas e pontos de interesse.</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
    gap: spacing.md,
  },
  title: {
    color: colors.textPrimary,
  },
  card: {
    borderRadius: 12,
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  cardPressed: {
    opacity: 0.9,
  },
  cardTitle: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
  cardSubtitle: {
    color: colors.textSecondary,
    marginTop: spacing.xs,
    fontSize: 13,
  },
});
