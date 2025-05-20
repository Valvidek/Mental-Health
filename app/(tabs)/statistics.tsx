import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Platform,
  Image,
} from 'react-native';
import axios from 'axios';
import { LineChart, Grid, YAxis, XAxis } from 'react-native-svg-charts';
import { format } from 'date-fns';

type MoodEntry = {
  id?: string;
  mood: string;
  selectedHour: number;
  date: string;
  image?: any;
};

type MoodCount = {
  [mood: string]: number;
};

const Stats = () => {
  const [data, setData] = useState<MoodEntry[]>([]);
  const [moodCount, setMoodCount] = useState<MoodCount>({});
  const [sleepData, setSleepData] = useState<number[]>([]);
  const [dates, setDates] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMoodData = async () => {
    setLoading(true);
    setError(null);
    try {
      const LOCAL_IP = '192.168.88.92';
      const baseURL = Platform.OS === 'web' ? 'http://localhost:5000' : `http://${LOCAL_IP}:5000`;

      console.log('Fetching from:', `${baseURL}/api/moods`);

      const response = await axios.get<MoodEntry[]>(`${baseURL}/api/moods`);
      const entries = response.data;

      const currentMonth = new Date().getMonth();

      const thisMonthData = entries.filter(entry => {
        const entryDate = new Date(entry.date);
        return entryDate.getMonth() === currentMonth;
      });

      const count: MoodCount = thisMonthData.reduce((acc, entry) => {
        acc[entry.mood] = (acc[entry.mood] || 0) + 1;
        return acc;
      }, {} as MoodCount);

      const sorted = [...thisMonthData].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );

      const sleepHours = sorted.map(entry => entry.selectedHour);
      const dayLabels = sorted.map(entry => format(new Date(entry.date), 'dd'));

      setMoodCount(count);
      setSleepData(sleepHours);
      setDates(dayLabels);
      setData(sorted);
    } catch (err: any) {
      console.log('Fetch error:', err?.message || err);

      // Туршилтын өгөгдөл
      const testData: MoodEntry[] = [
        {
          id: '1',
          mood: 'Happy',
          selectedHour: 8,
          date: new Date().toISOString(),
          image: require('../../assets/icons/happy1.png'),
        },
        {
          id: '2',
          mood: 'Meh',
          selectedHour: 6,
          date: new Date().toISOString(),
          image: require('../../assets/icons/meh1.png'),
        },
        {
          id: '3',
          mood: 'Mad',
          selectedHour: 5,
          date: new Date().toISOString(),
          image: require('../../assets/icons/mad1.png'),
        },
      ];

      const count: MoodCount = testData.reduce((acc, entry) => {
        acc[entry.mood] = (acc[entry.mood] || 0) + 1;
        return acc;
      }, {} as MoodCount);

      const sleepHours = testData.map(entry => entry.selectedHour);
      const dayLabels = testData.map(entry => format(new Date(entry.date), 'dd'));

      setMoodCount(count);
      setSleepData(sleepHours);
      setDates(dayLabels);
      setData(testData);
      setError('Мэдээлэл татаж чадсангүй. Туршилтын өгөгдөл ашиглагдаж байна.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMoodData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={styles.loading} />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Энэ сарын сэтгэл хөдлөлийн статистик</Text>

      {error && <Text style={styles.error}>{error}</Text>}

      {Object.keys(moodCount).length === 0 ? (
        <Text style={styles.noData}>Энэ сард мэдээлэл алга байна.</Text>
      ) : (
        Object.entries(moodCount).map(([mood, count]) => {
          const moodImage = data.find(entry => entry.mood === mood)?.image;
          return (
            <View key={mood} style={styles.moodRow}>
              {moodImage && <Image source={moodImage} style={styles.moodIcon} />}
              <Text style={styles.moodCount}>{mood}: {count}</Text>
            </View>
          );
        })
      )}

      <Text style={[styles.header, { marginTop: 30 }]}>Нойрны цагийн график</Text>

      {sleepData.length > 0 ? (
        <View style={styles.chartContainer}>
          <YAxis
            data={sleepData}
            contentInset={{ top: 20, bottom: 20 }}
            svg={{ fontSize: 10, fill: 'grey' }}
            numberOfTicks={5}
          />
          <View style={{ flex: 1, marginLeft: 10 }}>
            <LineChart
              style={{ flex: 1 }}
              data={sleepData}
              svg={{ stroke: 'rgb(134, 65, 244)' }}
              contentInset={{ top: 20, bottom: 20 }}
              animate={true}
              animationDuration={500}
            >
              <Grid />
            </LineChart>
            <XAxis
              style={{ marginHorizontal: -10, height: 30 }}
              data={sleepData}
              formatLabel={(value, index) => dates[index]}
              contentInset={{ left: 10, right: 10 }}
              svg={{ fontSize: 10, fill: 'black', rotation: 45, originY: 10, y: 5 }}
            />
          </View>
        </View>
      ) : (
        <Text style={styles.noData}>График харуулах мэдээлэл алга байна.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  loading: {
    marginTop: 40,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  noData: {
    fontSize: 16,
    fontStyle: 'italic',
    color: 'grey',
  },
  moodRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  moodIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  moodCount: {
    fontSize: 16,
  },
  chartContainer: {
    height: 200,
    flexDirection: 'row',
  },
});

export default Stats;
