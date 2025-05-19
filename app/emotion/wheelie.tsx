import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useRouter } from 'expo-router';

// SVGs
import HappyFace from '@/assets/icons/happy1.svg';
import SadFace from '@/assets/icons/sad1.svg';
import AngryFace from '@/assets/icons/mad1.svg';
import TiredFace from '@/assets/icons/meh1.svg';
import DepressedFace from '@/assets/icons/depressed1.svg';
import AnxiousFace from '@/assets/icons/anxious1.svg';

const { width } = Dimensions.get('window');
const RADIUS = width * 0.2;

const moods = [
  { id: 'depressed', color: '#60E8B1', label: 'Depressed', Face: DepressedFace },
  { id: 'anxious', color: '#B27052', label: 'Anxious', Face: AnxiousFace },
  { id: 'sad', color: '#80D6FB', label: 'Sad', Face: SadFace },
  { id: 'angry', color: '#F49B54', label: 'Angry', Face: AngryFace },
  { id: 'happy', color: '#A4D37C', label: 'Happy', Face: HappyFace },
  { id: 'tired', color: '#DCA1FF', label: 'Tired', Face: TiredFace },
];

const EmotionWheel = () => {
  const router = useRouter();
  const INITIAL_ROTATION = -Math.PI / 2;
  const rotation = useSharedValue(INITIAL_ROTATION);
  const [selectedMoodIndex, setSelectedMoodIndex] = useState(0);

  const selectedMood = moods[selectedMoodIndex];
  const FaceComponent = selectedMood.Face;

  const handleRotateWheel = () => {
    const nextIndex = (selectedMoodIndex + 1) % moods.length;
    rotation.value = withSpring(rotation.value + (2 * Math.PI) / moods.length);
    setSelectedMoodIndex(nextIndex);
  };

  const handleNavigate = () => {
  router.push(`/emotion/sleep?mood=${selectedMood.id}`);
};


  return (
    <View style={[styles.container, { backgroundColor: selectedMood.color }]}>
      <Text style={styles.title}>How are you feeling today?</Text>

      <FaceComponent width={100} height={100} style={styles.face} />

      <Text style={styles.label}>I feel {selectedMood.label}!</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleRotateWheel}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.confirmButton]} onPress={handleNavigate}>
          <Text style={styles.buttonText}>I feel {selectedMood.label}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EmotionWheel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 60,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#222',
  },
  face: {
    marginVertical: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 20,
    color: '#333',
  },
  buttonContainer: {
    alignItems: 'center',
    gap: 10,
    zIndex: 10,
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#5a4fcf',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },
  confirmButton: {
    backgroundColor: '#222',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
