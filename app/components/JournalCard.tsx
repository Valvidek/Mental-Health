import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { TextBody, TextCaption, TextSmall } from './StyledText';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import Animated, { 
  useAnimatedStyle, 
  withTiming, 
  useSharedValue, 
  withSequence, 
} from 'react-native-reanimated';

interface JournalCardProps {
  title: string;
  preview: string;
  date: string;
  mood?: string;
  onPress: () => void;
}

export default function JournalCard({ 
  title, 
  preview, 
  date, 
  mood, 
  onPress 
}: JournalCardProps) {
  const scale = useSharedValue(1);
  
  const handlePress = () => {
    scale.value = withSequence(
      withTiming(0.98, { duration: 100 }),
      withTiming(1, { duration: 100 })
    );
    onPress();
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
      <Animated.View style={[styles.card, animatedStyle]}>
        <View style={styles.header}>
          <TextBody style={styles.title} numberOfLines={1}>{title}</TextBody>
          <TextSmall style={styles.date}>{date}</TextSmall>
        </View>
        <TextCaption style={styles.preview} numberOfLines={2}>{preview}</TextCaption>
        {mood && (
          <View style={styles.moodContainer}>
            <TextSmall style={styles.moodLabel}>Mood:</TextSmall>
            <TextCaption style={styles.mood}>{mood}</TextCaption>
          </View>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.lightTheme.background.primary,
    borderRadius: Layout.borderRadius.md,
    padding: Layout.spacing.md,
    marginBottom: Layout.spacing.md,
    shadowColor: Colors.lightTheme.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: Colors.lightTheme.primary.default,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.xs,
  },
  title: {
    flex: 1,
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
  date: {
    color: Colors.lightTheme.text.tertiary,
  },
  preview: {
    color: Colors.lightTheme.text.secondary,
    marginBottom: Layout.spacing.sm,
  },
  moodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moodLabel: {
    color: Colors.lightTheme.text.tertiary,
    marginRight: Layout.spacing.xs,
  },
  mood: {
    color: Colors.lightTheme.primary.default,
    fontFamily: 'PlusJakartaSans-Medium',
  },
});