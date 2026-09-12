import React from 'react';
import { Camera, MapPin, Compass, Music, Sparkles } from 'lucide-react';
import { BlogConfig } from '../types';

interface HeroSectionProps {
  config: BlogConfig;
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
  onOpenUpload: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  config,
  isMusicPlaying,
  onToggleMusic,
  onOpenUpload,
}) => {
  return (
    <section className="relative pt-8 pb-14 px-4 sm:px-6 border-b border-[#EAE3D6] overflow-hidden">
      {/* Background aesthetic decorative marks */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#F3ECE1] rounded-full blur-3xl -z-10 opacity-70" />
      <div className="absolute bottom-0 left-10 w-72 h-72 bg-[#EFE6DA] rounded-full blur-3xl -z-10 opacity-60" />

      <div className="max-w-6xl mx-auto">
        {/* Editorial Top Tag */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-12 bg-[#D6CBBF]" />
          <span className="text-[11px] uppercase tracking-[0.25em] text-[#8C7A6B] font-semibold">
            Visual Diary • Issue No. 01
          </span>
          <div className="h-px w-12 bg-[#D6CBBF]" />
        </div>

        {/* Main Title Masthead */}
        <div className="text-center mb-10 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif-vintage font-bold text-[#2D2824] tracking-tight leading-tight">
            Quốc Bảo &amp; Lại Huệ
          </h1>
          <p className="mt-3 text-base sm:text-lg font-editorial italic text-[#6E6053] max-w-xl mx-auto">
            {config.mastheadSubtitle}
          </p>
        </div>

        {/* Split Editorial Layout (Instagram / Magazine Feature) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: Vintage Polaroid Card with Tape */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group max-w-sm w-full">
              {/* Top washi tape effect */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 washi-tape rotate-1 z-20 rounded-xs border border-white/40 shadow-xs" />

              {/* Polaroid Frame */}
              <div className="bg-white p-4 pb-6 rounded-xs shadow-xl border border-[#E0D7CB] transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                <div className="relative aspect-4/5 overflow-hidden bg-[#2D2824]/5">
                  <img
                    src="https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=1000&auto=format&fit=crop"
                    alt="Quốc Bảo & Lại Huệ"
                    className="w-full h-full object-cover grayscale-[15%] contrast-[1.05] hover:scale-102 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {/* Film stamp watermark */}
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/60 backdrop-blur-xs text-[10px] tracking-widest text-[#EADBCC] font-mono rounded-xs">
                    FUJI 400H • 35MM
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <p className="font-editorial italic text-base text-[#3E352E]">
                    “Ghé lại một góc bình yên giữa lòng thành phố.”
                  </p>
                  <div className="flex items-center justify-center gap-2 mt-1.5 text-[11px] text-[#918171] uppercase tracking-wider font-medium">
                    <MapPin className="w-3 h-3 text-[#A88C6D]" />
                    <span>Hà Nội • Mùa thu</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Editorial Narrative Story */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EFE7DC] border border-[#DCD0C1] rounded-full text-xs font-semibold text-[#5A4B3D] tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-[#947758]" />
              Lời mở đầu của hai đứa mình
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif-vintage font-bold text-[#2D2824] leading-snug">
              {config.introTitle}
            </h2>

            <div className="space-y-4 text-[#4F4439] text-base leading-relaxed font-normal">
              <p>{config.introParagraph1}</p>
              <p>{config.introParagraph2}</p>
            </div>

            {/* Aesthetic tags */}
            <div className="flex flex-wrap gap-2.5 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F2ECE3] border border-[#E0D5C7] rounded-lg text-xs font-medium text-[#5E5144]">
                <Camera className="w-3.5 h-3.5 text-[#8C7A6B]" />
                Cuộn phim 35mm
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F2ECE3] border border-[#E0D5C7] rounded-lg text-xs font-medium text-[#5E5144]">
                <Compass className="w-3.5 h-3.5 text-[#8C7A6B]" />
                Những chuyến đi gom nắng
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F2ECE3] border border-[#E0D5C7] rounded-lg text-xs font-medium text-[#5E5144]">
                <MapPin className="w-3.5 h-3.5 text-[#8C7A6B]" />
                Hà Nội &amp; Đà Lạt
              </span>
            </div>

            {/* Quick action buttons / Music banner */}
            <div className="pt-3 flex flex-wrap items-center gap-3">
              {!isMusicPlaying && (
                <button
                  id="hero-play-music-btn"
                  onClick={onToggleMusic}
                  className="flex items-center gap-2 px-4 py-2 bg-[#EADECC] hover:bg-[#DAC7B0] text-[#3D3228] border border-[#CBB8A1] rounded-full text-xs font-semibold transition-all shadow-xs cursor-pointer"
                >
                  <Music className="w-3.5 h-3.5 text-[#5A4B3D]" />
                  Bật nhạc acoustic chill cho trang
                </button>
              )}
              <button
                id="hero-upload-photo-btn"
                onClick={onOpenUpload}
                className="flex items-center gap-2 px-4 py-2 bg-[#3D352E] hover:bg-[#2A231D] text-white rounded-full text-xs font-semibold shadow-xs hover:shadow-md transition-all cursor-pointer"
              >
                <Camera className="w-3.5 h-3.5" />
                Tải ảnh mới vào bộ sưu tập
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
