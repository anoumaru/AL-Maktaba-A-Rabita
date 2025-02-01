import { View, FlatList, StyleSheet } from 'react-native';
import { Book } from '../types/books';
import BookCard from './BookCard';

interface BookListProps {
  books: Book[];
  onSelectBook: (bookId: string) => void;
}

export default function BookList({ books, onSelectBook }: BookListProps) {
  return (
    <FlatList
      data={books}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <BookCard book={item} onPress={() => onSelectBook(item.id)} />
      )}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
}); 