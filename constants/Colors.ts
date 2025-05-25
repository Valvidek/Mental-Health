const tintColor = '#6949FF';

const lightTheme = {
  tint: tintColor,
  primary: {
    light: '#8E76FF',
    default: '#6949FF',
    dark: '#5939E2',
  },
  secondary: {
    light: '#BFA1FF',
    default: '#9973FF',
    dark: '#7E54F2',
  },
  accent: {
    light: '#FFD186',
    default: '#FFC35A',
    dark: '#F7AB29',
  },
  success: {
    light: '#84EBBD',
    default: '#4AD991',
    dark: '#2AB06E',
  },
  warning: {
    light: '#FFDA8C',
    default: '#FFC452',
    dark: '#F5A623',
  },
  error: {
    light: '#FF9E9E',
    default: '#FF6B6B',
    dark: '#E54B4B',
  },
  neutral: {
    50: '#F9F9FB',
    100: '#F4F4F8',
    200: '#E9EAF0',
    300: '#D8D9E3',
    400: '#B9BCCD',
    500: '#9295AB',
    600: '#6E7287',
    700: '#4D5061',
    800: '#393B48',
    900: '#25262E',
  },
  text: {
    primary: '#25262E',
    secondary: '#4A4964',
    tertiary: '#9295AB',
    inverse: '#FFFFFF',
  },
  background: {
    primary: '#F1EEF5',
    secondary: '#F9F9FB',
    tertiary: '#F4F4F8',
  },
  tabIconDefault: '#9295AB',
  tabIconSelected: '#6949FF',
  shadow: 'rgba(37, 38, 46, 0.08)',
  card: '#FFFFFF', // ✅ add this
  border: '#E0E0E0',
};

const darkTheme = {
  tint: '#8E76FF', // You can customize this
  primary: {
    light: '#B7A4FF',
    default: '#8E76FF',
    dark: '#6B53E5',
  },
  secondary: {
    light: '#CFC0FF',
    default: '#A896FF',
    dark: '#7F6ADD',
  },
  accent: {
    light: '#FFE6A3',
    default: '#FFD149',
    dark: '#E6AB00',
  },
  success: {
    light: '#A9E7C2',
    default: '#6AD38D',
    dark: '#3D9960',
  },
  warning: {
    light: '#FFE7A9',
    default: '#FFCF58',
    dark: '#D99E16',
  },
  error: {
    light: '#FFB3B3',
    default: '#FF6666',
    dark: '#CC3B3B',
  },
  neutral: {
    50: '#2A2A2A',
    100: '#1F1F1F',
    200: '#161616',
    300: '#121212',
    400: '#0E0E0E',
    500: '#0A0A0A',
    600: '#070707',
    700: '#050505',
    800: '#030303',
    900: '#000000',
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#CCCCCC',
    tertiary: '#999999',
    inverse: '#25262E',
  },
  background: {
    primary: '#121212',
    secondary: '#1E1E1E',
    tertiary: '#2A2A2A',
  },
  tabIconDefault: '#999999',
  tabIconSelected: '#8E76FF',
  shadow: 'rgba(0, 0, 0, 0.5)',
  card: '#1E1E1E', // ✅ add this
  border: '#333333',
};

const Colors = {
  lightTheme,
  darkTheme,
};

export default Colors;