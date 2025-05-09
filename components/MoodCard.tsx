import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { TextBody, TextCaption } from './StyledText';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import Animated, {
  useAnimatedStyle,
  withTiming,
  useSharedValue,
  withSequence,
} from 'react-native-reanimated';

interface MoodCardProps {
  image: any; // require() image or valid source
  label: string;
  selected?: boolean;
  onPress: () => void;
}

export default function MoodCard({ image, label, selected = false, onPress }: MoodCardProps) {
  const scale = useSharedValue(1);

  const handlePress = () => {
    scale.value = withSequence(
      withTiming(0.95, { duration: 100 }),
      withTiming(1.05, { duration: 100 }),
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
      <Animated.View style={[
        styles.card,
        selected ? styles.selected : {},
        animatedStyle
      ]}>
        <View style={styles.emojiContainer}>
          {/* Use require() for local images */}
          <Image source={image} style={styles.image} resizeMode="contain" />
        </View>
        <TextCaption style={[
          styles.label,
          selected ? styles.selectedLabel : {}
        ]}>
          {label}
        </TextCaption>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 90,
    alignItems: 'center',
    padding: Layout.spacing.sm,
    backgroundColor: Colors.background.secondary,
    borderRadius: Layout.borderRadius.md,
    borderWidth: 2,
    borderColor: Colors.background.secondary,
  },
  selected: {
    borderColor: Colors.primary.default,
    backgroundColor: Colors.primary.light + '20', // 20% opacity
  },
  emojiContainer: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background.primary,
    borderRadius: Layout.borderRadius.full,
    marginBottom: Layout.spacing.xs,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 40,
    height: 40,
  },
  label: {
    textAlign: 'center',
    color: Colors.text.secondary,
  },
  selectedLabel: {
    color: Colors.primary.default,
    fontFamily: 'PlusJakartaSans-SemiBold',
  },
});
