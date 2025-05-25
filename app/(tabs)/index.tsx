import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Text,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import { TextTitle } from '@/app/components/StyledText';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { themes } from '@/constants/Colours';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Layout from '@/constants/Layout';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MoodCard from '@/app/components/MoodCard';
import MeditationCard from '@/app/components/MeditationCard';
import { useState, useEffect } from 'react';
import Box from '@/app/components/Box';
import { moods } from '@/assets/data/Data';
import TherapistScreen from '../components/Therapists';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import StreakTracker from '../components/StreakTracker';

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

// Therapist data
const therapists = [
  { name: "Dr. Sarah Johnson", specialty: "Anxiety & Depression", rating: "4.9" },
  { name: "Dr. Michael Chen", specialty: "Relationship Therapy", rating: "4.8" },
  { name: "Dr. Emily Rodriguez", specialty: "Trauma Recovery", rating: "4.9" },
  { name: "Dr. David Thompson", specialty: "Stress Management", rating: "4.7" },
  { name: "Dr. Lisa Park", specialty: "Mindfulness Therapy", rating: "4.8" },
];

export default function HomeScreen() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [currentQuote, setCurrentQuote] = useState(wisdomQuotes[0]);
  const [currentDate, setCurrentDate] = useState('');
  const bellScale = useSharedValue(1);
  const crystalBallScale = useSharedValue(1);
  const crystalBallRotation = useSharedValue(0);
  const router = useRouter();
  const { darkMode } = useThemeContext();
  const themeColors = darkMode ? Colors.darkTheme : Colors.lightTheme;
  const LOCAL_IP = '192.168.88.207';
  const PORT = 5000;

  // Format current date
  useEffect(() => {
    const formatDate = () => {
      const now = new Date();
      const day = now.getDate();
      const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const dayName = dayNames[now.getDay()];
      return `${day} ${dayName}`;
    };

    setCurrentDate(formatDate());
    
    // Update date every minute
    const interval = setInterval(() => {
      setCurrentDate(formatDate());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

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
  }

  const handlePressBell = () => {
    bellScale.value = withSpring(1.2, { damping: 4 }, () => {
      bellScale.value = withSpring(1);
    });
  };

  const handleCrystalBallPress = () => {
    // Animate crystal ball
    crystalBallScale.value = withSequence(
      withSpring(1.2, { damping: 4 }),
      withSpring(1)
    );
    
    crystalBallRotation.value = withSequence(
      withTiming(360, { duration: 800 }),
      withTiming(0, { duration: 0 })
    );

    // Generate random quote
    const randomIndex = Math.floor(Math.random() * wisdomQuotes.length);
    setCurrentQuote(wisdomQuotes[randomIndex]);
  };

  const handleTherapistPress = () => {
    handlePressBell();
    router.push('/components/Therapists');

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

  const bellAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: bellScale.value }],
    };
  });

  const crystalBallAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: crystalBallScale.value },
        { rotate: `${crystalBallRotation.value}deg` }
      ],
    };
  });

  const renderMoodItem = ({ item }: { item: typeof moods[0] }) => (
    <MoodCard image={item.image} count={item.count} />
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StreakTracker/>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <TextTitle style={styles.title}>Today</TextTitle>
            <View style={styles.flex}>
              <TouchableOpacity onPress={handleAddToday} style={styles.iconButtons}>
                <MaterialIcons name="edit-square" size={18} color={themes.light.textSecondary} />
              </TouchableOpacity>
              <TouchableOpacity onPress={handlePressBell} style={styles.iconButtons}>
                <FontAwesome6 name="trash" size={17} color={themes.light.textSecondary} />
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

        <View style={styles.section}>
          <TextTitle style={styles.title}>Daily Affirmation</TextTitle>
          <TextInput
            placeholder="Today I feel grateful for..."
            placeholderTextColor={themes.light.textSecondary}
            style={styles.greatfulInput}
          />
        </View>

        <View style={styles.section}>
          <TextTitle style={styles.title}>Meditation</TextTitle>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={{ flexDirection: 'row', gap: 20 }}>
              <MeditationCard
                title="Anxiety Relief"
                duration="15 min"
                imageUrl="https://images.pexels.com/photos/1447092/pexels-photo-1447092.png"
                youtubeURL="https://www.youtube.com/embed/UTHi8w3P0cY?si=NpjMC1n4wMcFre4E"
              />
              <MeditationCard
                title="Mindful Breathing"
                duration="10 min"
                imageUrl="https://images.pexels.com/photos/3822622/pexels-photo-3822622.jpeg"
                youtubeURL="https://www.youtube.com/embed/UTHi8w3P0cY?si=NpjMC1n4wMcFre4E"
              />
              <MeditationCard
                title="Meditation for mornings"
                duration="20 min"
                imageUrl="https://cdn.britannica.com/99/223399-138-B7B4A9EA/did-you-know-meditation.jpg"
                youtubeURL="https://www.youtube.com/embed/UTHi8w3P0cY?si=NpjMC1n4wMcFre4E"
              />
            </View>
          </ScrollView>

          <TextTitle style={styles.title}>Professional Help</TextTitle>
          <TouchableOpacity onPress={handleTherapistPress}>
            <Box style={styles.tips}>
              <Text style={styles.therapistTitle}>Find a Therapist</Text>
              <View style={styles.therapistPreview}>
                <Text style={styles.therapistText}>
                  • {therapists[0].name} - {therapists[0].specialty}
                </Text>
                <Text style={styles.therapistText}>
                  • {therapists[1].name} - {therapists[1].specialty}
                </Text>
                <Text style={styles.therapistText}>
                  • {therapists[2].name} - {therapists[2].specialty}
                </Text>
                <Text style={styles.viewMoreText}>Tap to view all therapists...</Text>
              </View>
            </Box>
          </TouchableOpacity>

          <View style={{ alignItems: 'center', marginTop: 20 }}>
            <TouchableOpacity onPress={handleCrystalBallPress}>
              <Box style={styles.wisdomBox}>
                <Text style={styles.wisdomDate}>{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</Text>
                <Text style={styles.wisdomText}>
                  {currentQuote}
                </Text>
                <Animated.Image 
                  source={require('@/assets/icons/crystal-ball1.png')} 
                  style={[styles.magicBall, crystalBallAnimatedStyle]} 
                />
              </Box>
            </TouchableOpacity>
          </View>
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
    backgroundColor: themes.light.box,
    borderRadius: 10,
    paddingHorizontal: Layout.spacing.md,
    color: themes.light.textPrimary,
    shadowColor: themes.light.textPrimary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
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