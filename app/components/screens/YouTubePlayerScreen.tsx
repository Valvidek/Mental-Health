// YouTubePlayerScreen.tsx
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { useLocalSearchParams } from 'expo-router';

export default function YouTubePlayerScreen() {
  const { videoUrl } = useLocalSearchParams<{ videoUrl: string }>();


  // Convert various YouTube URLs to embeddable format
  const getEmbedUrl = (url: string): string | null => {
    if (!url) return null;

    // Already an embed URL
    if (url.includes('youtube.com/embed/')) return url;

    // Match standard YouTube URL
    const watchMatch = url.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/);
    if (watchMatch?.[1]) {
      return `https://www.youtube.com/embed/${watchMatch[1]}`;
    }

    // Match shortened youtu.be link
    const shortMatch = url.match(/(?:https?:\/\/)?youtu\.be\/([^?&]+)/);
    if (shortMatch?.[1]) {
      return `https://www.youtube.com/embed/${shortMatch[1]}`;
    }

    return null; // Not a valid YouTube URL
  };

  const embedUrl = getEmbedUrl(videoUrl);

  if (!embedUrl) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Invalid or unsupported YouTube URL.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: embedUrl }}
        style={styles.webview}
        allowsFullscreenVideo
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  webview: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  errorText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});
