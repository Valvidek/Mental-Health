import { View, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextTitle, TextSubheading, TextCaption } from '@/app/components/StyledText';
import { themes } from '@/constants/Colours';
import Card from '@/app/components/Card';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
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
  { id: 'all', name: 'All' },
  { id: 'mindfulness', name: 'Mindfulness' },
  { id: 'anxiety', name: 'Anxiety' },
  { id: 'sleep', name: 'Sleep' },
  { id: 'PTSD', name: 'PTSD' },
  { id: 'anger', name: 'Anger' },
  { id: 'cbt', name: 'CBT' },
];

export default function MeditateScreen() {
  const { darkMode } = useThemeContext();
  const themeColors = darkMode ? Colors.darkTheme : Colors.lightTheme;
  const styles = getStyles(themeColors);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
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
