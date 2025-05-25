import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  Image,
  SafeAreaView,
} from 'react-native';
import { TextTitle } from '@/app/components/StyledText';
import { useRouter } from 'expo-router';
import Layout from '@/constants/Layout';
import MoodCard from '@/app/components/MoodCard';
import MeditationCard from '@/app/components/MeditationCard';
import Box from '@/app/components/Box';
import { moods } from '@/assets/data/Data';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import StreakTracker from '../components/StreakTracker';
import QuoteCard from '../components/QuoteCard';
import { useThemeContext } from '../context/ThemeContext';
import Colors from '@/constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
 import React, { useState } from 'react';

export default function HomeScreen() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const bellScale = useSharedValue(1);
  const router = useRouter();
  const { darkMode } = useThemeContext();
  const themeColors = darkMode ? Colors.darkTheme : Colors.lightTheme;
  const LOCAL_IP = '192.168.88.207';
  const PORT = 5000;

  const saveMoodToDB = async (mood: string) => {
    try {
      const response = await fetch(`http://${LOCAL_IP}:${PORT}/moods`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mood }),
      });
      await response.json();
    } catch (error) {
      console.error('Failed to save mood:', error);
    }
  };

  const handlePressBell = () => {
    bellScale.value = withSpring(1.2, { damping: 4 }, () => {
      bellScale.value = withSpring(1);
    });
  };

  const handleAddMood = () => {
    setSelectedMood('Happy');
    saveMoodToDB('Happy');
    router.push('/emotion/wheelie');
  };

  const handleAddToday = () => {
    handlePressBell();
    router.push('/today/today');
  };

  const bellAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: bellScale.value }],
  }));

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background.primary }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StreakTracker />

        {/* Today Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <TextTitle style={[styles.title, { color: themeColors.text.primary }]}>
              Today
            </TextTitle>
            <View style={styles.iconRow}>
              <TouchableOpacity onPress={handleAddToday} style={styles.iconButton}>
                <MaterialIcons name="edit-square" size={18} color={themeColors.text.secondary} />
              </TouchableOpacity>
              <TouchableOpacity onPress={handlePressBell} style={styles.iconButton}>
                <FontAwesome6 name="trash" size={17} color={themeColors.text.secondary} />
              </TouchableOpacity>
            </View>
          </View>

<Box
  style={{
    height: 70,
    width: '100%',
    backgroundColor: themeColors.background.secondary,
    borderRadius: 10,
    flexDirection: 'row',        // lay out children horizontally
    alignItems: 'center',        // vertically center them
    paddingHorizontal: 12,
  }}
>
  {/* Mood Icon */}
  <TouchableOpacity
    onPress={handleAddMood}
    style={{ marginRight: 12 }}
  >
    <Image
      source={require('@/assets/icons/happy1.png')}
      style={{ width: 30, height: 30 }}
    />
  </TouchableOpacity>

  {/* Date Bubble */}
  <View
    style={{
      backgroundColor: themeColors.text.primary,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 6,
      marginRight: 12,
    }}
  >
    <Text style={{ color: themeColors.background.primary, fontSize: 12 }}>
      15 Tue
    </Text>
  </View>

  {/* Divider */}
  <View
    style={{
      width: 2,
      height: 30,
      backgroundColor: themeColors.neutral[300],
      marginRight: 12,
    }}
  />

  {/* Input Field */}
  <TextInput
    placeholder="How do you feel today?"
    placeholderTextColor={themeColors.text.tertiary}
    style={{
      flex: 1,
      height: 36,
      borderRadius: 6,
      backgroundColor: themeColors.background.primary,
      paddingHorizontal: 8,
      fontSize: 14,
      color: themeColors.text.primary,
    }}
  />

  {/* Focus (Lotus) Icon */}
  <Image
    source={require('@/assets/icons/lotus1.png')}
    style={{ width: 24, height: 24, marginLeft: 12 }}
  />
</Box>

        </View>

        {/* Daily Affirmation */}
        <View style={styles.section}>
          <TextTitle style={[styles.title, { color: themeColors.text.primary }]}>
            Daily Affirmation
          </TextTitle>
          <TextInput
            placeholder="Today I feel grateful for..."
            placeholderTextColor={themeColors.text.tertiary}
            style={[
              styles.affirmationInput,
              {
                backgroundColor: themeColors.background.secondary,
                color: themeColors.text.primary,
                shadowColor: themeColors.shadow,
              },
            ]}
          />
        </View>

        {/* Meditation */}
        <View style={styles.section}>
          <TextTitle style={[styles.title, { color: themeColors.text.primary }]}>
            Meditation
          </TextTitle>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.meditationRow}>
              {['Anxiety Relief','Mindful Breathing','Meditation for mornings'].map((title, idx) => (
                <MeditationCard
                  key={idx}
                  title={title}
                  duration={['15 min','10 min','20 min'][idx]}
                  imageUrl={[
                    'https://images.pexels.com/photos/1447092/pexels-photo-1447092.png',
                    'https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg',
                    'https://cdn.britannica.com/99/223399-138-B7B4A9EA/did-you-know-meditation.jpg'
                  ][idx]}
                  youtubeURL={[
                    'https://www.youtube.com/shorts/5MFSBMcYZTw',
                    'https://www.youtube.com/shorts/9Bqm14hCntg',
                    'https://www.youtube.com/watch?v=lEKDob0LwRM'
                  ][idx]}
                />
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Quick Tips */}
        <View style={styles.section}>
          <TextTitle style={[styles.title, { color: themeColors.text.primary }]}>
            Quick Tips
          </TextTitle>
          <Box style={{ height: 150, backgroundColor: themeColors.background.secondary, borderRadius: 10, padding: 10 }}>
            <Text style={{ color: themeColors.text.primary }}>How to set boundaries...</Text>
          </Box>
        </View>

        {/* Quote */}
        <View style={styles.section}>
          <QuoteCard />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  section: { paddingHorizontal: Layout.spacing.lg, marginBottom: Layout.spacing.lg },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 18, fontWeight: '600', marginBottom: Layout.spacing.md },
  iconRow: { flexDirection: 'row', gap: 16 },
  iconButton: { padding: 6, borderRadius: 8 },
  moodIcon: { position: 'absolute', width: 50, height: 50, top: -10, left: 20, zIndex: 1 },
  dateContainer: { position: 'absolute', top: 45, left: 18, width: 55, height: 20, alignItems: 'center', justifyContent: 'center', borderRadius: 8 },
  line: { position: 'absolute', left: 43, top: 5, width: 4, height: 70, borderRadius: 10 },
  textInput: { position: 'absolute', left: 100, top: 30, fontSize: 14, width: '60%' },
  focusIcon: { position: 'absolute', height: 40, width: 40, top: 25, right: 20 },
  affirmationInput: {
    height: 50,
    width: '100%',
    borderRadius: 10,
    paddingHorizontal: Layout.spacing.md,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  meditationRow: { flexDirection: 'row', gap: 20 },
});
