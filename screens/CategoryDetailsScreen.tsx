import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';

export default function CategoryDetailsScreen() {
  const { categoryId } = useLocalSearchParams();

  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
        Category: {categoryId}
      </Text>
      {/* Add subcategory list and book listings here */}
    </SafeAreaView>
  );
} 