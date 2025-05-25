import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  Animated,
  Platform,
} from 'react-native';

import FirstScreen from '../aibuddy/FirstScreen';
import SecondScreen from '../../components/AIChat';
import ThirdScreen from '../aibuddy/ThirdScreen';

type ScreenType = 'first' | 'second' | 'third' | null;

const backgroundImage = require('../../assets/images/lumen.png');

export default function AibuddyHome() {
  const [selectedComponent, setSelectedComponent] = useState<ScreenType>(null);
  const animation = React.useRef(new Animated.Value(150)).current;

  useEffect(() => {
    // Animation when showing main buttons (when selectedComponent is null)
    if (selectedComponent === null) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }).start();
    }
  }, [selectedComponent]);

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'first':
        return (
          <>
            <BackButton onPress={() => setSelectedComponent(null)} />
            <FirstScreen />
          </>
        );
      case 'second':
        return (
          <>
            <BackButton onPress={() => setSelectedComponent(null)} />
            <SecondScreen />
          </>
        );
      case 'third':
        return (
          <>
            <BackButton onPress={() => setSelectedComponent(null)} />
            <ThirdScreen />
          </>
        );
      default:
        return (
          <ImageBackground
            source={backgroundImage}
            resizeMode="cover"
            style={styles.backgroundImage}
          >
            <SafeAreaView style={styles.container}>
              <Animated.View
                style={[
                  styles.buttonContainer,
                  { transform: [{ translateY: animation }] },
                ]}
              >
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => setSelectedComponent('first')}
                >
                  <Text style={styles.buttonText}>Цаг</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.button}
                  onPress={() => setSelectedComponent('second')}
                >
                  <Text style={styles.buttonText}>AI чат</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.button}
                  onPress={() => setSelectedComponent('third')}
                >
                  <Text style={styles.buttonText}>Амьсгалын дасгал</Text>
                </TouchableOpacity>
              </Animated.View>
            </SafeAreaView>
          </ImageBackground>
        );
    }
  };

  return renderComponent();
}

function BackButton({ onPress }: { onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.backButton} onPress={onPress}>
      <Text style={styles.backButtonText}>← Буцах</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 80,
  },
  buttonContainer: {
    alignItems: 'center',
    width: '100%',
  },
  button: {
    backgroundColor: 'rgba(30, 144, 255, 0.35)',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginVertical: 12,
    width: '75%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.6)',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 10,
      },
    }),
  },
  buttonText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  backButton: {
    padding: 10,
    backgroundColor: '#ffffffaa',
    borderRadius: 10,
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: '#333',
  },
});
