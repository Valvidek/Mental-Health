import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

interface RewardScreenProps {
  onContinue: () => void;
  completedSessions: number;
}

export default function RewardScreen({ onContinue, completedSessions }: RewardScreenProps) {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 10,
        friction: 2,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // Achievement milestones
  const getAchievementText = () => {
    if (completedSessions === 1) return "First session complete! 🌱";
    if (completedSessions === 5) return "5 sessions! You're building a habit! 🌿";
    if (completedSessions === 10) return "10 sessions! Mindfulness master! 🧘‍♀️";
    if (completedSessions % 10 === 0) return `${completedSessions} sessions! Amazing dedication! ⭐`;
    return "Keep up the great work!";
  };

  return (
    <LinearGradient colors={['#f093fb', '#f5576c']} style={styles.gradient}>
      <View style={styles.rewardContainer}>
        <Animated.View
          style={[
            styles.rewardIcon,
            {
              transform: [{ scale: scaleAnim }, { rotate }],
            },
          ]}
        >
          <Ionicons name="trophy" size={100} color="#FFD700" />
        </Animated.View>

        <Text style={styles.congratsText}>Congratulations!</Text>
        <Text style={styles.rewardSubtext}>You've completed your session</Text>
        
        <View style={styles.achievementContainer}>
          <Text style={styles.achievementText}>Total Sessions: {completedSessions}</Text>
          <Text style={styles.achievementText}>{getAchievementText()}</Text>
        </View>

        <TouchableOpacity style={styles.continueButton} onPress={onContinue}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  rewardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  rewardIcon: {
    marginBottom: 30,
  },
  congratsText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  rewardSubtext: {
    fontSize: 20,
    color: '#fff',
    opacity: 0.9,
    marginBottom: 30,
  },
  achievementContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 20,
    borderRadius: 15,
    marginBottom: 40,
  },
  achievementText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 5,
  },
  continueButton: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 30,
  },
  continueButtonText: {
    color: '#f093fb',
    fontSize: 18,
    fontWeight: 'bold',
  },
});