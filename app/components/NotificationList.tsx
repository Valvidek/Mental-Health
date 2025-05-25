import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { TextTitle, TextCaption } from './StyledText';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { useThemeContext } from '../context/ThemeContext';
import Colors from '@/constants/Colors';

interface Notification {
  id: string;
  title: string;
  message: string;
  date: Date;
  type: 'reminder' | 'achievement' | 'tip';
  read: boolean;
}

interface NotificationListProps {
  notifications: Notification[];
  onNotificationPress: (id: string) => void;
}

export default function NotificationList({ notifications, onNotificationPress }: NotificationListProps) {
  const { darkMode } = useThemeContext();
  const themeColors = darkMode ? Colors.darkTheme : Colors.lightTheme;

  const renderItem = ({ item }: { item: Notification }) => (
    <TouchableOpacity onPress={() => onNotificationPress(item.id)}>
      <View style={StyleSheet.flatten([
        styles.notification,
        { backgroundColor: themeColors.card },
        !item.read && {
          borderLeftColor: themeColors.primary.default,
          borderLeftWidth: 4,
        }
      ])}>
        <View style={[styles.iconContainer, { backgroundColor: themeColors.background.tertiary }]}>
          {getNotificationIcon(item.type)}
        </View>

        <View style={styles.content}>
          <TextTitle style={[styles.title, { color: themeColors.text.primary }]}>
            {item.title}
          </TextTitle>
          <TextCaption style={[styles.message, { color: themeColors.text.secondary }]}>
            {item.message}
          </TextCaption>
          <TextCaption style={[styles.date, { color: themeColors.text.tertiary }]}>
            {format(new Date(item.date), 'MMM d, h:mm a')}
          </TextCaption>
        </View>
      </View>
    </TouchableOpacity>
  );

  const getNotificationIcon = (type: Notification['type']) => {
    const iconColorMap = {
      reminder: themeColors.accent.default,
      achievement: themeColors.success.default,
      tip: themeColors.primary.default,
    };

    return <Ionicons name={getIconName(type)} size={24} color={iconColorMap[type]} />;
  };

  const getIconName = (type: Notification['type']) => {
    switch (type) {
      case 'reminder':
        return 'notifications';
      case 'achievement':
        return 'trophy';
      case 'tip':
        return 'bulb';
      default:
        return 'notifications-outline';
    }
  };

  return (
    <FlatList
      data={notifications}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      contentContainerStyle={[styles.container, { backgroundColor: themeColors.background.primary }]}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
  },
  notification: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 12,
    borderRadius: 12,
  },
  iconContainer: {
    marginRight: 12,
    padding: 8,
    borderRadius: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    marginBottom: 4,
  },
  message: {
    marginBottom: 8,
  },
  date: {
    fontSize: 12,
  },
});
