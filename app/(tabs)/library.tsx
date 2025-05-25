import { View, StyleSheet, FlatList, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextTitle, TextSubheading, TextCaption } from '@/app/components/StyledText';
import { themes } from '@/constants/Colours';
import Card from '@/app/components/Card';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import MeditationCard from '@/app/components/MeditationCard';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { meditations } from '@/assets/data/MeditationData';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { useThemeContext } from '../context/ThemeContext';

const categories = [
  { id: 'all', name: 'All', icon: 'apps' },
  { id: 'mindfulness', name: 'Mindfulness', icon: 'self-improvement' },
  { id: 'anxiety', name: 'Anxiety', icon: 'psychology' },
  { id: 'sleep', name: 'Sleep', icon: 'bedtime' },
  { id: 'PTSD', name: 'PTSD', icon: 'healing' },
  { id: 'anger', name: 'Anger', icon: 'sentiment-neutral' },
  { id: 'cbt', name: 'CBT', icon: 'psychology-alt' },
  { id: 'focus', name: 'Focus', icon: 'center-focus-strong' },
  { id: 'stress', name: 'Stress Relief', icon: 'spa' },
  { id: 'breathing', name: 'Breathing', icon: 'air' },
  { id: 'body-scan', name: 'Body Scan', icon: 'accessibility-new' },
  { id: 'gratitude', name: 'Gratitude', icon: 'favorite' },
  { id: 'loving-kindness', name: 'Loving Kindness', icon: 'volunteer-activism' },
];

const quickExercises = [
  {
    id: 'quick-1',
    title: '5-Minute Breathing Space',
    duration: '5 min',
    description: 'Quick mindful breathing exercise',
    type: 'breathing',
    icon: 'air',
    color: '#E3F2FD'
  },
  {
    id: 'quick-2',
    title: 'Body Tension Release',
    duration: '3 min',
    description: 'Progressive muscle relaxation',
    type: 'body-scan',
    icon: 'accessibility-new',
    color: '#F3E5F5'
  },
  {
    id: 'quick-3',
    title: 'Gratitude Moment',
    duration: '2 min',
    description: 'Quick gratitude reflection',
    type: 'gratitude',
    icon: 'favorite',
    color: '#E8F5E8'
  },
  {
    id: 'quick-4',
    title: 'Focus Reset',
    duration: '4 min',
    description: 'Attention restoration exercise',
    type: 'focus',
    icon: 'center-focus-strong',
    color: '#FFF3E0'
  },
];

const practicePrograms = [
  {
    id: 'program-1',
    title: '7-Day Mindfulness Journey',
    sessions: 7,
    totalDuration: '2-3 weeks',
    description: 'Build a sustainable mindfulness practice',
    difficulty: 'Beginner',
    color: Colors.primary.default,
  },
  {
    id: 'program-2',
    title: 'Anxiety Relief Intensive',
    sessions: 10,
    totalDuration: '3-4 weeks',
    description: 'Comprehensive anxiety management techniques',
    difficulty: 'Intermediate',
    color: '#7E57C2',
  },
  {
    id: 'program-3',
    title: 'Sleep Restoration Program',
    sessions: 14,
    totalDuration: '4-6 weeks',
    description: 'Improve sleep quality and bedtime routine',
    difficulty: 'All Levels',
    color: '#5C6BC0',
  },
];

const dailyChallenges = [
  {
    id: 'challenge-today',
    title: "Today's Challenge",
    description: 'Practice loving-kindness for 5 minutes',
    points: 25,
    streak: 3,
    completed: false,
  },
];

