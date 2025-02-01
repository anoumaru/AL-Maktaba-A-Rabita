import { TouchableOpacity, Text, StyleSheet, Image, View } from 'react-native';
import { Book } from '../types/books';

interface BookCardProps {
  book: Book;
  onPress: () => void;
}

export default function BookCard({ book, onPress }: BookCardProps) {
  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Read ${book.title}`}
    >
      {book.coverImage ? (
        <Image source={{ uri: book.coverImage }} style={styles.cover} />
      ) : (
        <View style={styles.placeholderCover} />
      )}
      <View style={styles.info}>
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>{book.author}</Text>
        {book.pages && <Text style={styles.pages}>{book.pages} pages</Text>}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 16,
    padding: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cover: {
    width: 80,
    height: 120,
    borderRadius: 4,
  },
  placeholderCover: {
    width: 80,
    height: 120,
    borderRadius: 4,
    backgroundColor: '#E5E7EB',
  },
  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  author: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  pages: {
    fontSize: 14,
    color: '#9CA3AF',
  },
}); 