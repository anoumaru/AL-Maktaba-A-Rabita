import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import CategoryList from '../components/CategoryList';
import { initialCategories } from '../types/categories';

export default function CategoriesScreen() {
  const navigation = useNavigation();

  const handleCategorySelect = (categoryId: string) => {
    // TODO: Implement navigation to category details
    navigation.navigate('CategoryDetails', { categoryId });
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