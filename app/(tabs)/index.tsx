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

  const LOCAL_IP = '192.168.88.92';
  const PORT = 5000;

  const saveMoodToDB = async (mood: string) => {
    try {
      const response = await fetch(`http://${LOCAL_IP}:${PORT}/moods`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mood }),
      });

      const data = await response.json();
      console.log('Mood saved:', data);
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

          <Box style={{ width: '100%', height: 90 }}>
            <TouchableOpacity onPress={handleAddMood}>
              <Image style={styles.icons} source={require('@/assets/icons/happy1.png')} />
            </TouchableOpacity>
            <View style={styles.dateContainer}>
              <Text style={{ color: themes.light.box }}>15 Tue</Text>
            </View>
            <View style={styles.line} />
            <TextInput
              placeholder="How do you feel today?"
              style={styles.TodayInput}
              placeholderTextColor={themes.light.textSecondary}
            />
            <Image style={styles.focusIcon} source={require('@/assets/icons/lotus1.png')} />
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
  container: {
    backgroundColor: themes.light.background,
    flex: 1,
  },
  dateContainer: {
    top: 45,
    width: 55,
    height: 20,
    alignItems: 'center',
    borderRadius: 10,
    position: 'relative',
    backgroundColor: themes.light.textPrimary,
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    marginTop: 10,
  },
  focusIcon: {
    height: 40,
    width: 40,
    position: 'absolute',
    top: 25,
    left: 310,
  },
  greatfulInput: {
    height: 50,
    width: '100%',
    borderRadius: 10,
    paddingHorizontal: Layout.spacing.md,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.lg,
    paddingVertical: Layout.spacing.md,
  },
  iconButtons: {},
  icons: {
    position: 'absolute',
    width: 50,
    height: 50,
    top: -10,

  },
  line: {
    width: 4,
    height: 70,
    backgroundColor: '#D4D3DF',
    borderRadius: 10,
    position: 'relative',
    left: 70,
    top: -25,
  },
  magicBall: {
    width: 50,
    height: 50,
    position: 'absolute',
    top: 70,
    left: 310,
  },
  meditation: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
  },
  moodList: {
    paddingVertical: Layout.spacing.md,
  },
  moodTrackerSection: {
    width: 370,
    height: 150,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
  },
  plusIcon: {
    left: 120,
    top: 60,
    position: 'absolute',
    borderRadius: 10,
    padding: 5,
    marginLeft: 20,
  },
  section: {
    paddingHorizontal: Layout.spacing.lg,
    marginBottom: Layout.spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.md,
  },
  sectionTitle: {},
  tips: {
    height: 150,
    width: '100%',
  },
  title: {
    color: themes.light.textPrimary,
    fontSize: 16,
    marginTop: 10,
  },
  TodayInput: {
    position: 'absolute',
    fontSize: 13,
    zIndex: 1,
    left: 100,
  },
  toDoList: {
    marginTop: 20,
    height: 200,
    width: '100%',
  },
  Todo: {
    fontWeight: 'bold',
    color: themes.light.textPrimary,
  },
  todaysMood: {
    height: 80,
    width: '100%',
    backgroundColor: themes.light.box,
    borderRadius: 10,
    shadowColor: themes.light.textPrimary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  trackButton: {
    marginTop: Layout.spacing.md,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    marginRight: Layout.spacing.xs,
  },
  wisdomBox: {
    height: 125,
    width: 370,
    backgroundColor: themes.light.textSecondary,
  },
  wisdomDate: {
    color: themes.light.accent,
    fontWeight: 'bold',
    fontSize: 15,
  },
  wisdomText: {
    width: 250,
    color: themes.light.box,
    fontWeight: 'bold',
    fontSize: 15,
    marginTop: 10,
  },
});
