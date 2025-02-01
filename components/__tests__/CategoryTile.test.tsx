import { render, screen, fireEvent } from '@testing-library/react-native';
import CategoryTile from '../CategoryTile';
import { initialCategories } from '../../types/categories';

describe('CategoryTile', () => {
  const mockCategory = initialCategories[0];
  const mockOnPress = jest.fn();

  it('renders category name', () => {
    render(<CategoryTile category={mockCategory} onPress={mockOnPress} />);
    expect(screen.getByText(mockCategory.name)).toBeTruthy();
  });

  it('triggers onPress when clicked', () => {
    render(<CategoryTile category={mockCategory} onPress={mockOnPress} />);
    fireEvent.press(screen.getByText(mockCategory.name));
    expect(mockOnPress).toHaveBeenCalled();
  });
}); 