import { Tabs } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Entypo from '@expo/vector-icons/Entypo';
import Colors from '@/constants/Colors';
import { useThemeContext } from '../context/ThemeContext';
import { themes } from '@/constants/Colours';

export default function TabLayout() {
  const { darkMode } = useThemeContext();
  const themeColors = darkMode ? Colors.darkTheme : Colors.lightTheme;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: themeColors.secondary.default,
        tabBarInactiveTintColor: themeColors.text.tertiary,
        tabBarStyle: {
          height: 70,
          paddingBottom: 7,
          paddingTop: 10,
          borderRadius: 20,
          marginHorizontal: 10,
          bottom: 10,
          backgroundColor: themeColors.background.secondary,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 5 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
          elevation: 5,
        },
        tabBarLabelStyle: {
          fontFamily: 'PlusJakartaSans-Medium',
          fontSize: 12,
        },
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
        name="library"
        options={{
          title: '',
          tabBarIcon: ({ color }) => (
            <Entypo name="book" size={32} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="aibuddy"
        options={{
          title: '',
          tabBarIcon: () => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                height: 70,
                width: 70,
                padding: 10,
                borderRadius: 50,
                marginTop: -22,
                backgroundColor: themeColors.primary.default,
              }}
            >
              <FontAwesome name="paw" size={45} color="white" />
            </View>
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
