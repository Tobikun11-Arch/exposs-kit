import { useRef } from 'react';
import { TextInput, View, type TextInputProps } from 'react-native';

import { useAuthFieldScroll } from '@/components/auth/auth-screen';
import { ThemedText } from '@/components/themed-text';
import { useTheme } from '@/hooks/use-theme';

type Props = {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words';
  keyboardType?: 'default' | 'email-address' | 'number-pad';
  autoComplete?: TextInputProps['autoComplete'];
  textContentType?: TextInputProps['textContentType'];
  returnKeyType?: 'next' | 'done';
  maxLength?: number;
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
  textContentType,
  returnKeyType = 'next',
  maxLength,
  editable = true
}: Props) {
  const theme = useTheme();
  const rootRef = useRef<View>(null);
  const scrollFieldIntoView = useAuthFieldScroll();

  return (
    <View ref={rootRef} className="gap-1.5">
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
        onFocus={() => scrollFieldIntoView(rootRef.current)}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        autoComplete={autoComplete}
        textContentType={textContentType}
        returnKeyType={returnKeyType}
        maxLength={maxLength}
        editable={editable}
      />
    </View>
  );
}
