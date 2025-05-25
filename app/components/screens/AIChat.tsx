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
  Animated,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { themes } from '@/constants/Colours';
import { GoogleGenAI } from "@google/genai";

interface Message {
  id: string;
  role: "user" | "ai" | "model";
  text: string;
  timestamp: number;
  category?: 'mental-health' | 'productivity' | 'general';
}

const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

// Enhanced system prompt for mental health and productivity
const SYSTEM_PROMPT = `You are Zen, a friendly and supportive AI companion focused on mental health and productivity. 
Your personality:
- Warm, empathetic, and encouraging
- Use gentle, positive language
- Provide practical, actionable advice
- Be mindful of mental health sensitivities
- Celebrate small wins and progress
- Offer productivity tips that prioritize wellbeing

For mental health topics:
- Listen actively and validate feelings
- Suggest coping strategies, mindfulness, or breathing exercises
- Recommend professional help when appropriate
- Never diagnose or replace professional care

For productivity topics:
- Focus on sustainable, balanced approaches
- Suggest time management and organization techniques
- Emphasize work-life balance
- Break down overwhelming tasks into manageable steps

Keep responses conversational, supportive, and under 150 words when possible.`;

const sendToGemini = async (userInput: string, messageHistory: Message[]) => {
  try {
    // Build conversation context
    const context = messageHistory.slice(-6).map(msg => 
      `${msg.role === 'user' ? 'User' : 'Zen'}: ${msg.text}`
    ).join('\n');
    
    const fullPrompt = `${SYSTEM_PROMPT}\n\nConversation context:\n${context}\n\nUser: ${userInput}\n\nZen:`;
    
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: fullPrompt,
    });
    return response.text;
  } catch (error) {
    console.error('Gemini API error:', error);
    return "I'm having trouble connecting right now. Let's try again in a moment! 💙";
  }
};

const STORAGE_KEY = 'ZEN_CHAT_MESSAGES';

// Mascot expressions based on conversation
const getMascotExpression = (lastMessage?: Message) => {
  if (!lastMessage) return '😊';
  
  const text = lastMessage.text.toLowerCase();
  if (text.includes('sad') || text.includes('stressed') || text.includes('anxious')) return '🤗';
  if (text.includes('happy') || text.includes('great') || text.includes('good')) return '😄';
  if (text.includes('tired') || text.includes('exhausted')) return '😌';
  if (text.includes('productive') || text.includes('accomplished')) return '🌟';
  return '😊';
};

