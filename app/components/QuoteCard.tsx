import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import Box from '@/app/components/Box';


const QouteCard: React.FC = () => {
    const [quote, setQuote] = useState('');
    const [author, setAuthor] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQuote = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/quote');
                const data = await response.json();
                setQuote(data[0].q);
                setAuthor(data[0].a);
            } catch (error) {
                console.log('Quote fetch error:', error);
                setQuote('Failed to load Quote. Please try again later.');
                setAuthor('');
            } finally {
                setLoading(false);
            }
        };

        fetchQuote();
    }, []);

    const today = new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
    });

    return (
        <View style={{ alignItems: 'center', marginTop: 20 }}>
            <Box style={styles.quoteBox}>
                <Text style={styles.quoteDate}>{today}</Text>
                {loading ? (
                    <ActivityIndicator size="small" color="#555" />
                ) : (
                    <>
                        <Text style={styles.quoteText}>"{quote}"</Text>
                        <Text style={styles.quoteAuthor}>— {author}</Text>
                    </>
                )}
                <Image
                    source={require('@/assets/icons/crystal-ball1.png')}
                    style={styles.magicBall}
                />
            </Box>
        </View>
    );
};

const styles = StyleSheet.create({
    quoteBox: {
        backgroundColor: '#e8f0fe',
        borderRadius: 16,
        padding: 20,
        width: '90%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 5,
        elevation: 4,
    },
    quoteDate: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#555',
    },
    quoteText: {
        fontSize: 18,
        fontStyle: 'italic',
        textAlign: 'center',
        marginVertical: 10,
        color: '#333',
    },
    quoteAuthor: {
        fontSize: 14,
        textAlign: 'center',
        color: '#777',
        marginBottom: 10,
    },
    magicBall: {
        width: 40,
        height: 40,
        marginTop: 10,
    },
});

export default QouteCard;
