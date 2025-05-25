import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';

import HappyFace from '@/assets/svg/happy1.svg';
import SadFace from '@/assets/svg/sad1.svg';
import AngryFace from '@/assets/svg/mad1.svg';
import TiredFace from '@/assets/svg/meh1.svg';
import DepressedFace from '@/assets/svg/depressed1.svg';
import AnxiousFace from '@/assets/svg/anxious1.svg';

const { width } = Dimensions.get('window');
const RADIUS = width * 0.6;

const moods = [
  { id: 'depressed', label: 'Depressed', Face: DepressedFace },
  { id: 'anxious', label: 'Anxious', Face: AnxiousFace },
  { id: 'sad', label: 'Sad', Face: SadFace },
  { id: 'angry', label: 'Angry', Face: AngryFace },
  { id: 'happy', label: 'Happy', Face: HappyFace },
  { id: 'tired', label: 'Tired', Face: TiredFace },
];

const EmotionWheel = () => {
  const router = useRouter();
  const [selectedMoodIndex, setSelectedMoodIndex] = useState(0);

  const handleRotateWheel = () => {
    const nextIndex = (selectedMoodIndex + 1) % moods.length;
    setSelectedMoodIndex(nextIndex);
  };

  const handleNavigate = () => {
    router.push('/emotion/sleep');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>How are you feeling today?</Text>
      <Text style={styles.label}>I feel {moods[selectedMoodIndex].label}!</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleRotateWheel}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.confirmButton]} onPress={handleNavigate}>
          <Text style={styles.buttonText}>I feel {moods[selectedMoodIndex].label}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.wheelContainer}>
        {moods.map((mood, index) => {
          const angle = (2 * Math.PI * ((index - selectedMoodIndex + moods.length) % moods.length)) / moods.length;
          const x = Math.cos(angle - Math.PI / 2) * RADIUS;
          const y = Math.sin(angle - Math.PI / 2) * RADIUS;
          const Face = mood.Face;

          return (
            <View
              key={mood.id}
              style={[
                styles.moodIcon,
                {
                  transform: [
                    { translateX: x },
                    { translateY: y },
                  ],
                  position: 'absolute',
                  opacity: index === selectedMoodIndex ? 1 : 0.5,
                },
              ]}
            >
              <Face width={150} height={150} />
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default EmotionWheel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 150,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#222',
  },
  label: {
    fontSize: 18,
    marginBottom: 20,
    color: '#333',
  },
  buttonContainer: {
    alignItems: 'center',
    gap: 10,
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#5a4fcf',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
    marginVertical: 5,
  },
  confirmButton: {
    backgroundColor: '#5a4fcf',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  wheelContainer: {
    width: RADIUS * 2 + 100,
    height: RADIUS * 2 + 100,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  moodIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
