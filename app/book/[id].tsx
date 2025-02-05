import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  I18nManager,
  ScrollView,
  TouchableOpacity,
  Alert,
  Clipboard
} from "react-native";
import PagerView from "react-native-pager-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { sampleBooks } from "../../types/books";
import { Drawer } from "react-native-drawer-layout";
import Slider from "@react-native-community/slider";

const { width, height } = Dimensions.get("window");

// Function to remove Arabic diacritics
const removeDiacritics = text => {
  return text.replace(/[\u064B-\u065F\u0670]/g, ""); // Removes all Arabic diacritics
};

export default function BookReader() {
  const { id } = useLocalSearchParams();
  const book = sampleBooks.find(b => b.id === id);
  const [searchText, setSearchText] = useState("");
  const [targetPage, setTargetPage] = useState(null);
  const [isFabExpanded, setIsFabExpanded] = useState(false); // State to manage FAB expansion
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State to manage drawer open/close
  const [fontSize, setFontSize] = useState(20); // State to manage font size
  const [lineHeight, setLineHeight] = useState(32); // State to manage line height
  const [isSliderVisible, setIsSliderVisible] = useState(false); // State to manage slider visibility
  const [showDiacritics, setShowDiacritics] = useState(true); // State to manage diacritics visibility
  const [matches, setMatches] = useState([]); // State to store matches
  const pagerRef = useRef(null);

  useEffect(() => {
    if (!I18nManager.isRTL) {
      I18nManager.forceRTL(true);
    }
  }, []);

  if (!book) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.error}>الكتاب غير موجود</Text>
      </SafeAreaView>
    );
  }

  // Extract unique chapter IDs from book.pages
  const uniqueChapterIds = [...new Set(book.pages.map(page => page.chapterId))];

  // Function to toggle diacritics
  const toggleDiacritics = () => {
    setShowDiacritics(!showDiacritics);
  };

  const findPageWithText = text => {
    if (!text.trim()) {
      setMatches([]);
      return;
    }

    const trimmedSearch = text.trim();
    const regex = new RegExp(`(${trimmedSearch})`, "gi");
    const newMatches = [];

    book.pages.forEach((page, pageIndex) => {
      const content = showDiacritics
        ? page.contentAr
        : removeDiacritics(page.contentAr);
      const pageMatches = [...content.matchAll(regex)];

      if (pageMatches.length > 0) {
        pageMatches.forEach(match => {
          newMatches.push({
            pageIndex,
            start: match.index,
            end: match.index + match[0].length
          });
        });
      }
    });

    setMatches(newMatches);

    if (newMatches.length > 0) {
      setTargetPage(newMatches[0].pageIndex + 1); // Navigate to the first match
    } else {
      setTargetPage(null); // No matches found
    }
  };

  useEffect(
    () => {
      if (targetPage !== null && pagerRef.current) {
        pagerRef.current.setPage(targetPage);
      }
    },
    [targetPage]
  );

  const highlightText = (text, search) => {
    const trimmedSearch = search.trim();
    const content = showDiacritics ? text : removeDiacritics(text);

    if (!trimmedSearch) {
      return (
        <Text
          selectable={true}
          style={[
            styles.text,
            { fontSize, lineHeight, marginTop: fontSize * 2 }
          ]}
          onLongPress={() => handleLongPress(content)}
        >
          {content}
        </Text>
      );
    }

    const regex = new RegExp(`(${trimmedSearch})`, "gi");
    const parts = content.split(regex);

    return (
      <Text
        selectable={true}
        style={[styles.text, { fontSize, lineHeight, marginTop: fontSize * 2 }]}
        onLongPress={() => handleLongPress(content)}
      >
        {parts.map(
          (part, index) =>
            part.toLowerCase() === trimmedSearch.toLowerCase()
              ? <Text
                  key={index}
                  style={[
                    styles.highlight,
                    {
                      fontSize,
                      lineHeight,
                      backgroundColor: "#FFFF00", 
                      color: "#000000", 
                      fontWeight: "bold",
                      textDecorationLine: "underline", 
                      borderRadius: 3, 
                      paddingHorizontal: 2, 
                      paddingVertical: 1 
                    }
                  ]}
                >
                  {part}
                </Text>
              : <Text key={index}>
                  {part}
                </Text>
        )}
      </Text>
    );
  };

  
  const handleLongPress = text => {
    Alert.alert("نسخ النص", "هل تريد نسخ النص المحدد؟", [
      {
        text: "إلغاء",
        style: "cancel"
      },
      {
        text: "نسخ",
        onPress: () => {
          // Copy text to clipboard
          Clipboard.setString(text);
          Alert.alert("تم النسخ", "تم نسخ النص إلى الحافظة.");
        }
      }
    ]);
  };

  const handleButtonPress = buttonName => {
    if (buttonName === "الفهرس") {
      setIsDrawerOpen(true); 
    } else if (buttonName === "حجم الخط") {
      setIsSliderVisible(!isSliderVisible); // Toggle slider visibility
    } else if (
      buttonName === "ازاله التشكيل" ||
      buttonName === "اعاده التشكيل"
    ) {
      toggleDiacritics(); // Toggle diacritics
    } else {
      console.log(`${buttonName} button pressed`)
    }
  };

  // Function to navigate to a specific chapter
  const navigateToChapter = chapterId => {
    const firstPageOfChapter = book.pages.find(
      page => page.chapterId === chapterId
    );
    if (firstPageOfChapter && pagerRef.current) {
      pagerRef.current.setPage(firstPageOfChapter.pageNumber - 1); // Assuming pageNumber starts from 1
      setIsDrawerOpen(false); // Close the drawer after navigation
    }
  };

  return (
    <Drawer
      open={isDrawerOpen}
      onOpen={() => setIsDrawerOpen(true)}
      onClose={() => setIsDrawerOpen(false)}
      renderDrawerContent={() =>
        <View style={styles.drawerContent}>
          <Text style={styles.drawerHeader}>الفهرس</Text>
          {/* Render unique chapter IDs */}
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
        </View>}
    >
      <SafeAreaView style={styles.container}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="🔍 بحث..."
            value={searchText}
            onChangeText={text => {
              setSearchText(text);
              findPageWithText(text);
            }}
          />
          {/* Display match count on the side */}
          {matches.length > 0 &&
            <View style={styles.matchCountContainer}>
              <Text style={styles.matchCount}>
                {matches.length} نتيجة
              </Text>
            </View>}
        </View>

        {/* Button Bar */}
        <View style={styles.buttonBar}>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              handleButtonPress(
                showDiacritics ? "ازاله التشكيل" : "اعاده التشكيل"
              )}
          >
            <Text style={styles.buttonText}>
              {showDiacritics ? "ازاله التشكيل" : "اعاده التشكيل"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonPress("الفهرس")}
          >
            <Text style={styles.buttonText}>الفهرس </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonPress("حجم الخط")}
          >
            <Text style={styles.buttonText}>حجم الخط</Text>
          </TouchableOpacity>
        </View>

        {/* Vertical Slider for Font Size and Line Height */}
        {isSliderVisible &&
          <View style={styles.sliderContainer}>
            <Slider
              style={styles.slider}
              minimumValue={10}
              maximumValue={40}
              step={1}
              value={fontSize}
              onValueChange={value => {
                setFontSize(value);
                setLineHeight(value * 1.6); // Adjust line height proportionally to font size
              }}
              minimumTrackTintColor="#000"
              maximumTrackTintColor="#ccc"
            />
          </View>}

        <PagerView
          style={styles.pagerView}
          layoutDirection="rtl"
          initialPage={0}
          ref={pagerRef}
        >
          <View key="cover" style={styles.coverPage}>
            <Text style={[styles.title, { fontSize: fontSize + 8 }]}>
              {book.titleAr}
            </Text>
            <Text style={[styles.author, { fontSize: fontSize + 4 }]}>
              تأليف: {book.authorAr}
            </Text>
          </View>
          {book.pages.map((page, pageIndex) =>
            <ScrollView
              key={page.pageNumber}
              contentContainerStyle={styles.page}
            >
              <Text style={styles.pageNumber}>
                صفحة {page.pageNumber}
              </Text>
              {highlightText(page.contentAr, searchText)}
            </ScrollView>
          )}
        </PagerView>
      </SafeAreaView>
    </Drawer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF3E0"
  },
  searchContainer: {
    flexDirection: "row", // Align items horizontally
    alignItems: "center", // Center items vertically
    position: "absolute",
    top: 5,
    left: 10,
    right: 10,
    zIndex: 100
  },
  searchInput: {
    flex: 1, // Take up remaining space
    height: 50,
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 18,
    textAlign: "right",
    writingDirection: "rtl",
    borderWidth: 1,
    borderColor: "#ccc",
    elevation: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4
  },
  matchCountContainer: {
    marginLeft: 10, // Add spacing between search bar and match count
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#f0f0f0", // Light gray background
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc"
  },
  matchCount: {
    color: "#666",
    fontSize: 14,
    textAlign: "center"
  },
  pagerView: {
    flex: 1
  },
  coverPage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  title: {
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
    writingDirection: "rtl"
  },
  author: {
    color: "#6B7280",
    textAlign: "center",
    writingDirection: "rtl"
  },
  page: {
    flexGrow: 1,
    width: width,
    height: height,
    writingDirection: "rtl",
    padding: 20
  },
  text: {
    textAlign: "right",
    writingDirection: "rtl"
  },
  highlight: {
    backgroundColor: "#FFFF00",
    color: "#000000",
    fontWeight: "bold",
    textDecorationLine: "underline",
    borderRadius: 3,
    paddingHorizontal: 2,
    paddingVertical: 1
  },
  error: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
    color: "#EF4444"
  },
  buttonBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    marginTop: 35
  },
  button: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 5,
    borderColor: "#20232a",
    borderWidth: 0.5,
    elevation: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4
  },
  buttonText: {
    color: "black",
    fontSize: 16
  },
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
  },
  sliderContainer: {
    position: "absolute",
    left: 20,
    top: 180,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    width: 20,
 
    zIndex: 100
  },
  slider: {
    
    width: 200,
    height: 20,
    margin: 0,
    transform: [{ rotate: "270deg" }]
  },
  pageNumber: {
    textAlign: "center",
    fontWeight: "bold",
    backgroundColor: "rgba(255, 255, 255, 0.7)", // Optional: Transparent white background
    paddingVertical: 5
  }
});
