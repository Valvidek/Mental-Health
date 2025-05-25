import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

const AccountScreen: React.FC = () => {
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
          <Text style={styles.userName}>User Name</Text>
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

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.primary,
  },
  contentContainer: {
    padding: 25,
    paddingBottom: 100,
    
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatarCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary.default,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text.primary,
  },
  userDetails: {
    fontSize: 14,
    color: Colors.text.secondary,
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 24,
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text.primary,
  },
  statLabel: {
    marginTop: 4,
    fontSize: 12,
    color: Colors.text.tertiary,
  },
  section: {
    marginTop: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: Colors.text.primary,
  },
  aboutMeText: {
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 20,
  },
  achievementsContainer: {
    marginTop: 24,
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
    backgroundColor: Colors.background.secondary,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  badgeText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    color: Colors.text.primary,
  },
});
export default UserProfileScreen;