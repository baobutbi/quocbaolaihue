import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PhotoGallery } from './components/PhotoGallery';
import { JournalSection } from './components/JournalSection';
import { GuestbookSection } from './components/GuestbookSection';
import { Footer } from './components/Footer';
import { UploadModal } from './components/UploadModal';
import {
  getPhotos,
  savePhotoItem,
  deletePhotoItem,
  getSnippets,
  saveSnippetItem,
  getGuestbook,
  saveGuestbookEntry,
  getBlogConfig,
} from './services/storage';
import {
  startMusic,
  toggleMusic,
  setupAutoPlayOnInteraction,
  playSoftClick,
} from './services/sound';
import { PhotoItem, JournalSnippet, GuestbookEntry, BlogConfig } from './types';

export function App() {
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [snippets, setSnippets] = useState<JournalSnippet[]>([]);
  const [guestbook, setGuestbook] = useState<GuestbookEntry[]>([]);
  const [config, setConfig] = useState<BlogConfig>(getBlogConfig());
  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(false);
  const [isUploadOpen, setIsUploadOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize data and audio
  useEffect(() => {
    async function loadData() {
      try {
        const [loadedPhotos, loadedSnippets, loadedGuestbook] = await Promise.all([
          getPhotos(),
          getSnippets(),
          getGuestbook(),
        ]);
        setPhotos(loadedPhotos);
        setSnippets(loadedSnippets);
        setGuestbook(loadedGuestbook);
      } catch (err) {
        console.error('Error loading data', err);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();

    // Attempt immediate audio play (if allowed) + setup auto-play on first click/touch
    const initialStarted = startMusic((playing) => setIsMusicPlaying(playing));
    if (initialStarted) {
      setIsMusicPlaying(true);
    }
    setupAutoPlayOnInteraction((playing) => setIsMusicPlaying(playing));
  }, []);

  const handleToggleMusic = () => {
    toggleMusic((playing) => setIsMusicPlaying(playing));
  };

  const handleSavePhoto = async (newPhoto: PhotoItem) => {
    await savePhotoItem(newPhoto);
    setPhotos((prev) => [newPhoto, ...prev]);
    playSoftClick();
  };

  const handleDeletePhoto = async (id: string) => {
    await deletePhotoItem(id);
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  const handleLikePhoto = async (id: string) => {
    playSoftClick();
    setPhotos((prev) =>
      prev.map((photo) => {
        if (photo.id === id) {
          const updated = { ...photo, likes: photo.likes + 1 };
          savePhotoItem(updated);
          return updated;
        }
        return photo;
      })
    );
  };

  const handleAddSnippet = async (newSnippet: JournalSnippet) => {
    await saveSnippetItem(newSnippet);
    setSnippets((prev) => [newSnippet, ...prev]);
    playSoftClick();
  };

  const handleAddGuestbook = async (newEntry: GuestbookEntry) => {
    await saveGuestbookEntry(newEntry);
    setGuestbook((prev) => [newEntry, ...prev]);
    playSoftClick();
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2D2824] flex flex-col selection:bg-[#EADBCC] selection:text-[#3B332B]">
      {/* Navigation bar with Audio controller */}
      <Navbar
        isMusicPlaying={isMusicPlaying}
        onToggleMusic={handleToggleMusic}
        onOpenUpload={() => setIsUploadOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1">
        <HeroSection
          config={config}
          isMusicPlaying={isMusicPlaying}
          onToggleMusic={handleToggleMusic}
          onOpenUpload={() => setIsUploadOpen(true)}
        />

        <PhotoGallery
          photos={photos}
          onOpenUpload={() => setIsUploadOpen(true)}
          onLikePhoto={handleLikePhoto}
          onDeletePhoto={handleDeletePhoto}
        />

        <JournalSection
          snippets={snippets}
          onAddSnippet={handleAddSnippet}
        />

        <GuestbookSection
          entries={guestbook}
          onAddEntry={handleAddGuestbook}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Upload Photo Modal */}
      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onSave={handleSavePhoto}
      />
    </div>
  );
}

export default App;
