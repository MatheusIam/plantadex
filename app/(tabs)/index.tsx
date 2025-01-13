import { Button, Text, Image, StyleSheet, Alert, Platform } from 'react-native';
import React, { useState } from 'react';

import * as WebBrowser from 'expo-web-browser';
import { AuthProvider } from '@/components/context/AuthContext';
import { Main } from '@/components/Main';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { makeRedirectUri, useAuthRequest, useAutoDiscovery, exchangeCodeAsync } from 'expo-auth-session';

WebBrowser.maybeCompleteAuthSession();

export default function HomeScreen() {
  return (
    <AuthProvider>
      <Main />
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
