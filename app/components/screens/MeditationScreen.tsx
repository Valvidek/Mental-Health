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

// Inspirational quotes for meditation
const quotes = [
  { text: "Breathe in peace, breathe out tension.", author: "Unknown" },
  { text: "The present moment is the only time over which we have dominion.", author: "Thích Nhất Hạnh" },
  { text: "Feelings come and go like clouds in a windy sky.", author: "Thích Nhất Hạnh" },
  { text: "You are the sky. Everything else is just the weather.", author: "Pema Chödrön" },
  { text: "In the midst of movement and chaos, keep stillness inside of you.", author: "Deepak Chopra" },
  { text: "The mind is everything. What you think you become.", author: "Buddha" },
  { text: "Peace comes from within. Do not seek it without.", author: "Buddha" },
  { text: "The quieter you become, the more you can hear.", author: "Ram Dass" },
];

interface MeditationScreenProps {
  duration: number;
  onComplete: () => void;
  onExit: () => void;
}

export default function MeditationScreen({ duration, onComplete, onExit }: MeditationScreenProps) {
  const [timeRemaining, setTimeRemaining] = useState(duration * 60);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [showExitModal, setShowExitModal] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;

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
    const quoteInterval = setInterval(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setCurrentQuoteIndex(prev => (prev + 1) % quotes.length);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      });
    }, 15000); // Change quote every 15 seconds

    return () => clearInterval(quoteInterval);
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

  return (
    <LinearGradient colors={['#fa709a', '#fee140']} style={styles.gradient}>
      <View style={styles.meditationContainer}>
        <TouchableOpacity style={styles.exitButton} onPress={handleExit}>
          <Ionicons name="close" size={30} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.timeRemaining}>{formatTime(timeRemaining)}</Text>

        <Animated.View style={[styles.quoteContainer, { opacity: fadeAnim }]}>
          <Text style={styles.quoteText}>"{quotes[currentQuoteIndex].text}"</Text>
          <Text style={styles.quoteAuthor}>- {quotes[currentQuoteIndex].author}</Text>
        </Animated.View>

        <View style={styles.meditationInstructions}>
          <Text style={styles.meditationText}>Close your eyes</Text>
          <Text style={styles.meditationText}>Focus on your breath</Text>
          <Text style={styles.meditationText}>Let thoughts pass like clouds</Text>
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
  meditationContainer: {
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
    marginBottom: 50,
  },
  quoteContainer: {
    marginBottom: 50,
    paddingHorizontal: 30,
  },
  quoteText: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 10,
  },
  quoteAuthor: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    opacity: 0.8,
  },
  meditationInstructions: {
    alignItems: 'center',
  },
  meditationText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
    opacity: 0.9,
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
    backgroundColor: '#fa709a',
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