export default function MeditateScreen() {
  const { darkMode } = useThemeContext();
  const themeColors = darkMode ? Colors.darkTheme : Colors.lightTheme;
  const styles = getStyles(themeColors);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
<<<<<<< HEAD
  const [activeSection, setActiveSection] = useState('library'); // 'library', 'programs', 'quick'
=======
>>>>>>> c691a218c064ca1304b5a6e3292275c33ad1e2ad
  const searchInputWidth = useSharedValue(0.8);
  const filterOpacity = useSharedValue(1);

  const handleFocus = () => {
    searchInputWidth.value = withTiming(1);
    filterOpacity.value = withTiming(0);
  };

  const handleBlur = () => {
    searchInputWidth.value = withTiming(0.8);
    filterOpacity.value = withTiming(1);
  };

  const searchContainerStyle = useAnimatedStyle(() => {
    return {
      width: `${searchInputWidth.value * 100}%`,
    };
  });

  const filterButtonStyle = useAnimatedStyle(() => {
    return {
      opacity: filterOpacity.value,
    };
  });

  const filteredMeditations = meditations.filter((meditation) => {
    const matchesSearch =
      meditation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meditation.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' ||
      meditation.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  const renderCategoryItem = ({ item }: { item: (typeof categories)[0] }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedCategory === item.id && styles.selectedCategory,
      ]}
      onPress={() => setSelectedCategory(item.id)}
    >
      <MaterialIcons
        name={item.icon as any}
        size={16}
        color={selectedCategory === item.id ? Colors.background.primary : Colors.text.secondary}
        style={styles.categoryIcon}
      />
      <TextCaption
        style={[
          styles.categoryText,
          selectedCategory === item.id && styles.selectedCategoryText,
        ]}
      >
        {item.name}
      </TextCaption>
    </TouchableOpacity>
  );

  const renderQuickExercise = ({ item }: { item: (typeof quickExercises)[0] }) => (
    <TouchableOpacity style={[styles.quickExerciseCard, { backgroundColor: item.color }]}>
      <MaterialIcons name={item.icon as any} size={24} color={Colors.primary.default} />
      <TextSubheading style={styles.quickExerciseTitle}>{item.title}</TextSubheading>
      <TextCaption style={styles.quickExerciseDuration}>{item.duration}</TextCaption>
      <TextCaption style={styles.quickExerciseDescription}>{item.description}</TextCaption>
    </TouchableOpacity>
  );

  const renderProgram = ({ item }: { item: (typeof practicePrograms)[0] }) => (
    <Card style={{ ...styles.programCard, borderLeftColor: item.color }}>
      <View style={styles.programContent}>
        <View style={styles.programHeader}>
          <TextSubheading style={styles.programTitle}>{item.title}</TextSubheading>
          <View style={[styles.difficultyBadge, { backgroundColor: item.color }]}>
            <TextCaption style={styles.difficultyText}>{item.difficulty}</TextCaption>
          </View>
        </View>
        <TextCaption style={styles.programDescription}>{item.description}</TextCaption>
        <View style={styles.programStats}>
          <View style={styles.programStat}>
            <Ionicons name="time-outline" size={16} color={Colors.text.secondary} />
            <TextCaption style={styles.programStatText}>{item.totalDuration}</TextCaption>
          </View>
          <View style={styles.programStat}>
            <Ionicons name="library-outline" size={16} color={Colors.text.secondary} />
            <TextCaption style={styles.programStatText}>{item.sessions} sessions</TextCaption>
          </View>
        </View>
      </View>
    </Card>
  );

  const renderSectionTabs = () => (
    <View style={styles.sectionTabs}>
      <TouchableOpacity
        style={[styles.sectionTab, activeSection === 'library' && styles.activeSectionTab]}
        onPress={() => setActiveSection('library')}
      >
        <Ionicons 
          name="library-outline" 
          size={20} 
          color={activeSection === 'library' ? Colors.primary.default : Colors.text.secondary} 
        />
        <TextCaption style={[
          styles.sectionTabText,
          activeSection === 'library' && styles.activeSectionTabText
        ]}>Library</TextCaption>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.sectionTab, activeSection === 'programs' && styles.activeSectionTab]}
        onPress={() => setActiveSection('programs')}
      >
        <Ionicons 
          name="school-outline" 
          size={20} 
          color={activeSection === 'programs' ? Colors.primary.default : Colors.text.secondary} 
        />
        <TextCaption style={[
          styles.sectionTabText,
          activeSection === 'programs' && styles.activeSectionTabText
        ]}>Programs</TextCaption>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[styles.sectionTab, activeSection === 'quick' && styles.activeSectionTab]}
        onPress={() => setActiveSection('quick')}
      >
        <Ionicons 
          name="flash-outline" 
          size={20} 
          color={activeSection === 'quick' ? Colors.primary.default : Colors.text.secondary} 
        />
        <TextCaption style={[
          styles.sectionTabText,
          activeSection === 'quick' && styles.activeSectionTabText
        ]}>Quick</TextCaption>
      </TouchableOpacity>
    </View>
  );

  const renderDailyChallenge = () => (
    <Card style={styles.challengeCard}>
      <View style={styles.challengeHeader}>
        <View style={styles.challengeIconContainer}>
          <Ionicons name="trophy" size={24} color={Colors.primary.default} />
        </View>
        <View style={styles.challengeInfo}>
          <TextSubheading style={styles.challengeTitle}>Today's Challenge</TextSubheading>
          <TextCaption style={styles.challengeStreak}>🔥 {dailyChallenges[0].streak} day streak</TextCaption>
        </View>
        <View style={styles.challengePoints}>
          <TextCaption style={styles.pointsText}>{dailyChallenges[0].points} pts</TextCaption>
        </View>
      </View>
      <TextCaption style={styles.challengeDescription}>
        {dailyChallenges[0].description}
      </TextCaption>
      <TouchableOpacity style={styles.challengeButton}>
        <TextCaption style={styles.challengeButtonText}>Start Challenge</TextCaption>
      </TouchableOpacity>
    </Card>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'programs':
        return (
          <FlatList
            data={practicePrograms}
            renderItem={renderProgram}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.programsList}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              <TextTitle style={styles.sectionTitle}>Practice Programs</TextTitle>
            }
          />
        );
      
      case 'quick':
        return (
          <ScrollView contentContainerStyle={styles.quickSection}>
            <TextTitle style={styles.sectionTitle}>Quick Exercises</TextTitle>
            <FlatList
              data={quickExercises}
              renderItem={renderQuickExercise}
              keyExtractor={(item) => item.id}
              numColumns={2}
              columnWrapperStyle={styles.quickExerciseRow}
              scrollEnabled={false}
            />
            {renderDailyChallenge()}
          </ScrollView>
        );
      
      default:
        return (
          <FlatList
            data={filteredMeditations}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => console.log('Open meditation', item.id)}
              >
                <MeditationCard
                  title={item.title}
                  duration={item.duration}
                  imageUrl={item.imageUrl}
                  youtubeURL={item.youtubeURL ?? ''}
                />
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={
              <>
                <TextTitle style={styles.title}>Today's Recommendation</TextTitle>
                
              </>
            }
            contentContainerStyle={styles.meditationsList}
            showsVerticalScrollIndicator={false}
          />
        );
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Animated.View style={[styles.searchInputContainer, searchContainerStyle]}>
            <Feather name="search" size={20} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Browse Library ..."
              placeholderTextColor={themeColors.text.tertiary}
              value={searchQuery}
              onChangeText={setSearchQuery}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </Animated.View>

          <Animated.View style={filterButtonStyle}>
            <TouchableOpacity style={styles.filterButton}>
              <FontAwesome6
                name="filter"
                size={18}
                color={themeColors.text.secondary}
              />
            </TouchableOpacity>
          </Animated.View>
        </View>

