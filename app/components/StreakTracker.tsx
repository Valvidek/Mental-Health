import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Animated,
  ListRenderItemInfo,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { themes } from '@/constants/Colours';
import {
  format,
  differenceInCalendarDays,
  addDays,
  startOfWeek,
  isSameDay,
} from 'date-fns';
import Box from './Box';
import { Ionicons } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { TextTitle } from './StyledText';
import Layout from '@/constants/Layout';

type StreakDay = {
  day: Date;
  completed: boolean;
};

export default function StreakTracker() {
  const [streak, setStreak] = useState<number>(0);
  const [startDay, setStartDay] = useState<Date>(new Date());
  const [streakDays, setStreakDays] = useState<StreakDay[]>([]);
  const bobAnimation = useRef(new Animated.Value(1)).current;
  const bellScale = useSharedValue(1);

  const animatedBellStyle = useAnimatedStyle(() => ({
    transform: [{ scale: bellScale.value }],
  }));

  const handleBellPress = () => {
    bellScale.value = withSpring(1.2, { damping: 4 }, () => {
      bellScale.value = withSpring(1);
    });
  };

  const bob = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bobAnimation, {
          toValue: 1.2,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(bobAnimation, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]),
      { iterations: 2 }
    ).start();
  };

  const initializeStreak = useCallback(async () => {
    const today = new Date();
    const storedUserId = await AsyncStorage.getItem('userId');
    if (!storedUserId) return;

    const streakKey = `streak_${storedUserId}`;
    const startDayKey = `startDay_${storedUserId}`;
    const lastOpenedKey = `lastOpened_${storedUserId}`;

    const lastOpened = await AsyncStorage.getItem(lastOpenedKey);
    const storedStreak = parseInt((await AsyncStorage.getItem(streakKey)) || '0', 10);
    const storedStartDay = new Date(
      (await AsyncStorage.getItem(startDayKey)) || today.toISOString()
    );

    let newStreak = storedStreak;
    let newStartDay = storedStartDay;

    if (lastOpened) {
      const lastDate = new Date(lastOpened);
      const dayDifference = differenceInCalendarDays(today, lastDate);

      if (dayDifference === 1) {
        newStreak++;
        bob();
      } else if (dayDifference > 1) {
        newStreak = 1;
        newStartDay = today;
      }
    } else {
      newStreak = 1;
    }

    await AsyncStorage.multiSet([
      [streakKey, newStreak.toString()],
      [startDayKey, newStartDay.toISOString()],
      [lastOpenedKey, today.toISOString()],
    ]);

    setStreak(newStreak);
    setStartDay(newStartDay);
    setStreakDays(generateStreakDays(newStartDay, newStreak));
  }, []);

  const generateStreakDays = (
    startDay: Date,
    streakCount: number
  ): StreakDay[] => {
    const monday = startOfWeek(new Date(), { weekStartsOn: 1 });
    return Array.from({ length: 7 }, (_, i) => {
      const currentDay = addDays(monday, i);
      const completed =
        differenceInCalendarDays(currentDay, startDay) < streakCount;
      return {
        day: currentDay,
        completed,
      };
    });
  };

  const renderDay = ({ item, index }: ListRenderItemInfo<StreakDay>) => {
    const lastCompletedIndex = streakDays
      .map((d) => d.completed)
      .lastIndexOf(true);
    const isLastDayOfStreak = item.completed && index === lastCompletedIndex;
    const today = new Date();
    const isToday = isSameDay(item.day, today);

    return (
      <View style={styles.dayContainer}>
        <Text style={[styles.dateText, isToday && styles.todayDateText]}>
          {format(item.day, 'd')}
        </Text>

        <View style={[styles.iconCircle, isToday && styles.todayCircle]}>
          <Animated.View
            style={
              isLastDayOfStreak
                ? { transform: [{ scale: bobAnimation }] }
                : undefined
            }
          >
            <Ionicons
              name={item.completed ? 'checkmark-circle' : 'ellipse'}
              size={40}
              color={item.completed ? themes.light.green : themes.light.accent}
            />
          </Animated.View>
        </View>

        <TextTitle style={[styles.dayText, isToday && styles.todayDayText]}>
          {format(item.day, 'EEE')}
        </TextTitle>
      </View>
    );
  };

  useEffect(() => {
    initializeStreak();
  }, [initializeStreak]);

  return (
    <View style={styles.container}>
      <View style={styles.flex}>
        <View style={styles.streakContainer}>
          <TextTitle style={styles.streakNum}>🔥{streak}</TextTitle>
        </View>
        <View style={styles.icon}>
          <TouchableOpacity
            onPress={handleBellPress}
            style={styles.iconButtons}
          >
            <Animated.View style={animatedBellStyle}>
              <Ionicons
                name="notifications"
                size={20}
                color={themes.light.textSecondary}
              />
            </Animated.View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => console.log('Settings pressed')}
            style={styles.iconButtons}
          >
            <MaterialIcons
              name="settings"
              size={20}
              color={themes.light.textSecondary}
            />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        style={styles.week}
        data={streakDays}
        horizontal
        keyExtractor={(item) => item.day.toISOString()}
        renderItem={renderDay}
        contentContainerStyle={styles.daysContainer}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingLeft: Layout.spacing.md,
    paddingRight: Layout.spacing.md,
    paddingVertical: Layout.spacing.md,
    flex: 1,
  },
  streakNum: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  icon: {
    display: 'flex',
    flexDirection: 'row',
  },
  week: {
    marginTop: 10,
  },
  streakContainer: {
    width: 50,
    height: 30,
    paddingLeft: 1.5,
    paddingBottom: 2,
    backgroundColor: themes.light.button1,
    borderRadius: 20,
  },
  daysContainer: {
    flexDirection: 'row',
  },
  dayContainer: {
    alignItems: 'center',
    marginHorizontal: 5,
  },
  dateText: {
    marginBottom: 4,
    fontSize: 15,
    color: themes.light.textSecondary,
  },
  todayDateText: {
    color: themes.light.button1,
    fontWeight: 'bold',
  },
  iconCircle: {
    borderRadius: 30,
    padding: 2,
  },
  todayCircle: {
    backgroundColor: themes.light.button1 + '5',
    borderWidth: 3,
    borderColor: themes.light.button1,
    borderRadius: 30,
  },
  dayText: {
    marginTop: -5,
    fontSize: 13,
    color: themes.light.textPrimary,
  },
  todayDayText: {
    color: themes.light.button1,
    fontWeight: 'bold',
  },
  iconButtons: {
    padding: 10,
  },
  flex: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
