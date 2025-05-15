import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Slider from '@react-native-community/slider';

export default function App() {
  const [moodIndex, setMoodIndex] = useState<number | null>(null);
  const [journalEntry, setJournalEntry] = useState('');
  const [affirmation, setAffirmation] = useState('');
  const [sleepQuality, setSleepQuality] = useState(7.5);
  const [selectedHour, setSelectedHour] = useState(7);
  const [selectedFocus, setSelectedFocus] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const moods = [
    { id: '1', mood: 'Happy', image: require('../../assets/icons/happy1.png') },
    { id: '2', mood: 'Meh', image: require('../../assets/icons/meh1.png') },
    { id: '3', mood: 'Mad', image: require('../../assets/icons/mad1.png') },
    { id: '4', mood: 'Sad', image: require('../../assets/icons/sad1.png') },
    { id: '5', mood: 'Anxious', image: require('../../assets/icons/anxious1.png') },
    { id: '6', mood: 'Depressed', image: require('../../assets/icons/depressed1.png') },
  ];

  const mainFocusItems = [
    { label: 'Wellness', Image: require('../../assets/icons/lotus1.png') },
    { label: 'Work', Image: require('../../assets/icons/suitcase1.png') },
    { label: 'Achievement', Image: require('../../assets/icons/mission-statement 1 (1).png') },
    { label: 'Community', Image: require('../../assets/icons/high-five1.png') },
  ];

  const LOCAL_IP = '192.168.88.92';
  const baseURL = Platform.OS === 'web' ? 'http://localhost:5000' : `http://${LOCAL_IP}:5000`;

  const getSleepQualityLabel = (value: number) => {
    if (value <= 2) return 'Very Poor';
    if (value <= 4) return 'Poor';
    if (value <= 6) return 'Average';
    if (value <= 8) return 'Good';
    return 'Very Good';
  };

  const validateInputs = () => {
    if (moodIndex === null) {
      Alert.alert('Алдаа', 'Mood-оо сонгоно уу.');
      return false;
    }
    if (!journalEntry.trim()) {
      Alert.alert('Алдаа', 'Өдрийн тэмдэглэлээ оруулна уу.');
      return false;
    }
    if (!affirmation.trim()) {
      Alert.alert('Алдаа', 'Өдрийн зоригжуулах үгээ оруулна уу.');
      return false;
    }
    if (selectedFocus === null) {
      Alert.alert('Алдаа', 'Гол анхаарах зүйлээ сонгоно уу.');
      return false;
    }
    if (sleepQuality === 0) {
      Alert.alert('Алдаа', 'Нойрны чанар 0 байж болохгүй.');
      return false;
    }
    if (selectedHour === 0) {
      Alert.alert('Алдаа', 'Нойрны цаг 0 байж болохгүй.');
      return false;
    }
    return true;
  };

  const saveRecordToServer = async () => {
    if (!validateInputs()) return;

    setIsSaving(true);

    try {
      const payload = {
        mood: moods[moodIndex!].mood,
        journalEntry: journalEntry.trim(),
        affirmation: affirmation.trim(),
        sleepQuality,
        selectedHour,
        selectedFocus,
      };

      console.log('Sending data:', payload);
      console.log('Base URL:', baseURL);

      const response = await fetch(`${baseURL}/moods`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert('Алдаа', data.error || 'Алдаа гарлаа');
      } else {
        Alert.alert('Амжилт', 'Амжилттай хадгалагдлаа!');
        // Reset form after success
        // setMoodIndex(null);
        // setJournalEntry('');
        // setAffirmation('');
        // setSleepQuality(7.5);
        // setSelectedHour(7);
        // setSelectedFocus(null);
      }
    } catch (error) {
      console.error('Error saving record:', error);
      Alert.alert('Алдаа', 'Сервертэй холбогдох үед алдаа гарлаа.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.title}>Record Your Day!</Text>
        </View>

        <View style={styles.moodContainer}>
          {moods.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => setMoodIndex(index)}
              style={[styles.moodButton, moodIndex === index && styles.selectedMood]}
              accessibilityLabel={`Mood ${item.mood}`}
              accessibilityState={{ selected: moodIndex === index }}
            >
              <Image
                source={item.image}
                style={styles.moodImage}
                tintColor={moodIndex === index ? '#fff' : undefined}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Journal Your Day</Text>
          <TextInput
            style={[styles.input, { minHeight: 80 }]}
            multiline
            placeholder="Write about your day..."
            value={journalEntry}
            onChangeText={setJournalEntry}
            textAlignVertical="top"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Daily Affirmation</Text>
          <TextInput
            style={styles.input}
            placeholder="Today I feel grateful..."
            value={affirmation}
            onChangeText={setAffirmation}
          />
        </View>

        <View style={styles.focusGrid}>
          {mainFocusItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.focusItem,
                selectedFocus === index && styles.selectedFocusItem,
              ]}
              onPress={() => setSelectedFocus(index)}
              accessibilityLabel={`Focus ${item.label}`}
              accessibilityState={{ selected: selectedFocus === index }}
            >
              <Image
                source={item.Image}
                style={{ width: 40, height: 40 }}
                resizeMode="contain"
              />
              <Text style={styles.focusLabel}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sleep Quality</Text>
          <Slider
            value={sleepQuality}
            onValueChange={setSleepQuality}
            minimumValue={0}
            maximumValue={10}
            minimumTrackTintColor="#8BC34A"
            maximumTrackTintColor="#E0E0E0"
            thumbTintColor="#8BC34A"
            step={0.5}
          />
          <Text style={styles.sliderLabel}>{getSleepQualityLabel(sleepQuality)}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hours</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.hoursContainer}
          >
            {[...Array(13).keys()].map((hour) => (
              <TouchableOpacity
                key={hour}
                style={[styles.hourBox, selectedHour === hour && styles.selectedHourBox]}
                onPress={() => setSelectedHour(hour)}
                accessibilityLabel={`Hours ${hour}`}
                accessibilityState={{ selected: selectedHour === hour }}
              >
                <Text style={[styles.hoursText, selectedHour === hour && styles.hoursBig]}>
                  {hour}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <TouchableOpacity
          style={[styles.saveButton, isSaving && { opacity: 0.6 }]}
          onPress={saveRecordToServer}
          disabled={isSaving}
          accessibilityRole="button"
          accessibilityState={{ disabled: isSaving }}
        >
          <Text style={styles.saveButtonText}>
            {isSaving ? 'Хадгалж байна...' : 'Өгөгдөл хадгалах'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  scrollView: { flex: 1, padding: 20 },
  header: { marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  moodContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  moodButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  selectedMood: { backgroundColor: '#8BC34A' },
  moodImage: { width: 24, height: 24 },
  section: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 10, color: '#333' },
  input: { borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 8, padding: 10 },
  focusGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  focusItem: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  selectedFocusItem: {
    backgroundColor: '#8BC34A',
  },
  focusLabel: { marginTop: 8, fontWeight: '600', color: '#333' },
  sliderLabel: { textAlign: 'center', marginTop: 8, fontWeight: '600', color: '#333' },
  hoursContainer: { paddingVertical: 10 },
  hourBox: {
    marginRight: 10,
    width: 45,
    height: 45,
    borderRadius: 15,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  selectedHourBox: {
    backgroundColor: '#8BC34A',
  },
  hoursText: { fontSize: 18, fontWeight: '500', color: '#555' },
  hoursBig: { fontSize: 24, color: '#fff' },
  saveButton: {
    backgroundColor: '#8BC34A',
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 40,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 18,
  },
});
