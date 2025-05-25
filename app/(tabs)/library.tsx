import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextTitle, TextCaption } from '@/app/components/StyledText';
import { themes } from '@/constants/Colours';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import MeditationCard from '@/app/components/MeditationCard';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { meditations } from '@/assets/data/MeditationData';
import { Feather, FontAwesome6 } from '@expo/vector-icons';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const searchInputWidth = useSharedValue(0.8); // 80%
  const filterOpacity = useSharedValue(1);

  const handleFocus = () => {
    searchInputWidth.value = withTiming(1);
    filterOpacity.value = withTiming(0);
  };

  const handleBlur = () => {
    searchInputWidth.value = withTiming(0.8);
    filterOpacity.value = withTiming(1);
  };

  const searchContainerStyle = useAnimatedStyle(() => ({
    width: `${searchInputWidth.value * 100}%`,
  }));

  const filterButtonStyle = useAnimatedStyle(() => ({
    opacity: filterOpacity.value,
  }));

  const filteredMeditations = meditations.filter((meditation) => {
    const matchesSearch =
      meditation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meditation.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' ||
      meditation.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  const renderCategoryItem = ({ item }: { item: typeof categories[0] }) => (
    <TouchableOpacity
      style={[styles.categoryItem, selectedCategory === item.id && styles.selectedCategory]}
      onPress={() => setSelectedCategory(item.id)}
    >
      <TextCaption style={[styles.categoryText, selectedCategory === item.id && styles.selectedCategoryText]}>
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
              placeholderTextColor={themes.light.textTertiary}
              value={searchQuery}
              onChangeText={setSearchQuery}
              onFocus={handleFocus}
              onBlur={handleBlur}
              clearButtonMode="while-editing"
            />
          </Animated.View>
          <Animated.View style={filterButtonStyle}>
            <TouchableOpacity
              style={styles.filterButton}
              onPress={() => alert('Filter pressed!')}
            >
              <FontAwesome6 name="filter" size={18} color={themes.light.textSecondary} />
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
          <MeditationCard
            title={item.title}
            duration={item.duration}
            imageUrl={item.imageUrl}
            youtubeURL={item.youtubeURL ?? ''}
          />
        )}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View>
            <TextTitle style={styles.title}>Today's Recommendation</TextTitle>
          </View>
        }
        contentContainerStyle={styles.meditationsList}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: themes.light.background },
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
    color: themes.light.textPrimary,
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
    backgroundColor: Colors.lightTheme.background.tertiary,
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
    color: Colors.lightTheme.text.primary,
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.lightTheme.background.tertiary,
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
    backgroundColor: Colors.lightTheme.background.tertiary,
  },
  selectedCategory: {
    backgroundColor: Colors.lightTheme.primary.default,
  },
  categoryText: {
    color: Colors.lightTheme.text.secondary,
  },
  selectedCategoryText: {
    color: Colors.lightTheme.text.primary,
  },
  meditationsList: {
    paddingHorizontal: Layout.spacing.lg,
    paddingBottom: Layout.spacing.md,
  },
});