// Quick action suggestions
const quickActions = [
  { id: 1, text: "How are you feeling today?", icon: "💭", category: 'mental-health' },
  { id: 2, text: "I need help with productivity", icon: "⚡", category: 'productivity' },
  { id: 3, text: "I'm feeling stressed", icon: "😰", category: 'mental-health' },
  { id: 4, text: "Help me organize my day", icon: "📋", category: 'productivity' },
  { id: 5, text: "I need motivation", icon: "🚀", category: 'general' },
];

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(true);
  const flatListRef = useRef<FlatList>(null);
  
  // Animations
  const mascotAnimation = useRef(new Animated.Value(1)).current;
  const typingAnimation = useRef(new Animated.Value(0)).current;
  const messageAnimation = useRef(new Animated.Value(0)).current;

  // Mascot floating animation
  useEffect(() => {
    const floatAnimation = () => {
      Animated.sequence([
        Animated.timing(mascotAnimation, {
          toValue: 1.1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(mascotAnimation, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]).start(() => floatAnimation());
    };
    floatAnimation();
  }, []);

  // Typing indicator animation
  useEffect(() => {
    if (isTyping) {
      const typingLoop = () => {
        Animated.sequence([
          Animated.timing(typingAnimation, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(typingAnimation, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
        ]).start(() => isTyping && typingLoop());
      };
      typingLoop();
    }
  }, [isTyping]);

  // Save messages
  const saveMessages = async (msgs: Message[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(msgs));
    } catch (e) {
      console.error('Error saving messages:', e);
    }
  };

  // Load messages
  const loadMessages = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        const loadedMessages = JSON.parse(stored);
        setMessages(loadedMessages);
        setShowQuickActions(loadedMessages.length === 0);
      } else {
        // Welcome message
        const welcomeMsg: Message = {
          id: 'welcome',
          role: 'model',
          text: "Hi there! I'm Zen, your personal wellness companion. I'm here to support your mental health and boost your productivity. How can I help you today? 😊",
          timestamp: Date.now(),
          category: 'general'
        };
        setMessages([welcomeMsg]);
        saveMessages([welcomeMsg]);
      }
    } catch (e) {
      console.error('Error loading messages:', e);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  // Animate new messages
  const animateNewMessage = () => {
    messageAnimation.setValue(0);
    Animated.spring(messageAnimation, {
      toValue: 1,
      useNativeDriver: true,
      tension: 100,
      friction: 8,
    }).start();
  };

  // Send message
  const sendMessage = async (messageText?: string) => {
    const textToSend = messageText || input.trim();
    if (!textToSend) return;

    setShowQuickActions(false);
    
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: textToSend,
      timestamp: Date.now(),
    };

    const updatedMsgs = [...messages, userMsg];
    setMessages(updatedMsgs);
    saveMessages(updatedMsgs);
    setInput('');
    setIsTyping(true);

    animateNewMessage();

    try {
      const aiResponse = await sendToGemini(textToSend, messages);
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: aiResponse || "I'm here for you! Let's try that again. 💙",
        timestamp: Date.now(),
      };

      const finalMsgs = [...updatedMsgs, aiMsg];
      setMessages(finalMsgs);
      saveMessages(finalMsgs);
      animateNewMessage();
    } catch (error) {
      console.error('Error:', error);
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "I'm experiencing some technical difficulties. Let's take a deep breath and try again! 🌱",
        timestamp: Date.now(),
      };
      const finalMsgs = [...updatedMsgs, aiMsg];
      setMessages(finalMsgs);
      saveMessages(finalMsgs);
    } finally {
      setIsTyping(false);
    }
  };

  // Delete message
  const deleteMessage = async (id: string) => {
    if (id === 'welcome') return; // Don't delete welcome message
    
    const updatedMsgs = messages.filter((msg) => msg.id !== id);
    setMessages(updatedMsgs);
    await saveMessages(updatedMsgs);
  };

  // Clear chat
  const clearChat = async () => {
    const welcomeMsg: Message = {
      id: 'welcome',
      role: 'model',
      text: "Chat cleared! I'm still here whenever you need support. How are you feeling right now? 😊",
      timestamp: Date.now(),
    };
    setMessages([welcomeMsg]);
    saveMessages([welcomeMsg]);
    setShowQuickActions(true);
  };

  // Quick actions component
  const QuickActions = () => (
    <View style={styles.quickActionsContainer}>
      <Text style={styles.quickActionsTitle}>How can I help you today?</Text>
      {quickActions.map((action) => (
        <TouchableOpacity
          key={action.id}
          style={styles.quickActionButton}
          onPress={() => sendMessage(action.text)}
        >
          <Text style={styles.quickActionIcon}>{action.icon}</Text>
          <Text style={styles.quickActionText}>{action.text}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  // Render message
  const renderItem = ({ item, index }: { item: Message; index: number }) => {
    const isUser = item.role === 'user';
    const isLastMessage = index === messages.length - 1;
    
    return (
      <Animated.View
        style={[
          styles.messageContainer,
          isUser ? styles.userMsg : styles.aiMsg,
          isLastMessage && {
            transform: [{ scale: messageAnimation }],
            opacity: messageAnimation,
          }
        ]}
      >
        {!isUser && (
          <View style={styles.mascotContainer}>
            <Animated.Text
              style={[
                styles.mascot,
                { transform: [{ scale: mascotAnimation }] }
              ]}
            >
              {getMascotExpression(messages[index - 1])}
            </Animated.Text>
          </View>
        )}
        
        <View style={styles.messageContent}>
          <Text style={[
            styles.messageText,
            isUser ? styles.userText : styles.aiText
          ]}>
            {item.text}
          </Text>
          
          {item.id !== 'welcome' && (
            <TouchableOpacity 
              onPress={() => deleteMessage(item.id)} 
              style={styles.deleteIcon}
            >
              <Ionicons name="trash-outline" size={14} color="#888" />
            </TouchableOpacity>
          )}
        </View>
      </Animated.View>
    );
  };

  // Typing indicator
  const TypingIndicator = () => (
    <Animated.View style={[styles.typingContainer, { opacity: typingAnimation }]}>
      <View style={styles.mascotContainer}>
        <Text style={styles.mascot}>🤔</Text>
      </View>
      <View style={styles.typingBubble}>
        <Text style={styles.typingText}>Zen is thinking...</Text>
        <View style={styles.typingDots}>
          <Animated.View style={[styles.dot, { opacity: typingAnimation }]} />
          <Animated.View style={[styles.dot, { opacity: typingAnimation }]} />
          <Animated.View style={[styles.dot, { opacity: typingAnimation }]} />
        </View>
      </View>
    </Animated.View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={80}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Animated.Text style={[styles.headerMascot, { transform: [{ scale: mascotAnimation }] }]}>
            😊
          </Animated.Text>
          <View>
            <Text style={styles.headerTitle}>Lumen</Text>
            <Text style={styles.headerSubtitle}>Your Wellness Companion</Text>
          </View>
        </View>
        <TouchableOpacity onPress={clearChat} style={styles.clearButton}>
          <Ionicons name="refresh-outline" size={20} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.chatContainer}
        onContentSizeChange={() =>
          flatListRef.current?.scrollToEnd({ animated: true })
        }
        showsVerticalScrollIndicator={false}
      />

      {/* Typing indicator */}
      {isTyping && <TypingIndicator />}

      {/* Quick actions */}
      {showQuickActions && messages.length <= 1 && <QuickActions />}

      {/* Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Share what's on your mind..."
          value={input}
          onChangeText={setInput}
          onSubmitEditing={() => sendMessage()}
          placeholderTextColor="#999"
          multiline
        />
        <TouchableOpacity 
          onPress={() => sendMessage()} 
          style={[styles.sendButton, !input.trim() && styles.sendButtonDisabled]}
          disabled={!input.trim()}
        >
          <Ionicons name="send" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.light.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 60,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerMascot: {
    fontSize: 32,
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: themes.light.button1,
  },
  headerSubtitle: {
    fontSize: 14,
    color: themes.light.textSecondary,
  },
  clearButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
  },
  chatContainer: {
    padding: 16,
    paddingBottom: 20,
  },
  messageContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    maxWidth: '85%',
  },
  userMsg: {
    alignSelf: 'flex-end',
    flexDirection: 'row-reverse',
  },
  aiMsg: {
    alignSelf: 'flex-start',
    color: themes.light.textPrimary,
  },
  mascotContainer: {
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  mascot: {
    fontSize: 24,
  },
  messageContent: {
    backgroundColor: 'white',
    borderRadius: 18,
    padding: 12,
    paddingRight: 30,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  userMsgmessageContent: {
    backgroundColor: '#007AFF',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userText: {
    color: themes.light.button1,
  },
  aiText: {
    color: '#333',
  },
  deleteIcon: {
    position: 'absolute',
    top: 4,
    right: 8,
    padding: 4,
  },
  typingContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  typingBubble: {
    backgroundColor: '#f0f0f0',
    borderRadius: 18,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  typingText: {
    color: '#666',
    fontSize: 14,
    marginRight: 8,
  },
  typingDots: {
    flexDirection: 'row',
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#999',
    marginHorizontal: 1,
  },
  quickActionsContainer: {
    padding: 16,
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  quickActionsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  quickActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f8f9ff',
    borderRadius: 12,
    marginBottom: 8,
  },
  quickActionIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  quickActionText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 32 : 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    backgroundColor: '#f8f9ff',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    textAlignVertical: 'center',
  },
  sendButton: {
    marginLeft: 8,
    backgroundColor: themes.light.button1,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#ccc',
  },
});