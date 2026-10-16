import { useRouter, type Href } from 'expo-router';
import type { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export const BrandColor = '#208AEF';
export const LinkColor = '#3c87f7';

export function BrandHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <View className="items-center gap-2">
      <View
        className="size-16 items-center justify-center rounded-2xl"
        style={{ backgroundColor: BrandColor }}>
        <Text className="text-3xl font-bold text-white">K</Text>
      </View>
      <ThemedText type="title" className="text-center">
        {title}
      </ThemedText>
      <ThemedText themeColor="textSecondary" className="text-center">
        {subtitle}
      </ThemedText>
    </View>
  );
}

export function AuthLayout({
  children,
  footer
}: {
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        className="flex-1"
        contentContainerClassName="flex-grow justify-center px-6 py-12"
        keyboardShouldPersistTaps="handled">
        <ThemedView className="w-full max-w-[400px] self-center gap-8">
          {children}
          {footer}
        </ThemedView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export function AuthFooterLink({
  prompt,
  link,
  onPress
}: {
  prompt: string;
  link: string;
  onPress: () => void;
}) {
  return (
    <View className="flex-row items-center justify-center gap-1">
      <ThemedText type="small" themeColor="textSecondary">
        {prompt}
      </ThemedText>
      <Pressable onPress={onPress}>
        <ThemedText type="smallBold" style={[{ color: LinkColor }]}>
          {link}
        </ThemedText>
      </Pressable>
    </View>
  );
}

export function FormError({ message }: { message: string }) {
  if (!message) return null;
  return <ThemedText type="small" style={{ color: '#dc2626' }}>{message}</ThemedText>;
}

export function PrimaryButton({
  label,
  onPress,
  loading
}: {
  label: string;
  onPress: () => void;
  loading?: boolean;
}) {
  return (
    <Pressable
      className="items-center justify-center rounded-2xl py-4 active:opacity-80"
      style={{ backgroundColor: BrandColor }}
      onPress={onPress}
      disabled={loading}>
      <Text className="text-base font-semibold text-white">
        {loading ? 'Please wait\u2026' : label}
      </Text>
    </Pressable>
  );
}

export function useToAuth(path: Href) {
  const router = useRouter();
  return () => router.push(path);
}