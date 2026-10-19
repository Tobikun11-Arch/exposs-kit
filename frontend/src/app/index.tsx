import {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';

import {
  AuthLayout,
  AuthFooterLink,
  FormError,
  PrimaryButton,
  useToAuth
} from '@/components/auth/auth-screen';
import {FormField} from '@/components/auth/form-field';
import {ThemedText} from '@/components/themed-text';
import {useAuth} from '@/lib/auth-context';

export default function LoginScreen() {
  const {signIn} = useAuth();
  const goToSignUp = useToAuth('/signup');
  const goToForgot = useToAuth('/forgot-password');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit() {
    setError('');
    setLoading(true);
    try {
      await signIn(email.trim(), password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      footer={
        <View style={styles.footer}>
          <AuthFooterLink
            prompt="Don't have an account?"
            link="Sign up"
            onPress={goToSignUp}
          />
          <ThemedText
            type="small"
            themeColor="textSecondary"
            style={styles.forgotLink}
          >
            <Text style={styles.forgotLink} onPress={goToForgot}>
              Forgot password?
            </Text>
          </ThemedText>
        </View>
      }
    >
      <View style={styles.header}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>K</Text>
        </View>
        <ThemedText type="title" style={styles.title}>
          Exposs-kit
        </ThemedText>
        <ThemedText themeColor="textSecondary" style={styles.subtitle}>
          Welcome back! Sign in to your account.
        </ThemedText>
      </View>

      <View style={styles.form}>
        <FormField
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="you@example.com"
          keyboardType="email-address"
          autoComplete="email"
        />
        <FormField
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="Your password"
          secureTextEntry
          autoComplete="password"
          returnKeyType="done"
        />
        <FormError message={error} />
        <PrimaryButton label="Sign in" onPress={onSubmit} loading={loading} />
      </View>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  header: {alignItems: 'center', gap: 8},
  logo: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: '#208AEF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logoText: {fontSize: 30, fontWeight: '700', color: '#ffffff'},
  title: {textAlign: 'center'},
  subtitle: {textAlign: 'center'},
  form: {gap: 16},
  footer: {gap: 12, alignItems: 'center'},
  forgotLink: {color: '#3c87f7'}
});
