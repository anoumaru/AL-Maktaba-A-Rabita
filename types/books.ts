export interface Book {
  id: string;
  title: string;
  titleAr: string;
  author: string;
  authorAr: string;
  categoryId: string;
  pages: Page[];
}

export interface Page {
  id: string;
  pageNumber: number;
  isIndex: boolean;
  content: string;
  contentAr: string;
  chapterId: string;
}

// Mock data for testing
export const sampleBooks: Book[] = [
  // Aqeedah Books
  {
    id: 'book1',
    title: 'Kitab At-Tawheed',
    titleAr: 'كتاب التوحيد',
    author: 'Muhammad ibn Abdul Wahhab',
    authorAr: 'محمد بن عبد الوهاب',
    categoryId: 'aqeedah',
    pages: [
      {
        id: 'page1',
        pageNumber: 1,
        isIndex: false,
        content: 'Chapter 1: The Virtue of Tawheed...',
        contentAr: 'أَبُو الطَّيِّب المُتَنَبِّي أحمَدُ بن الحُسَينِ الجُعْفِيُّ الكِنْدِيُّ الكُوفِيُّ ',
        chapterId: 'chapter1'
      },
      {
        id: 'page2',
        pageNumber: 2,
        isIndex: false,
        content: 'Chapter 2: The Importance of Pure Monotheism...',
        contentAr: 'باب أهمية التوحيد الخالص...',
        chapterId: 'chapter2'
      },
      {
        id: 'page3',
        pageNumber: 3,
        isIndex: false,
        content: 'Chapter 2: The Importance of Pure Monotheism...',
        contentAr: 'باب أهمية التوحيد الخالص...',
        chapterId: 'chapter2'
      },
      {
        id: 'page4',
        pageNumber: 4,
        isIndex: false,
        content: 'Chapter 2: The Importance of Pure Monotheism...',
        contentAr: 'باب أهمية التوحيد الخالص...',
        chapterId: 'chapter2'
      },
      {
        id: 'page5',
        pageNumber: 5,
        isIndex: false,
        content: 'Chapter 2: The Importance of Pure Monotheism...',
        contentAr: 'باب أهمية التوحيد الخالص...',
        chapterId: 'chapter3'
      }
    ]
  },
  {
    id: 'book2',
    title: 'The Fundamentals of Tawhid',
    titleAr: 'أصول التوحيد',
    author: 'Abu Ameenah Bilal Philips',
    authorAr: 'أبو أمينة بلال فيليبس',
    categoryId: 'aqeedah',
    pages: [
      {
        id: 'page3',
        pageNumber: 1,
        isIndex: false,
        content: 'Introduction to Islamic Monotheism...',
        contentAr: 'مقدمة في التوحيد الإسلامي...',
        chapterId: 'chapter1'
      }
    ]
  },
  // Fiqh Books
  {
    id: 'book3',
    title: 'Umdat al-Fiqh',
    titleAr: 'عمدة الفقه',
    author: 'Ibn Qudamah al-Maqdisi',
    authorAr: 'ابن قدامة المقدسي',
    categoryId: 'fiqh',
    pages: [
      {
        id: 'page4',
        pageNumber: 1,
        isIndex: false,
        content: 'Book of Purification...',
        contentAr: 'كتاب الطهارة...',
        chapterId: 'chapter1'
      }
    ]
  },
  {
    id: 'book4',
    title: 'Fiqh of Worship',
    titleAr: 'فقه العبادات',
    author: 'Sheikh Ibn Uthaymeen',
    authorAr: 'الشيخ ابن عثيمين',
    categoryId: 'fiqh',
    pagenbr: 280,
    pages: [
      {
        id: 'page5',
        pageNumber: 1,
        isIndex: false,
        content: 'Chapter on Prayer...',
        contentAr: 'باب الصلاة...',
        chapterId: 'chapter1'
      }
    ]
  },
  {
    id: 'book7',
    title: 'Al-Fiqh Al-Muyassar',
    titleAr: 'الفقه الميسر في ضوء الكتاب والسنة',
    author: 'Group of Scholars',
    authorAr: 'مجموعة من العلماء',
    categoryId: 'fiqh',
    pagenbr: 280,
    pages: [
      {
        id: 'page6',
        pageNumber: 1,
        isIndex: false,
        content: 'Introduction to simplified Fiqh...',
        contentAr: 'المقدمة الحمد لله رب العالمين، والصلاة والسلام على نبينا محمد وعلى آله وصحبه أجمعين.',
        chapterId: 'chapter1'
      }
    ]
  },
  // Hadith Books
  {
    id: 'book5',
    title: 'Sahih Al-Bukhari',
    titleAr: 'صحيح البخاري',
    author: 'Imam Al-Bukhari',
    authorAr: 'الإمام البخاري',
    categoryId: 'hadith',
    pagenbr: 280,
    pages: [
      {
        id: 'page7',
        pageNumber: 1,
        isIndex: false,
        content: 'Book of Revelation...',
        contentAr: 'كتاب الوحي...',
        chapterId: 'chapter1'
      }
    ]
  },
  {
    id: 'book6',
    title: 'Riyad as-Salihin',
    titleAr: 'رياض الصالحين',
    author: 'Imam An-Nawawi',
    authorAr: 'الإمام النووي',
    categoryId: 'hadith',
    pagenbr: 280,
    pages: [
      {
        id: 'page8',
        pageNumber: 1,
        isIndex: false,
        content: 'Chapter on Sincerity...',
        contentAr: 'باب الإخلاص...',
        chapterId: 'chapter1'
      }
    ]
  }
];