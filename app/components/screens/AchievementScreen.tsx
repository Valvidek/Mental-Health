// app/screens/AchievementScreen.tsx
import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ListRenderItemInfo,
} from 'react-native';
import { useThemeContext } from '@/app/context/ThemeContext';
import Colors from '@/constants/Colors';

interface Achievement {
  id: string;
  title: string;
  description: string;
  image: any;
  earned: boolean;
}

const achievements: Achievement[] = [
  {
    id: '1',
    title: 'First Step',
    description: 'Logged your first mood',
    image: require('@/assets/icons/high-five1.png'),
    earned: true,
  },
  {
    id: '2',
    title: 'Meditation Beginner',
    description: 'Completed 5 meditation sessions',
    image: require('@/assets/icons/crystal-ball1.png'),
    earned: true,
  },
  {
    id: '3',
    title: 'Early Bird',
    description: 'Woke up before 6AM for 3 days',
    image: require('@/assets/icons/happy1.png'),
    earned: false,
  },
  {
    id: '4',
    title: 'Journal Keeper',
    description: 'Wrote 10 journal entries',
    image: require('@/assets/icons/suitcase1.png'),
    earned: false,
  },
];

const AchievementScreen: React.FC = () => {
  const { darkMode } = useThemeContext();
  const themeColors = darkMode ? Colors.darkTheme : Colors.lightTheme;

  const renderItem = ({ item }: ListRenderItemInfo<Achievement>) => {
    const opacity = item.earned ? 1 : 0.3;

    return (
      <View
        style={[
          styles.achievementBox,
          {
            backgroundColor: themeColors.card,      // картын фон
            shadowColor: themeColors.shadow,        // сүүдрийн өнгө
            borderColor: themeColors.border,        // хүрээний өнгө
            opacity,                                 // идэвхтэй эсэх
          },
        ]}
      >
        <Image source={item.image} style={styles.icon} />
        <View style={styles.textContainer}>
          <Text style={[styles.title, { color: themeColors.text.primary }]}>
            {item.title}
          </Text>
          <Text style={[styles.description, { color: themeColors.text.secondary }]}>
            {item.description}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: themeColors.background.primary },  // дэлгэцийн фон
      ]}
    >
      <Text style={[styles.header, { color: themeColors.text.primary }]}>
        Achievements
      </Text>
      <FlatList
        data={achievements}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

export default AchievementScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    alignSelf: 'center',
  },
  list: {
    paddingBottom: 24,
  },
  achievementBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    // iOS тень
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    // Android тень
    elevation: 3,
  },
  icon: {
    width: 60,
    height: 60,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    marginTop: 4,
  },
});
