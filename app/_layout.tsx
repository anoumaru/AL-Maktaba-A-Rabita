import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RTLProvider } from '../components/RTLProvider';
import React = require('react');

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <RTLProvider>
        <Stack
          screenOptions={{
            headerDirection: 'rtl',
            headerTitleAlign: 'center',
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen 
            name="book/[id]" 
            options={{ 
              title: 'القراءة',
              headerBackTitle: 'رجوع'
            }} 
          />
        </Stack>
      </RTLProvider>
    </SafeAreaProvider>
  );
} 