export interface PhotoItem {
  id: string;
  url: string;
  title: string;
  caption: string;
  date: string;
  location?: string;
  filmType?: string; // e.g., 'Kodak Gold 200', 'Fuji 400', 'Olympus Mju II'
  tag?: 'trips' | 'coffee' | 'ordinary' | 'film' | 'favorite';
  likes: number;
  createdAt: number;
}

export interface JournalSnippet {
  id: string;
  date: string;
  timeOfDay?: string;
  title: string;
  content: string;
  location?: string;
}

export interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  createdAt: number;
}

export interface BlogConfig {
  coupleTitle: string; // "Quốc Bảo & Lại Huệ"
  mastheadSubtitle: string;
  introTitle: string;
  introParagraph1: string;
  introParagraph2: string;
  city: string;
  songTitle: string;
  songArtist: string;
}
