import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import Contents from '../components/Contents';
import AIChat from '../components/screens/AIChat';
import MeditationScreen from '../components/screens/MeditationScreen';
import RewardScreen from '../components/screens/RewardScreen';
import BreathingExercises from '../components/screens/BreathingExercise';

export type ScreenType = 'home' | 'breathing' | 'meditation' | 'reward' | 'chat';

export default function MeditationApp() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [selectedMinutes, setSelectedMinutes] = useState(10);
  const [completedSessions, setCompletedSessions] = useState(0);

  const navigateToScreen = (screen: ScreenType) => {
    setCurrentScreen(screen);
  };

  const handleSessionComplete = () => {
    setCompletedSessions(prev => prev + 1);
    navigateToScreen('reward');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      {currentScreen === 'home' && (
        <Contents 
          onNavigate={navigateToScreen}
          selectedMinutes={selectedMinutes}
          setSelectedMinutes={setSelectedMinutes}
          completedSessions={completedSessions}
        />
      )}
      {currentScreen === 'breathing' && (
        <BreathingExercises
          duration={selectedMinutes}
          onComplete={handleSessionComplete}
          onExit={() => navigateToScreen('home')}
        />
      )}
      {currentScreen === 'meditation' && (
        <MeditationScreen
          duration={selectedMinutes}
          onComplete={handleSessionComplete}
          onExit={() => navigateToScreen('home')}
        />
      )}
      {currentScreen === 'chat' && (
        <AIChat

        />
      )}
      {currentScreen === 'reward' && (
        <RewardScreen
          onContinue={() => navigateToScreen('home')}
          completedSessions={completedSessions}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});