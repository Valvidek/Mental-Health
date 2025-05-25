import { Tabs } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { themes } from '@/constants/Colours';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Entypo from '@expo/vector-icons/Entypo';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: themes.light.button1,
        tabBarInactiveTintColor: themes.light.textTertiary,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="space-dashboard" size={32} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="statistics"
        options={{
          title: '',
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="chart-simple" size={30} color={color} />
          ),
        }}
      />
      {/* aibuddy нь өөрийнхөө дотор дэлгэцүүдийг animation-тайгаар өөрчилнө */}
      <Tabs.Screen
        name="aibuddy"
        options={{
          title: '',
          tabBarIcon: ({ color }) => (
            <View style={styles.aibuddyIconWrapper}>
              <FontAwesome name="paw" size={45} color="white" />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: '',
          tabBarIcon: ({ color }) => (
            <Entypo name="calendar" size={30} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: '',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user" size={32} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'white',
    height: 70,
    paddingBottom: 5,
    paddingTop: 10,
    zIndex: 100,
  },
  tabBarLabel: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 12,
  },
  aibuddyIconWrapper: {
    backgroundColor: themes.light.button1,
    alignItems: 'center',
    height: 70,
    width: 70,
    padding: 10,
    borderRadius: 50,
    marginTop: -22,
  },
});
