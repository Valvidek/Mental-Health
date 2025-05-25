import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MoodCard from '../components/MoodCard';
import { moods } from '@/assets/data/Data';
import { themes } from '@/constants/Colours';
import { TextTitle, TextBody } from '@/app/components/StyledText';
import { PieChart, LineChart } from 'react-native-chart-kit';
import Box from '@/app/components/Box';
import { useThemeContext } from '../context/ThemeContext';
import Colors from '@/constants/Colors';

const screenWidth = Dimensions.get('window').width;

const Calendar = () => {
  const { darkMode } = useThemeContext();
  const themeColors = darkMode ? Colors.darkTheme : Colors.lightTheme;

  const data = [
    { name: 'Anger', population: 40, color: themes.light.orange, legendFontColor: themeColors.text.secondary, legendFontSize: 12 },
    { name: 'Joy', population: 25, color: themes.light.green, legendFontColor: themeColors.text.secondary, legendFontSize: 12 },
    { name: 'Sadness', population: 15, color: themes.light.cyan, legendFontColor: themeColors.text.secondary, legendFontSize: 12 },
    { name: 'Anxiety', population: 10, color: themes.light.indigo, legendFontColor: themeColors.text.secondary, legendFontSize: 12 },
    { name: 'Neutral', population: 10, color: themes.light.yellow, legendFontColor: themeColors.text.secondary, legendFontSize: 12 },
    { name: 'Depression', population: 5, color: themes.light.brown, legendFontColor: themeColors.text.secondary, legendFontSize: 12 },
  ];

  const stats = [
    { icon: require('@/assets/icons/lotus1.png'), value: 15 },
    { icon: require('@/assets/icons/suitcase1.png'), value: 37 },
    { icon: require('@/assets/icons/mission-statement 1 (1).png'), value: 5 },
    { icon: require('@/assets/icons/high-five1.png'), value: 24 },
  ];

  const recommendations = [
    { id: '1', title: 'Grug', duration: '10 min', studio: 'Dreamworks', image: require('@/assets/images/mascot.png') },
    { id: '2', title: 'Moana', duration: '8 min', studio: 'Disney', image: require('@/assets/images/mascot.png') },
    { id: '3', title: 'Puss', duration: '12 min', studio: 'Dreamworks', image: require('@/assets/images/mascot.png') },
  ];

  const renderMoodItem = ({ item }: { item: (typeof moods)[0] }) => (
    <MoodCard image={item.image} count={item.count} />
  );

  function rgba(arg0: number, arg1: number, arg2: number, $: any, arg4: { opacity: number; }): string {
    throw new Error('Function not implemented.');
  }

  return (
<<<<<<< HEAD
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ flex: 1, backgroundColor: themes.light.background }}>
        {/* Moods */}
        <TextTitle style={styles.statheader}>Recorded moods</TextTitle>
        <Box style={styles.moodTrackerSection}>
          <FlatList
            data={moods}
            renderItem={renderMoodItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.moodList}
            ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
          />
        </Box>
