import { View, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FontFamily } from '@/hooks/useAppFonts';
import { COLORS } from '@/utils/constants';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export const SearchBar = ({ value, onChangeText, placeholder = 'Buscar...' }: SearchBarProps) => (
  <View className="flex-row items-center bg-white rounded-2xl border border-brand-light px-4 h-14">
    <Ionicons name="search-outline" size={22} color={COLORS.text.muted} />
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={COLORS.text.muted}
      className="flex-1 ml-3 text-base text-text-main"
      style={{ fontFamily: FontFamily.regular, lineHeight: 20 }}
      autoCorrect={false}
      autoCapitalize="none" />
    {value.length > 0 && (
      <Ionicons
        name="close-circle"
        size={22}
        color={COLORS.text.muted}
        onPress={() => onChangeText('')} />
    )}
  </View>
);
