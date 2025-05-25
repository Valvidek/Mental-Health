import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
  Alert,
  Modal,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { themes } from '@/constants/Colours';
import Layout from '@/constants/Layout';
import { TextTitle } from '@/app/components/StyledText';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { router } from 'expo-router';

const { width } = Dimensions.get('window');

// Therapist data with images
const therapistsData = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Anxiety & Depression",
    rating: 4.9,
    email: "sarah.johnson@therapy.com",
    phone: "+1 (555) 123-4567",
    experience: "8 years",
    bio: "Specializing in cognitive behavioral therapy with a focus on anxiety disorders and depression management.",
    image: "https://images.pexels.com/photos/5452201/pexels-photo-5452201.jpeg?auto=compress&cs=tinysrgb&w=400",
    price: "$120/session",
    availability: "Mon-Fri 9AM-5PM"
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Relationship Therapy",
    rating: 4.8,
    email: "michael.chen@therapy.com",
    phone: "+1 (555) 234-5678",
    experience: "12 years",
    bio: "Expert in couples counseling and family therapy with extensive experience in relationship dynamics.",
    image: "https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=400",
    price: "$140/session",
    availability: "Tue-Sat 10AM-7PM"
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    specialty: "Trauma Recovery",
    rating: 4.9,
    email: "emily.rodriguez@therapy.com",
    phone: "+1 (555) 345-6789",
    experience: "10 years",
    bio: "EMDR certified therapist specializing in trauma recovery and PTSD treatment.",
    image: "https://images.pexels.com/photos/5452274/pexels-photo-5452274.jpeg?auto=compress&cs=tinysrgb&w=400",
    price: "$130/session",
    availability: "Mon-Thu 8AM-4PM"
  },
  {
    id: 4,
    name: "Dr. David Thompson",
    specialty: "Stress Management",
    rating: 4.7,
    email: "david.thompson@therapy.com",
    phone: "+1 (555) 456-7890",
    experience: "6 years",
    bio: "Mindfulness-based stress reduction specialist helping clients manage work-life balance.",
    image: "https://images.pexels.com/photos/5452268/pexels-photo-5452268.jpeg?auto=compress&cs=tinysrgb&w=400",
    price: "$110/session",
    availability: "Wed-Sun 11AM-6PM"
  },
  {
    id: 5,
    name: "Dr. Lisa Park",
    specialty: "Mindfulness Therapy",
    rating: 4.8,
    email: "lisa.park@therapy.com",
    phone: "+1 (555) 567-8901",
    experience: "9 years",
    bio: "Integrative approach combining traditional therapy with mindfulness and meditation practices.",
    image: "https://images.pexels.com/photos/5452235/pexels-photo-5452235.jpeg?auto=compress&cs=tinysrgb&w=400",
    price: "$125/session",
    availability: "Mon-Fri 12PM-8PM"
  },
];

