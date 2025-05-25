export const themes = {
    light: {
      background: '#F1EEF5',
      textPrimary: '#4A4964',
      textSecondary: '#717090',
      textTertiary: '#AEADC1',
      box: '#FFFFFF',
      accent: '#BDC6DE',
      misc: '#D4D3DF',
      shadowBox: '#C7C4D1',
  
      // Complementary (shared) colors
      orange: '#EF8834',
      yellow: '#F9CC15',
      green: '#9BB067',
      cyan: '#70BDBD',
      indigo: '#A688FD',
      brown: '#916146',
      red: '#FF7979',
      mascot1: '#879FFD',
      mascot2: '#FF5A5A',
      mascot3: '#B7D1FD',
      button1: '#755af4',
      button2: '#FF5A5A',
    },
  
    green: {
      background: '#F4F5EE',
      textPrimary: '#566449',
      textSecondary: '#819070',
      textTertiary: '#B7C1AD',
      box: '#FFFFFF',
      accent: '#BDDEBF',
      misc: '#D6DFD3',
  
      // Complementary (shared) colors
      orange: '#EF8834',
      yellow: '#F9CC15',
      green: '#9BB067',
      cyan: '#70BDBD',
      indigo: '#A688FD',
      brown: '#916146',
      red: '#FF7979',
      mascot1: '#879FFD',
      mascot2: '#FF5A5A',
      mascot3: '#B7D1FD',
      button1: '#8D78FF',
      button2: '#FF5A5A',
    },
  
    dark: {
      background: '#403D45',
      textPrimary: '#AC82FF',
      textSecondary: '#E8DFFB',
      textTertiary: '#B4A9CA',
      box: '#605A6C',
      accent: '#8F7FB5',
      misc: '#776F89',
  
      // Complementary (shared) colors
      orange: '#EF8834',
      yellow: '#F9CC15',
      green: '#9BB067',
      cyan: '#70BDBD',
      indigo: '#A688FD',
      brown: '#916146',
      red: '#FF7979',
      mascot1: '#879FFD',
      mascot2: '#FF5A5A',
      mascot3: '#B7D1FD',
      button1: '#8D78FF',
      button2: '#FF5A5A',
    },
  };
  
  export type ThemeName = keyof typeof themes;
  export type ThemeColors = typeof themes.light;
  