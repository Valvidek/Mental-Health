import { View, StyleSheet, TouchableOpacity, Platform, KeyboardAvoidingView, Alert } from 'react-native';
import { Link, router } from 'expo-router';
import { TextTitle, TextBody, TextCaption } from '@/app/components/StyledText';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import Input from '@/app/components/Input';
import Button from '@/app/components/Button';
import { useState } from 'react';
import axios from 'axios';
const LOCAL_IP = '192.168.88.207' 

const baseURL = Platform.OS === 'web'
  ? 'http://localhost:5000'
  : `http://${LOCAL_IP}:5000`;


export default function SignUpScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async () => {
    setError(null);

    if (!name || !email || !password) {
      setError('Please fill out all fields');
      return;
    }

    if (!email.includes('@')) {
      setError('Enter a valid email address');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${baseURL}/api/auth/signup`, {
        name,
        email,
        password,
      });

      console.log('✅ Signup success:', response.data.message);
      Alert.alert('Success', 'Account created. Please sign in.');
      router.push('/sign-in');
    } catch (err: any) {
      console.error('❌ Signup error:', err?.response?.data ?? err.message);
      setError(err?.response?.data?.error ?? 'Signup failed. Please try again.');
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
        {/* Back button content if any */}
      </TouchableOpacity>

      <View style={styles.content}>
        <TextTitle style={styles.title}>Create Account</TextTitle>
        <TextBody style={styles.subtitle}>
          Join our community and start your wellness journey
        </TextBody>

        {error && <TextCaption style={styles.error}>{error}</TextCaption>}

        <Input
          label="Name"
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
          leftIcon={""}
        />

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
          placeholder="Create a password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          leftIcon={""}
        />

        <Button
          title="Create Account"
          onPress={handleSignUp}
          loading={loading}
          fullWidth
          style={styles.button}
        />

        <View style={styles.footer}>
          <TextBody>Already have an account? </TextBody>
          <Link href="/sign-in" asChild>
            <TouchableOpacity>
              <TextBody style={styles.link}>Sign In</TextBody>
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
