import { TextInput, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';

type Props = {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words';
  keyboardType?: 'default' | 'email-address';
  autoComplete?: 'email' | 'password' | 'username' | 'name';
  returnKeyType?: 'next' | 'done';
  editable?: boolean;
};

export function FormField({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  autoCapitalize = 'none',
  keyboardType = 'default',
  autoComplete,
  returnKeyType = 'next',
  editable = true
}: Props) {
  const theme = useTheme();

  return (
    <View className="gap-1.5">
      <ThemedText type="smallBold">{label}</ThemedText>
      <TextInput
        className="rounded-2xl px-4 py-4 text-base"
        style={{
          backgroundColor: theme.backgroundElement,
          color: theme.text,
          opacity: editable ? 1 : 0.6
        }}
        placeholder={placeholder}
        placeholderTextColor={theme.textSecondary}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        autoComplete={autoComplete}
        returnKeyType={returnKeyType}
        editable={editable}
      />
    </View>
  );
}