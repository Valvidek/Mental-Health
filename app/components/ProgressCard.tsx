import { View, StyleSheet, ImageStyle } from 'react-native';
import { TextSubheading, TextCaption, TextBody } from './StyledText';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import Card from './Card';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withTiming,
  useDerivedValue,
} from 'react-native-reanimated';
import { useEffect } from 'react';

interface ProgressCardProps {
  title: string;
  value: number;
  target: number;
  unit?: string;
  description?: string;
}

export default function ProgressCard({ 
  title, 
  value, 
  target, 
  unit = '', 
  description 
}: ProgressCardProps) {
  const percentage = value / target * 100;
  const progress = useSharedValue(0);
  
  useEffect(() => {
    progress.value = withTiming(percentage > 100 ? 100 : percentage, { duration: 1000 });
  }, [percentage]);

  const width = useDerivedValue(() => {
    return `${progress.value}%`;
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: width.value,
    } as ImageStyle;
  });

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <TextSubheading>{title}</TextSubheading>
        <TextBody style={styles.valueText}>
          {value}{unit} <TextCaption>/ {target}{unit}</TextCaption>
        </TextBody>
      </View>
      
      <View style={styles.progressContainer}>
        <Animated.View style={[styles.progressBar, animatedStyle]} />
      </View>
      
      {description && (
        <TextCaption style={styles.description}>{description}</TextCaption>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: Layout.spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.md,
  },
  valueText: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    color: Colors.lightTheme.primary.default,
  },
  progressContainer: {
    height: 8,
    backgroundColor: Colors.lightTheme.neutral[200],
    borderRadius: Layout.borderRadius.full,
    marginBottom: Layout.spacing.sm,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: Colors.lightTheme.primary.default,
    borderRadius: Layout.borderRadius.full,
  },
  description: {
    color: Colors.lightTheme.text.secondary,
  },
});