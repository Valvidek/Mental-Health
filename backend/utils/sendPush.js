// utils/sendPush.js
const { Expo } = require('expo-server-sdk');
const PushToken = require('../models/PushToken');

const expo = new Expo();

async function sendNotificationToUser(userId, title, body) {
  const user = await PushToken.findOne({ userId });
  if (!user || !Expo.isExpoPushToken(user.token)) return;

  const messages = [{
    to: user.token,
    sound: 'default',
    title,
    body,
  }];

  try {
    await expo.sendPushNotificationsAsync(messages);
  } catch (error) {
    console.error('Push notification error:', error);
  }
}
