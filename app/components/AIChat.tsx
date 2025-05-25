import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useThemeContext } from '../context/ThemeContext';
import Colors from '@/constants/Colors';
import { GoogleGenAI } from '@google/genai';

interface Message {
  id: string;
  role: 'user' | 'ai' | 'model';
  text: string;
}

const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY!;
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const sendToGemini = async (userInput: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: userInput,
  });
  return response.text;
};

const STORAGE_KEY = 'CHAT_MESSAGES';

export default function AIChat() {
  const { darkMode } = useThemeContext();
  const themeColors = darkMode ? Colors.darkTheme : Colors.lightTheme;

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const flatListRef = useRef<FlatList>(null);

  const saveMessages = async (msgs: Message[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(msgs));
    } catch (e) {
      console.error('Error saving messages:', e);
    }
  };

  const loadMessages = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setMessages(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Error loading messages:', e);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: input.trim(),
    };

    const updatedMsgs = [...messages, userMsg];
    setMessages(updatedMsgs);
    saveMessages(updatedMsgs);
    setInput('');

    try {
      const aiResponse = await sendToGemini(userMsg.text);
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: aiResponse || '⚠️ Хариу ирсэнгүй.',
      };

      const finalMsgs = [...updatedMsgs, aiMsg];
      setMessages(finalMsgs);
      saveMessages(finalMsgs);
    } catch (error) {
      console.error('Gemini API алдаа:', error);
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        text: '⚠️ Алдаа гарлаа. Дахин оролдоно уу.',
      };
      const finalMsgs = [...updatedMsgs, aiMsg];
      setMessages(finalMsgs);
      saveMessages(finalMsgs);
    }
  };

  const deleteMessage = async (id: string) => {
    const updatedMsgs = messages.filter((msg) => msg.id !== id);
    setMessages(updatedMsgs);
    await saveMessages(updatedMsgs);
  };

  const renderItem = ({ item }: { item: Message }) => (
    <View
      style={[
        styles.messageContainer,
        {
          alignSelf: item.role === 'user' ? 'flex-end' : 'flex-start',
          backgroundColor:
            item.role === 'user'
              ? themeColors.primary.default
              : themeColors.background.tertiary,
        },
      ]}
    >
      <Text style={[styles.messageText, { color: themeColors.text.primary }]}>
        {item.text}
      </Text>
      <TouchableOpacity onPress={() => deleteMessage(item.id)} style={styles.deleteIcon}>
        <Ionicons name="trash" size={16} color={themeColors.text.tertiary} />
      </TouchableOpacity>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: themeColors.background.primary }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={80}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.chatContainer}
        onContentSizeChange={() =>
          flatListRef.current?.scrollToEnd({ animated: true })
        }
      />

      <View style={[styles.inputContainer, { backgroundColor: themeColors.background.secondary, borderTopColor: themeColors.border }]}>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: themeColors.background.tertiary,
              color: themeColors.text.primary,
            },
          ]}
          placeholder="Асуух зүйлээ бичнэ үү..."
          value={input}
          onChangeText={setInput}
          onSubmitEditing={sendMessage}
          placeholderTextColor={themeColors.text.tertiary}
        />
        <TouchableOpacity
          onPress={sendMessage}
          style={[styles.sendButton, { backgroundColor: themeColors.accent.default }]}
        >
          <Ionicons name="send" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatContainer: {
    padding: 16,
    paddingBottom: 80,
  },
  messageContainer: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
    position: 'relative',
  },
  messageText: {
    fontSize: 16,
  },
  deleteIcon: {
    position: 'absolute',
    bottom: 6,
    right: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    padding: 10,
    width: '100%',
    borderTopWidth: 1,
  },
  input: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 16,
  },
  sendButton: {
    marginLeft: 10,
    borderRadius: 20,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
