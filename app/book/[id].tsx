import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  I18nManager,
  ScrollView,
  TouchableOpacity
} from "react-native";
import PagerView from "react-native-pager-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { sampleBooks } from "../../types/books";
import { Drawer } from "react-native-drawer-layout";
import Slider from "@react-native-community/slider";

const { width, height } = Dimensions.get("window");

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

  const findPageWithText = text => {
    if (!text.trim()) return;
    const index = book.pages.findIndex(page => page.contentAr.includes(text));
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
    if (!trimmedSearch)
      return (
        <Text
          style={[
            styles.text,
            { fontSize, lineHeight, marginTop: fontSize * 2 }
          ]}
        >
          {text}
        </Text>
      );

    const regex = new RegExp(`(${trimmedSearch})`, "gi");
    const parts = text.split(regex);

    return (
      <Text
        style={[styles.text, { fontSize, lineHeight, marginTop: fontSize * 2 }]}
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

  const handleButtonPress = buttonName => {
    if (buttonName === "الفهرس") {
      setIsDrawerOpen(true); // Open the drawer when "الفهرس" is pressed
    } else if (buttonName === "حجم الخط") {
      setIsSliderVisible(!isSliderVisible); // Toggle slider visibility
    } else {
      console.log(`${buttonName} button pressed`);
      // Add your button press logic here
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
          {/* Add your drawer content here */}
          <Text>محتوى الفهرس</Text>
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
        </View>

        {/* Button Bar */}
        <View style={styles.buttonBar}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleButtonPress("ازاله التشكيل")}
          >
            <Text style={styles.buttonText}>ازاله التشكيل</Text>
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
    </Drawer>
  );
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
  sliderContainer: {
    position: "absolute",
    left: 20,
    top: 150,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    width: 20,
    zIndex: 100
  },
  slider: {
    backgroundColor: "black",
    width: 180,
    height: 20,
    margin: 0,
    transform: [{ rotate: "270deg" }]
  }
});
