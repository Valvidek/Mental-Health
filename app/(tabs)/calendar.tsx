import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { format } from 'date-fns';
import axios from 'axios';

type MoodEntry = {
  _id: string;
  mood: string;
  date: string;
};

const moodEmojis: Record<string, string> = {
  happy: '😊',
  sad: '😔',
  angry: '😠',
  tired: '😴',
  relaxed: '😌',
  excited: '😄',
  anxious: '😟',
};

const MonthlyLogScreen = () => {
  const [moods, setMoods] = useState<MoodEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const today = new Date();

  useEffect(() => {
    const fetchMoods = async () => {
      try {
        const response = await axios.get('http://192.168.88.207:5000/moods');
        setMoods(response.data);
      } catch (error) {
        console.error('Moods fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMoods();
  }, []);

  const getMoodForDay = (day: number) => {
    const currentDateStr = format(new Date(today.getFullYear(), today.getMonth(), day), 'yyyy-MM-dd');
    const entry = moods.find((m) => format(new Date(m.date), 'yyyy-MM-dd') === currentDateStr);
    return entry ? moodEmojis[entry.mood] || '❓' : null;
  };

  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{format(today, 'MMMM yyyy')}</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#6c5ce7" />
      ) : (
        <View style={styles.calendarContainer}>
          {[...Array(daysInMonth)].map((_, i) => {
            const day = i + 1;
            const mood = getMoodForDay(day);
            return (
              <View key={day} style={styles.dayCircle}>
                <Text style={styles.dayText}>{day}</Text>
                {mood && <Text style={styles.moodEmoji}>{mood}</Text>}
              </View>
            );
          })}
        </View>
      )}

      <View style={styles.quoteBox}>
        <Text style={styles.quoteLabel}>Quote of The Day</Text>
        <Text style={styles.quoteText}>
          "Believe you can and you're halfway there."{'\n'}– Theodore Roosevelt
        </Text>
      </View>
    </ScrollView>
  );
};

export default MonthlyLogScreen;

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 40,
    backgroundColor: '#f7f7fa',
    flexGrow: 1,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  calendarContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  dayCircle: {
    width: screenWidth / 8,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    marginVertical: 6,
    borderRadius: 50,
    elevation: 2,
  },
  dayText: {
    fontSize: 10,
    color: '#999',
  },
  moodEmoji: {
    fontSize: 20,
    marginTop: 2,
  },
  quoteBox: {
    backgroundColor: '#fff',
    marginTop: 32,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quoteLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  quoteText: {
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#555',
    marginTop: 8,
    lineHeight: 20,
  },
});
