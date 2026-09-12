import React from 'react';
import { Disc3, Volume2, VolumeX, Plus, Camera, Sparkles } from 'lucide-react';

interface NavbarProps {
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
  onOpenUpload: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isMusicPlaying,
  onToggleMusic,
  onOpenUpload,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8E1D5]">
      {/* Top vintage mini headline bar */}
      <div className="bg-[#EFE8DE] text-[#6E6053] text-[11px] font-medium tracking-wider uppercase py-1 px-4 text-center border-b border-[#E3D9CC] flex items-center justify-between">
        <span className="hidden sm:inline">Issue No. 01 • Hà Nội, Vietnam</span>
        <span className="mx-auto sm:mx-0 flex items-center gap-1.5 font-semibold">
          <Sparkles className="w-3 h-3 text-[#A88C6D]" />
          Visual Diary &amp; Film Rolls — Quốc Bảo &amp; Lại Huệ
        </span>
        <span className="hidden sm:inline">Ordinary Days • Gentle Moments</span>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Masthead Branding */}
        <div className="flex items-center gap-3">
          <a href="#" className="flex flex-col">
            <span className="text-xl sm:text-2xl font-serif-vintage font-bold tracking-tight text-[#2D2824] hover:text-[#5A4B3D] transition-colors">
              Quốc Bảo &amp; Lại Huệ
            </span>
            <span className="text-[10px] tracking-widest uppercase text-[#8C7A6B] -mt-1 font-medium">
              A Quiet Visual Journal
            </span>
          </a>
        </div>

        {/* Center / Right controls */}
        <div className="flex items-center gap-3 sm:gap-6">
          {/* Section Jump Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-5 text-xs tracking-wider uppercase text-[#6E6053] font-medium">
            <a
              href="#gallery-section"
              className="hover:text-[#2D2824] transition-colors hover:underline underline-offset-4"
            >
              Album Ảnh
            </a>
            <a
              href="#journal-section"
              className="hover:text-[#2D2824] transition-colors hover:underline underline-offset-4"
            >
              Mẩu Chuyện Nhỏ
            </a>
            <a
              href="#guestbook-section"
              className="hover:text-[#2D2824] transition-colors hover:underline underline-offset-4"
            >
              Sổ Lưu Bút
            </a>
          </nav>

          {/* Music Vinyl Widget */}
          <button
            id="toggle-music-btn"
            onClick={onToggleMusic}
            title={isMusicPlaying ? 'Tạm dừng nhạc chill' : 'Bật nhạc acoustic chill'}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-medium transition-all cursor-pointer ${
              isMusicPlaying
                ? 'bg-[#EADECC] border-[#D4BFAB] text-[#3D3228] shadow-xs'
                : 'bg-white/80 border-[#E5DFD5] text-[#7A6B5D] hover:bg-[#F2ECE4]'
            }`}
          >
            <div className="relative flex items-center justify-center">
              <Disc3
                className={`w-4 h-4 text-[#5A4B3D] ${
                  isMusicPlaying ? 'animate-spin-vinyl' : ''
                }`}
              />
            </div>
            <span className="hidden sm:inline font-editorial italic text-sm">
              {isMusicPlaying ? 'Đang phát: Acoustic Chill' : 'Bật nhạc'}
            </span>
            {isMusicPlaying ? (
              <Volume2 className="w-3.5 h-3.5 text-[#5A4B3D]" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-[#A39282]" />
            )}
          </button>

          {/* Upload Photo Button */}
          <button
            id="nav-upload-photo-btn"
            onClick={onOpenUpload}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#3D352E] hover:bg-[#28221D] text-white text-xs font-semibold tracking-wide shadow-sm hover:shadow-md transition-all cursor-pointer"
          >
            <Camera className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Tải ảnh lên</span>
            <span className="sm:hidden">Thêm ảnh</span>
          </button>
        </div>
      </div>
    </header>
  );
};
