import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { Book } from "../types/books";
import React = require("react");

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
      accessibilityLabel={book.titleAr}
    >
      <View
        style={[
          styles.coverContainer,
          { backgroundColor: getColorFromTitle(book.titleAr) }
        ]}
      >
        <Text style={styles.placeholderText}>
          {book.titleAr[0]}
        </Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.title}>
          {book.titleAr}
        </Text>
        <Text style={styles.author}>
          {book.authorAr}
        </Text>
        {book.pages &&
          <Text style={styles.pages}>
            {book.pagenbr} صفحة
          </Text>}
      </View>
    </TouchableOpacity>
  );
}

// Generate a consistent color based on the book title
function getColorFromTitle(title: string): string {
  const colors = [
    "#4F46E5", // Indigo
    "#10B981", // Emerald
    "#EF4444", // Red
    "#F59E0B", // Amber
    "#6366F1", // Purple
    "#EC4899" // Pink
  ];

  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = title.charCodeAt(i) + ((hash << 5) - hash);
  }

  return colors[Math.abs(hash) % colors.length];
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row-reverse",
    backgroundColor: "white",
    borderRadius: 8,
    marginBottom: 16,
    padding: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  coverContainer: {
    width: 80,
    height: 120,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center"
  },
  placeholderText: {
    fontSize: 32,
    color: "white",
    fontWeight: "bold"
  },
  info: {
    flex: 1,
    marginRight: 12,
    justifyContent: "center"
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 4,
    textAlign: "right",
    writingDirection: "rtl"
  },
  author: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 4,
    textAlign: "right",
    writingDirection: "rtl"
  },
  pages: {
    fontSize: 14,
    color: "#9CA3AF",
    textAlign: "right",
    writingDirection: "rtl"
  }
});
