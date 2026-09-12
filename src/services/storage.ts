import { PhotoItem, JournalSnippet, GuestbookEntry, BlogConfig } from '../types';

const DB_NAME = 'BaoHueVintageBlogDB';
const DB_VERSION = 2;
const PHOTO_STORE = 'photos';
const SNIPPET_STORE = 'snippets';
const GUESTBOOK_STORE = 'guestbook';
const CONFIG_KEY = 'bao_hue_blog_config';

export const DEFAULT_BLOG_CONFIG: BlogConfig = {
  coupleTitle: 'Quốc Bảo & Lại Huệ',
  mastheadSubtitle: 'A quiet journal of sweet moments, film rolls & ordinary days',
  introTitle: 'Ghi lại những điều bình dị nhất',
  introParagraph1:
    'Chào mừng bạn ghé thăm góc nhỏ của Quốc Bảo và Lại Huệ. Tụi mình làm blog này để gom nhặt lại những cuộn phim 35mm, những buổi chiều thong thả bên tách cà phê và những chuyến đi gom đầy nắng gió.',
  introParagraph2:
    'Mong rằng khi lướt qua những bức ảnh này, bạn cũng tìm thấy một chút dịu dàng, bình yên và những rung động nhỏ bé giữa nhịp sống hối hả.',
  city: 'Hà Nội',
  songTitle: 'Afternoon Melody (Acoustic)',
  songArtist: 'Bảo & Huệ Playlist',
};

export const INITIAL_PHOTOS: PhotoItem[] = [
  {
    id: 'photo-1',
    url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=1200&auto=format&fit=crop',
    title: 'Hoàng hôn bãi biển',
    caption: 'Một chiều lộng gió khi mặt trời chìm dần xuống đường chân trời.',
    date: '2024-04-18',
    location: 'Phú Quốc',
    filmType: 'Kodak Portra 400',
    tag: 'trips',
    likes: 42,
    createdAt: Date.now() - 60000000,
  },
  {
    id: 'photo-2',
    url: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=1200&auto=format&fit=crop',
    title: 'Góc quán quen cuối tuần',
    caption: 'Hai ly cà phê, một cuốn sách và những mẩu chuyện không đầu không cuối.',
    date: '2024-05-12',
    location: 'Quán Ban Công, Hà Nội',
    filmType: 'Fuji Pro 400H',
    tag: 'coffee',
    likes: 38,
    createdAt: Date.now() - 50000000,
  },
  {
    id: 'photo-3',
    url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=1200&auto=format&fit=crop',
    title: 'Nắng sớm qua ô cửa sổ',
    caption: 'Khoảnh khắc Huệ ngoảnh lại cười khi vừa thức giấc.',
    date: '2024-06-03',
    location: 'Căn hộ nhỏ',
    filmType: 'Olympus Mju II • Kodak 200',
    tag: 'ordinary',
    likes: 56,
    createdAt: Date.now() - 40000000,
  },
  {
    id: 'photo-4',
    url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1200&auto=format&fit=crop',
    title: 'Chuyến xe lên Đà Lạt',
    caption: 'Đường đèo mù sương, trời lạnh ngắt nhưng tay luôn được sưởi ấm.',
    date: '2024-07-20',
    location: 'Đà Lạt',
    filmType: 'Kodak Tri-X 400',
    tag: 'trips',
    likes: 49,
    createdAt: Date.now() - 30000000,
  },
  {
    id: 'photo-5',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop',
    title: 'Ánh mắt chiều thu',
    caption: 'Góc nghiêng quen thuộc trong cuộn phim mùa thu vừa tráng xong.',
    date: '2024-09-08',
    location: 'Phố Phan Đình Phùng',
    filmType: 'Cinestill 800T',
    tag: 'film',
    likes: 64,
    createdAt: Date.now() - 20000000,
  },
  {
    id: 'photo-6',
    url: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop',
    title: 'Đạp xe vòng quanh hồ Tây',
    caption: 'Dừng chân ngắm mặt nước lăn tăn và ăn một que kem cốm.',
    date: '2024-10-15',
    location: 'Hồ Tây, Hà Nội',
    filmType: 'Fuji Superia 200',
    tag: 'ordinary',
    likes: 35,
    createdAt: Date.now() - 10000000,
  },
];

export const INITIAL_SNIPPETS: JournalSnippet[] = [
  {
    id: 'snip-1',
    date: '14.10.2024',
    timeOfDay: '17:30 chiều',
    title: 'Một chiều tạt mưa',
    content:
      'Trời bất chợt đổ cơn mưa rào lúc tan tầm. Hai đứa trú vội dưới hiên tiệm hoa cũ, ngửi thấy mùi đất ẩm thơm nồng và ăn chung một chiếc bánh rán ngọt lịm.',
    location: 'Phố cổ Hà Nội',
  },
  {
    id: 'snip-2',
    date: '02.11.2024',
    timeOfDay: '08:15 sáng',
    title: 'Tách cà phê đầu mùa đông',
    content:
      'Gió mùa đông bắc tràn về qua khung cửa sổ. Huệ ngồi quấn chăn đan khăn len, còn mình thì pha một ấm trà ấm bốc khói nghi ngút. Thấy cuộc sống thế là đủ đầy.',
    location: 'Căn gác nhỏ',
  },
  {
    id: 'snip-3',
    date: '28.12.2024',
    timeOfDay: '21:00 tối',
    title: 'Gói trọn một năm',
    content:
      'Cùng nhau dọn dẹp lại những cuộn phim đã chụp cả năm qua, xếp vào từng chiếc hộp gỗ nhỏ. Mỗi bức ảnh là một mẩu ký ức không bao giờ phai màu.',
    location: 'Bàn làm việc',
  },
];

