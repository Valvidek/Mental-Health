// app/screens/HomeScreen.tsx
import React, { useState, useEffect } from 'react';
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
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Layout from '@/constants/Layout';
import Box from '@/app/components/Box';
import StreakTracker from '../components/StreakTracker';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { useThemeContext } from '../context/ThemeContext';
import Colors from '@/constants/Colors';
import MeditationCard from '@/app/components/MeditationCard';
import { meditations } from '@/assets/data/MeditationData';

export default function HomeScreen() {
  const router = useRouter();
  const { darkMode } = useThemeContext();
  const theme = darkMode ? Colors.darkTheme : Colors.lightTheme;

  const [currentQuote, setCurrentQuote] = useState(wisdomQuotes[0]);
  const bellScale = useSharedValue(1);
  const crystalBallScale = useSharedValue(1);
  const crystalBallRotation = useSharedValue(0);

  useEffect(() => {
    // эхэндээ санамсаргүй quote
    const idx = Math.floor(Math.random() * wisdomQuotes.length);
    setCurrentQuote(wisdomQuotes[idx]);
  }, []);

  const handlePressBell = () => {
    bellScale.value = withSpring(1.2, { damping: 4 }, () => {
      bellScale.value = withSpring(1);
    });
  };

  const handleCrystalBallPress = () => {
    crystalBallScale.value = withSequence(
      withSpring(1.2, { damping: 4 }),
      withSpring(1)
    );
    crystalBallRotation.value = withSequence(
      withTiming(360, { duration: 800 }),
      withTiming(0, { duration: 0 })
    );
    const idx = Math.floor(Math.random() * wisdomQuotes.length);
    setCurrentQuote(wisdomQuotes[idx]);
  };

  const bellStyle = useAnimatedStyle(() => ({ transform: [{ scale: bellScale.value }] }));
  const ballStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: crystalBallScale.value },
      { rotate: `${crystalBallRotation.value}deg` },
    ],
  }));

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background.primary }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StreakTracker />

        {/* Today секц */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <TextTitle style={[styles.title, { color: theme.text.primary }]}>
              Today
            </TextTitle>
            <View style={styles.iconRow}>
              <TouchableOpacity
                onPress={() => router.push('/today/today')}
                style={styles.iconButton}
              >
                <MaterialIcons name="edit-square" size={18} color={theme.text.tertiary} />
              </TouchableOpacity>
              <TouchableOpacity onPress={handlePressBell} style={styles.iconButton}>
                <FontAwesome6 name="trash" size={17} color={theme.text.tertiary} />
              </TouchableOpacity>
            </View>
          </View>

          <Box
            style={{
              width: '100%',
              height: 80,
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 16,
              borderRadius: 12,
              backgroundColor: theme.card,
            }}
            shadowColor={theme.shadow}
          >
            <TextInput
              placeholder="How do you feel today?"
              placeholderTextColor={theme.text.tertiary}
              style={[
                styles.input,
                {
                  flex: 1,
                  color: theme.text.primary,
                  paddingVertical: 0,
                },
              ]}
            />
            <Image
              source={require('@/assets/icons/happy1.png')}
              style={styles.moodIcon}
            />
          </Box>
        </View>

        {/* Daily Affirmation */}
        <View style={styles.section}>
          <TextTitle style={[styles.title, { color: theme.text.primary }]}>
            Daily Affirmation
          </TextTitle>
          <TextInput
            placeholder="Today I feel grateful for..."
            placeholderTextColor={theme.text.tertiary}
            style={[
              styles.affirmationInput,
              {
                backgroundColor: theme.card,
                color: theme.text.primary,
                shadowColor: theme.shadow,
              },
            ]}
          />
        </View>

        {/* Meditation секц */}
        <View style={styles.section}>
          <TextTitle style={[styles.title, { color: theme.text.primary }]}>
            Meditation
          </TextTitle>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.meditationRow}>
              {meditations.map((item) => (
                <MeditationCard
                  key={item.id}
                  title={item.title}
                  duration={item.duration}
                  imageUrl={item.imageUrl}
                  youtubeURL={item.youtubeURL ?? ''}
                />
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Professional Help */}
        <View style={styles.section}>
          <TextTitle style={[styles.title, { color: theme.text.primary }]}>
            Professional Help
          </TextTitle>
          <TouchableOpacity onPress={() => router.push('/components/Therapists')}>
            <Box style={{ width: '100%', height: 150, borderRadius: 12, padding: 16, backgroundColor: theme.card }} shadowColor={theme.shadow}>
              <Text style={[styles.tipsTitle, { color: theme.text.primary }]}>
                Find a Therapist
              </Text>
            </Box>
          </TouchableOpacity>
        </View>

        {/* Wisdom Crystal Ball */}
        <View style={styles.centered}>
          <TouchableOpacity onPress={handleCrystalBallPress}>
            <Box
              style={{ width: 370, height: 125, borderRadius: 12, padding: 16, backgroundColor: theme.card }}
              shadowColor={theme.shadow}
            >
              <Text style={[styles.wisdomText, { color: theme.text.primary }]}>
                {currentQuote}
              </Text>
              <Animated.Image
                source={require('@/assets/icons/crystal-ball1.png')}
                style={[styles.magicBall, ballStyle]}
              />
            </Box>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Random wisdom quotes
const wisdomQuotes = [
  "Don't say yes to everything - you may be reaching the burnout.",
  "The best time to plant a tree was 20 years ago. The second best time is now.",
  "Progress, not perfection, is the goal.",
  "Your mental health is a priority. Your happiness is essential.",
  "It's okay to not be okay sometimes.",
  "Small steps every day lead to big changes.",
  "You are stronger than you think.",
  "Breathe in peace, breathe out stress.",
  "Self-care isn't selfish, it's necessary.",
  "Every day is a new beginning.",
];

const styles = StyleSheet.create({
  container: { flex: 1 },
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
  title: { fontSize: 18, fontWeight: '600' },
  iconRow: { flexDirection: 'row', gap: 16 },
  iconButton: { padding: 6, borderRadius: 8 },
  input: { fontSize: 14 },
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
  meditationRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
    paddingVertical: 8,
  },
  tipsTitle: { fontSize: 16, fontWeight: 'bold' },
  centered: { alignItems: 'center', marginVertical: 20 },
  wisdomText: { fontSize: 15, fontWeight: 'bold' },
  magicBall: { width: 50, height: 50, position: 'absolute', top: 16, right: 16 },
  moodIcon: { width: 40, height: 40, marginLeft: 12 },
});
