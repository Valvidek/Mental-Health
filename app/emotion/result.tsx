import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { useRouter, useLocalSearchParams } from 'expo-router';

const screenWidth = Dimensions.get('window').width;

const ResultsScreen = () => {
  const { sleep = '0' } = useLocalSearchParams() as Record<string, string>;
  const router = useRouter();
  const sleepValue = parseFloat(sleep);

  const [scores, setScores] = useState([
    { label: 'Angry', value: 0, color: '#F49B54' },
    { label: 'Sad', value: 0, color: '#80D6FB' },
    { label: 'Anxious', value: 0, color: '#DCA1FF' },
    { label: 'Meh', value: 0, color: '#FDBF50' },
    { label: 'Lonely', value: 0, color: '#A4D37C' },
    { label: 'Stressed', value: 0, color: '#60E8B1' },
  ]);

  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    color: (opacity = 1) => `rgba(90, 79, 207, ${opacity})`,
    labelColor: () => '#444',
    propsForBackgroundLines: {
      strokeDasharray: '',
    },
  };

  const sleepData = {
    dailyHours: Array(7).fill(sleepValue),
    averageHours: sleepValue,
    quality: sleepValue <= 3 ? 'Bad' : sleepValue <= 7 ? 'Okay' : 'Good',
    suggestion:
      sleepValue <= 3
        ? 'Oh no! Sleeping is important.'
        : sleepValue <= 7
        ? 'Try improving your sleep habits.'
        : 'Great sleep! Keep it up!',
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.heading}>Results</Text>

      {/* Ask about feeling */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>How do you feel today?</Text>
        {scores.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.optionButton}
            onPress={() => {
              const newScores = [...scores];
              newScores[index].value += 1;
              setScores(newScores);
            }}
          >
            <Text style={{ color: item.color, fontWeight: '600' }}>
              {item.label} ({item.value})
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Pie Chart */}
      <View style={[styles.card, styles.rowBetween]}>
        <PieChart
          data={scores.map((e) => ({
            name: e.label,
            population: e.value,
            color: e.color,
            legendFontColor: '#333',
            legendFontSize: 12,
          }))}
          width={screenWidth * 0.85}
          height={150}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="0"
          center={[0, 0]}
          absolute
        />
      </View>

      {/* Sleep Quality */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Sleep Quality</Text>
        <View style={styles.sleepRow}>
          <View style={styles.sleepInfo}>
            <Text style={styles.sleepStat}>{sleepData.averageHours} Hours</Text>
            <Text style={styles.sleepLabel}>Quality</Text>
            <Text style={styles.sleepQuality}>{sleepData.quality}</Text>
            <Text style={styles.sleepSuggestion}>{sleepData.suggestion}</Text>
          </View>
        </View>
      </View>

      {/* CTA */}
      <Text style={styles.footerText}>We Can Work Together for the better you!</Text>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/(tabs)/profile')}>
        <Text style={styles.buttonText}>Go to Dashboard</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f9',
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 24,
    alignSelf: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
    marginBottom: 12,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionButton: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    marginBottom: 8,
  },
  sleepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  sleepInfo: {
    flex: 1,
    paddingLeft: 12,
  },
  sleepStat: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5a4fcf',
    marginBottom: 6,
  },
  sleepLabel: {
    fontSize: 14,
    color: '#888',
  },
  sleepQuality: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#cf5a5a',
    marginVertical: 4,
  },
  sleepSuggestion: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },
  footerText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#666',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#5a4fcf',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 14,
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default ResultsScreen;