<<<<<<< HEAD
        {renderSectionTabs()}

        {activeSection === 'library' && (
          <FlatList
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesList}
            ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
          />
        )}
      </View>

      {renderContent()}
=======
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
          ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
        />
      </View>

      <FlatList
        data={filteredMeditations}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => console.log('Open meditation', item.id)}>
            <MeditationCard
              title={item.title}
              duration={item.duration}
              imageUrl={item.imageUrl}
              youtubeURL={item.youtubeURL ?? ''}
            />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <>
            <TextTitle style={styles.title}>Today's Recommendation</TextTitle>
          </>
        }
        contentContainerStyle={styles.meditationsList}
        showsVerticalScrollIndicator={false}
      />
>>>>>>> c691a218c064ca1304b5a6e3292275c33ad1e2ad

      <Card style={styles.featuredCard}>
        <View style={styles.featuredContent}>
          <TextSubheading style={styles.featuredTitle}>Daily Practice</TextSubheading>
          <TextCaption style={styles.featuredText}>
            Maintain a regular meditation practice to see significant improvements in your
            mental wellbeing.
          </TextCaption>
        </View>
      </Card>
    </SafeAreaView>
  );
}

<<<<<<< HEAD
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.light.background,
  },
  header: {
    paddingTop: Layout.spacing.md,
    paddingBottom: Layout.spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
    backgroundColor: themes.light.background,
  },
  title: {
    color: themes.light.textPrimary,
    fontSize: 16,
    marginTop: 10,
    marginLeft: Layout.spacing.lg,
  },
  sectionTitle: {
    color: themes.light.textPrimary,
    fontSize: 18,
    marginBottom: Layout.spacing.lg,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Layout.spacing.lg,
    marginBottom: Layout.spacing.sm,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background.tertiary,
    borderRadius: 20,
    paddingHorizontal: Layout.spacing.md,
    height: 40,
  },
  searchIcon: {
    marginRight: Layout.spacing.sm,
    color: themes.light.textSecondary,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 14,
    fontFamily: 'PlusJakartaSans-Regular',
    color: Colors.text.primary,
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.background.tertiary,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: Layout.spacing.sm,
  },
  sectionTabs: {
    flexDirection: 'row',
    paddingHorizontal: Layout.spacing.lg,
    marginBottom: Layout.spacing.sm,
    backgroundColor: Colors.background.tertiary,
    marginHorizontal: Layout.spacing.lg,
    borderRadius: Layout.borderRadius.lg,
    padding: 4,
  },
  sectionTab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Layout.spacing.sm,
    borderRadius: Layout.borderRadius.md,
  },
  activeSectionTab: {
    backgroundColor: Colors.background.primary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTabText: {
    marginLeft: Layout.spacing.xs,
    color: Colors.text.secondary,
    fontSize: 12,
  },
  activeSectionTabText: {
    color: Colors.primary.default,
    fontWeight: '600',
  },
  categoriesList: {
    paddingHorizontal: Layout.spacing.lg,
    paddingVertical: Layout.spacing.sm,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: Layout.spacing.xs,
    borderRadius: Layout.borderRadius.full,
    backgroundColor: Colors.background.tertiary,
  },
  categoryIcon: {
    marginRight: Layout.spacing.xs,
  },
  selectedCategory: {
    backgroundColor: Colors.primary.default,
  },
  categoryText: {
    color: Colors.text.secondary,
    fontSize: 12,
  },
  selectedCategoryText: {
    color: Colors.background.primary,
  },
  meditationsList: {
    padding: Layout.spacing.lg,
    paddingTop: Layout.spacing.xl,
  },
  programsList: {
    padding: Layout.spacing.lg,
  },
  programCard: {
    marginBottom: Layout.spacing.md,
    borderLeftWidth: 4,
  },
  programContent: {
    padding: Layout.spacing.md,
  },
  programHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Layout.spacing.sm,
  },
  programTitle: {
    flex: 1,
    color: Colors.text.primary,
    marginRight: Layout.spacing.sm,
  },
  difficultyBadge: {
    paddingHorizontal: Layout.spacing.sm,
    paddingVertical: 2,
    borderRadius: Layout.borderRadius.sm,
  },
  difficultyText: {
    color: Colors.background.primary,
    fontSize: 10,
    fontWeight: '600',
  },
  programDescription: {
    color: Colors.text.secondary,
    marginBottom: Layout.spacing.md,
  },
  programStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  programStat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  programStatText: {
    marginLeft: Layout.spacing.xs,
    color: Colors.text.secondary,
  },
  quickSection: {
    padding: Layout.spacing.lg,
  },
  quickExerciseRow: {
    justifyContent: 'space-between',
    marginBottom: Layout.spacing.md,
  },
  quickExerciseCard: {
    width: '48%',
    padding: Layout.spacing.md,
    borderRadius: Layout.borderRadius.lg,
    alignItems: 'center',
  },
  quickExerciseTitle: {
    color: Colors.text.primary,
    textAlign: 'center',
    marginTop: Layout.spacing.sm,
    marginBottom: Layout.spacing.xs,
  },
  quickExerciseDuration: {
    color: Colors.primary.default,
    fontWeight: '600',
    marginBottom: Layout.spacing.xs,
  },
  quickExerciseDescription: {
    color: Colors.text.secondary,
    textAlign: 'center',
    fontSize: 11,
  },
  challengeCard: {
    marginTop: Layout.spacing.lg,
    backgroundColor: Colors.background.secondary,
  },
  challengeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.sm,
  },
  challengeIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary.light,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Layout.spacing.md,
  },
  challengeInfo: {
    flex: 1,
  },
  challengeTitle: {
    color: Colors.text.primary,
  },
  challengeStreak: {
    color: Colors.text.secondary,
    fontSize: 12,
  },
  challengePoints: {
    backgroundColor: Colors.primary.default,
    paddingHorizontal: Layout.spacing.sm,
    paddingVertical: Layout.spacing.xs,
    borderRadius: Layout.borderRadius.sm,
  },
  pointsText: {
    color: Colors.background.primary,
    fontWeight: '600',
    fontSize: 11,
  },
  challengeDescription: {
    color: Colors.text.secondary,
    marginBottom: Layout.spacing.md,
  },
  challengeButton: {
    backgroundColor: Colors.primary.default,
    paddingVertical: Layout.spacing.sm,
    borderRadius: Layout.borderRadius.md,
    alignItems: 'center',
  },
  challengeButtonText: {
    color: Colors.background.primary,
    fontWeight: '600',
  },
  featuredCard: {
    margin: Layout.spacing.lg,
    backgroundColor: Colors.primary.default,
    marginTop: 0,
  },
  featuredContent: {
    padding: Layout.spacing.md,
  },
  featuredTitle: {
    color: Colors.background.primary,
    marginBottom: Layout.spacing.xs,
  },
  featuredText: {
    color: Colors.background.primary,
    opacity: 0.9,
  },
});
=======
const getStyles = (themeColors: typeof Colors.lightTheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.background.primary,
    },
    header: {
      paddingTop: Layout.spacing.md,
      paddingBottom: Layout.spacing.md,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 4,
    },
    title: {
      color: themeColors.text.primary,
      fontSize: 16,
      marginTop: 10,
      marginLeft: Layout.spacing.lg,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: Layout.spacing.lg,
      marginBottom: 5,
    },
    searchInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: themeColors.background.tertiary,
      borderRadius: 20,
      paddingHorizontal: Layout.spacing.md,
      height: 40,
    },
    searchIcon: {
      marginRight: Layout.spacing.sm,
      color: themeColors.text.secondary,
    },
    searchInput: {
      flex: 1,
      height: '100%',
      fontSize: 14,
      fontFamily: 'PlusJakartaSans-Regular',
      color: themeColors.text.primary,
    },
    filterButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: themeColors.background.tertiary,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: Layout.spacing.sm,
    },
    categoriesList: {
      paddingHorizontal: Layout.spacing.lg,
      paddingVertical: Layout.spacing.sm,
    },
    categoryItem: {
      paddingHorizontal: Layout.spacing.md,
      paddingVertical: Layout.spacing.xs,
      borderRadius: Layout.borderRadius.full,
      backgroundColor: themeColors.background.tertiary,
    },
    selectedCategory: {
      backgroundColor: themeColors.primary.default,
    },
    categoryText: {
      color: themeColors.text.secondary,
    },
    selectedCategoryText: {
      color: themeColors.background.primary,
    },
    meditationsList: {
      padding: Layout.spacing.lg,
      paddingTop: Layout.spacing.xl,
    },
    featuredCard: {
      margin: Layout.spacing.lg,
      backgroundColor: themeColors.primary.default,
      marginTop: 0,
    },
    featuredContent: {
      padding: Layout.spacing.md,
    },
    featuredTitle: {
      color: themeColors.background.primary,
      marginBottom: Layout.spacing.xs,
    },
    featuredText: {
      color: themeColors.background.primary,
      opacity: 0.9,
    },
  });
>>>>>>> c691a218c064ca1304b5a6e3292275c33ad1e2ad
