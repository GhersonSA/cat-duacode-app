import { View, Text, Image, ScrollView, Pressable, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FontFamily } from '@/hooks/useAppFonts';
import { COLORS } from '@/utils/constants';

const profileImg = require('@assets/perfil-dark.webp');
const logo = require('@assets/duacat-logo-1.webp');

const APP_VERSION = '1.0.0';
const BUILD_DATE = '24/02/2026';

const SKILLS = [
  { icon: 'logo-react' as const, label: 'React & React Native' },
  { icon: 'logo-nodejs' as const, label: 'Node.js & NestJS' },
  { icon: 'server-outline' as const, label: 'TypeScript & JavaScript' },
  { icon: 'git-branch-outline' as const, label: 'Git & CI/CD' },
  { icon: 'cloud-outline' as const, label: 'Docker' },
  { icon: 'layers-outline' as const, label: 'PostgreSQL & MongoDB' },
];

export const AboutScreen = () => {
  const openURL = (url: string) => Linking.openURL(url);

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false} >

        <View
          className="items-center"
          style={{
            backgroundColor: COLORS.brand.dark,
            paddingTop: 24,
            paddingBottom: 40,
            borderBottomLeftRadius: 32,
            borderBottomRightRadius: 32,
          }} >

          <View
            className="rounded-full bg-white items-center justify-center"
            style={{
              width: 130,
              height: 130,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.2,
              shadowRadius: 14,
              elevation: 10,
            }} >
            <Image
              source={profileImg}
              style={{ width: 120, height: 120, borderRadius: 60 }}
              resizeMode="cover" />
          </View>

          <Text
            className="text-2xl text-white mt-5"
            style={{ fontFamily: FontFamily.bold }} >
            Gherson Sánchez
          </Text>
          <Text
            className="text-base mt-1"
            style={{ fontFamily: FontFamily.semibold, color: COLORS.brand.light }} >
            FullStack Developer
          </Text>

          <View className="flex-row items-center gap-5 mt-4">
            <Pressable onPress={() => openURL('https://www.linkedin.com/in/gherson-sa/')} className="mr-2">
              <Ionicons name="logo-linkedin" size={24} color="#fff" />
            </Pressable>
            <Pressable onPress={() => openURL('https://github.com/GhersonSA')} className="mr-2">
              <Ionicons name="logo-github" size={24} color="#fff" />
            </Pressable>
            <Pressable onPress={() => openURL('https://ghersonsa.com/')}>
              <Ionicons name="globe-outline" size={24} color="#fff" />
            </Pressable>
          </View>

          <View className="w-full px-6 mt-6">
            <Text
              className="text-sm mb-3 text-center"
              style={{ fontFamily: FontFamily.medium, color: 'rgba(255,255,255,0.7)' }} >
              Tecnologías principales
            </Text>

            <View className="flex-row flex-wrap justify-center gap-2">
              {SKILLS.map((skill) => (
                <View
                  key={skill.label}
                  className="flex-row items-center rounded-xl px-3 py-2"
                  style={{ backgroundColor: 'rgba(255,255,255,0.12)' }} >
                  <Ionicons
                    name={skill.icon}
                    size={16}
                    color="#fff"
                    style={{ marginRight: 6 }} />
                  <Text
                    className="text-xs text-white"
                    style={{ fontFamily: FontFamily.medium }} >
                    {skill.label}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          <View className="w-full px-6 mt-6">
            <Pressable
              onPress={() => openURL('https://thecatapi.com')}
              className="rounded-2xl items-center overflow-hidden"
              style={{
                backgroundColor: COLORS.brand.light,
                paddingVertical: 18,
                paddingHorizontal: 20,
                shadowColor: COLORS.brand.DEFAULT,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.35,
                shadowRadius: 12,
                elevation: 8,
              }} >
              <Text
                className="text-sm text-center"
                style={{ fontFamily: FontFamily.bold, color: COLORS.brand.dark }} >
                TheCatAPI
              </Text>
              <Text
                className="text-xs text-center mt-1"
                style={{ fontFamily: FontFamily.regular, color: COLORS.brand.DEFAULT }} >
                Datos e imágenes proporcionados por thecatapi.com
              </Text>
              <View
                className="flex-row items-center mt-3 rounded-full px-4 py-1.5"
                style={{ backgroundColor: COLORS.brand.DEFAULT }} >
                <Text
                  className="text-xs text-white mr-1"
                  style={{ fontFamily: FontFamily.semibold }} >
                  Visitar
                </Text>
                <Ionicons name="open-outline" size={14} color="#fff" />
              </View>
            </Pressable>
          </View>
        </View>

        {/* Bottom white section */}
        <View className="items-center px-6 py-7">

          <View className="flex-row items-center gap-4 mt-4">
            <Text
              className="text-xs text-text-muted"
              style={{ fontFamily: FontFamily.regular }} >
              v{APP_VERSION}
            </Text>
            <View className="w-1 h-1 rounded-full bg-text-muted" />
            <Text
              className="text-xs text-text-muted"
              style={{ fontFamily: FontFamily.regular }} >
              {BUILD_DATE}
            </Text>
          </View>

        </View>
      </ScrollView>
    </View>
  );
};
