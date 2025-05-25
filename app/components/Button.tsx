import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  TouchableOpacityProps,
} from 'react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<React.ElementRef<typeof TouchableOpacity>, ButtonProps>(
  (
    {
      title,
      onPress,
      variant = 'primary',
      size = 'md',
      disabled = false,
      loading = false,
      fullWidth = false,
      style,
      textStyle,
      leftIcon,
      rightIcon,
      ...rest
    },
    ref
  ) => {
    const buttonStyles = [
      styles.button,
      styles[variant],
      styles[`${size}Button`],
      fullWidth && styles.fullWidth,
      (disabled || loading) && styles.disabled,
      style,
    ];

    const textStyles = [
      styles.text,
      styles[`${variant}Text`],
      styles[`${size}Text`],
      (disabled || loading) && styles.disabledText,
      textStyle,
    ];

    return (
      <TouchableOpacity
        ref={ref}
        style={buttonStyles}
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.7}
        {...rest}
      >
        {loading ? (
          <ActivityIndicator
            color={
              variant === 'primary'
                ? Colors.lightTheme.background.primary
                : Colors.lightTheme.primary.default
            }
            size="small"
          />
        ) : (
          <>
            {leftIcon && <>{leftIcon}</>}
            <Text style={textStyles}>{title}</Text>
            {rightIcon && <>{rightIcon}</>}
          </>
        )}
      </TouchableOpacity>
    );
  }
);

Button.displayName = 'Button';

export default Button;

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Layout.borderRadius.md,
    gap: Layout.spacing.sm,
  },
  primary: {
    backgroundColor: Colors.lightTheme.primary.default,
  },
  secondary: {
    backgroundColor: Colors.lightTheme.secondary.light,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.lightTheme.primary.default,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  smButton: {
    paddingVertical: Layout.spacing.xs,
    paddingHorizontal: Layout.spacing.md,
    borderRadius: Layout.borderRadius.sm,
  },
  mdButton: {
    paddingVertical: Layout.spacing.sm,
    paddingHorizontal: Layout.spacing.md,
  },
  lgButton: {
    paddingVertical: Layout.spacing.md,
    paddingHorizontal: Layout.spacing.lg,
  },
  text: {
    fontFamily: 'PlusJakartaSans-SemiBold',
    textAlign: 'center',
  },
  primaryText: {
    color: Colors.lightTheme.background.primary,
  },
  secondaryText: {
    color: Colors.lightTheme.background.primary,
  },
  outlineText: {
    color: Colors.lightTheme.primary.default,
  },
  ghostText: {
    color: Colors.lightTheme.primary.default,
  },
  smText: {
    fontSize: 14,
    lineHeight: 20,
  },
  mdText: {
    fontSize: 16,
    lineHeight: 24,
  },
  lgText: {
    fontSize: 18,
    lineHeight: 26,
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    backgroundColor: Colors.lightTheme.neutral[300],
    borderColor: Colors.lightTheme.neutral[300],
  },
  disabledText: {
    color: Colors.lightTheme.neutral[500],
  },
});
