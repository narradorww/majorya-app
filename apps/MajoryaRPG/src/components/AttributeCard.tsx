import { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing } from '../theme/spacing';
import { rollAttribute } from '../services/dice';
import { DiceRoller } from './DiceRoller';

type Props = {
  attributeName: string;
  value: number;
};

export const AttributeCard = ({ attributeName, value }: Props) => {
  const [rollKey, setRollKey] = useState(0);
  const [lastTitle, setLastTitle] = useState<string | null>(null);
  const [lastMessage, setLastMessage] = useState<string | null>(null);

  const handleRoll = () => {
    const result = rollAttribute(value);
    
    let title = 'Resultado';
    let message = `Dados: [${result.dice.join(', ')}]\nSucessos: ${result.successes}`;

    if (result.isCriticalSuccess) {
      title = 'SUCESSO ABSOLUTO!';
      message += '\n\n🌟 Mais da metade são 6s!';
    } else if (result.isCriticalFailure) {
      title = 'FALHA CRÍTICA!';
      message += '\n\n💀 Mais da metade são 1s!';
    } else if (result.successes > 0) {
      title = 'Sucesso!';
    } else {
      title = 'Falha';
    }

    setLastTitle(title);
    setLastMessage(message);
    setRollKey(prev => prev + 1);
  };

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.label}>{attributeName}</Text>
          <Text style={styles.value}>{value}</Text>
        </View>
        <DiceRoller showButton={false} showResult={false} triggerToken={rollKey} />
      </View>

      <Pressable 
        style={({ pressed }) => [styles.button, pressed && styles.pressed]} 
        onPress={handleRoll}
      >
        <Text style={styles.buttonText}>ROLAR</Text>
      </Pressable>

      {lastTitle && lastMessage ? (
        <View style={styles.resultBox}>
          <Text style={styles.resultTitle}>{lastTitle}</Text>
          <Text style={styles.resultMessage}>{lastMessage}</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    gap: spacing.sm,
    borderWidth: 2,
    borderColor: colors.textPrimary, // Pixel art border style
    marginBottom: spacing.sm,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.md,
  },
  label: {
    ...typography.body,
    fontWeight: 'bold', // Font handles it?
    color: colors.textSecondary,
    fontSize: 14,
  },
  value: {
    ...typography.title,
    color: colors.textPrimary,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderWidth: 2,
    borderColor: colors.secondary,
    alignSelf: 'flex-start',
  },
  pressed: {
    backgroundColor: colors.secondary,
  },
  buttonText: {
    ...typography.body,
    color: colors.ctaText, // Pixel art text might be white on black or vice versa
    fontWeight: 'bold',
  },
  resultBox: {
    borderWidth: 2,
    borderColor: colors.secondary,
    backgroundColor: colors.background,
    padding: spacing.sm,
  },
  resultTitle: {
    ...typography.subtitle,
    color: colors.accent,
    marginBottom: spacing.xs,
  },
  resultMessage: {
    ...typography.body,
    color: colors.textSecondary,
  },
});
