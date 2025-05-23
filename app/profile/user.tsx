import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';


const UserProfileScreen: React.FC = () => {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      
      {/* Profile Header */}
      <View style={styles.header}>
        {/* Profile picture placeholder */}
        <View style={styles.avatarContainer}>
          <View style={styles.avatarCircle} />
        </View>
        {/* User info */}
        <View style={styles.userInfo}>
          <Text style={styles.userName}>N/A</Text>
          <Text style={styles.userDetails}>March 1, 2006</Text>
        </View>
      </View>

      {/* Stats section */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>117</Text>
          <Text style={styles.statLabel}>Days Recorded</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>185</Text>
          <Text style={styles.statLabel}>Points Collected</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>25</Text>
          <Text style={styles.statLabel}>Streak</Text>
        </View>
      </View>

      {/* About Me */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About Me</Text>
        <Text style={styles.aboutMeText}>Your personal info or bio goes here.</Text>
      </View>

      {/* Achievements */}
      <View style={styles.achievementsContainer}>
        <Text style={styles.sectionTitle}>Achievements</Text>
        <View style={styles.achievementCards}>
          <View style={styles.badge}>
            <View style={styles.badgeCircle} />
            <Text style={styles.badgeText}>Good Night!</Text>
          </View>
          <View style={styles.badge}>
            <View style={styles.badgeCircle} />
            <Text style={styles.badgeText}>Perfect Week!</Text>
          </View>
          <View style={styles.badge}>
            <View style={styles.badgeCircle} />
            <Text style={styles.badgeText}>Perfect Week!</Text>
          </View>
        </View>
      </View>
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatarCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFA500', // Orange, or replace with your avatar image
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
  },
  userDetails: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
  },
  statLabel: {
    marginTop: 4,
    fontSize: 12,
    color: '#555',
  },
  section: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#222',
  },
  aboutMeText: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
  achievementsContainer: {
    marginVertical: 20,
  },
  achievementCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  badge: {
    alignItems: 'center',
    width: '30%',
  },
  badgeCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E0E0E0', // Placeholder, replace with badge image background if needed
    marginBottom: 8,
  },
  badgeText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    color: '#222',
  },
});
export default UserProfileScreen;