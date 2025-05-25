import { themes } from '@/constants/Colours';
import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface BoxProps {
  children: React.ReactNode;
  style?: ViewStyle;       // main box style (e.g., height, width)
  shadowColor?: string;    // optional: customize shadow color
  shadowOffset?: number;   // optional: offset distance
}

export default function Box({
  children,
  style,
  shadowColor = themes.light.shadowBox, // Default shadow color
  shadowOffset = 5, // Tailwind y-5 equivalent
}: BoxProps) {
  return (
    <View style={{ position: 'relative' }}>
      {/* Shadow layer (below) */}
      <View style={[
        styles.shadowBox,
        {
          backgroundColor: shadowColor,
          top: shadowOffset,
        },
        style,
      ]} />

      {/* Main content box (above) */}
      <View style={[styles.mainBox, style]}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    zIndex: -1,
  },
  shadowBox: {
    position: 'absolute',
    borderRadius: 10,
    zIndex: -2,
  },
});

