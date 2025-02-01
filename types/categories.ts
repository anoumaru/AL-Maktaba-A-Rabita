export interface BookCategory {
  id: string;
  name: string;
  color: string;
  subCategories?: string[];
}

export const initialCategories: BookCategory[] = [
  {
    id: 'aqeedah',
    name: 'Aqeedah',
    color: '#4F46E5',
    subCategories: ['Classical Texts', 'Modern Works', 'Comparative Studies']
  },
  {
    id: 'fiqh',
    name: 'Fiqh',
    color: '#10B981',
    subCategories: ['Hanafi', 'Maliki', 'Shafi\'i', 'Hanbali']
  },
  {
    id: 'hadith',
    name: 'Hadith',
    color: '#EF4444',
    subCategories: ['Sahih Collections', 'Sunan', 'Shama\'il', 'Commentaries']
  }
]; 