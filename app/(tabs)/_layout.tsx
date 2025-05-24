import { Tabs } from 'expo-router';
import { BackHandler, StyleSheet, View } from 'react-native';
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
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="space-dashboard" size={32} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: '',
          tabBarIcon: ({ color, size }) => (
            <Entypo name="book" size={32} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="aibuddy"
        options={{
          title: '',
          tabBarIcon: ({ color, size }) => (
            <View style={styles.aibuddyIconWrapper}>
              <FontAwesome name="paw" size={45} color="white" />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="statistics"
        options={{
          title: '',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome6 name="chart-simple" size={30} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: '',
          tabBarIcon: ({ color, size }) => (
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
  paddingBottom: 7,
  paddingTop: 10,
  borderRadius: 20,
  marginHorizontal: 10,
  bottom: 10,
  // overflow: 'hidden',  <-- remove this line
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 5 },
  shadowOpacity: 0.1,
  shadowRadius: 10,
  elevation: 5,
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
