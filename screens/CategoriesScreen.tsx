import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import CategoryList from '../components/CategoryList';
import { initialCategories } from '../types/categories';

export default function CategoriesScreen() {
  const router = useRouter();

  const handleCategorySelect = (categoryId: string) => {
    router.push(`/(tabs)/${categoryId}`);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <CategoryList
        categories={initialCategories}
        onSelectCategory={handleCategorySelect}
      />
    </SafeAreaView>
  );
} 