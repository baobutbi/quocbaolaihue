import React from 'react';
import { X, Heart, MapPin, Calendar, Camera, Film } from 'lucide-react';
import { PhotoItem } from '../types';

interface PhotoLightboxProps {
  photo: PhotoItem | null;
  onClose: () => void;
  onLike: (id: string) => void;
}

export const PhotoLightbox: React.FC<PhotoLightboxProps> = ({
  photo,
  onClose,
  onLike,
}) => {
  if (!photo) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative max-w-4xl w-full bg-[#FAF7F2] rounded-2xl overflow-hidden shadow-2xl border border-[#E5DFD5] flex flex-col md:flex-row max-h-[90vh]">
        {/* Close button */}
        <button
          id="close-lightbox-btn"
          onClick={onClose}
          className="absolute top-3 right-3 z-30 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Photo Container */}
        <div className="md:w-3/5 bg-[#1F1C1A] flex items-center justify-center overflow-hidden min-h-[300px] md:min-h-[480px]">
          <img
            src={photo.url}
            alt={photo.title}
            className="w-full h-full object-contain max-h-[75vh]"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Details Column */}
        <div className="md:w-2/5 p-6 flex flex-col justify-between overflow-y-auto bg-[#FAF7F2]">
          <div>
            <div className="flex items-center justify-between text-xs text-[#8C7A6B] uppercase tracking-wider mb-2 font-medium">
              <span className="flex items-center gap-1">
                <Film className="w-3.5 h-3.5 text-[#A88C6D]" />
                {photo.filmType || 'Film 35mm'}
              </span>
              <span className="flex items-center gap-1 font-mono">
                <Calendar className="w-3 h-3 text-[#A88C6D]" />
                {photo.date}
              </span>
            </div>

            <h3 className="text-2xl font-serif-vintage font-bold text-[#2D2824] leading-snug">
              {photo.title}
            </h3>

            {photo.location && (
              <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-[#8C7A6B]">
                <MapPin className="w-3.5 h-3.5 text-[#C47E5A]" />
                <span>{photo.location}</span>
              </div>
            )}

            <div className="mt-5 pt-4 border-t border-[#EAE3D6]">
              <p className="text-[#4E4338] text-sm leading-relaxed font-normal">
                {photo.caption}
              </p>
            </div>
          </div>

          {/* Footer of modal */}
          <div className="pt-6 border-t border-[#EAE3D6] flex items-center justify-between mt-6">
            <span className="text-xs text-[#8C7A6B] font-editorial italic text-sm">
              Quốc Bảo &amp; Lại Huệ Visual Journal
            </span>
            <button
              id={`lightbox-like-btn-${photo.id}`}
              onClick={() => onLike(photo.id)}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFE7DC] hover:bg-[#E2D6C5] text-[#5A4B3D] text-xs font-semibold transition-colors cursor-pointer shadow-xs"
            >
              <Heart className="w-4 h-4 fill-[#C47E5A] text-[#C47E5A]" />
              <span>{photo.likes} lượt thích</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
