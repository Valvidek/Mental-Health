import { Text, TextProps, StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';

export function TextRegular(props: TextProps) {
  return <Text {...props} style={[styles.regular, props.style]} />;
}

export function TextMedium(props: TextProps) {
  return <Text {...props} style={[styles.medium, props.style]} />;
}

export function TextSemiBold(props: TextProps) {
  return <Text {...props} style={[styles.semiBold, props.style]} />;
}

export function TextBold(props: TextProps) {
  return <Text {...props} style={[styles.bold, props.style]} />;
}

export function TextTitle(props: TextProps) {
  return <Text {...props} style={[styles.title, props.style]} />;
}

export function TextHeading(props: TextProps) {
  return <Text {...props} style={[styles.heading, props.style]} />;
}

export function TextSubheading(props: TextProps) {
  return <Text {...props} style={[styles.subheading, props.style]} />;
}

export function TextBody(props: TextProps) {
  return <Text {...props} style={[styles.body, props.style]} />;
}

export function TextCaption(props: TextProps) {
  return <Text {...props} style={[styles.caption, props.style]} />;
}

export function TextSmall(props: TextProps) {
  return <Text {...props} style={[styles.small, props.style]} />;
}

const styles = StyleSheet.create({
  regular: {
    fontFamily: 'PlusJakartaSans-Regular',

  },
  medium: {
    fontFamily: 'PlusJakartaSans-Medium',

  },
  semiBold: {
    fontFamily: 'PlusJakartaSans-SemiBold',

  },
  bold: {
    fontFamily: 'PlusJakartaSans-Bold',

  },
  title: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 28,
    lineHeight: 34,

  },
  heading: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 24,
    lineHeight: 29,

  },
  subheading: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    fontSize: 20,
    lineHeight: 24,

  },
  body: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 16,
    lineHeight: 24,

  },
  caption: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 14,

  },
  small: {
    fontFamily: 'PlusJakartaSans-Regular',
    fontSize: 12,
    lineHeight: 16,

  },
});