const TherapistCard = ({
  therapist,
  onPress,
}: {
  therapist: Therapist;
  onPress: (therapist: Therapist) => void;
}) => {
  const cardScale = useSharedValue(1);

  const handlePressIn = () => {
    cardScale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    cardScale.value = withSpring(1);
  };

  const cardAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: cardScale.value }],
    };
  });

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Ionicons key={i} name="star" size={16} color="#FFD700" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Ionicons key="half" name="star-half" size={16} color="#FFD700" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Ionicons key={`empty-${i}`} name="star-outline" size={16} color="#FFD700" />
      );
    }

    return stars;
  };

  return (
    <Animated.View style={[styles.card, cardAnimatedStyle]}>
      <TouchableOpacity
        onPress={() => onPress(therapist)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
      >
        <View style={styles.cardContent}>
          <Image source={{ uri: therapist.image }} style={styles.therapistImage} />
          
          <View style={styles.therapistInfo}>
            <Text style={styles.therapistName}>{therapist.name}</Text>
            <Text style={styles.specialty}>{therapist.specialty}</Text>
            
            <View style={styles.ratingContainer}>
              <View style={styles.starsContainer}>
                {renderStars(therapist.rating)}
              </View>
              <Text style={styles.ratingText}>{therapist.rating}</Text>
            </View>
            
            <View style={styles.detailsRow}>
              <View style={styles.experienceContainer}>
                <Ionicons name="school-outline" size={14} color={themes.light.textSecondary} />
                <Text style={styles.experienceText}>{therapist.experience}</Text>
              </View>
              <Text style={styles.priceText}>{therapist.price}</Text>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.emailButton}
            onPress={(e) => {
              e.stopPropagation();
              handleEmailPress(therapist.email, therapist.name);
            }}
          >
            <MaterialIcons name="email" size={20} color={themes.light.accent} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

type Therapist = {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  email: string;
  phone: string;
  experience: string;
  bio: string;
  image: string;
  price: string;
  availability: string;
};

type TherapistModalProps = {
  visible: boolean;
  therapist: Therapist | null;
  onClose: () => void;
};

const TherapistModal = ({ visible, therapist, onClose }: TherapistModalProps) => {
  if (!therapist) return null;

  const modalScale = useSharedValue(0);

  React.useEffect(() => {
    if (visible) {
      modalScale.value = withSpring(1);
    } else {
      modalScale.value = withTiming(0);
    }
  }, [visible]);

  const modalAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: modalScale.value }],
      opacity: modalScale.value,
    };
  });

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Ionicons key={i} name="star" size={20} color="#FFD700" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Ionicons key="half" name="star-half" size={20} color="#FFD700" />
      );
    }

    return stars;
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <Animated.View style={[styles.modalContent, modalAnimatedStyle]}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={24} color={themes.light.textSecondary} />
          </TouchableOpacity>

          <Image source={{ uri: therapist.image }} style={styles.modalImage} />
          
          <Text style={styles.modalName}>{therapist.name}</Text>
          <Text style={styles.modalSpecialty}>{therapist.specialty}</Text>

          <View style={styles.modalRatingContainer}>
            <View style={styles.starsContainer}>
              {renderStars(therapist.rating)}
            </View>
            <Text style={styles.modalRatingText}>{therapist.rating} rating</Text>
          </View>

          <Text style={styles.bioText}>{therapist.bio}</Text>

          <View style={styles.modalDetailsContainer}>
            <View style={styles.modalDetailRow}>
              <Ionicons name="time-outline" size={18} color={themes.light.accent} />
              <Text style={styles.modalDetailText}>{therapist.availability}</Text>
            </View>
            
            <View style={styles.modalDetailRow}>
              <Ionicons name="card-outline" size={18} color={themes.light.accent} />
              <Text style={styles.modalDetailText}>{therapist.price}</Text>
            </View>

            <View style={styles.modalDetailRow}>
              <Ionicons name="school-outline" size={18} color={themes.light.accent} />
              <Text style={styles.modalDetailText}>{therapist.experience} experience</Text>
            </View>
          </View>

          <View style={styles.contactButtons}>
            <TouchableOpacity
              style={[styles.contactButton, styles.emailContactButton]}
              onPress={() => handleEmailPress(therapist.email, therapist.name)}
            >
              <MaterialIcons name="email" size={20} color="white" />
              <Text style={styles.contactButtonText}>Email</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.contactButton, styles.phoneContactButton]}
              onPress={() => handlePhonePress(therapist.phone)}
            >
              <Ionicons name="call" size={20} color="white" />
              <Text style={styles.contactButtonText}>Call</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const handleEmailPress = (email: string, name: string) => {
  const subject = `Therapy Session Inquiry - ${name}`;
  const body = `Hello ${name},\n\nI would like to schedule a therapy session with you. Please let me know your availability.\n\nThank you!`;
  const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  
  Linking.canOpenURL(mailtoUrl)
    .then((supported) => {
      if (supported) {
        return Linking.openURL(mailtoUrl);
      } else {
        Alert.alert(
          'Email Not Available',
          `Please contact ${name} at: ${email}`,
          [{ text: 'OK' }]
        );
      }
    })
    .catch((err) => {
      Alert.alert('Error', 'Unable to open email client');
      console.error('Email error:', err);
    });
};

const handlePhonePress = (phone: string) => {
  const phoneUrl = `tel:${phone}`;
  
  Linking.canOpenURL(phoneUrl)
    .then((supported) => {
      if (supported) {
        return Linking.openURL(phoneUrl);
      } else {
        Alert.alert('Phone Not Available', `Please call: ${phone}`);
      }
    })
    .catch((err) => {
      Alert.alert('Error', 'Unable to make phone call');
      console.error('Phone error:', err);
    });
};


