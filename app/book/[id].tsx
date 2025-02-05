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
  Alert
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
    if (!text.trim()) return;
    const index = book.pages.findIndex(page => {
      const content = showDiacritics
        ? page.contentAr
        : removeDiacritics(page.contentAr);
      return content.includes(text);
    });
    if (index !== -1) {
      setTargetPage(index);
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
    if (!trimmedSearch)
      return (
        <Text
          selectable={true} // Make text selectable
          style={[
            styles.text,
            { fontSize, lineHeight, marginTop: fontSize * 2 }
          ]}
          onLongPress={() => handleLongPress(content)} // Optional: Handle long press
        >
          {content}
        </Text>
      );

    const regex = new RegExp(`(${trimmedSearch})`, "gi");
    const parts = content.split(regex);

    return (
      <Text
        selectable={true} // Make text selectable
        style={[styles.text, { fontSize, lineHeight, marginTop: fontSize * 2 }]}
        onLongPress={() => handleLongPress(content)} // Optional: Handle long press
      >
        {parts.map(
          (part, index) =>
            part.toLowerCase() === trimmedSearch.toLowerCase()
              ? <Text
                  key={index}
                  style={[styles.highlight, { fontSize, lineHeight }]}
                >
                  {part}
                </Text>
              : part
        )}
      </Text>
    );
  };

  // Function to handle long press (optional)
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
      setIsDrawerOpen(true); // Open the drawer when "الفهرس" is pressed
    } else if (buttonName === "حجم الخط") {
      setIsSliderVisible(!isSliderVisible); // Toggle slider visibility
    } else if (
      buttonName === "ازاله التشكيل" ||
      buttonName === "اعاده التشكيل"
    ) {
      toggleDiacritics(); // Toggle diacritics
    } else {
      console.log(`${buttonName} button pressed`);
      // Add your button press logic here
    }
  };

  // Function to navigate to a specific chapter
  const navigateToChapter = chapterId => {
    const firstPageOfChapter = book.pages.find(
      page => page.chapterId === chapterId
    );
    if (firstPageOfChapter && pagerRef.current) {
      pagerRef.current.setPage(firstPageOfChapter.pageNumber ); // Assuming pageNumber starts from 1
      setIsDrawerOpen(false); // Close the drawer after navigation
    }
  };

  return <Drawer open={isDrawerOpen} onOpen={() => setIsDrawerOpen(true)} onClose={() => setIsDrawerOpen(false)} renderDrawerContent={() => <View style={styles.drawerContent}>
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
        </View>}>
      <SafeAreaView style={styles.container}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput style={styles.searchInput} placeholder="🔍 بحث..." value={searchText} onChangeText={text => {
              setSearchText(text);
              findPageWithText(text);
            }} />
        </View>

        {/* Button Bar */}
        <View style={styles.buttonBar}>
          <TouchableOpacity style={styles.button} onPress={() => handleButtonPress(showDiacritics ? "ازاله التشكيل" : "اعاده التشكيل")}>
            <Text style={styles.buttonText}>
              {showDiacritics ? "ازاله التشكيل" : "اعاده التشكيل"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleButtonPress("الفهرس")}>
            <Text style={styles.buttonText}>الفهرس </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => handleButtonPress("حجم الخط")}>
            <Text style={styles.buttonText}>حجم الخط</Text>
          </TouchableOpacity>
        </View>

        {/* Vertical Slider for Font Size and Line Height */}
        {isSliderVisible && <View style={styles.sliderContainer}>
            <Slider style={styles.slider} minimumValue={10} maximumValue={40} step={1} value={fontSize} onValueChange={value => {
                setFontSize(value);
                setLineHeight(value * 1.6);
              }} minimumTrackTintColor="#000" maximumTrackTintColor="#ccc" />
          </View>}

        <PagerView style={styles.pagerView} layoutDirection="rtl" initialPage={0} ref={pagerRef}>
          <View key="cover" style={styles.coverPage}>
            <Text selectable={true} style={[styles.title, { fontSize: fontSize + 8 }]}>
              {book.titleAr}
            </Text>
            <Text selectable={true} style={[styles.author, { fontSize: fontSize + 4 }]}>
              تأليف: {book.authorAr}
            </Text>
          </View>
          {book.pages.map(page =>
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
    </Drawer>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF3E0"
  },
  searchContainer: {
    position: "absolute",
    top: 5,
    left: 10,
    right: 10,
    zIndex: 100
  },
  pageNumber: {
    textAlign: "center",
    fontWeight: "bold",
    backgroundColor: "rgba(255, 255, 255, 0.7)", // Optional: Transparent white background
    paddingVertical: 5
  },
  searchInput: {
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
    backgroundColor: "yellow",
    fontWeight: "bold"
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
    top: 100,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    backgroundColor: "green",
    zIndex: 100
  },
  slider: {
    backgroundColor: "black",
    width: 140,
    height: 120,
    margin: 0,
    transform: [{ rotate: "270deg" }]
  }
});
