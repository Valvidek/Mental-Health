import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const focusOptions = [
  {
    title: 'Work',
    subtitle: 'productive, growth',
    icon: require('../../assets/icons/suitcase1.png'),
    bgColor: '#E3F4F9',
  },
  {
    title: 'Health',
    subtitle: 'physical, mental',
    icon: require('../../assets/icons/crystal-ball1.png'),
    bgColor: '#E6F8E7',
  },
  {
    title: 'Personal',
    subtitle: 'hobbies, skills',
    icon: require('../../assets/icons/lotus1.png'),
    bgColor: '#FFF7E1',
  },
  {
    title: 'Social',
    subtitle: 'family, friends',
    icon: require('../../assets/icons/high-five1.png'),
    bgColor: '#F0E7FD',
  },
];

const FocusScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="#6C63FF" />
        <View style={styles.progressBar} />
        <Text style={styles.skipText}>Skip</Text>
      </View>

      {/* Question */}
      <Text style={styles.questionText}>What’s your Main Focus for today?</Text>

      {/* Focus Options */}
      <View style={styles.grid}>
        {focusOptions.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.card, { backgroundColor: item.bgColor }]}
          >
            <Image source={item.icon} style={styles.icon} resizeMode="contain" />
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Button */}
      <TouchableOpacity style={styles.button} onPress={() => router.push('/(tabs)')}>
        <Text style={styles.buttonText}>Go to Dashboard</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EDEAFD',
    padding: 16,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#BDB5F4',
    marginHorizontal: 12,
    borderRadius: 2,
  },
  skipText: {
    color: '#6C63FF',
    fontWeight: '600',
  },
  questionText: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 24,
    color: '#333',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 16,
  },
  card: {
    width: '48%',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  button: {
    backgroundColor: '#4D4C7D',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default FocusScreen;
