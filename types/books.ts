export interface Book {
  id: string;
  title: string;
  titleAr: string;
  author: string;
  authorAr: string;
  categoryId: string;
  content: string;
  contentAr: string;
  pages?: number;
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
    content: 'Chapter 1: The Virtue of Tawheed...',
    contentAr: `باب فضل التوحيد وما يكفر من الذنوب
    قال الله تعالى: ﴿الَّذِينَ آمَنُوا وَلَمْ يَلْبِسُوا إِيمَانَهُمْ بِظُلْمٍ أُولَئِكَ لَهُمُ الْأَمْنُ وَهُمْ مُهْتَدُونَ﴾`,
    pages: 254
  },
  {
    id: 'book2',
    title: 'The Fundamentals of Tawhid',
    titleAr: 'أصول التوحيد',
    author: 'Abu Ameenah Bilal Philips',
    authorAr: 'أبو أمينة بلال فيليبس',
    categoryId: 'aqeedah',
    content: 'Introduction to Islamic Monotheism...',
    contentAr: 'مقدمة في التوحيد الإسلامي...',
    pages: 190
  },

  // Fiqh Books
  {
    id: 'book3',
    title: 'Umdat al-Fiqh',
    titleAr: 'عمدة الفقه',
    author: 'Ibn Qudamah al-Maqdisi',
    authorAr: 'ابن قدامة المقدسي',
    categoryId: 'fiqh',
    content: 'Book of Purification...',
    contentAr: 'كتاب الطهارة...',
    pages: 320
  },
  {
    id: 'book4',
    title: 'Fiqh of Worship',
    titleAr: 'فقه العبادات',
    author: 'Sheikh Ibn Uthaymeen',
    authorAr: 'الشيخ ابن عثيمين',
    categoryId: 'fiqh',
    content: 'Chapter on Prayer...',
    contentAr: 'باب الصلاة...',
    pages: 280
  },
  {
    id: 'book7',
    title: 'Al-Fiqh Al-Muyassar',
    titleAr: 'الفقه الميسر في ضوء الكتاب والسنة',
    author: 'Group of Scholars',
    authorAr: 'مجموعة من العلماء',
    categoryId: 'fiqh',
    content: 'Introduction to simplified Fiqh...',
    contentAr: `المقدمة
    الحمد لله رب العالمين، والصلاة والسلام على نبينا محمد وعلى آله وصحبه أجمعين.
    
    كتاب الطهارة
    الطهارة في اللغة: النظافة والنزاهة عن الأقذار.
    وفي الشرع: رفع الحدث، وإزالة النجس.
    
    أقسام المياه
    الماء قسمان:
    1- طهور: وهو الباقي على خلقته.
    2- نجس: وهو الذي خالطته نجاسة غيرت لونه أو طعمه أو ريحه.`,
    pages: 495
  },

  // Hadith Books
  {
    id: 'book5',
    title: 'Sahih Al-Bukhari',
    titleAr: 'صحيح البخاري',
    author: 'Imam Al-Bukhari',
    authorAr: 'الإمام البخاري',
    categoryId: 'hadith',
    content: 'Book of Revelation...',
    contentAr: 'كتاب الوحي...',
    pages: 1380
  },
  {
    id: 'book6',
    title: 'Riyad as-Salihin',
    titleAr: 'رياض الصالحين',
    author: 'Imam An-Nawawi',
    authorAr: 'الإمام النووي',
    categoryId: 'hadith',
    content: 'Chapter on Sincerity...',
    contentAr: 'باب الإخلاص...',
    pages: 642
  }
]; 