import React, { useEffect, useState } from "react";
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

const { width, height } = Dimensions.get("window");

export default function BookReader() {
  const { id } = useLocalSearchParams();
  const book = sampleBooks.find(b => b.id === id);
  const [searchText, setSearchText] = useState("");
  const [targetPage, setTargetPage] = useState(null);
  const [isFabExpanded, setIsFabExpanded] = useState(false); // State to manage FAB expansion
  const pagerRef = React.useRef(null);

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
        <Text style={styles.text}>
          {text}
        </Text>
      );

    const regex = new RegExp(`(${trimmedSearch})`, "gi");
    const parts = text.split(regex);

    return (
      <Text style={styles.text}>
        {parts.map(
          (part, index) =>
            part.toLowerCase() === trimmedSearch.toLowerCase()
              ? <Text key={index} style={styles.highlight}>
                  {part}
                </Text>
              : part
        )}
      </Text>
    );
  };

  const handleButtonPress = buttonName => {
    console.log(`${buttonName} button pressed`);
    // Add your button press logic here
  };

  return <SafeAreaView style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput style={styles.searchInput} placeholder="🔍 بحث..." value={searchText} onChangeText={text => {
            setSearchText(text);
            findPageWithText(text);
          }} />
      </View>

      {/* Button Bar */}
      <View style={styles.buttonBar}>
        <TouchableOpacity style={styles.button} onPress={() => handleButtonPress("Button 1")}>
          <Text style={styles.buttonText}>ازاله التشكيل</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleButtonPress("Button 2")}>
          <Text style={styles.buttonText}>الفهرس </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleButtonPress("Button 3")}>
          <Text style={styles.buttonText}>حجم الخط</Text>
        </TouchableOpacity>
      </View>

      <PagerView style={styles.pagerView} layoutDirection="rtl" initialPage={0} ref={pagerRef}>
        <View key="cover" style={styles.coverPage}>
          <Text style={styles.title}>
            {book.titleAr}
          </Text>
          <Text style={styles.author}>
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
    </SafeAreaView>;
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
  pageNumber: {},
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
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
    writingDirection: "rtl"
  },
  author: {
    fontSize: 20,
    color: "#6B7280",
    textAlign: "center",
    writingDirection: "rtl"
  },
  page: {
    flexGrow: 1,
    width: width,
    height: height,
    marginTop: 100,
    writingDirection: "rtl",
    padding: 20
  },
  text: {
    fontSize: 20,
    lineHeight: 32,
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
  }
});
