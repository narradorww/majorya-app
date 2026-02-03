import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

export type PlayerHomeScreenProps = NativeStackScreenProps<RootStackParamList, 'PlayerHome'>;

export function PlayerHomeScreen({ navigation }: PlayerHomeScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={[typography.title, styles.title]}>Área do Jogador</Text>

      <Pressable
        style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
        onPress={() => navigation.navigate('PlayerCharacterSheet')}
      >
        <Text style={styles.cardTitle}>Ficha do Personagem</Text>
        <Text style={styles.cardSubtitle}>Atributos, perícias e status.</Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
        onPress={() => navigation.navigate('PlayerInventory')}
      >
        <Text style={styles.cardTitle}>Bornel</Text>
        <Text style={styles.cardSubtitle}>Itens e achados da jornada.</Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
        onPress={() => navigation.navigate('PlayerEncounters')}
      >
        <Text style={styles.cardTitle}>Encontros</Text>
        <Text style={styles.cardSubtitle}>Histórico de encontros e eventos.</Text>
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
    borderColor: colors.accent,
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
