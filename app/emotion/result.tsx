import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { PieChart, LineChart } from 'react-native-chart-kit';
import { useRouter, useLocalSearchParams } from 'expo-router';

const screenWidth = Dimensions.get('window').width;

const ResultsScreen = () => {
  // ✅ Type assertion to safely handle string params
  const {
    q0 = '0',
    q1 = '0',
    q2 = '0',
    q3 = '0',
    q4 = '0',
    q5 = '0',
    sleep = '0',
  } = useLocalSearchParams() as Record<string, string>;

  const router = useRouter();

 const sleepValue = parseFloat(sleep);

const dailySleepHours = Array(7).fill(sleepValue);

  const sleepData = {
    dailyHours: dailySleepHours,
    averageHours: sleepValue,
    quality: sleepValue <= 3 ? 'Bad' : sleepValue <= 7 ? 'Okay' : 'Good',
    suggestion:
      sleepValue <= 3
        ? 'Oh no! Sleeping is important.'
        : sleepValue <= 7
        ? 'Try improving your sleep habits.'
        : 'Great sleep! Keep it up!',
  };

  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    color: (opacity = 1) => `rgba(90, 79, 207, ${opacity})`,
    labelColor: () => '#444',
    propsForBackgroundLines: {
      strokeDasharray: '', // solid lines
    },
  };

  const emotionScores = [
    { label: 'Angry', value: parseInt(q0), color: '#F49B54' },
    { label: 'Sad', value: parseInt(q1), color: '#80D6FB' },
    { label: 'Anxious', value: parseInt(q2), color: '#DCA1FF' },
    { label: 'Meh', value: parseInt(q3), color: '#FDBF50' },
    { label: 'Lonely', value: parseInt(q4), color: '#A4D37C' },
    { label: 'Stressed', value: parseInt(q5), color: '#60E8B1' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.heading}>Results</Text>

      {/* Pie Chart & Mood Analysis */}
      <View style={[styles.card, styles.rowBetween]}>
        <PieChart
          data={emotionScores.map((e) => ({
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

      <View style={[styles.card, styles.rowBetween]}>
        <View style={styles.analysisBox}>
          <Text style={styles.analysisTitle}>Analysis</Text>
          <Text style={styles.analysisText}>You are king of Boredom</Text>
          <Text style={[styles.analysisText, { fontWeight: 'bold' }]}>Anxiety</Text>
          <Text style={styles.analysisText}>
            Keep an eye on yourself. Don’t forget to rest!
          </Text>
        </View>
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
      <TouchableOpacity style={styles.button} onPress={() => router.push('/(tabs)')}>
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

  analysisBox: {
    flex: 1,
    paddingLeft: 12,
  },
  analysisTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 6,
  },
  analysisText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
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
