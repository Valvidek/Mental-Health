import { View, StyleSheet, Image } from 'react-native';
import { Link } from 'expo-router';
import { TextTitle, TextBody } from '@/app/components/StyledText';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import Button from '../app/components/Button';

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TextTitle style={styles.title}>Welcome to Mindful</TextTitle>
          <TextBody style={styles.subtitle}>
            Your journey to mental wellness starts here
          </TextBody>

          <View style={styles.overlay}>
            <Image
            source={require('@/assets/images/meditate.png')}
            style={styles.image}
          />
          <View style={styles.buttonContainer}>
            <Link href="/sign-in" asChild>
              <Button 
                title="Sign-In" 
                variant="ghost"
                fullWidth
                style={styles.button}
                onPress={() => {
                }}
              />
            </Link>

            <Link href="/sign-up" asChild>
              <Button 
                title="Create Account" 
                variant="ghost"
                fullWidth
                style={styles.button}
                onPress={() => {
                }}
              />
            </Link>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightTheme.background.primary, // changed from primary
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingTop: Layout.spacing.xl,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: Layout.spacing.lg,
  },
  overlay: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.lg,
    justifyContent: 'flex-start',
  },
  title: {
    
    fontSize: 36,
    marginBottom: Layout.spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    
    marginBottom: Layout.spacing.xl,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    gap: Layout.spacing.md,

  },
  button: {
    marginBottom: Layout.spacing.sm,
    backgroundColor: Colors.lightTheme.background.secondary,
    
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2, 
  },
});
