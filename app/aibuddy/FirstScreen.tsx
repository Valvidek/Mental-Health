import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const { width, height } = Dimensions.get('window');

const backgroundImage = require('../../assets/images/mascot.png');

export default function FirstScreen() {
  // inputSeconds-г минут, секундэд хуваая
  const [inputMinutes, setInputMinutes] = useState(0);
  const [inputSeconds, setInputSeconds] = useState(30);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerId = useRef<NodeJS.Timeout | null>(null);
  const slideAnim = useRef(new Animated.Value(width)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const totalSeconds = inputMinutes * 60 + inputSeconds;

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isRunning ? 0 : width,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [isRunning]);

  useEffect(() => {
    if (isRunning && secondsLeft > 0) {
      timerId.current = setTimeout(() => setSecondsLeft(secondsLeft - 1), 1000);
    } else if (secondsLeft === 0 && isRunning) {
      Alert.alert('⏰ Цаг дууслаа', 'Таны тохируулсан хугацаа дууслаа!');
      setIsRunning(false);
    }
    return () => {
      if (timerId.current) clearTimeout(timerId.current);
    };
  }, [secondsLeft, isRunning]);

  const startTimer = () => {
    if (totalSeconds <= 0) {
      Alert.alert('Анхаар!', '0-с дээш хугацаа тохируулна уу.');
      return;
    }
    setSecondsLeft(totalSeconds);
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
    if (timerId.current) clearTimeout(timerId.current);
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const onPressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Image source={backgroundImage} style={styles.backgroundImage} />
      <View style={styles.overlay} />
      <View style={styles.content}>
        <Text style={styles.header}>⏱ Таймер</Text>

        <Text style={styles.label}>⏳ Минут болон секунд сонгоно уу:</Text>
        <View style={styles.pickerRow}>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={inputMinutes}
              onValueChange={setInputMinutes}
              style={styles.picker}
              itemStyle={styles.pickerItem}
              enabled={!isRunning}
              dropdownIconColor="#0057b7"
            >
              {Array.from({ length: 60 }, (_, i) => i).map((value) => (
                <Picker.Item
                  key={value}
                  label={`${value} мин`}
                  value={value}
                  color={value === inputMinutes ? '#0057b7' : '#333'}
                />
              ))}
            </Picker>
          </View>

          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={inputSeconds}
              onValueChange={setInputSeconds}
              style={styles.picker}
              itemStyle={styles.pickerItem}
              enabled={!isRunning}
              dropdownIconColor="#0057b7"
            >
              {Array.from({ length: 60 }, (_, i) => i).map((value) => (
                <Picker.Item
                  key={value}
                  label={`${value} сек`}
                  value={value}
                  color={value === inputSeconds ? '#0057b7' : '#333'}
                />
              ))}
            </Picker>
          </View>
        </View>

        <Animated.View
          style={[
            styles.timerBox,
            {
              transform: [{ translateX: slideAnim }],
            },
          ]}
        >
          <Text style={styles.timerText}>
            {isRunning ? formatTime(secondsLeft) : formatTime(totalSeconds)}
          </Text>
        </Animated.View>

        <View style={styles.buttonsRow}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            style={[styles.button]}
            onPress={startTimer}
            disabled={isRunning}
          >
            <Animated.Text style={[styles.buttonText, { transform: [{ scale: scaleAnim }] }]}>
              Эхлүүлэх
            </Animated.Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.stopButton]}
            onPress={stopTimer}
            disabled={!isRunning}
          >
            <Text style={styles.buttonText}>Зогсоох</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  backgroundImage: {
    position: 'absolute',
    width,
    height,
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    width,
    height,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  header: {
    fontSize: 38,
    fontWeight: '700',
    marginBottom: 30,
    color: '#87aaff',
    textShadowColor: '#3f2b96',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 8,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
    color: '#cce0ff',
    fontWeight: '600',
  },
  pickerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 35,
  },
  pickerContainer: {
    backgroundColor: '#e0eaffdd',
    borderRadius: 18,
    marginHorizontal: 10,
    width: 110,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#aac4ff',
    shadowColor: '#5577cc',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  picker: {
    height: 160,
    width: 110,
  },
  pickerItem: {
    fontSize: 20,
  },
  timerBox: {
    backgroundColor: '#3f2b96',
    borderRadius: 24,
    marginBottom: 45,
    shadowColor: '#1f2d5f',
    shadowOpacity: 0.6,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 15,
    elevation: 10,
    paddingVertical: 25,
    paddingHorizontal: 60,
  },
  timerText: {
    fontSize: 52,
    fontWeight: '800',
    color: '#f0f8ff',
    textShadowColor: '#000080',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 7,
    textAlign: 'center',
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 260,
  },
  button: {
    backgroundColor: '#0057b7',
    borderRadius: 40,
    elevation: 5,
    paddingVertical: 14,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    width: 120,
  },
  stopButton: {
    backgroundColor: '#cc3333',
  },
  buttonText: {
    color: '#f0f8ff',
    fontSize: 20,
    fontWeight: '700',
    textShadowColor: '#003366',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
});
