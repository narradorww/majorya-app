import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { AttributeCard } from '../../components/AttributeCard';
import { ATTRIBUTES, Character } from '../../models/character';
import { DiceRoller } from '../../components/DiceRoller';

// Mock character for now (Later fetching from store/DB)
const mockCharacter: Partial<Character> = {
  name: 'Jogador Teste',
  hp: 15,
  maxHp: 15, // VIG 3 * 5
  attributes: {
    FOR: 2,
    INT: 3,
    CAR: 4,
    VIG: 3,
    AGI: 2,
  },
};

export function CharacterSheetScreen() {
  const { attributes, hp, maxHp, name } = mockCharacter;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={[typography.title, styles.title]}>{name}</Text>
      
      <View style={styles.statsContainer}>
        <Text style={styles.sectionTitle}>PV: {hp}/{maxHp}</Text>
      </View>

      <Text style={styles.sectionTitle}>Atributos</Text>
      
      {attributes && Object.entries(attributes).map(([key, value]) => (
        <AttributeCard 
          key={key} 
          attributeName={ATTRIBUTES[key as keyof typeof ATTRIBUTES]} 
          value={value} 
        />
      ))}

      <View style={styles.rollSection}>
        <Text style={styles.sectionTitle}>Rolagem rápida (D6)</Text>
        <DiceRoller />
        <Text style={styles.helperText}>Em breve: rolagem global disponível em todas as telas.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: spacing.lg,
    backgroundColor: colors.background,
  },
  title: {
    color: colors.textPrimary,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  sectionTitle: {
    ...typography.subtitle,
    color: colors.accent,
    marginBottom: spacing.sm,
    marginTop: spacing.md,
    textTransform: 'uppercase',
  },
  statsContainer: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderWidth: 2,
    borderColor: colors.danger, // HP gets danger color
    marginBottom: spacing.md,
    alignItems: 'center',
  },
  rollSection: {
    marginTop: spacing.lg,
    padding: spacing.md,
    borderWidth: 2,
    borderColor: colors.accent,
    backgroundColor: colors.surface,
    alignItems: 'center',
    gap: spacing.sm,
  },
  helperText: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
