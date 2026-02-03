import { useEffect, useRef, useState } from 'react';
import { Image, ImageSourcePropType, Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

type DiceRollerProps = {
  faces?: number;
  spriteSource?: ImageSourcePropType;
  frameWidth?: number;
  frameHeight?: number;
  onRollComplete?: (value: number) => void;
  showButton?: boolean;
  showResult?: boolean;
  triggerToken?: number;
};

const DEFAULT_FRAME_SIZE = 64;
const ROLL_DURATION_MS = 900;
const FRAME_INTERVAL_MS = 70;
const defaultSprite = require('../assets/dice/d6-sprite.png');

export function DiceRoller({
  faces = 6,
  spriteSource = defaultSprite,
  frameWidth = DEFAULT_FRAME_SIZE,
  frameHeight = DEFAULT_FRAME_SIZE,
  onRollComplete,
  showButton = true,
  showResult = true,
  triggerToken,
}: DiceRollerProps) {
  const [rolling, setRolling] = useState(false);
  const [currentFace, setCurrentFace] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (typeof triggerToken === 'number') {
      startRoll();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerToken]);

  const startRoll = () => {
    if (rolling) return;

    setRolling(true);
    let ticksLeft = Math.ceil(ROLL_DURATION_MS / FRAME_INTERVAL_MS);
    let face = currentFace;

    intervalRef.current = setInterval(() => {
      face = (face + 1) % faces;
      setCurrentFace(face);
      ticksLeft -= 1;

      if (ticksLeft <= 0) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        const result = Math.floor(Math.random() * faces);
        setCurrentFace(result);
        setRolling(false);
        onRollComplete?.(result + 1);
      }
    }, FRAME_INTERVAL_MS);
  };

  return (
    <View style={styles.container}>
      <View style={styles.diceFrame}>
        {spriteSource ? (
          <View style={[styles.spriteViewport, { width: frameWidth, height: frameHeight }]}>
            <Image
              source={spriteSource}
              style={[
                styles.spriteSheet,
                {
                  width: frameWidth * faces,
                  height: frameHeight,
                  transform: [{ translateX: -currentFace * frameWidth }],
                },
              ]}
              resizeMode="contain"
            />
          </View>
        ) : (
          <View style={[styles.placeholder, { width: frameWidth, height: frameHeight }]}>
            <Text style={styles.placeholderText}>D{faces}</Text>
            <Text style={styles.placeholderFace}>{currentFace + 1}</Text>
          </View>
        )}
      </View>

      {showResult ? (
        <Text style={styles.resultText}>Resultado: {currentFace + 1}</Text>
      ) : null}

      {showButton ? (
        <Pressable
          style={({ pressed }) => [styles.rollButton, pressed && styles.rollButtonPressed]}
          onPress={startRoll}
          accessibilityRole="button"
        >
          <Text style={styles.rollButtonText}>{rolling ? 'Rolando...' : 'Rolar D6'}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: spacing.sm,
  },
  diceFrame: {
    borderWidth: 2,
    borderColor: colors.secondary,
    padding: spacing.xs,
    backgroundColor: colors.surface,
  },
  spriteViewport: {
    overflow: 'hidden',
  },
  spriteSheet: {
    alignSelf: 'flex-start',
  },
  placeholder: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
    borderWidth: 2,
    borderColor: colors.accent,
  },
  placeholderText: {
    ...typography.body,
    color: colors.textSecondary,
  },
  placeholderFace: {
    ...typography.title,
    color: colors.textPrimary,
    marginTop: spacing.xs,
  },
  resultText: {
    ...typography.body,
    color: colors.textSecondary,
  },
  rollButton: {
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  rollButtonPressed: {
    opacity: 0.9,
  },
  rollButtonText: {
    ...typography.subtitle,
    color: colors.ctaText,
    textAlign: 'center',
  },
});
