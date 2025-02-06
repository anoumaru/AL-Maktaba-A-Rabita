import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface DrawerContentProps {
  uniqueChapterIds: string[];
  navigateToChapter: (chapterId: string) => void;
}

const DrawerContent: React.FC<DrawerContentProps> = ({
  uniqueChapterIds,
  navigateToChapter
}) => {
  return (
    <View style={styles.drawerContent}>
      <Text style={styles.drawerHeader}>الفهرس</Text>
      {uniqueChapterIds.map((chapterId, index) =>
        <TouchableOpacity
          key={index}
          style={styles.chapterItem}
          onPress={() => navigateToChapter(chapterId)}
        >
          <Text style={styles.chapterText}>
            الفصل {chapterId}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff"
  },
  drawerHeader: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "right"
  },
  chapterItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc"
  },
  chapterText: {
    fontSize: 16,
    textAlign: "right"
  }
});

export default DrawerContent;
