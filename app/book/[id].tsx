import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  I18nManager,
  ScrollView,
  Alert,
  Clipboard
} from "react-native";
import PagerView from "react-native-pager-view";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { sampleBooks } from "../../types/books";
import { Drawer } from "react-native-drawer-layout";
import SearchBar from "../../components/SearchBar";
import ButtonBar from "../../components/ButtonBar";
import SliderControl from "../../components/SliderControl";
import DrawerContent from "../../components/DrawerContent";
import { removeDiacritics } from "../../utils/textUtils";

const { width, height } = Dimensions.get("window");

export default function BookReader() {
  const { id } = useLocalSearchParams();
  const book = sampleBooks.find(b => b.id === id);
  const [searchText, setSearchText] = useState("");
  const [targetPage, setTargetPage] = useState<number | null>(null);
  const [isFabExpanded, setIsFabExpanded] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [fontSize, setFontSize] = useState(20);
  const [lineHeight, setLineHeight] = useState(32);
  const [isSliderVisible, setIsSliderVisible] = useState(false);
  const [showDiacritics, setShowDiacritics] = useState(true);
  const [matches, setMatches] = useState<any[]>([]);
  const pagerRef = useRef<PagerView>(null);

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

  const uniqueChapterIds = [...new Set(book.pages.map(page => page.chapterId))];

  const toggleDiacritics = () => {
    setShowDiacritics(!showDiacritics);
  };

  const findPageWithText = (text: string) => {
    if (!text.trim()) {
      setMatches([]);
      return;
    }

    const trimmedSearch = text.trim();
    const regex = new RegExp(`(${trimmedSearch})`, "gi");
    const newMatches: any[] = [];

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
      setTargetPage(newMatches[0].pageIndex + 1);
    } else {
      setTargetPage(null);
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

  const highlightText = (text: string, search: string) => {
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

  const handleLongPress = (text: string) => {
    Alert.alert("نسخ النص", "هل تريد نسخ النص المحدد؟", [
      {
        text: "إلغاء",
        style: "cancel"
      },
      {
        text: "نسخ",
        onPress: () => {
          Clipboard.setString(text);
          Alert.alert("تم النسخ", "تم نسخ النص إلى الحافظة.");
        }
      }
    ]);
  };

  const handleButtonPress = (buttonName: string) => {
    if (buttonName === "الفهرس") {
      setIsDrawerOpen(true);
    } else if (buttonName === "حجم الخط") {
      setIsSliderVisible(!isSliderVisible);
    } else if (
      buttonName === "ازاله التشكيل" ||
      buttonName === "اعاده التشكيل"
    ) {
      toggleDiacritics();
    } else {
      console.log(`${buttonName} button pressed`);
    }
  };

  const navigateToChapter = (chapterId: string) => {
    const firstPageOfChapter = book.pages.find(
      page => page.chapterId === chapterId
    );
    if (firstPageOfChapter && pagerRef.current) {
      pagerRef.current.setPage(firstPageOfChapter.pageNumber - 1);
      setIsDrawerOpen(false);
    }
  };

  return (
    <Drawer
      open={isDrawerOpen}
      onOpen={() => setIsDrawerOpen(true)}
      onClose={() => setIsDrawerOpen(false)}
      renderDrawerContent={() =>
        <DrawerContent
          uniqueChapterIds={uniqueChapterIds}
          navigateToChapter={navigateToChapter}
        />}
    >
      <SafeAreaView style={styles.container}>
        <SearchBar
          searchText={searchText}
          setSearchText={setSearchText}
          findPageWithText={findPageWithText}
          matches={matches}
        />
        <ButtonBar
          handleButtonPress={handleButtonPress}
          showDiacritics={showDiacritics}
        />
        {isSliderVisible &&
          <SliderControl
            fontSize={fontSize}
            setFontSize={setFontSize}
            setLineHeight={setLineHeight}
          />}
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
  pageNumber: {
    textAlign: "center",
    fontWeight: "bold",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    paddingVertical: 5
  }
});
