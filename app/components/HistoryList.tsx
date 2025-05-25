import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { TextTitle, TextCaption } from './StyledText';
import { themes } from '@/constants/Colours';
import Box from './Box';
import { format } from 'date-fns';
import { useThemeContext } from '../context/ThemeContext';
import Colors from '@/constants/Colors';

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
  const { darkMode } = useThemeContext();
  const themeColors = darkMode ? Colors.darkTheme : Colors.lightTheme;

  const getMoodColor = (mood: string) => {
    const theme = darkMode ? themes.dark : themes.light;
    switch (mood.toLowerCase()) {
      case 'happy': return theme.green;
      case 'sad': return theme.cyan;
      case 'angry': return theme.orange;
      case 'anxious': return theme.indigo;
      default: return theme.accent;
    }
  };

  const renderItem = ({ item }: { item: HistoryItem }) => (
    <Box style={StyleSheet.flatten([
      styles.historyItem,
      { backgroundColor: themeColors.card }
    ])}>
      <View style={styles.header}>
        <TextTitle style={[styles.date, { color: themeColors.text.primary }]}>
          {format(new Date(item.date), 'MMM d, yyyy')}
        </TextTitle>
        <View style={[styles.moodIndicator, { backgroundColor: getMoodColor(item.mood) }]}>
          <TextCaption style={styles.moodText}>{item.mood}</TextCaption>
        </View>
      </View>

      <TextCaption style={[styles.entry, { color: themeColors.text.secondary }]}>
        {item.journalEntry}
      </TextCaption>

      <View style={styles.footer}>
        <TextCaption style={[styles.sleepQuality, { color: themeColors.text.tertiary }]}>
          Sleep Quality: {item.sleepQuality}/10
        </TextCaption>
      </View>
    </Box>
  );

  return (
    <FlatList
      data={items}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      contentContainerStyle={[
        styles.container,
        { backgroundColor: themeColors.background.primary }
      ]}
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
    borderRadius: 12,
    padding: 12,
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
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  sleepQuality: {},
});
