import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { BookCategory } from '../types/categories';

interface CategoryTileProps {
  category: BookCategory;
  onPress: () => void;
}

export default function CategoryTile({ category, onPress }: CategoryTileProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, { backgroundColor: category.color }]}
      accessibilityRole="button"
      accessibilityLabel={`Browse ${category.name} category`}
    >
      <Text style={styles.title}>{category.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
    minWidth: 150,
    maxWidth: 300,
    height: 120,
    borderRadius: 8,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
}); 