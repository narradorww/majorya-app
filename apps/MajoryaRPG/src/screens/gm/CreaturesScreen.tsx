import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';

export function CreaturesScreen() {
  return (
    <View style={styles.container}>
      <Text style={[typography.title, styles.title]}>Criaturas</Text>
      <Text style={styles.text}>Em breve: bestiário e estatísticas.</Text>
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
  text: {
    color: colors.textSecondary,
  },
});
