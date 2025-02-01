export interface Book {
  id: string;
  title: string;
  author: string;
  categoryId: string;
  content: string;
  coverImage?: string;
  pages?: number;
}

// Mock data for testing
export const sampleBooks: Book[] = [
  // Aqeedah Books
  {
    id: 'book1',
    title: 'Kitab At-Tawheed',
    author: 'Muhammad ibn Abdul Wahhab',
    categoryId: 'aqeedah',
    content: `Chapter 1: The Virtue of Tawheed...
    The foundation of Islam and its primary aspect is the testimony that none has the right to be worshipped but Allah...`,
    pages: 254
  },
  {
    id: 'book2',
    title: 'The Fundamentals of Tawhid',
    author: 'Abu Ameenah Bilal Philips',
    categoryId: 'aqeedah',
    content: `Introduction to Islamic Monotheism...
    The concept of Tawhid (Islamic Monotheism) is the most fundamental and important belief in Islam...`,
    pages: 190
  },

  // Fiqh Books
  {
    id: 'book3',
    title: 'Umdat al-Fiqh',
    author: 'Ibn Qudamah al-Maqdisi',
    categoryId: 'fiqh',
    content: `Book of Purification...
    The water that can be used for purification is of two types: pure water that can purify and pure water that cannot purify...`,
    pages: 320
  },
  {
    id: 'book4',
    title: 'Fiqh of Worship',
    author: 'Sheikh Ibn Uthaymeen',
    categoryId: 'fiqh',
    content: `Chapter on Prayer...
    The conditions of prayer are: Islam, sanity, reaching the age of distinction, purification from both major and minor impurities...`,
    pages: 280
  },

  // Hadith Books
  {
    id: 'book5',
    title: 'Sahih Al-Bukhari',
    author: 'Imam Al-Bukhari',
    categoryId: 'hadith',
    content: `Book of Revelation...
    How the Divine Revelation started to be revealed to Allah's Messenger...`,
    pages: 1380
  },
  {
    id: 'book6',
    title: 'Riyad as-Salihin',
    author: 'Imam An-Nawawi',
    categoryId: 'hadith',
    content: `Chapter on Sincerity...
    The importance of sincerity in all actions and that they should be for Allah's sake alone...`,
    pages: 642
  }
]; 