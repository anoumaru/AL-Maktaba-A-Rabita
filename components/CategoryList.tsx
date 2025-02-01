import { FlatList, Dimensions } from 'react-native';
import { BookCategory } from '../types/categories';
import CategoryTile from './CategoryTile';

const { width } = Dimensions.get('window');
const COLUMNS = width > 768 ? 3 : 2;

interface CategoryListProps {
  categories: BookCategory[];
  onSelectCategory: (categoryId: string) => void;
}

export default function CategoryList({ categories, onSelectCategory }: CategoryListProps) {
  return (
    <FlatList
      data={categories}
      keyExtractor={(item) => item.id}
      numColumns={COLUMNS}
      contentContainerStyle={{ padding: 8 }}
      columnWrapperStyle={{ justifyContent: 'space-between' }}
      renderItem={({ item }) => (
        <CategoryTile
          category={item}
          onPress={() => onSelectCategory(item.id)}
        />
      )}
    />
  );
} 