=======
    <SafeAreaView style={[styles.safeArea, { backgroundColor: themeColors.background.primary }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
        <View style={{ paddingHorizontal: 20 }}>
          {/* Moods */}
          <TextTitle style={styles.statheader}>Recorded moods</TextTitle>
          <Box style={styles.moodTrackerSection}>
            <FlatList
              data={moods}
              renderItem={renderMoodItem}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.moodList}
              ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
            />
          </Box>
>>>>>>> c691a218c064ca1304b5a6e3292275c33ad1e2ad

          {/* Pie Chart */}
          <TextTitle style={styles.statheader}>Overall</TextTitle>
          <View style={styles.container}>
            <TextBody style={[styles.title, { color: themeColors.text.primary }]}>
              Your anger moods have been increased drastically
            </TextBody>
            <PieChart
              data={data}
              width={screenWidth * 0.9}
              height={220}
              chartConfig={{
                backgroundColor: themeColors.background.primary,
                backgroundGradientFrom: themeColors.background.primary,
                backgroundGradientTo: themeColors.background.primary,
                color: (opacity = 1) => `${themeColors.text.primary}${Math.floor(opacity * 255).toString(16)}`,
                labelColor: (opacity = 1) => themeColors.text.secondary,
              }}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
            />
          </View>

          {/* Sleep Quality */}
          <TextTitle style={styles.statheader}>Sleep Quality</TextTitle>
          <View style={styles.sleepContainer}>
            <View style={styles.sleepChartWrapper}>
              <View style={styles.faceColumn}>
                <Image source={require('@/assets/icons/happy1.png')} style={styles.faceIcon} />
                <Image source={require('@/assets/icons/meh1.png')} style={styles.faceIcon} />
                <Image source={require('@/assets/icons/mad1.png')} style={styles.faceIcon} />
              </View>
              <LineChart
                data={{
                  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                  datasets: [{ data: [6.5, 7.0, 6.9, 7.5, 7.2, 7.8, 7.25], strokeWidth: 8 }],
                }}
                width={screenWidth * 0.5}
                height={120}
                withDots
                withInnerLines
                withHorizontalLines
                withVerticalLines
                withOuterLines
                chartConfig={{
                  backgroundColor: themeColors.background.primary,
                  backgroundGradientFrom: themeColors.background.primary,
                  backgroundGradientTo: themeColors.background.primary,
                  color: (opacity = 1) => `rgba(148, 183, 108, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(148, 183, 108, ${opacity})`,
                  propsForBackgroundLines: { stroke: '#E5E5E5', strokeDasharray: '' },
                }}
                bezier
                style={{
                  backgroundColor: themeColors.background.secondary,
                  borderRadius: 10,
                  marginLeft: -10,
                }}
              />
            </View>
            <View style={styles.sleepInfo}>
              <Text style={[styles.sleepLabel, { color: themeColors.text.secondary }]}>Average hours</Text>
              <Text style={[styles.sleepValue, { color: themeColors.text.primary }]}>7.25</Text>
              <Text style={[styles.sleepLabel, { color: themeColors.text.secondary }]}>Quality</Text>
              <Text style={[styles.sleepQuality, { color: themeColors.text.primary }]}>Mostly good</Text>
              <Text style={[styles.sleepComment, { color: themeColors.text.secondary }]}>
                Your sleep is good!{'\n'}Keep it up!
              </Text>
            </View>
          </View>

          {/* Main Focuses */}
          <TextTitle style={styles.statheader}>Recorder Main Focuses</TextTitle>
          <View style={styles.row}>
            {stats.map((item, index) => (
              <View key={index} style={styles.card}>
                <Image source={item.icon} style={styles.icon} />
                <Text style={[styles.value, { color: themeColors.text.primary }]}>{item.value}</Text>
              </View>
            ))}
          </View>

          {/* Support Bubble */}
          <View style={styles.supportContainer}>
            <View style={styles.bubbleWrapper}>
              <View style={[styles.bubble, { backgroundColor: themeColors.background.secondary }]}>
                <TextTitle style={[styles.bubbleText, { color: themeColors.text.primary }]}>
                  Have you been frustrated lately?
                </TextTitle>
                <TextTitle style={[styles.bubbleText, { color: themeColors.text.primary }]}>
                  It’s okay! We can work it out!
                </TextTitle>
              </View>
              <View style={styles.bubbleArrow} />
            </View>
            <View style={styles.imageWrapper}>
              <Image source={require('@/assets/images/mascot.png')} style={styles.suppimage} />
            </View>
          </View>

          {/* Recommendations */}
          <TextBody style={[styles.statheader, { color: themeColors.text.primary }]}>Recommendation</TextBody>
          <View style={styles.recommendList}>
            <FlatList
              data={recommendations}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.recommendList}
              renderItem={({ item }) => (
                <View style={[styles.recommendCard, { backgroundColor: themeColors.background.secondary }]}>
                  <View style={styles.recommendTextContainer}>
                    <Text style={[styles.recommendTitle, { color: themeColors.text.primary }]}>{item.title}</Text>
                    <Text style={[styles.recommendSubtitle, { color: themeColors.text.secondary }]}>{item.duration}</Text>
                    <Text style={[styles.recommendSubtitle, { color: themeColors.text.secondary }]}>{item.studio}</Text>
                  </View>
                  <Image source={item.image} style={styles.recommendImage} />
                  <TouchableOpacity style={styles.recommendPlayButton}>
                    <Text style={styles.recommendPlayIcon}>▶</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Calendar;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  statheader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  moodTrackerSection: {
    paddingVertical: 10,
  },
  moodList: {
    paddingHorizontal: 10,
  },
  container: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    marginBottom: 10,
    fontSize: 16,
  },
  sleepContainer: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  sleepChartWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  faceColumn: {
    justifyContent: 'space-between',
    marginRight: 5,
  },
  faceIcon: {
    width: 20,
    height: 20,
    marginVertical: 10,
  },
  sleepInfo: {
    marginLeft: 20,
    justifyContent: 'center',
  },
  sleepLabel: {
    fontSize: 14,
  },
  sleepValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  sleepQuality: {
    fontSize: 18,
    fontWeight: '600',
  },
  sleepComment: {
    marginTop: 5,
    fontSize: 14,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 15,
  },
  card: {
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
  },
  supportContainer: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  bubbleWrapper: {
    flex: 1,
    alignItems: 'flex-start',
  },
  bubble: {
    padding: 15,
    borderRadius: 20,
  },
  bubbleText: {
    fontSize: 14,
    marginBottom: 5,
  },
  bubbleArrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 10,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderLeftColor: 'transparent',
    borderBottomColor: '#ccc',
    marginLeft: 20,
  },
  imageWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  suppimage: {
    width: 80,
    height: 80,
  },
  recommendList: {
    marginVertical: 10,
  },
  recommendCard: {
    width: 180,
    marginRight: 15,
    borderRadius: 15,
    padding: 10,
  },
  recommendTextContainer: {
    marginBottom: 10,
  },
  recommendTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  recommendSubtitle: {
    fontSize: 12,
  },
  recommendImage: {
    width: '100%',
    height: 80,
    resizeMode: 'contain',
  },
  recommendPlayButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#8EB689',
    borderRadius: 20,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recommendPlayIcon: {
    color: '#fff',
    fontSize: 16,
  },
});
