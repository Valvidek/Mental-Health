import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CompletionScreen from './CompletionScreen'; 
import { themes } from '@/constants/Colours';
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

interface StreakData {
  currentStreak: number;
  longestStreak: number;
  totalEntries: number;
  lastEntryDate: string | null;
}

// DEV MODE FLAG - Set to true to disable streak tracking
const DEV_MODE = true;

export default function LogTodayScreen() {
  const [moodIndex, setMoodIndex] = useState<number | null>(null);
  const [journalEntry, setJournalEntry] = useState('');
  const [affirmation, setAffirmation] = useState('');
  const [sleepQuality, setSleepQuality] = useState(7.5);
  const [selectedHour, setSelectedHour] = useState(7);
  const [selectedFocus, setSelectedFocus] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  
  // New state for completion screen and streak tracking
  const [showCompletionScreen, setShowCompletionScreen] = useState(false);
  const [streakData, setStreakData] = useState<StreakData>({
    currentStreak: 0,
    longestStreak: 0,
    totalEntries: 0,
    lastEntryDate: null,
  });

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

  const LOCAL_IP = '10.0.4.143'
  const baseURL = Platform.OS === 'web' ? 'http://localhost:5000' : `http://${LOCAL_IP}:5000`;

  // Load streak data when component mounts
  useEffect(() => {
    const loadStreakData = async () => {
      if (DEV_MODE) {
        console.log('DEV MODE: Streak loading disabled');
        return;
      }
      
      try {
        const storedData = await AsyncStorage.getItem('streakData');
        if (storedData) {
          setStreakData(JSON.parse(storedData));
        }
      } catch (error) {
        console.error('Error loading streak data:', error);
      }
    };
    
    loadStreakData();
  }, []);

  const getSleepQualityLabel = (value: number): string => {
    if (value <= 2) return 'Very Poor';
    if (value <= 4) return 'Poor';
    if (value <= 6) return 'Average';
    if (value <= 8) return 'Good';
    return 'Very Good';
  };

  const validateInputs = (): boolean => {
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

  const updateStreakData = async (): Promise<boolean> => {
    if (DEV_MODE) {
      console.log('DEV MODE: Streak tracking disabled - allowing multiple entries per day');
      // In dev mode, just increment totalEntries for testing
      setStreakData(prev => ({
        ...prev,
        totalEntries: prev.totalEntries + 1,
        // Optional: You can set mock values for testing the UI
        currentStreak: Math.floor(Math.random() * 30) + 1, // Random streak 1-30
        longestStreak: Math.floor(Math.random() * 50) + 10, // Random longest 10-60
      }));
      return true;
    }

    try {
      const today = new Date().toDateString();
      const storedData = await AsyncStorage.getItem('streakData');
      let currentStreakData: StreakData = {
        currentStreak: 0,
        longestStreak: 0,
        totalEntries: 0,
        lastEntryDate: null,
      };

      if (storedData) {
        currentStreakData = JSON.parse(storedData);
      }

      // Check if user already logged today
      if (currentStreakData.lastEntryDate === today) {
        Alert.alert('Info', 'You\'ve already logged today!');
        return false;
      }

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayString = yesterday.toDateString();

      // Calculate new streak
      let newStreak = 1;
      if (currentStreakData.lastEntryDate === yesterdayString) {
        // Continuing streak
        newStreak = currentStreakData.currentStreak + 1;
      } else if (currentStreakData.lastEntryDate !== null) {
        // Streak broken, starting fresh
        newStreak = 1;
      }

      // Update data
      const updatedData: StreakData = {
        currentStreak: newStreak,
        longestStreak: Math.max(newStreak, currentStreakData.longestStreak),
        totalEntries: currentStreakData.totalEntries + 1,
        lastEntryDate: today,
      };

      // Save to AsyncStorage
      await AsyncStorage.setItem('streakData', JSON.stringify(updatedData));
      setStreakData(updatedData);
      
      return true;
    } catch (error) {
      console.error('Error updating streak data:', error);
      return true; // Continue anyway if there's an error
    }
  };

  const saveRecordToServer = async (): Promise<void> => {
    if (!validateInputs()) return;

    setIsSaving(true);

    try {
      // First update streak data
      const shouldContinue = await updateStreakData();
      if (!shouldContinue) {
        setIsSaving(false);
        return;
      }

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

      const response = await fetch(`${baseURL}/api/moods`, {  // <<=== энд /api нэмэв
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert('Алдаа', data.error || 'Алдаа гарлаа');
      } else {
<<<<<<< HEAD
        // Show completion screen instead of alert
        setShowCompletionScreen(true);
        
        // Reset form after success
        setMoodIndex(null);
        setJournalEntry('');
        setAffirmation('');
        setSleepQuality(7.5);
        setSelectedHour(7);
        setSelectedFocus(null);
=======
        Alert.alert('Амжилт', 'Амжилттай хадгалагдлаа!');
        // Хэрэв хүсвэл энд утгуудыг дахин эхлүүлэх боломжтой:
        // setMoodIndex(null);
        // setJournalEntry('');
        // setAffirmation('');
        // setSelectedFocus(null);
        // setSleepQuality(7.5);
        // setSelectedHour(7);
>>>>>>> c691a218c064ca1304b5a6e3292275c33ad1e2ad
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
          {DEV_MODE && (
            <Text style={styles.devModeText}>🔧 DEV MODE: Streak tracking disabled</Text>
          )}
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
            {isSaving ? 'Хадгалж байна...' : 'Save'}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Completion Screen */}
      <CompletionScreen
        visible={showCompletionScreen}
        onClose={() => setShowCompletionScreen(false)}
        currentStreak={streakData.currentStreak}
        totalEntries={streakData.totalEntries}
        longestStreak={streakData.longestStreak}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: themes.light.background },
  scrollView: { flex: 1, padding: 20 },
  header: { marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: themes.light.textPrimary },
  devModeText: { 
    fontSize: 10, 
    color: '#FF6B6B', 
    marginTop: 5,
    fontWeight: '600',
  },
  moodContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  moodButton: {
<<<<<<< HEAD
    width: 50,
    height: 50,
    borderRadius: 10,
=======
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#eee',
>>>>>>> c691a218c064ca1304b5a6e3292275c33ad1e2ad
    justifyContent: 'center',
    alignItems: 'center',
  },
<<<<<<< HEAD
  selectedMood: { backgroundColor: themes.light.button1 },
  moodImage: { width: 40, height: 40 },
  section: {
=======
  selectedMood: { backgroundColor: '#8BC34A' },
  moodImage: { width: 24, height: 24 },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 8, color: '#555' },
  input: {
    borderWidth: 1,
    borderColor: '#bbb',
    borderRadius: 8,
    padding: 10,
>>>>>>> c691a218c064ca1304b5a6e3292275c33ad1e2ad
    backgroundColor: '#fff',
  },
<<<<<<< HEAD
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 10, color: themes.light.textPrimary },
  input: { borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 8, padding: 10 },
=======
>>>>>>> c691a218c064ca1304b5a6e3292275c33ad1e2ad
  focusGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  focusItem: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#eee',
    width: 80,
  },
  selectedFocusItem: {
    backgroundColor: themes.light.button1,
  },
<<<<<<< HEAD
  focusLabel: { marginTop: 8, fontWeight: '600', color: themes.light.textPrimary },
  sliderLabel: { textAlign: 'center', marginTop: 8, fontWeight: '600', color: themes.light.textSecondary }, 
=======
  focusLabel: { marginTop: 8, fontSize: 12, color: '#333' },
  sliderLabel: { textAlign: 'center', marginTop: 4, fontWeight: '600', color: '#555' },
>>>>>>> c691a218c064ca1304b5a6e3292275c33ad1e2ad
  hoursContainer: { paddingVertical: 10 },
  hourBox: {
    width: 50,
    height: 50,
    backgroundColor: '#eee',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
<<<<<<< HEAD
  selectedHourBox: {
    backgroundColor: themes.light.button1,  
  },
  hoursText: { fontSize: 18, fontWeight: '500', color: themes.light.textPrimary },
  hoursBig: { fontSize: 24, color: '#fff' },
  saveButton: {
    backgroundColor: themes.light.button1,
    paddingVertical: 15,
    borderRadius: 15,
=======
  selectedHourBox: { backgroundColor: '#8BC34A' },
  hoursText: { fontSize: 18, fontWeight: '600', color: '#555' },
  hoursBig: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
  saveButton: {
    backgroundColor: '#8BC34A',
    padding: 15,
    borderRadius: 10,
>>>>>>> c691a218c064ca1304b5a6e3292275c33ad1e2ad
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});