import { View, StyleSheet, TouchableOpacity, Platform, KeyboardAvoidingView, Alert } from 'react-native';
import { Link, router } from 'expo-router';
import { TextTitle, TextBody, TextCaption } from '@/components/StyledText';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { useState } from 'react';
import { Mail, Lock, User, ArrowLeft } from 'lucide-react-native';
import axios from 'axios';

const LOCAL_IP = '192.168.88.92'; // 👈 Replace with your real IP
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
      const response = await axios.post(`${baseURL}/signup`, {
        name,
        email,
        password,
      });

      console.log('✅ Signup success:', response.data.message);
      Alert.alert('Success', 'Account created. Please sign in.');
      router.push('/sign-in');
    } catch (err: any) {
      console.error('❌ Signup error:', err?.response?.data || err.message);
      setError(err?.response?.data?.error || 'Signup failed. Please try again.');
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
        <ArrowLeft size={24} color={Colors.text.primary} />
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
          leftIcon={<User size={20} color={Colors.text.tertiary} />}
        />

        <Input
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          leftIcon={<Mail size={20} color={Colors.text.tertiary} />}
        />

        <Input
          label="Password"
          placeholder="Create a password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          leftIcon={<Lock size={20} color={Colors.text.tertiary} />}
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
    backgroundColor: Colors.background.primary,
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
    color: Colors.text.secondary,
    marginBottom: Layout.spacing.xl,
  },
  error: {
    color: Colors.error.default,
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
    color: Colors.primary.default,
  },
});
