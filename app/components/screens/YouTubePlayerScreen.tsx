import React from 'react';
import { Platform, View, Text, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { useLocalSearchParams } from 'expo-router';

export default function YouTubePlayerScreen() {
  const { videoUrl } = useLocalSearchParams<{ videoUrl: string }>();

  const getEmbedUrl = (url: string): string | null => {
    if (!url) return null;
    if (url.includes('youtube.com/embed/')) return url;

    const watchMatch = url.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/);
    if (watchMatch?.[1]) return `https://www.youtube.com/embed/${watchMatch[1]}`;

    const shortMatch = url.match(/(?:https?:\/\/)?youtu\.be\/([^?&]+)/);
    if (shortMatch?.[1]) return `https://www.youtube.com/embed/${shortMatch[1]}`;

    return null;
  };

  const embedUrl = getEmbedUrl(videoUrl);

  if (!embedUrl) {
    return (
      <View style={styles.centered}>
        <Text>Invalid YouTube URL</Text>
      </View>
    );
  }

  if (Platform.OS === 'web') {
    return (
      <View style={styles.webContainer}>
        <iframe
          width="100%"
          height="100%"
          src={embedUrl}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ border: 'none' }}
        />
      </View>
    );
  }

  return (
    <WebView
      source={{ uri: embedUrl }}
      style={{ flex: 1 }}
      allowsFullscreenVideo
    />
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  webContainer: {
    flex: 1,
    padding: 10,
  },
});
