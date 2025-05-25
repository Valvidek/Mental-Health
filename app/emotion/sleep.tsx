import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Slider from '@react-native-community/slider'; // Native slider
import { useLocalSearchParams } from 'expo-router';

const Sleep: React.FC = () => {
  const { mood } = useLocalSearchParams();
  console.log('Selected mood:', mood);

  const [value, setValue] = useState<number>(5);
  const router = useRouter();
  const searchParams = useLocalSearchParams();

  const handleNext = (): void => {
    router.push(`/emotion/todayfocus?sleep=${value}`);
  };

  const getColor = (): string => {
    if (value <= 3) return 'red';
    if (value <= 7) return 'orange';
    return 'green';
  };

  const sleepIcons = {
    bad: require('@/assets/icons/mad1.png'),
    neutral: require('@/assets/icons/meh1.png'),
    good: require('@/assets/icons/happy1.png'),
  };

  const getSleepIcon = (): any => {
    if (value <= 3) return sleepIcons.bad;
    if (value <= 7) return sleepIcons.neutral;
    return sleepIcons.good;
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>How is your Sleep Quality?</Text>

      <View style={styles.sliderSection}>
        {Platform.OS === 'web' ? (
          <input
            type="range"
            min={0}
            max={10}
            step={1}
            value={value}
            onChange={(e) => setValue(parseInt(e.target.value))}
            style={{
              width: 300,
              appearance: 'none',
              height: 8,
              backgroundColor: '#ddd',
              borderRadius: 5,
              outline: 'none',
              accentColor: '#5a4fcf',
            }}
          />
        ) : (
          <Slider
            style={{ width: 300 }}
            minimumValue={0}
            maximumValue={10}
            step={1}
            value={value}
            onValueChange={setValue}
            minimumTrackTintColor="#FFA726"
            maximumTrackTintColor="#ddd"
            thumbTintColor="#5a4fcf"
          />
        )}
      </View>

      <Text style={[styles.valueLabel, { color: getColor() }]}>{value}/10</Text>

      <View style={styles.sleepIconContainer}>
        <Image source={getSleepIcon()} style={styles.sleepIcon} />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Sleep;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  sliderSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  valueLabel: {
    marginTop: 20,
    fontSize: 18,
  },
  sleepIconContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  sleepIcon: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  button: {
    marginTop: 40,
    backgroundColor: '#5a4fcf',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
