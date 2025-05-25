import { themes } from '@/constants/Colours';
import { router } from 'expo-router';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
  Modal,
  ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

// Type definitions
interface ConfettiProps {
  style?: ViewStyle;
}

interface CompletionScreenProps {
  visible: boolean;
  onClose: () => void;
  currentStreak?: number;
  totalEntries?: number;
  longestStreak?: number;
}

// Motivational messages array
const motivationalMessages: string[] = [
  "Every small step counts towards your wellbeing! 🌟",
  "You're building healthy habits one day at a time! 💪",
  "Taking care of your mental health is an act of self-love! 💚",
  "Consistency is key - you're doing amazing! ✨",
  "Your commitment to self-reflection is inspiring! 🌱",
  "Each entry brings you closer to understanding yourself! 🧠",
  "You're prioritizing what matters most - YOU! 🎯",
  "Progress, not perfection. You're on the right track! 🌈",
  "Your mental health journey is unique and valuable! 🦋",
  "Celebrating your dedication to personal growth! 🎉"
];

// Confetti component
const Confetti: React.FC<ConfettiProps> = ({ style }) => {
  const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  
  return (
    <View
      style={[
        {
          position: 'absolute',
          width: 8,
          height: 8,
          backgroundColor: randomColor,
          borderRadius: 4,
        },
        style,
      ]}
    />
  );
};

const CompletionScreen: React.FC<CompletionScreenProps> = ({ 
  visible, 
  onClose, 
  currentStreak = 1, 
  totalEntries = 1,
  longestStreak = 1 
}) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.8));
  const [confettiAnims] = useState(
    Array.from({ length: 20 }, () => ({
      translateY: new Animated.Value(-100),
      translateX: new Animated.Value(Math.random() * width),
      opacity: new Animated.Value(1),
    }))
  );

  const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];

  useEffect(() => {
    if (visible) {
      // Fade in and scale up animation
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 100,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();

      // Confetti animation
      const confettiAnimations = confettiAnims.map((anim) =>
        Animated.parallel([
          Animated.timing(anim.translateY, {
            toValue: height + 100,
            duration: 3000,
            useNativeDriver: true,
          }),
          Animated.timing(anim.opacity, {
            toValue: 0,
            duration: 3000,
            useNativeDriver: true,
          }),
        ])
      );

      Animated.stagger(100, confettiAnimations).start();
    } else {
      // Reset animations
      fadeAnim.setValue(0);
      scaleAnim.setValue(0.8);
      confettiAnims.forEach(anim => {
        anim.translateY.setValue(-100);
        anim.opacity.setValue(1);
      });
    }
  }, [visible]);

  const getStreakEmoji = (streak: number): string => {
    if (streak >= 30) return '🔥';
    if (streak >= 14) return '⚡';
    if (streak >= 7) return '💪';
    if (streak >= 3) return '🌟';
    return '✨';
  };

  const getStreakMessage = (streak: number): string => {
    if (streak >= 30) return 'Incredible dedication!';
    if (streak >= 14) return 'You\'re on fire!';
    if (streak >= 7) return 'Amazing consistency!';
    if (streak >= 3) return 'Great momentum!';
    return 'Great start!';
  };

  const handleContinue = () => {
    // Close the modal first
    onClose();
    
    // Navigate to the tabs index page
    // Use replace to prevent going back to the completion screen
    router.replace('/(tabs)');
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        {/* Confetti */}
        {confettiAnims.map((anim, index) => (
          <Animated.View
            key={index}
            style={{
              transform: [
                { translateX: anim.translateX },
                { translateY: anim.translateY },
              ],
              opacity: anim.opacity,
            }}
          >
            <Confetti style={{}} />
          </Animated.View>
        ))}

        <SafeAreaView style={styles.container}>
          <Animated.View
            style={[
              styles.content,
              {
                opacity: fadeAnim,
                transform: [{ scale: scaleAnim }],
              },
            ]}
          >
            {/* Main celebration section */}
            <View style={styles.celebrationSection}>
              <Text style={styles.celebrationTitle}>Day Logged! 🎉</Text>
              <Text style={styles.subtitle}>Another step towards better mental health</Text>
            </View>

            {/* Streak section */}
            <View style={styles.streakContainer}>
              <View style={styles.streakMain}>
                <Text style={styles.streakEmoji}>{getStreakEmoji(currentStreak)}</Text>
                <View style={styles.streakInfo}>
                  <Text style={styles.streakNumber}>{currentStreak}</Text>
                  <Text style={styles.streakLabel}>Day Streak</Text>
                </View>
              </View>
              <Text style={styles.streakMessage}>{getStreakMessage(currentStreak)}</Text>
            </View>

            {/* Stats section */}
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{totalEntries}</Text>
                <Text style={styles.statLabel}>Total Entries</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{longestStreak}</Text>
                <Text style={styles.statLabel}>Longest Streak</Text>
              </View>
            </View>

            {/* Motivational message */}
            <View style={styles.messageContainer}>
              <Text style={styles.motivationalMessage}>{randomMessage}</Text>
            </View>

            {/* Continue button */}
            <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
              <Text style={styles.continueButtonText}>Continue</Text>
            </TouchableOpacity>
          </Animated.View>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  content: {
    backgroundColor: themes.light.background,
    borderRadius: 20,
    padding: 30,
    width: '100%',
    maxWidth: 350,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  celebrationSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  celebrationTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: themes.light.textPrimary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: themes.light.textSecondary,
    textAlign: 'center',
  },
  streakContainer: {
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    width: '100%',
  },
  streakMain: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  streakEmoji: {
    fontSize: 40,
    marginRight: 15,
  },
  streakInfo: {
    alignItems: 'center',
  },
  streakNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    color: themes.light.button1,
  },
  streakLabel: {
    fontSize: 20,
    color: themes.light.button1,
    fontWeight: '600',
  },
  streakMessage: {
    fontSize: 16,
    color: themes.light.textPrimary,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    width: '100%',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: themes.light.textPrimary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: themes.light.textSecondary,
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: themes.light.accent,
    marginHorizontal: 20,
  },
  messageContainer: {
    marginBottom: 30,
    backgroundColor: themes.light.yellow,
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: themes.light.button2,
  },
  motivationalMessage: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    lineHeight: 22,
    fontStyle: 'italic',
  },
  continueButton: {
    backgroundColor: themes.light.button1,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 20,
    minWidth: 120,
  },
  continueButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default CompletionScreen;