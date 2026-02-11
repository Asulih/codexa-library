import AppleAuthButton from "@/components/auth/AppleAuthButton";
import GoogleAuthButton from "@/components/auth/GoogleAuthButton";
import SmoothInfiniteScroll from "@/components/SmoothInfiniteScroll";
import { Colors, Fonts } from "@/constants/theme";
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function Index() {
  const backgroundColor = useThemeColor('background');

  return (
    <View style={styles.container}>
      <View style={styles.infiniteScrollContainer}>
        <View>
          <SmoothInfiniteScroll scrollDirection="down" iconSet="set1" />
        </View>
        <View>
          <SmoothInfiniteScroll scrollDirection="up" iconSet="set2" />
        </View>
        <View>
          <SmoothInfiniteScroll scrollDirection="down" iconSet="set3" />
        </View>
        <LinearGradient
          colors={['transparent', backgroundColor]}
          style={{ position: 'absolute', height: 200, left: 0, bottom: 0, right: 0}}
          />
      </View>
      <View style={styles.contentContainer}>
        <Image source={require('@/assets/images/codexaLogo.png')} style={styles.brandLogo} />
        <Animated.Text entering={FadeInDown} style={styles.tagline}>
          <Text>Code</Text><Text style={{ color: Colors.primary }}>xa</Text>
        </Animated.Text>
        {/* Login buttons */}
        <View style={styles.buttonContainer}>
          <Animated.View entering={FadeInDown.delay(100)}>
            <AppleAuthButton />
          </Animated.View>
          <Animated.View entering={FadeInDown.delay(200)}>
            <GoogleAuthButton />
          </Animated.View>
          <Animated.View entering={FadeInDown.delay(300)}>
            <Link href={'/(app)/(public)/other-options'} asChild>
              <TouchableOpacity style={styles.otherButton}>
                <Text style={styles.otherButtonText}>Other options</Text>
              </TouchableOpacity>
            </Link>
          </Animated.View>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infiniteScrollContainer: {
    flex: 0.8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    position: 'relative',
    overflow: 'hidden',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
  brandLogo: {
    width: '100%',
    height: 60,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  tagline: {
    fontSize: 40,
    fontFamily: Fonts.brandBlack,
    textAlign: 'center',
    marginBottom: 50,
    lineHeight: 36,
  },
  buttonContainer: {
    gap: 12,
    width: '100%',
  },
  otherButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 17,
    borderRadius: 12,
    gap: 4
  },
  otherButtonText: {
    color: '#666',
    fontSize: 18,
    fontWeight: '600'
  },
});
