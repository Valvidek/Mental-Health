import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { TextTitle, TextCaption } from './StyledText';
import { themes } from '@/constants/Colours';
import Box from './Box';
import { format } from 'date-fns';

interface HistoryItem {
  id: string;
  mood: string;
  date: Date;
  journalEntry: string;
  sleepQuality: number;
}

interface HistoryListProps {
  items: HistoryItem[];
}

export default function HistoryList({ items }: HistoryListProps) {
  const renderItem = ({ item }: { item: HistoryItem }) => (
    <Box style={styles.historyItem}>
      <View style={styles.header}>
        <TextTitle style={styles.date}>
          {format(new Date(item.date), 'MMM d, yyyy')}
        </TextTitle>
        <View style={[styles.moodIndicator, { backgroundColor: getMoodColor(item.mood) }]}>
          <TextCaption style={styles.moodText}>{item.mood}</TextCaption>
        </View>
      </View>
      
      <TextCaption style={styles.entry}>{item.journalEntry}</TextCaption>
      
      <View style={styles.footer}>
        <TextCaption style={styles.sleepQuality}>
          Sleep Quality: {item.sleepQuality}/10
        </TextCaption>
      </View>
    </Box>
  );

  const getMoodColor = (mood: string) => {
    switch (mood.toLowerCase()) {
      case 'happy': return themes.light.green;
      case 'sad': return themes.light.cyan;
      case 'angry': return themes.light.orange;
      case 'anxious': return themes.light.indigo;
      default: return themes.light.accent;
    }
  };

  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },
  historyItem: {
    marginBottom: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  date: {
    fontSize: 16,
  },
  moodIndicator: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  moodText: {
    color: 'white',
  },
  entry: {
    marginBottom: 8,
    color: themes.light.textSecondary,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  sleepQuality: {
    color: themes.light.textTertiary,
  },
});