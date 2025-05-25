import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

interface BreathingExercisesProps {
  duration: number;
  onComplete: () => void;
  onExit: () => void;
}

export default function BreathingExercises({ duration, onComplete, onExit }: BreathingExercisesProps) {
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [timeRemaining, setTimeRemaining] = useState(duration * 60);
  const [currentCycle, setCurrentCycle] = useState(0);
  const [showExitModal, setShowExitModal] = useState(false);
  const breathAnimation = useRef(new Animated.Value(0.5)).current;
  const phaseTimeRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [duration, onComplete]);

  useEffect(() => {
    const breathingCycle = () => {
      // Inhale for 4 seconds
      Animated.timing(breathAnimation, {
        toValue: 1,
        duration: 4000,
        useNativeDriver: true,
      }).start(() => {
        setPhase('hold');
        // Hold for 4 seconds
        setTimeout(() => {
          setPhase('exhale');
          // Exhale for 4 seconds
          Animated.timing(breathAnimation, {
            toValue: 0.5,
            duration: 4000,
            useNativeDriver: true,
          }).start(() => {
            setPhase('inhale');
            setCurrentCycle(prev => prev + 1);
            breathingCycle();
          });
        }, 4000);
      });
    };

    breathingCycle();
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleExit = () => {
    setShowExitModal(true);
  };

  const confirmExit = () => {
    setShowExitModal(false);
    onExit();
  };

  const getPhaseInstruction = () => {
    switch (phase) {
      case 'inhale':
        return 'Breathe in slowly through your nose';
      case 'hold':
        return 'Hold your breath gently';
      case 'exhale':
        return 'Breathe out slowly through your mouth';
      default:
        return '';
    }
  };

  return (
    <LinearGradient colors={['#4facfe', '#00f2fe']} style={styles.gradient}>
      <View style={styles.breathingContainer}>
        <TouchableOpacity style={styles.exitButton} onPress={handleExit}>
          <Ionicons name="close" size={30} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.timeRemaining}>{formatTime(timeRemaining)}</Text>
        
        <View style={styles.cycleCounter}>
          <Text style={styles.cycleText}>Cycle: {Math.floor(currentCycle / 3) + 1}</Text>
        </View>

        <View style={styles.breathingCircleContainer}>
          <Animated.View
            style={[
              styles.breathingCircle,
              {
                transform: [{ scale: breathAnimation }],
              },
            ]}
          />
          <Text style={styles.phaseText}>{phase.toUpperCase()}</Text>
        </View>

        <Text style={styles.instructionText}>
          {getPhaseInstruction()}
        </Text>

        <View style={styles.breathingTips}>
          <Text style={styles.tipText}>💡 Tip: Focus on the rhythm</Text>
          <Text style={styles.tipText}>4 seconds in • 4 seconds hold • 4 seconds out</Text>
        </View>

        <Modal
          visible={showExitModal}
          transparent
          animationType="fade"
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Leave Early?</Text>
              <Text style={styles.modalText}>Are you sure you want to end this session early?</Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.modalButtonCancel]}
                  onPress={() => setShowExitModal(false)}
                >
                  <Text style={styles.modalButtonText}>Continue</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.modalButtonConfirm]}
                  onPress={confirmExit}
                >
                  <Text style={styles.modalButtonText}>Exit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  breathingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  exitButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 1,
  },
  timeRemaining: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  cycleCounter: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 30,
  },
  cycleText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  breathingCircleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
  breathingCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    position: 'absolute',
  },
  phaseText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  instructionText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    paddingHorizontal: 40,
    marginBottom: 30,
  },
  breathingTips: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 15,
    borderRadius: 15,
  },
  tipText: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.8,
    textAlign: 'center',
    marginBottom: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 20,
    width: width * 0.8,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 25,
    textAlign: 'center',
    color: '#666',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  modalButtonCancel: {
    backgroundColor: '#4facfe',
  },
  modalButtonConfirm: {
    backgroundColor: '#ff6b6b',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});