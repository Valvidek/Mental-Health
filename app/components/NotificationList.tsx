import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { TextTitle, TextCaption } from './StyledText';
import { themes } from '@/constants/Colours';
import Box from './Box';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';

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
  const renderItem = ({ item }: { item: Notification }) => (
    <TouchableOpacity onPress={() => onNotificationPress(item.id)}>
      <View style={[styles.notification, !item.read && styles.unread]}>
        <View style={styles.iconContainer}>
          {getNotificationIcon(item.type)}
        </View>
        
        <View style={styles.content}>
          <TextTitle style={styles.title}>{item.title}</TextTitle>
          <TextCaption style={styles.message}>{item.message}</TextCaption>
          <TextCaption style={styles.date}>
            {format(new Date(item.date), 'MMM d, h:mm a')}
          </TextCaption>
        </View>
      </View>
    </TouchableOpacity>
  );

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'reminder':
        return <Ionicons name="notifications" size={24} color={themes.light.orange} />;
      case 'achievement':
        return <Ionicons name="trophy" size={24} color={themes.light.green} />;
      case 'tip':
        return <Ionicons name="bulb" size={24} color={themes.light.indigo} />;
    }
  };

  return (
    <FlatList
      data={notifications}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.container}
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
  },
  unread: {
    backgroundColor: themes.light.background,
    borderLeftWidth: 4,
    borderLeftColor: themes.light.button1,
  },
  iconContainer: {
    marginRight: 12,
    padding: 8,
    borderRadius: 12,
    backgroundColor: themes.light.box,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    marginBottom: 4,
  },
  message: {
    color: themes.light.textSecondary,
    marginBottom: 8,
  },
  date: {
    color: themes.light.textTertiary,
    fontSize: 12,
  },
});