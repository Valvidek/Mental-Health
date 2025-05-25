import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';

interface DateCardProps {
  month: string;
  day: string;
  week: string;
  selected: boolean;
  onPress: () => void;
}

export default function DateCard({ month, day, week, selected, onPress }: DateCardProps) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.card, selected && styles.selectedCard]}>
      <Text style={[styles.month, selected && styles.selectedText]}>{month}</Text>
      <Text style={[styles.day, selected && styles.selectedText]}>{day}</Text>
      <Text style={[styles.week, selected && styles.selectedText]}>{week}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 60,
    margin: 6,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#eee',
  },
  selectedCard: {
    backgroundColor: '#000',
  },
  month: {
    fontSize: 12,
    color: '#555',
  },
  day: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  week: {
    fontSize: 12,
    color: '#555',
  },
  selectedText: {
    color: '#fff',
  },
});
