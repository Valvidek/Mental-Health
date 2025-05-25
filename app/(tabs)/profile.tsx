import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, { ReactNode } from 'react';
import { useRouter } from 'expo-router';
import { TextCaption, TextSubheading } from '@/app/components/StyledText';
import Card from '@/app/components/Card';
import Colors from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useThemeContext } from '../context/ThemeContext';

export default function ProfileScreen() {
  const router = useRouter();
  const { darkMode } = useThemeContext();
  const themeColors = darkMode ? Colors.darkTheme : Colors.lightTheme;

  const renderItem = (
      title: string,
      onPress?: () => void,
      rightElement?: ReactNode
    ) => {
      const content = (
        <View style={[styles.item, { backgroundColor: themeColors.card }]}>
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
        {/* User Card */}
        <TextCaption style={[styles.sectionLabel, { color: themeColors.text.secondary }]}>
          Account
        </TextCaption>
        <View style={[styles.userCard, { backgroundColor: themeColors.card }]}>
          <View style={styles.userInfo}>
            <View style={styles.avatarPlaceholder} />
            <TouchableOpacity
              style={styles.userDetails}
              onPress={() => router.push('../profile/user')}
            >
              <TextCaption style={[styles.username, { color: themeColors.text.primary }]}>
                N/A
              </TextCaption>
              <TextCaption style={{ color: themeColors.text.secondary }}>
                ID: loading
              </TextCaption>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => router.push('../profile/settings')}>
            <Ionicons name="settings-outline" size={22} color="#776F89" />
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <TextCaption style={[styles.sectionLabel, { color: themeColors.text.secondary }]}>
          Records
        </TextCaption>
<View style={styles.statsContainer}>
  <Card
    style={{
      ...styles.statCard,
      backgroundColor: themeColors.background.secondary,
    }}
  >
    <TextSubheading
      style={{
        ...styles.statNumber,
        color: themeColors.text.primary,
      }}
    >
      8
    </TextSubheading>
    <TextCaption style={{ color: themeColors.text.secondary }}>
      Recorded Days
    </TextCaption>
  </Card>

  <Card
    style={{
      ...styles.statCard,
      backgroundColor: themeColors.background.secondary,
    }}
  >
    <TextSubheading
      style={{
        ...styles.statNumber,
        color: themeColors.text.primary,
      }}
    >
      185
    </TextSubheading>
    <TextCaption style={{ color: themeColors.text.secondary }}>
      Points Collected
    </TextCaption>
  </Card>
</View>


        {/* Subscription */}
        <TextCaption style={[styles.sectionLabel, { color: themeColors.text.secondary }]}>
          Subscription
        </TextCaption>
        <TouchableOpacity
          style={styles.premiumCard}
          onPress={() => router.push('../profile/subscription')}
        >
          <View style={{ flex: 1 }}>
            <TextSubheading style={styles.premiumTitle}>
              Premium Pass
            </TextSubheading>
            <TextCaption style={styles.premiumSubtitle}>Use the full potential!</TextCaption>
          </View>
          <Image source={require('@/assets/images/mascot.png')} style={styles.mascotImage} />
        </TouchableOpacity>

        {/* Menu Items */}
        {renderItem('Achievments', () => router.push('/'))}

        <TextCaption style={[styles.sectionLabel, { marginTop: 10, color: themeColors.text.secondary }]}>
          More
        </TextCaption>
        {renderItem('Notifications', () => router.push('/profile/notifications'))}
        {renderItem('History', () => router.push('/profile/history'))}
        {renderItem('Useful links', () => router.push('/'))}
      </ScrollView>
    </SafeAreaView>
  );
}

const shadow = Platform.select({
  ios: {
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  android: {
    elevation: 4,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingVertical: 16,
    paddingBottom: 100,
    paddingHorizontal: 25,
  },
  sectionLabel: {
    marginBottom: 10,
  },
  userCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    ...shadow,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E87C29',
    marginRight: 12,
  },
  userDetails: {},
  username: {
    fontWeight: '600',
    fontSize: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginHorizontal: 4,
    ...shadow,
  },
  statNumber: {
    fontSize: 15,
    fontWeight: '600',
  },
  premiumCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: '#776F89',
    height: 120,
    ...shadow,
  },
  premiumTitle: {
    color: '#FFFFFF',
    fontWeight: '400',
    fontSize: 16,
    marginBottom: 4,
  },
  premiumSubtitle: {
    color: '#FFFFFF',
  },
  mascotImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
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
