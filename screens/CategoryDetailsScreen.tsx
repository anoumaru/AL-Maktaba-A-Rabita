import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { sampleBooks } from '../types/books';
import BookList from '../components/BookList';
import { initialCategories } from '../types/categories';

export default function CategoryDetailsScreen() {
  const { categoryId } = useLocalSearchParams<{ categoryId: string }>();
  const router = useRouter();

  const category = initialCategories.find(cat => cat.id === categoryId);
  const categoryBooks = sampleBooks.filter(book => book.categoryId === categoryId);

  const handleBookSelect = (bookId: string) => {
    router.push(`/book/${bookId}`);
  };

  if (!category) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Text>Category not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>
          {category.name} Books
        </Text>
      </View>
      <BookList books={categoryBooks} onSelectBook={handleBookSelect} />
    </SafeAreaView>
  );
} 