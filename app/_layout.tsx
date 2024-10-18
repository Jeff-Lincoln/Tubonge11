import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { Button, View } from 'react-native';
import { VideoProcessor } from '@videosdk.live/react-native-webrtc'; // Import the VideoProcessor module
import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }

    // Apply the video processor when the app starts
    applyProcessor();

    // Cleanup: Remove the video processor when the component unmounts
    return () => {
      removeProcessor();
    };
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  // Function to apply the custom video processor
  const applyProcessor = () => {
    VideoProcessor.applyVideoProcessor('MyCustomProcessor'); // Use the registered processor name
  };

  // Function to remove the custom video processor
  const removeProcessor = () => {
    VideoProcessor.removeVideoProcessor();
  };

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>

      {/* Optional: Add buttons to manually apply/remove processor for testing */}
      <View style={{ position: 'absolute', bottom: 20, left: 20 }}>
        <Button title="Apply Video Processor" onPress={applyProcessor} />
        <Button title="Remove Video Processor" onPress={removeProcessor} />
      </View>
    </ThemeProvider>
  );
}
