// MeditationCard.tsx
import { View, StyleSheet, ImageBackground, TouchableOpacity, Linking } from 'react-native';
import { TextSubheading, TextCaption } from './StyledText';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { themes } from '@/constants/Colours';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import Animated, { 
  useAnimatedStyle, 
  withTiming, 
  useSharedValue, 
  withSequence, 
} from 'react-native-reanimated';
import { router } from 'expo-router';

interface MeditationCardProps {
  title: string;
  duration: string;
  imageUrl: string;
  youtubeURL: string; 
}


export default function MeditationCard({ 
  title, 
  duration, 
  imageUrl, 
  youtubeURL 
}: MeditationCardProps) {
  const scale = useSharedValue(1);

  const navigation = useNavigation();

  const handlePress = () => {
    scale.value = withSequence(
      withTiming(0.98, { duration: 100 }),
      withTiming(1, { duration: 100 })
    );
    
  };

const handleAddvideo = () => {
  handlePress();
  router.push({
    pathname: '/components/screens/YouTubePlayerScreen',
    params: { videoUrl: youtubeURL },
  });
};


  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <TouchableOpacity onPress={handleAddvideo} activeOpacity={0.9}>
      <Animated.View style={[styles.card, animatedStyle]}>
        <ImageBackground
          source={{ uri: imageUrl }}
          style={styles.imageBackground}
          imageStyle={styles.image}
        >
          <View style={styles.overlay}>
            <View style={styles.content}>
              <TextSubheading style={styles.title}>{title}</TextSubheading>
              <TextCaption style={styles.duration}>{duration}</TextCaption>
            </View>
            <View style={styles.playButton}>
              <AntDesign name="caretright" size={24} color={themes.light.box} />
            </View>
          </View>
        </ImageBackground>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 100,
    width: 300,  
    borderRadius: Layout.borderRadius.lg,
    overflow: 'hidden',
    marginBottom: Layout.spacing.md,
    shadowColor: themes.light.textPrimary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  imageBackground: {
    width: '100%',
    height: '100%',
  },
  image: {
    borderRadius: Layout.borderRadius.lg,
  },
  overlay: {
    flex: 1,
    padding: Layout.spacing.md,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between', 
  },
  content: {
    flex: 1,
  },
  title: {
    color: Colors.lightTheme.background.primary,
    marginBottom: Layout.spacing.xs,
  },
  duration: {
    color: Colors.lightTheme.background.primary,
    opacity: 0.9,
  },
  playButton: {
    width: 60,
    height: 60,
    backgroundColor: themes.light.button1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
