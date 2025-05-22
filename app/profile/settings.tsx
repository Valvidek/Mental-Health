import React, { useState, ReactNode } from 'react';
import { View, Switch, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { TextSubheading, TextCaption } from '@/app/components/StyledText';
import Colors from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemeContext } from '../context/ThemeContext';

export default function SettingsScreen() {
  const router = useRouter();
  const [dailyReminder, setDailyReminder] = useState(true);
  const { darkMode, setDarkMode } = useThemeContext();

  // Select colors based on darkMode
  const themeColors = darkMode ? Colors.darkTheme : Colors.lightTheme;

  const renderItem = (
    title: string,
    onPress?: () => void,
    rightElement?: ReactNode
  ) => {
    const content = (
      <View style={[styles.item, { backgroundColor: themeColors.background.secondary }]}>
        <TextSubheading style={[styles.itemText, { color: themeColors.text.primary }]}>
          {title}
        </TextSubheading>
        {rightElement ?? <View />}
      </View>
    );

    if (onPress) {
      return (
        <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
          {content}
        </TouchableOpacity>
      );
    }

    return content;
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: themeColors.background.primary }]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TextCaption style={[styles.sectionTitle, { color: themeColors.text.tertiary }]}>
          Account
        </TextCaption>
        {renderItem('Login Information', () => router.back())}
        {renderItem('Collection', () => router.back())}
        {renderItem('Privacy', () => router.back())}
        {renderItem(
          'Dark Mode',
          undefined,
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            thumbColor={darkMode ? themeColors.primary.default : '#f4f3f4'}
            trackColor={{ false: '#767577', true: themeColors.primary.light }}
          />
        )}

        <TextCaption style={[styles.sectionTitle, { color: themeColors.text.tertiary }]}>
          Subscription
        </TextCaption>
        {renderItem('Restore Purchases', () => router.back())}
        {renderItem('Cancel Subscription', () => router.back())}

        <TextCaption style={[styles.sectionTitle, { color: themeColors.text.tertiary }]}>
          Notification
        </TextCaption>
        {renderItem(
          'Daily Reminder',
          undefined,
          <Switch
            value={dailyReminder}
            onValueChange={setDailyReminder}
            thumbColor={dailyReminder ? themeColors.primary.default : '#f4f3f4'}
            trackColor={{ false: '#767577', true: themeColors.primary.light }}
          />
        )}
        {renderItem('Sound effect', () => router.back())}
        {renderItem('Log Out', () => router.push('/sign-in'))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 25,
    paddingBottom: 100,
  },
  sectionTitle: {
    marginTop: 24,
    marginBottom: 8,
    fontWeight: '600',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2, // Android
  },
  itemText: {
    fontSize: 14,
  },
});
