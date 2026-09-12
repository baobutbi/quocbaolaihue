import React from 'react';
import { ArrowUp, Heart, Film, Camera } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#2D2824] text-[#EFEAE1] pt-14 pb-12 px-4 sm:px-6 border-t border-[#453D37]">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center space-y-6">
        {/* Vintage Seal / Logo */}
        <div className="w-12 h-12 rounded-full border border-[#756556] flex items-center justify-center text-[#D6C5B3]">
          <Film className="w-5 h-5" />
        </div>

        <div>
          <h2 className="text-2xl sm:text-3xl font-serif-vintage font-bold tracking-tight text-[#FAF7F2]">
            Quốc Bảo &amp; Lại Huệ
          </h2>
          <p className="mt-2 text-sm font-editorial italic text-[#BDB0A2] max-w-md mx-auto">
            “Những cuộn phim chụp vội, những buổi chiều cà phê ngắm phố và sự dịu dàng của năm tháng bên nhau.”
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs tracking-wider uppercase text-[#968676]">
          <span>Hà Nội</span>
          <span>•</span>
          <span>35mm Film Archive</span>
          <span>•</span>
          <span>Est. 2024</span>
        </div>

        <div className="pt-6 border-t border-[#453D37] w-full flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8C7B6D]">
          <p className="flex items-center gap-1.5">
            Góc blog nhỏ của Quốc Bảo &amp; Lại Huệ
          </p>

          <button
            id="footer-scroll-top-btn"
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#3D352E] hover:bg-[#4E443B] text-[#D6C5B3] transition-colors cursor-pointer"
          >
            <span>Về đầu trang</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
