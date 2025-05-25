import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextTitle } from '@/app/components/StyledText';
import { themes } from '@/constants/Colours';
import NotificationList from '@/app/components/NotificationList';

const mockNotifications = [
  {
    id: '1',
    title: 'Daily Reminder',
    message: "Don't forget to log your mood today!",
    date: new Date(),
    type: 'reminder',
    read: false,
  },
  {
    id: '2',
    title: 'Achievement Unlocked!',
    message: 'You completed a 7-day streak of mood tracking!',
    date: new Date(Date.now() - 86400000),
    type: 'achievement',
    read: true,
  },
  // Add more mock notifications as needed
];

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState(mockNotifications);

  const handleNotificationPress = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TextTitle style={styles.title}>Notifications</TextTitle>
      </View>
      <NotificationList
        notifications={notifications as any}
        onNotificationPress={handleNotificationPress}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.light.background,
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: themes.light.accent,
  },
  title: {
    fontSize: 24,
  },
});