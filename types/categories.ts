export interface BookCategory {
  id: string;
  name: string;
  nameAr: string;  // Arabic name
  color: string;
  subCategories?: { name: string; nameAr: string }[];
}

export const initialCategories: BookCategory[] = [
  {
    id: 'aqeedah',
    name: 'Aqeedah',
    nameAr: 'العقيدة',
    color: '#4F46E5',
    subCategories: [
      { name: 'Classical Texts', nameAr: 'النصوص التراثية' },
      { name: 'Modern Works', nameAr: 'المؤلفات المعاصرة' },
      { name: 'Comparative Studies', nameAr: 'الدراسات المقارنة' }
    ]
  },
  {
    id: 'fiqh',
    name: 'Fiqh',
    nameAr: 'الفقه',
    color: '#10B981',
    subCategories: [
      { name: 'Hanafi', nameAr: 'الفقه الحنفي' },
      { name: 'Maliki', nameAr: 'الفقه المالكي' },
      { name: 'Shafi\'i', nameAr: 'الفقه الشافعي' },
      { name: 'Hanbali', nameAr: 'الفقه الحنبلي' }
    ]
  },
  {
    id: 'hadith',
    name: 'Hadith',
    nameAr: 'الحديث',
    color: '#EF4444',
    subCategories: [
      { name: 'Sahih Collections', nameAr: 'الصحاح' },
      { name: 'Sunan', nameAr: 'السنن' },
      { name: 'Shama\'il', nameAr: 'الشمائل' },
      { name: 'Commentaries', nameAr: 'الشروح' }
    ]
  }
]; 