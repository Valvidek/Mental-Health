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
import { themes } from '@/constants/Colours';
import { GoogleGenAI } from "@google/genai";

interface Message {
  id: string;
  role: "user" | "ai" | "model";
  text: string;
}

const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const prepareUserInput = (input: string) => {
  return '* * * * *';
};

const sendToGemini = async (userInput: string) => {
  const prompt = `Та зөвхөн сэтгэл зүйн зөвлөгөө өгнө үү. Хэрэглэгчийн асуулт: ${userInput}`;
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: prompt,
  });
  return response.text;
};

const STORAGE_KEY = 'CHAT_MESSAGES';

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const flatListRef = useRef<FlatList>(null);

  // Мессеж хадгалах функц
  const saveMessages = async (msgs: Message[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(msgs));
    } catch (e) {
      console.error('Мессеж хадгалах үед алдаа гарлаа:', e);
    }
  };

  // Хадгалагдсан мессежийг ачааллах
  const loadMessages = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setMessages(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Мессеж ачаалах үед алдаа гарлаа:', e);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  // Мессеж илгээх үйлдэл
  const sendMessage = async () => {
    if (!input.trim()) return;

    // Хэрэглэгчийн бичсэн мессежийг хадгалах
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
      // Хэрэглэгчийн оролтыг *-аар солих жишээ
      const preparedInput = prepareUserInput(userMsg.text);

      // AI-с зөвлөгөө авах
      const aiResponse = await sendToGemini(preparedInput);

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

  // Мессеж устгах функц
  const deleteMessage = async (id: string) => {
    const updatedMsgs = messages.filter((msg) => msg.id !== id);
    setMessages(updatedMsgs);
    await saveMessages(updatedMsgs);
  };

  // Мессежийг жагсаалтад харуулах
  const renderItem = ({ item }: { item: Message }) => (
    <View
      style={[
        styles.messageContainer,
        item.role === 'user' ? styles.userMsg : styles.aiMsg,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
      <TouchableOpacity onPress={() => deleteMessage(item.id)} style={styles.deleteIcon}>
        <Ionicons name="trash" size={16} color="#888" />
      </TouchableOpacity>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
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

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="tsonhoor garaad user...?"
          value={input}
          onChangeText={setInput}
          onSubmitEditing={sendMessage}
          placeholderTextColor="#999"
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Ionicons name="send" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.light.background,
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
  userMsg: {
    alignSelf: 'flex-end',
    backgroundColor: themes.light.button1,
  },
  aiMsg: {
    alignSelf: 'flex-start',
    backgroundColor: '#e6e6eb',
  },
  messageText: {
    fontSize: 16,
    color: '#333',
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
    backgroundColor: '#fff',
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    paddingHorizontal: 16,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: themes.light.accent,
    borderRadius: 20,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
