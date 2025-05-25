import { View, ScrollView, StyleSheet, TouchableOpacity, FlatList, Text, TextInput, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { TextTitle, TextSubheading, TextBody, TextCaption, TextSmall } from '@/components/StyledText';
import { SafeAreaView } from 'react-native-safe-area-context';
import { themes } from '@/constants/Colours';
import { communityPosts, therapists } from '@/assets/data/mockData';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Layout from '@/constants/Layout';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MoodCard from '@/components/MoodCard';
import MeditationCard from '@/components/MeditationCard';
import { useState } from 'react';
import Box from '@/components/Box';

import { moods, meditations, progressStats } from '@/assets/data/mockData';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';


export default function HomeScreen() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const bellScale = useSharedValue(1);

  const handlePressBell = () => {
    bellScale.value = withSpring(1.2, { damping: 4 }, () => {
      bellScale.value = withSpring(1);
    });
  };

  const router = useRouter();

  const handleAddTodo = () => {
    handlePressBell();
    router.push('/today/todo');
    console.log('Logged To Do',);
  };

  const handleAddToday = () => {
    handlePressBell();
    router.push('/today/today');
    console.log('Logged Today',);
  }


  const bellAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: bellScale.value }],
    };
  });

  const renderMoodItem = ({ item }: { item: typeof moods[0] }) => {
    if (item.id === '7') return null; // Skip rendering the "None" mood

    return (
      <MoodCard
        image={item.image}
        count={item.count}
      />
    );
  };


  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <TextTitle style={styles.title}>Recorded Moods</TextTitle>
            <View style={[styles.flex, { left: 300, position: 'absolute' }]}>
              <TouchableOpacity
                onPress={handlePressBell}
                style={styles.iconButtons}
              >
                <FontAwesome name="search" size={23} color={themes.light.textSecondary} />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handlePressBell}
                style={styles.iconButtons}
              >
                <FontAwesome5 name="share" size={21} color={themes.light.textSecondary} />
              </TouchableOpacity>
            </View>
          </View>

        </View>

        <View style={styles.recordedMoods}>
          <FlatList
            data={moods}
            renderItem={renderMoodItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.moodList}
            ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
          />
        </View>
        <Text style={styles.unrecorded}> unrecorded days: 0</Text>

        <View style={[styles.section, { marginTop: -20 }]}>
          <View style={styles.sectionHeader}>
            <TextTitle style={styles.title}>Overall</TextTitle>
          </View>
          <Box style={styles.overallMoods}>
            <View style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <Text style={styles.moodText}>Your anger moods have been increased drastically</Text>
            </View>
          </Box>
        </View>


        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <TextTitle style={styles.title}>Sleep Quality</TextTitle>
          </View>
          <Box style={styles.sleepQuality}>
            <Text></Text>
          </Box>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <TextTitle style={styles.title}>Recorded Main Focuses</TextTitle>
          </View>
          <TextTitle style={styles.title}>Comparison</TextTitle>
          <Box style={styles.tips}>
            <Text>How to set boundaries...</Text>
          </Box>
        </View>

        <View style={styles.featuredSection}>
          <TextTitle style={styles.title}>Connect with Therapists</TextTitle>

          <FlatList
            data={therapists}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.therapistsList}
            ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.therapistCard}>
                <Image
                  source={{ uri: item.imageUrl }}
                  style={styles.therapistImage}
                />
                <View style={styles.therapistInfo}>
                  <TextCaption style={styles.therapistName} numberOfLines={1}>
                    {item.name}
                  </TextCaption>
                  <TextSmall style={styles.therapistSpecialty} numberOfLines={1}>
                    {item.specialty}
                  </TextSmall>
                  <View style={styles.rating}>
                    <TextSmall style={styles.ratingText}>★ {item.rating}</TextSmall>
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>


      </ScrollView>
    </SafeAreaView>
  );
};

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
  unrecorded: {
    color: themes.light.textPrimary,
    position: 'absolute',
    fontSize: 13,
    top: 190,
    marginLeft: 260,
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    marginTop: 10,
  },
  featuredSection: {
    paddingTop: Layout.spacing.lg,
    paddingHorizontal: Layout.spacing.lg,
  },
  focusIcon: {
    height: 40,
    width: 40,
    position: 'absolute',
    top: 25,
    left: 310,
  },
  therapistsList: {
    paddingBottom: Layout.spacing.lg,
  },
  therapistCard: {
    width: 150,
    borderRadius: Layout.borderRadius.md,
    overflow: 'hidden',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  therapistImage: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
  },
  therapistInfo: {
    padding: Layout.spacing.sm,
  },
  therapistName: {
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  therapistSpecialty: {
    marginBottom: Layout.spacing.xs,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
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
    paddingHorizontal: Layout.spacing.lg,
    paddingVertical: Layout.spacing.md,
  },
  iconButtons: {},
  icons: {
    position: 'absolute',
    width: 50,
    height: 50,
    top: 10,
    left: 15,
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
  recordedMoods: {
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
  overallMoods: {
    height: 200,
    width: '100%',
  },
  moodText: {
    fontWeight: 'bold',
    fontSize: 14,
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
  sleepQuality: {
    width: '100%',
    height: 120,
    marginRight: 20,
    borderRadius: 10,
  }
});
