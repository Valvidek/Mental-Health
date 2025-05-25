import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function FirstScreen() {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [phase, setPhase] = useState('Амьсгалаа аваарай');

  useEffect(() => {
    const loopAnimation = () => {
      setPhase('Амьсгалаа аваарай');
      Animated.timing(scaleAnim, {
        toValue: 1.5,
        duration: 4000,
        useNativeDriver: true,
      }).start(() => {
        setPhase('Барь');
        setTimeout(() => {
          setPhase('Гаргаарай');
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 4000,
            useNativeDriver: true,
          }).start(() => {
            setTimeout(loopAnimation, 1000); // амьсгалын шинэ цикл
          });
        }, 3000); // барих хугацаа
      });
    };

    loopAnimation();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧘 Амьсгалын дасгал</Text>

      <Animated.View
        style={[
          styles.circle,
          {
            transform: [{ scale: scaleAnim }],
          },
        ]}
      />

      <Text style={styles.phaseText}>{phase}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f7ff', // цэнхэр-цагаан
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#005c99',
  },
  circle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#99ccff',
    opacity: 0.7,
    marginBottom: 30,
  },
  phaseText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#003366',
  },
});
