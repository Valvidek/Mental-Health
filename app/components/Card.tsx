import { View, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { themes } from '@/constants/Colours';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  elevation?: 'none' | 'low' | 'medium' | 'high';
  backgroundColor?: string;
}

export default function Card({
  children,
  style,
  onPress,
  elevation = 'low',
  backgroundColor = themes.light.box,
}: CardProps) {
  const cardStyles = [
    styles.card,
    styles[`elevation${elevation.charAt(0).toUpperCase() + elevation.slice(1)}` as keyof typeof styles],
    { backgroundColor },
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity style={cardStyles} onPress={onPress} activeOpacity={0.7}>
        {children}
      </TouchableOpacity>
    );
  }

  return <View style={cardStyles}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Layout.borderRadius.lg,
    padding: Layout.spacing.md,
  },
  elevationNone: {
    // No shadow
  },
  elevationLow: {
    shadowColor: Colors.lightTheme.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  elevationMedium: {
    shadowColor: Colors.lightTheme.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  elevationHigh: {
    shadowColor: Colors.lightTheme.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
});