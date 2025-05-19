import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { TextCaption, TextSubheading } from '@/components/StyledText';
import { useEffect, useState } from 'react';

import {
  ChevronRight,
  BookUser,
  Calendar,
  ShieldCheck,
  BellRing,
  Settings,
  HelpCircle,
  Crown,
} from 'lucide-react-native';
import Card from '@/components/Card';
import Colors from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import Layout from '@/constants/Layout';

export default function ProfileScreen() {
  const router = useRouter();
  const [userData, setUserData] = useState<{ id: string; name: string } | null>(null);
    const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchUser = async () => {
    try {
      const response = await fetch('http://192.168.88.92:5000/user/test@example.com');
      const data = await response.json();
      setUserData({ id: data.id, name: data.name });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  fetchUser();
}, []);




  const renderMenuItem = (icon: React.ReactNode, title: string, route?: string) => (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={() => route && router.back()}
    >
      <View style={styles.menuIcon}>{icon}</View>
      <TextCaption style={styles.menuText}>{title}</TextCaption>
      <ChevronRight size={20} color={Colors.text.tertiary} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* User Card */}
        <TextCaption style={{ marginTop: 10, marginBottom: 10 }}>Account</TextCaption>
        <View style={styles.userCard}>
          <View style={styles.userInfo}>
            <View style={styles.avatarPlaceholder} />
            <TouchableOpacity style={styles.userDetails} onPress={() => router.push('../profile/Account')}>
              <TextCaption style={styles.username}>{userData?.name || 'N/A'}</TextCaption>
              <TextCaption>ID: {userData?.id || 'Loading...'}</TextCaption>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => router.push('../profile/settings')}>
            <Settings size={20} color={Colors.text.tertiary} />
          </TouchableOpacity>
        </View>

        {/* Records */}
        <TextCaption style={{ marginTop: 0, marginBottom: 10 }}>Records</TextCaption>
        <View style={styles.statsContainer}>
          <Card style={styles.statCard}>
            <TextSubheading style={styles.statNumber}>8</TextSubheading>
            <TextCaption>Recorded Days</TextCaption>
          </Card>
          <Card style={styles.statCard}>
            <TextSubheading style={styles.statNumber}>185</TextSubheading>
            <TextCaption>Points Collected</TextCaption>
          </Card>
        </View>

        {/* Premium Card */}
        <TextCaption style={{ marginTop: 0, marginBottom: 10 }}>Subscription</TextCaption>
        <TouchableOpacity
          style={styles.premiumCard}
          onPress={() => router.push('../profile/subscription')}
        >
          <View style={{ flex: 1 }}>
            <Crown size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
              <TextSubheading
                style={{ color: '#FFFFFF', fontWeight: '400', fontSize: 16 }}
              >
                Premium Pass
              </TextSubheading>
            </View>
            <TextCaption style={{ color: '#FFFFFF' }}>Use the full potential!</TextCaption>
          </View>
          <Image source={require('@/assets/images/mascot.png')} style={styles.mascotImage} />
        </TouchableOpacity>

        {/* Menu Items */}
        {renderMenuItem(<BookUser size={20} />, 'Your Recordings', '../(tab)/calendar')}
        {renderMenuItem(<Calendar size={20} />, 'Friends', '../profile/friends')}
        {renderMenuItem(<ShieldCheck size={20} />, 'Achievements', '../profile/achievements')}

        <TextCaption style={{ marginTop: 10, marginBottom: 4 }}>More</TextCaption>
        {renderMenuItem(<BellRing size={20} />, 'Community', '../profile/community')}
        {renderMenuItem(<HelpCircle size={20} />, 'Useful Links', '../profile/help')}
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
    backgroundColor: Colors.background.primary,
  },
  scrollContainer: {
    paddingVertical: 16,
    paddingBottom: 100,
    paddingHorizontal: 25,
  },
  userCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.background.secondary,
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  mascotImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: Colors.background.secondary,
    borderRadius: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  menuIcon: {
    marginRight: 12,
  },
  menuText: {
    flex: 1,
    fontSize: 14,
  },
});
