import { useRouter, useLocalSearchParams } from 'expo-router';
import Question from '@/app/components/Question';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, Text, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LOCAL_IP = '192.168.88.207';
const questions = [
  'Та хэр их уурладаг вэ?',
  'Та хэр их гунигладаг вэ?',
  'Та хэр их санаа зовнидог вэ?',
  'Та хэр их уйддаг вэ?',
  'Та хэр их ганцаарддаг вэ?',
  'Та хэр их стресстдэг вэ?',
];

export default function DynamicQuestionScreen() {
  const baseURL = Platform.OS === 'web'
    ? 'http://localhost:5000'
    : `http://${LOCAL_IP}:5000`;

  const router = useRouter();
  const { questionIndex, userId: userIdParam, ...restParams } = useLocalSearchParams<{
    questionIndex: string;
    userId: string;
    [key: string]: string;
  }>();

  const [userId, setUserId] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [hasAnsweredToday, setHasAnsweredToday] = useState<boolean>(false);

  const index = parseInt(questionIndex || '0', 10);
  if (isNaN(index) || index < 0 || index >= questions.length) {
    return (
      <View>
        <Text>Буруу асуултын индекс</Text>
      </View>
    );
  }

  // 🔁 Хэрэглэгч бүрийн хариулсан огноог шалгах
  const checkAnsweredToday = async (uid: string) => {
    const today = new Date().toISOString().split('T')[0];
    const lastAnsweredDate = await AsyncStorage.getItem(`lastAnsweredDate_${uid}`);
    if (lastAnsweredDate === today) {
      setHasAnsweredToday(true);
      router.replace('/(tabs)/statistics');
    } else {
      setHasAnsweredToday(false);
    }
  };

  // 🧠 userId хадгалах ба хариулсан эсэхийг шалгах
  useEffect(() => {
    const saveUserIdAndFetchData = async () => {
      try {
        if (userIdParam) {
          await AsyncStorage.setItem('userId', userIdParam);
          setUserId(userIdParam);
          checkAnsweredToday(userIdParam);
        } else {
          const savedUserId = await AsyncStorage.getItem('userId');
          if (savedUserId) {
            setUserId(savedUserId);
            checkAnsweredToday(savedUserId);
          }
        }
      } catch (e) {
        console.error('UserId хадгалах/уншихад алдаа:', e);
      }
    };

    saveUserIdAndFetchData();
  }, [userIdParam]);

  useEffect(() => {
    if (!userId) return;

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/auth/signin`);
        setUserData(response.data);
        console.log('User data:', response.data);
      } catch (error) {
        console.error('User-г авахад алдаа:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleNext = async (selectedValue: number) => {
    if (!userId) {
      console.warn('userId байхгүй байна!');
      return;
    }

    const currentAnswerKey = `q${index}`;
    const updatedParams = {
      ...restParams,
      [currentAnswerKey]: selectedValue.toString(),
      userId,
    };

    if (index < questions.length - 1) {
      router.push({
        pathname: '/emotion/[questionIndex]',
        params: {
          ...updatedParams,
          questionIndex: (index + 1).toString(),
        },
      });
    } else {
      try {
        const answers: Record<string, number> = {};
        for (let i = 0; i <= index; i++) {
          const key = `q${i}`;
          if (updatedParams[key]) {
            answers[key] = parseInt(updatedParams[key], 10);
          }
        }

        await axios.post(`http://${LOCAL_IP}:5000/api/answers`, {
          userId,
          answers,
        });

        // 🔒 Хариулсан огноог тухайн userId-аар хадгалах
        await AsyncStorage.setItem(
          `lastAnsweredDate_${userId}`,
          new Date().toISOString().split('T')[0]
        );

        router.push({
          pathname: '/emotion/sleep',
          params: updatedParams,
        });
      } catch (error) {
        console.error('POST алдаа:', error);
        router.push({
          pathname: '/emotion/sleep',
          params: updatedParams,
        });
      }
    }
  };

  if (!userId) {
    return (
      <View>
        <Text>Хэрэглэгчийн мэдээлэл ачааллаж байна...</Text>
      </View>
    );
  }

  if (hasAnsweredToday) {
    return (
      <View>
        <Text>Та өнөөдөр аль хэдийн асуултад хариулсан байна. Маргааш дахин орно уу.</Text>
      </View>
    );
  }

  return (
    <Question
      question={questions[index]}
      questionIndex={index}
      onNext={handleNext}
    />
  );
}
