import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Text,
  TextInput,
  Image,
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
import { useState } from 'react';
import Box from '@/app/components/Box';
import { moods } from '@/assets/data/Data';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import StreakTracker from '../components/StreakTracker';
import QuoteCard from '../components/QuoteCard';

export default function HomeScreen() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const bellScale = useSharedValue(1);
  const router = useRouter();
const LOCAL_IP = '10.0.4.143'
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

  const bellAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: bellScale.value }],
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

          <TextTitle style={styles.title}>Quick Tips</TextTitle>
          <Box style={styles.tips}>
            <Text>How to set boundaries...</Text>
          </Box>

          <View style={{ flex: 1, justifyContent: 'center' }}>
            <QuoteCard />
          </View>
          
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
