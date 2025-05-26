// screens/MeditateScreen.tsx
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextTitle, TextCaption } from '@/app/components/StyledText';
import MeditationCard from '@/app/components/MeditationCard';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { Feather, FontAwesome6 } from '@expo/vector-icons';
import { meditations } from '@/assets/data/MeditationData';
import Layout from '@/constants/Layout';
import Colors from '@/constants/Colors';
import { useThemeContext } from '../context/ThemeContext';

const categories = [
  { id: 'all', name: 'All' },
  { id: 'mindfulness', name: 'Mindfulness' },
  { id: 'anxiety', name: 'Anxiety' },
  { id: 'sleep', name: 'Sleep' },
  { id: 'ptsd', name: 'PTSD' },
  { id: 'anger', name: 'Anger' },
  { id: 'cbt', name: 'CBT' },
];

export default function MeditateScreen() {
  const { darkMode } = useThemeContext();
  const theme = darkMode ? Colors.darkTheme : Colors.lightTheme;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const searchInputWidth = useSharedValue(0.8);
  const filterOpacity       = useSharedValue(1);

  const handleFocus = () => {
    searchInputWidth.value = withTiming(1, { duration: 200 });
    filterOpacity.value    = withTiming(0, { duration: 200 });
  };
  const handleBlur = () => {
    searchInputWidth.value = withTiming(0.8, { duration: 200 });
    filterOpacity.value    = withTiming(1, { duration: 200 });
  };

  const searchStyle = useAnimatedStyle(() => ({
    width: `${searchInputWidth.value * 100}%`,
  }));
  const filterStyle = useAnimatedStyle(() => ({
    opacity: filterOpacity.value,
  }));

  const filteredMeditations = meditations.filter(m => {
    const matchesSearch =
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' ||
      m.category.toLowerCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const renderCategoryItem = ({ item }: { item: typeof categories[0] }) => {
    const isSelected = item.id === selectedCategory;
    return (
      <TouchableOpacity
        style={[
          styles.categoryItem(theme),
          isSelected && styles.categoryItemSelected(theme),
        ]}
        onPress={() => setSelectedCategory(item.id)}
      >
        <TextCaption
          style={[
            styles.categoryText(theme),
            isSelected && styles.categoryTextSelected(theme),
          ]}
        >
          {item.name}
        </TextCaption>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container(theme)} edges={['top']}>
      <View style={styles.header(theme)}>
        <View style={styles.searchContainer}>
          <Animated.View
            style={[styles.searchBox(theme), searchStyle]}
          >
            <Feather
              name="search"
              size={20}
              color={theme.text.secondary}
            />
            <TextInput
              style={styles.searchInput(theme)}
              placeholder="Browse Library…"
              placeholderTextColor={theme.text.tertiary}
              value={searchQuery}
              onChangeText={setSearchQuery}
              onFocus={handleFocus}
              onBlur={handleBlur}
              clearButtonMode="while-editing"
              clearButtonMode="while-editing"
            />
          </Animated.View>
          <Animated.View style={filterStyle}>
            <TouchableOpacity style={styles.filterButton(theme)}>
              <FontAwesome6
                name="filter"
                size={18}
                color={theme.text.secondary}
              />
            </TouchableOpacity>
          </Animated.View>
        </View>

        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={i => i.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
          ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
        />
      </View>

      <FlatList
        data={filteredMeditations}
        renderItem={({ item }) => (
          <MeditationCard
            title={item.title}
            duration={item.duration}
            imageUrl={item.imageUrl}
            youtubeURL={item.youtubeURL ?? ''}
          />
        )}
        keyExtractor={i => i.id}
        ListHeaderComponent={
          <TextTitle style={styles.title(theme)}>
            Today's Recommendation
          </TextTitle>
        }
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = {
  container: (t: typeof Colors.lightTheme): ViewStyle => ({
    flex: 1,
    backgroundColor: t.background.primary,
  }),
  header: (t: typeof Colors.lightTheme): ViewStyle => ({
    paddingVertical: Layout.spacing.md,
    backgroundColor: t.background.primary,
    shadowColor: t.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  }),
  title: (t: typeof Colors.lightTheme): TextStyle => ({
    color: t.text.primary,
    fontSize: 16,
    margin: Layout.spacing.lg,
  }),
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.lg,
    marginBottom: Layout.spacing.sm,
    justifyContent: 'space-between',
  } as ViewStyle,
  searchBox: (t: typeof Colors.lightTheme): ViewStyle => ({
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: t.background.tertiary,
    borderRadius: 20,
    paddingHorizontal: Layout.spacing.md,
    height: 40,
  }),
  searchInput: (t: typeof Colors.lightTheme): TextStyle => ({
    flex: 1,
    marginLeft: 8,
    color: t.text.primary,
  }),
  filterButton: (t: typeof Colors.lightTheme): ViewStyle => ({
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: t.background.tertiary,
    alignItems: 'center',
    justifyContent: 'center',
  }),
  categoriesList: {
    paddingHorizontal: Layout.spacing.lg,
    paddingVertical: Layout.spacing.sm,
  } as ViewStyle,
  categoryItem: (t: typeof Colors.lightTheme): ViewStyle => ({
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: Layout.spacing.xs,
    borderRadius: Layout.borderRadius.full,
    backgroundColor: t.background.tertiary,
  }),
  categoryItemSelected: (t: typeof Colors.lightTheme): ViewStyle => ({
    backgroundColor: t.primary.default,
  }),
  categoryText: (t: typeof Colors.lightTheme): TextStyle => ({
    color: t.text.secondary,
    fontSize: 12,
  }),
  categoryTextSelected: (t: typeof Colors.lightTheme): TextStyle => ({
    color: t.text.primary,
  }),
  listContent: {
    paddingHorizontal: Layout.spacing.lg,
    paddingBottom: Layout.spacing.md,
  } as ViewStyle,
};
