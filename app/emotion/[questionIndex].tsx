import { useRouter, useLocalSearchParams } from 'expo-router';
import Question from '@/app/components/Question';
import React from 'react';

const questions = [
  'Та хэр их уурладаг вэ?',
  'Та хэр их гунигладаг вэ?',
  'Та хэр их санаа зовнидог вэ?',
  'Та хэр их уйддаг вэ?',
  'Та хэр их ганцаарддаг вэ?',
  'Та хэр их стресстдэг вэ?',
];

export default function DynamicQuestionScreen() {
  const router = useRouter();
  const { questionIndex, ...restParams } = useLocalSearchParams<{
    questionIndex: string;
    [key: string]: string;
  }>();

  const index = parseInt(questionIndex || '0');

  if (isNaN(index) || index < 0 || index >= questions.length) {
    return null;
  }

const handleNext = (selectedValue: number) => {
  const updatedParams = {
    ...restParams,
    [`q${index}`]: selectedValue.toString(),
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
    router.push({
      pathname: '/emotion/sleep',
      params: updatedParams,
    });
  }
};

  return (
    <Question
      question={questions[index]}
      questionIndex={index}
      onNext={handleNext}
    />
  );
}
