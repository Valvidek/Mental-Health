import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Link, router } from 'expo-router';
import { TextTitle, TextBody, TextCaption } from '@/components/StyledText';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';
import Input from '@/components/Input';
import Button from '@/components/Button';
import { useState } from 'react';
import { Mail, Lock, User, ArrowLeft } from 'lucide-react-native';

export default function SignUpScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async () => {
    setLoading(true);
    setError(null);
    
    // TODO: Implement actual registration
    setTimeout(() => {
      setLoading(false);
      // Mock error for now
      setError('Email already in use');
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <ArrowLeft size={24} color={Colors.text.primary} />
      </TouchableOpacity>

      <View style={styles.content}>
        <TextTitle style={styles.title}>Create Account</TextTitle>
        <TextBody style={styles.subtitle}>
          Join our community and start your wellness journey
        </TextBody>

        {error && (
          <TextCaption style={styles.error}>{error}</TextCaption>
        )}

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
    </View>
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