const returnHome = () => {
    router.push('/(tabs)');
  };

export default function TherapistScreen() {
  const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleTherapistPress = (therapist: Therapist) => {
    setSelectedTherapist(therapist);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setTimeout(() => setSelectedTherapist(null), 300);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
          <TouchableOpacity
    style={styles.backButton}
    onPress={ returnHome }
  >
    <Ionicons name="arrow-back" size={24} color={themes.light.textPrimary} />
  </TouchableOpacity>
        <TextTitle style={styles.headerTitle}>Find Your Therapist</TextTitle>
        <Text style={styles.subtitle}>Professional mental health support</Text>
      </View>

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {therapistsData.map((therapist) => (
          <TherapistCard
            key={therapist.id}
            therapist={therapist}
            onPress={handleTherapistPress}
          />
        ))}
      </ScrollView>

      <TherapistModal
        visible={modalVisible}
        therapist={selectedTherapist}
        onClose={closeModal}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.light.background,
  },
  header: {
    paddingHorizontal: Layout.spacing.lg,
    paddingVertical: Layout.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: themes.light.textPrimary,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: themes.light.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: themes.light.textSecondary,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    padding: Layout.spacing.lg,
    paddingBottom: Layout.spacing.xl,
  },
  card: {
    backgroundColor: themes.light.box,
    borderRadius: 16,
    marginBottom: Layout.spacing.md,
    shadowColor: themes.light.textPrimary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardContent: {
    flexDirection: 'row',
    padding: Layout.spacing.md,
    alignItems: 'center',
  },
  therapistImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: Layout.spacing.md,
  },
  therapistInfo: {
    flex: 1,
  },
  therapistName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: themes.light.textPrimary,
    marginBottom: 4,
  },
  specialty: {
    fontSize: 14,
    color: themes.light.textSecondary,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 8,
  },
  ratingText: {
    fontSize: 14,
    color: themes.light.textSecondary,
    fontWeight: '600',
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  experienceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  experienceText: {
    fontSize: 12,
    color: themes.light.textSecondary,
    marginLeft: 4,
  },
  backButton: {
  position: 'absolute',
  top: Layout.spacing.sm,
  left: Layout.spacing.lg,
  zIndex: 10,
  padding: 4,
},

headerTextContainer: {
  marginLeft: 40, // space to avoid overlapping the back button
},

  priceText: {
    fontSize: 14,
    color: themes.light.accent,
    fontWeight: '600',
  },
  emailButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: themes.light.background,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: themes.light.textPrimary,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Layout.spacing.lg,
  },
  modalContent: {
    backgroundColor: themes.light.box,
    borderRadius: 20,
    padding: Layout.spacing.lg,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: Layout.spacing.md,
    right: Layout.spacing.md,
    zIndex: 1,
  },
  modalImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: Layout.spacing.md,
  },
  modalName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: themes.light.textPrimary,
    marginBottom: 4,
  },
  modalSpecialty: {
    fontSize: 16,
    color: themes.light.textSecondary,
    marginBottom: Layout.spacing.md,
  },
  modalRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.md,
  },
  modalRatingText: {
    fontSize: 16,
    color: themes.light.textSecondary,
    marginLeft: 8,
  },
  bioText: {
    fontSize: 14,
    color: themes.light.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: Layout.spacing.lg,
  },
  modalDetailsContainer: {
    width: '100%',
    marginBottom: Layout.spacing.lg,
  },
  modalDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.sm,
  },
  modalDetailText: {
    fontSize: 14,
    color: themes.light.textPrimary,
    marginLeft: Layout.spacing.sm,
  },
  contactButtons: {
    flexDirection: 'row',
    gap: Layout.spacing.md,
    width: '100%',
  },
  contactButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Layout.spacing.md,
    borderRadius: 12,
    gap: 8,
  },
  emailContactButton: {
    backgroundColor: themes.light.accent,
  },
  phoneContactButton: {
    backgroundColor: '#34C759',
  },
  contactButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});