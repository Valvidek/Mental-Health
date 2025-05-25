import { View, Text, StyleSheet, Image } from 'react-native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import { themes } from '@/constants/Colours';
import { TextTitle } from './StyledText';

interface MoodCardProps {
  image: any; 
  count: string;
}

export default function MoodCard({ image, count }: MoodCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.emojiContainer}>
        <Image source={image} style={styles.image} resizeMode="contain" />
      </View>
      <TextTitle style={styles.count}>
        {count}
      </TextTitle>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 90,
    width: 90,
    alignItems: 'center',
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 10,

  },
  emojiContainer: {
    width: 50,
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  
  },
  image: {
    width: 60,
    height: 60,
  },
  count: {
    fontSize: 16,
    textAlign: 'center',
    color: themes.light.textPrimary,
  },
});