export const INITIAL_GUESTBOOK: GuestbookEntry[] = [
  {
    id: 'gb-1',
    name: 'Minh Anh & Tuấn',
    message: 'Trang blog xinh và thơ quá chừng! Chúc Bảo và Huệ luôn ngọt ngào, bình yên bên nhau như thế này nhé ✨',
    createdAt: Date.now() - 86400000 * 3,
  },
  {
    id: 'gb-2',
    name: 'Phương Linh',
    message: 'Màu ảnh film vintage đúng gu mình luôn. Nhìn hai bạn hạnh phúc làm người xem cũng thấy vui lây 💕',
    createdAt: Date.now() - 86400000,
  },
];

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(PHOTO_STORE)) {
        db.createObjectStore(PHOTO_STORE, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(SNIPPET_STORE)) {
        db.createObjectStore(SNIPPET_STORE, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(GUESTBOOK_STORE)) {
        db.createObjectStore(GUESTBOOK_STORE, { keyPath: 'id' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// Photos Store
export async function getPhotos(): Promise<PhotoItem[]> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(PHOTO_STORE, 'readonly');
      const store = tx.objectStore(PHOTO_STORE);
      const req = store.getAll();
      req.onsuccess = () => {
        const res: PhotoItem[] = req.result || [];
        if (res.length === 0) {
          seedInitialPhotos().then(() => resolve(INITIAL_PHOTOS));
        } else {
          res.sort((a, b) => b.createdAt - a.createdAt);
          resolve(res);
        }
      };
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    console.warn('DB error, using fallback', err);
    return INITIAL_PHOTOS;
  }
}

async function seedInitialPhotos(): Promise<void> {
  try {
    const db = await openDB();
    const tx = db.transaction(PHOTO_STORE, 'readwrite');
    const store = tx.objectStore(PHOTO_STORE);
    for (const p of INITIAL_PHOTOS) {
      store.put(p);
    }
  } catch (e) {
    console.error('Failed to seed photos', e);
  }
}

export async function savePhotoItem(photo: PhotoItem): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(PHOTO_STORE, 'readwrite');
    const store = tx.objectStore(PHOTO_STORE);
    const req = store.put(photo);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

export async function deletePhotoItem(id: string): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(PHOTO_STORE, 'readwrite');
    const store = tx.objectStore(PHOTO_STORE);
    const req = store.delete(id);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

// Snippets Store
export async function getSnippets(): Promise<JournalSnippet[]> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(SNIPPET_STORE, 'readonly');
      const store = tx.objectStore(SNIPPET_STORE);
      const req = store.getAll();
      req.onsuccess = () => {
        const res: JournalSnippet[] = req.result || [];
        if (res.length === 0) {
          seedInitialSnippets().then(() => resolve(INITIAL_SNIPPETS));
        } else {
          resolve(res);
        }
      };
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    return INITIAL_SNIPPETS;
  }
}

async function seedInitialSnippets(): Promise<void> {
  try {
    const db = await openDB();
    const tx = db.transaction(SNIPPET_STORE, 'readwrite');
    const store = tx.objectStore(SNIPPET_STORE);
    for (const s of INITIAL_SNIPPETS) {
      store.put(s);
    }
  } catch (e) {
    console.error('Failed to seed snippets', e);
  }
}

export async function saveSnippetItem(item: JournalSnippet): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(SNIPPET_STORE, 'readwrite');
    const store = tx.objectStore(SNIPPET_STORE);
    const req = store.put(item);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

// Guestbook Store
export async function getGuestbook(): Promise<GuestbookEntry[]> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(GUESTBOOK_STORE, 'readonly');
      const store = tx.objectStore(GUESTBOOK_STORE);
      const req = store.getAll();
      req.onsuccess = () => {
        const res: GuestbookEntry[] = req.result || [];
        if (res.length === 0) {
          seedInitialGuestbook().then(() => resolve(INITIAL_GUESTBOOK));
        } else {
          res.sort((a, b) => b.createdAt - a.createdAt);
          resolve(res);
        }
      };
      req.onerror = () => reject(req.error);
    });
  } catch (err) {
    return INITIAL_GUESTBOOK;
  }
}

async function seedInitialGuestbook(): Promise<void> {
  try {
    const db = await openDB();
    const tx = db.transaction(GUESTBOOK_STORE, 'readwrite');
    const store = tx.objectStore(GUESTBOOK_STORE);
    for (const g of INITIAL_GUESTBOOK) {
      store.put(g);
    }
  } catch (e) {
    console.error('Failed to seed guestbook', e);
  }
}

export async function saveGuestbookEntry(entry: GuestbookEntry): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(GUESTBOOK_STORE, 'readwrite');
    const store = tx.objectStore(GUESTBOOK_STORE);
    const req = store.put(entry);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

// Config
export function getBlogConfig(): BlogConfig {
  try {
    const raw = localStorage.getItem(CONFIG_KEY);
    if (raw) {
      return { ...DEFAULT_BLOG_CONFIG, ...JSON.parse(raw) };
    }
  } catch (e) {
    console.error(e);
  }
  return DEFAULT_BLOG_CONFIG;
}

export function saveBlogConfig(config: BlogConfig): void {
  try {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(config));
  } catch (e) {
    console.error(e);
  }
}
