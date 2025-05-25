import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextTitle } from '@/app/components/StyledText';
import { themes } from '@/constants/Colours';
import HistoryList from '@/app/components/HistoryList';

const mockHistoryData = [
  {
    id: '1',
    mood: 'Happy',
    date: new Date('2024-03-15'),
    journalEntry: 'Had a great day at work, accomplished all my tasks!',
    sleepQuality: 8,
  },
  {
    id: '2',
    mood: 'Anxious',
    date: new Date('2024-03-14'),
    journalEntry: 'Feeling a bit overwhelmed with upcoming deadlines.',
    sleepQuality: 6,
  },
  // Add more mock data as needed
];

export default function HistoryScreen() {
  const [historyItems, setHistoryItems] = useState(mockHistoryData);

  // In a real app, you would fetch the history data from your backend
  useEffect(() => {
    // Fetch history data here
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TextTitle style={styles.title}>Your History</TextTitle>
      </View>
      <HistoryList items={historyItems} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.light.background,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: themes.light.accent,
  },
  title: {
    fontSize: 24,
  },
});