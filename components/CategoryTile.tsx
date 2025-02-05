import { TouchableOpacity, Text, StyleSheet, I18nManager } from 'react-native';
import { BookCategory } from '../types/categories';
import React = require('react');

interface CategoryTileProps {
  category: BookCategory;
  onPress: () => void;
}

export default function CategoryTile({ category, onPress }: CategoryTileProps) {
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: category.color }]}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={category.nameAr}
    >
      <Text style={styles.title}>{category.nameAr}</Text>
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
    writingDirection: 'rtl',
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    writingDirection: 'rtl',
    fontFamily: 'System',  // We should add Arabic font
  },
}); 