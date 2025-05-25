import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  useWindowDimensions,
} from 'react-native';
import { colors, responses } from '../../constants/questions';

interface Props {
  question: string;
  questionIndex: number;
  onNext: (selectedValue: number) => void;
}

const Question: React.FC<Props> = ({ question, questionIndex, onNext }) => {
  const [selected, setSelected] = React.useState<number | null>(null);
  const { width } = useWindowDimensions();

  const progressPercent = ((questionIndex + 1) / 8) * 100;
  const paddingHorizontal = width * 0.06;
  const circleSize = Math.min(width * 0.08, 36);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F6F4FB' }}>
      <View style={[styles.container, { paddingHorizontal }]}>
        {/* Top Bar */}
        <View style={styles.topBar}>
          <View style={styles.backIcon} />
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
          </View>
        </View>

        {/* Question */}
        <Text style={[styles.question, { fontSize: width * 0.05 }]}>{question}</Text>

        {/* Selected response */}
        <Text style={styles.responseText}>
          {selected != null ? responses[selected - 1] : ''}
        </Text>

        {/* Selection */}
        <View style={styles.selectionBox}>
          <View style={styles.optionsContainer}>
            {colors.map((color, index) => {
              const isSelected = selected === index + 1;
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    {
                      width: circleSize,
                      height: circleSize,
                      borderRadius: circleSize / 2,
                      backgroundColor: color,
                      opacity: isSelected ? 1 : 0.7,
                      transform: [{ scale: isSelected ? 1.2 : 1 }],
                      borderWidth: isSelected ? 3 : 0,
                      borderColor: '#2D2A5B',
                    },
                  ]}
                  onPress={() => setSelected(index + 1)}
                />
              );
            })}
          </View>
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          onPress={() => selected != null && onNext(selected)}
          style={[
            styles.button,
            { marginHorizontal: width * 0.1 },
            selected == null && { opacity: 0.5 },
          ]}
          disabled={selected == null}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Question;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '10%',
    justifyContent: 'flex-start',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    justifyContent: 'space-between',
  },
  backIcon: {
    width: 28,
    height: 28,
    backgroundColor: '#D9D9D9',
    borderRadius: 14,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#E2DFF0',
    borderRadius: 3,
    marginLeft: 12,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#C9B6E4',
  },
  question: {
    textAlign: 'center',
    fontWeight: '600',
    color: '#2D2A5B',
    marginBottom: 8,
  },
  responseText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#777',
    marginBottom: 24,
  },
  selectionBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 40,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#2D2A5B',
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
});
