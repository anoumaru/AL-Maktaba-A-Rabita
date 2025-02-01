import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import { sampleBooks } from '../../types/books';

export default function BookReader() {
  const { id } = useLocalSearchParams();
  const book = sampleBooks.find(b => b.id === id);

  if (!book) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.error}>الكتاب غير موجود</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{book.titleAr}</Text>
        <Text style={styles.author}>تأليف: {book.authorAr}</Text>
        <Text style={styles.bookContent}>{book.contentAr}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  author: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 24,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  bookContent: {
    fontSize: 18,
    lineHeight: 32,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  error: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    color: '#EF4444',
  },
}); 