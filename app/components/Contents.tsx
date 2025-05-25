import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { ScreenType } from '@/app/(tabs)/aibuddy';

const { width } = Dimensions.get('window');

// Timer presets in minutes
const timerPresets = [5, 10, 15, 20, 30];

interface HomeScreenProps {
  onNavigate: (screen: ScreenType) => void;
  selectedMinutes: number;
  setSelectedMinutes: (minutes: number) => void;
  completedSessions: number;
}

export default function Contents({ 
  onNavigate, 
  selectedMinutes, 
  setSelectedMinutes, 
  completedSessions 
}: HomeScreenProps) {
  return (
    <LinearGradient colors={['#667eea', '#764ba2']} style={styles.gradient}>
      <View style={styles.homeContainer}>
        <Text style={styles.title}>Mindful Moments</Text>
        <Text style={styles.subtitle}>Choose your practice</Text>
        
        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>Sessions completed: {completedSessions}</Text>
        </View>

        <View style={styles.timerSection}>
          <Text style={styles.timerLabel}>Select Duration (minutes):</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.timerScroll}>
            {timerPresets.map((minutes) => (
              <TouchableOpacity
                key={minutes}
                style={[
                  styles.timerButton,
                  selectedMinutes === minutes && styles.timerButtonActive
                ]}
                onPress={() => setSelectedMinutes(minutes)}
              >
                <Text style={[
                  styles.timerButtonText,
                  selectedMinutes === minutes && styles.timerButtonTextActive
                ]}>
                  {minutes}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <TouchableOpacity
          style={styles.practiceButton}
          onPress={() => onNavigate('breathing')}
        >
          <Ionicons name="leaf-outline" size={30} color="#fff" />
          <Text style={styles.practiceButtonText}>Breathing Exercise</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.practiceButton}
          onPress={() => onNavigate('meditation')}
        >
          <Ionicons name="flower-outline" size={30} color="#fff" />
          <Text style={styles.practiceButtonText}>Guided Meditation</Text>
        </TouchableOpacity>

                <TouchableOpacity
          style={styles.practiceButton}
          onPress={() => onNavigate('chat')}
        >
          <Ionicons name="leaf-outline" size={30} color="#fff" />
          <Text style={styles.practiceButtonText}>Talk to Lumen</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  homeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    opacity: 0.9,
    marginBottom: 30,
  },
  statsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 30,
  },
  statsText: {
    color: '#fff',
    fontSize: 16,
  },
  timerSection: {
    marginBottom: 40,
  },
  timerLabel: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
  },
  timerScroll: {
    maxHeight: 50,
  },
  timerButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  timerButtonActive: {
    backgroundColor: '#fff',
  },
  timerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  timerButtonTextActive: {
    color: '#667eea',
  },
  practiceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginBottom: 20,
    width: width * 0.8,
  },
  practiceButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 15,
  },
});
