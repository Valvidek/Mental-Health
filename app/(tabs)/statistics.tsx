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
import MoodCard from '../components/MoodCard';
import { moods } from '@/assets/data/Data';
import { themes } from '@/constants/Colours';
import { TextTitle, TextBody } from '@/app/components/StyledText';
import { PieChart, LineChart } from 'react-native-chart-kit';
import Box from '@/app/components/Box';

const screenWidth = Dimensions.get('window').width;

const calendar = () => {
  const data = [
    {
      name: 'Anger',
      population: 40,
      color: themes.light.orange,
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: 'Joy',
      population: 25,
      color: themes.light.green,
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: 'Sadness',
      population: 15,
      color: themes.light.cyan,
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: 'Anxiety',
      population: 10,
      color: themes.light.indigo,
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: 'Neutral',
      population: 10,
      color: themes.light.yellow,
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: 'Depression',
      population: 5,
      color: themes.light.brown,
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
  ];

  const stats = [
    { icon: require('@/assets/icons/lotus1.png'), value: 15 },
    { icon: require('@/assets/icons/suitcase1.png'), value: 37 },
    { icon: require('@/assets/icons/mission-statement 1 (1).png'), value: 5 },
    { icon: require('@/assets/icons/high-five1.png'), value: 24 },
  ];

  const recommendations = [
    {
      id: '1',
      title: 'Grug',
      duration: '10 min',
      studio: 'Dreamworks',
      image: require('@/assets/images/mascot.png'),
    },
    {
      id: '2',
      title: 'Moana',
      duration: '8 min',
      studio: 'Disney',
      image: require('@/assets/images/mascot.png'),
    },
    {
      id: '3',
      title: 'Puss',
      duration: '12 min',
      studio: 'Dreamworks',
      image: require('@/assets/images/mascot.png'),
    },
  ];
  const renderMoodItem = ({ item }: { item: (typeof moods)[0] }) => (
    <MoodCard image={item.image} count={item.count} />
  );

  return (
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

        {/* Pie Chart */}
        <TextTitle style={styles.statheader}>Overall</TextTitle>
        <View style={styles.container}>
          <TextBody style={styles.title}>
            Your anger moods have been increased drastically
          </TextBody>
          <PieChart
            data={data}
            width={screenWidth * 0.9}
            height={220}
            chartConfig={{
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
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
              <Image
                source={require('@/assets/icons/happy1.png')}
                style={styles.faceIcon}
              />
              <Image
                source={require('@/assets/icons/meh1.png')}
                style={styles.faceIcon}
              />
              <Image
                source={require('@/assets/icons/mad1.png')}
                style={styles.faceIcon}
              />
            </View>
            <LineChart
              data={{
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [
                  {
                    data: [6.5, 7.0, 6.9, 7.5, 7.2, 7.8, 7.25],
                    strokeWidth: 8, // илүү тод шугам
                  },
                ],
              }}
              width={screenWidth * 0.5}
              height={120}
              withDots={true}
              withInnerLines={true}
              withHorizontalLines={true}
              withVerticalLines={true}
              withOuterLines={true}
              chartConfig={{
                backgroundColor: '#FFFFFF',
                backgroundGradientFrom: '#FFFFFF',
                backgroundGradientTo: '#FFFFFF',
                color: (opacity = 1) => `rgba(148, 183, 108, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(148, 183, 108, ${opacity})`,
                propsForBackgroundLines: {
                  stroke: '#E5E5E5',
                  strokeDasharray: '', // үргэлжилсэн
                },
              }}
              bezier
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 10,
                marginLeft: -10,
              }}
            />
          </View>
          <View style={styles.sleepInfo}>
            <Text style={styles.sleepLabel}>Average hours</Text>
            <Text style={styles.sleepValue}>7.25</Text>
            <Text style={styles.sleepLabel}>Quality</Text>
            <Text style={styles.sleepQuality}>Mostly good</Text>
            <Text style={styles.sleepComment}>
              Your sleep is good!{'\n'}Keep it up!
            </Text>
          </View>
        </View>

        <TextTitle style={styles.statheader}>Recorder Main Focuses</TextTitle>
        <View style={styles.row}>
          {stats.map((item, index) => (
            <View key={index} style={styles.card}>
              <Image source={item.icon} style={styles.icon} />
              <Text style={styles.value}>{item.value}</Text>
            </View>
          ))}
        </View>

        <View style={styles.supportContainer}>
          <View style={styles.bubbleWrapper}>
            <View style={styles.bubble}>
              <TextTitle style={styles.bubbleText}>
                Have you been frustrated lately?
              </TextTitle>
              <TextTitle style={styles.bubbleText}>
                It’s okay! We can work it out!
              </TextTitle>
            </View>
            <View style={styles.bubbleArrow} />
          </View>

          <View style={styles.imageWrapper}>
            <Image
              source={require('@/assets/images/mascot.png')}
              style={styles.suppimage}
            />
          </View>
        </View>
        <TextBody style={styles.statheader}>Recomendation</TextBody>
        <View style={styles.recommendList}>
          <FlatList
            data={recommendations}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.recommendList}
            renderItem={({ item }) => (
              <View style={styles.recommendCard}>
                <View style={styles.recommendTextContainer}>
                  <Text style={styles.recommendTitle}>{item.title}</Text>
                  <Text style={styles.recommendSubtitle}>{item.duration}</Text>
                  <Text style={styles.recommendSubtitle}>{item.studio}</Text>
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
  );
};

const styles = StyleSheet.create({
  recommendList: {
    paddingHorizontal: 16,
  },
  recommendCard: {
    width: screenWidth * 0.6,
    height: 100,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginRight: 16,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    zIndex: 0, 
    position: 'relative',
  },
  recommendTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  recommendTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  recommendSubtitle: {
    fontSize: 12,
    color: '#777',
  },
  recommendImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginLeft: 10,
  },
  recommendPlayButton: {
    backgroundColor: '#9F7AEA',
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  recommendPlayIcon: {
    color: '#fff',
    fontSize: 16,
  },
  moodTrackerSection: {
    margin: 20,
  },
  moodList: {
    paddingHorizontal: 20,
  },
  statheader: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 20,
  },
  container: {
    paddingTop: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    padding: 10,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  sleepContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 10,
    marginHorizontal: 20,
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
    shadowColor: '#ccc',
  },
  sleepChartWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  faceColumn: {
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 100,
    marginRight: 10,
    marginBottom: 20,
  },
  faceIcon: {
    width: 30,
    height: 30,
    marginVertical: 6,
  },
  sleepInfo: {
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  sleepLabel: {
    fontSize: 12,
    color: '#888',
  },
  sleepValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  sleepQuality: {
    fontSize: 14,
    color: '#4CAF50',
    marginBottom: 6,
  },
  sleepComment: {
    fontSize: 12,
    color: '#666',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 40,
  },
  card: {
    width: 80,
    height: 80,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  icon: {
    width: 32,
    height: 32,
    marginBottom: 8,
    resizeMode: 'contain',
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  supportContainer: {
    alignItems: 'center',
    paddingTop: 20,
    width: '100%',
  },
  bubbleWrapper: {
    alignItems: 'center',
    marginBottom: -10,
  },
  bubble: {
    backgroundColor: '#9F7AEA',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
    width: 350,
    height: 100,
  },
  bubbleText: {
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
  },
  bubbleArrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 20,
    borderRightWidth: 20,
    borderTopWidth: 20,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    transform: [{ rotate: '-135deg' }],
    borderTopColor: '#9F7AEA',
    marginTop: -4,
    marginLeft: -150,
    borderRadius: 8,
  },
  imageWrapper: {
    height: 250,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  suppimage: {
    width: 500,
    height: 500,
    resizeMode: 'contain',
    marginTop: -50,
  },
});

export default calendar;
