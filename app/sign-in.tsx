import { View, StyleSheet, TouchableOpacity, Platform, KeyboardAvoidingView, Alert } from 'react-native';
import { Link, router } from 'expo-router';
import { TextTitle, TextBody, TextCaption } from '@/app/components/StyledText';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import Input from '@/app/components/Input';
import Button from '@/app/components/Button';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LOCAL_IP = '10.0.4.143' // 👈 IP-г өөрийнхөө дагуу солиорой

const LOCAL_IP = '192.168.88.92'; 
const baseURL = Platform.OS === 'web'
  ? 'http://localhost:5000'
  : `http://${LOCAL_IP}:5000`;


export default function SignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

const handleSignIn = async () => {
  setError(null);

  if (!email || !password) {
    setError('Please enter both email and password');
    return;
  }

  setLoading(true);

  try {
    const response = await fetch(`${baseURL}/api/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Sign-in failed');
    }

    const userId = data.user?.id || data.user?._id;

    if (userId) {
      await AsyncStorage.setItem('userId', userId);
    }

    const hasAnswered = data.user?.hasAnsweredQuestions;

    if (hasAnswered) {
      router.replace('/(tabs)');
    } else {
      router.replace('/emotion/0');
    }

  } catch (err: any) {
    console.error('❌ Sign-in error:', err.message);
    setError(err.message || 'Unable to sign in');
  } finally {
    setLoading(false);
  }
};

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        
      </TouchableOpacity>

      <View style={styles.content}>
        <TextTitle style={styles.title}>Welcome Back</TextTitle>
        <TextBody style={styles.subtitle}>
          Sign in to continue your journey to mental wellness
        </TextBody>

        {error && <TextCaption style={styles.error}>{error}</TextCaption>}

        <Input
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          leftIcon={""}
        />

        <Input
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          leftIcon={""}
        />

        <Button
          title="Sign In"
          onPress={handleSignIn}
          loading={loading}
          fullWidth
          style={styles.button}
        />

        <View style={styles.footer}>
          <TextBody>Don't have an account? </TextBody>
          <Link href="../sign-up" asChild>
            <TouchableOpacity>
              <TextBody style={styles.link}>Sign Up</TextBody>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightTheme.background.primary,
  },
  backButton: {
    padding: Layout.spacing.lg,
  },
  content: {
    flex: 1,
    padding: Layout.spacing.lg,
    justifyContent: 'center',
  },
  title: {
    marginBottom: Layout.spacing.sm,
  },
  subtitle: {
    color: Colors.lightTheme.text.secondary,
    marginBottom: Layout.spacing.xl,
  },
  error: {
    color: Colors.lightTheme.error.default,
    marginBottom: Layout.spacing.md,
  },
  button: {
    marginTop: Layout.spacing.lg,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Layout.spacing.xl,
  },
  link: {
    color: Colors.lightTheme.primary.default,
  },
});
