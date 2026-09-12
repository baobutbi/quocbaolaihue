import React, { useState } from 'react';
import { Heart, MapPin, Calendar, Film, Plus, Trash2, Maximize2, Sparkles } from 'lucide-react';
import { PhotoItem } from '../types';
import { PhotoLightbox } from './PhotoLightbox';

interface PhotoGalleryProps {
  photos: PhotoItem[];
  onOpenUpload: () => void;
  onLikePhoto: (id: string) => void;
  onDeletePhoto: (id: string) => void;
}

type FilterTag = 'all' | 'trips' | 'coffee' | 'ordinary' | 'film';

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({
  photos,
  onOpenUpload,
  onLikePhoto,
  onDeletePhoto,
}) => {
  const [activeTag, setActiveTag] = useState<FilterTag>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);

  const filteredPhotos = photos.filter((photo) => {
    if (activeTag === 'all') return true;
    return photo.tag === activeTag;
  });

  const filterTabs: { id: FilterTag; label: string }[] = [
    { id: 'all', label: 'Tất cả cuộn phim' },
    { id: 'trips', label: 'Những chuyến đi ✈️' },
    { id: 'coffee', label: 'Tiệm cà phê ☕' },
    { id: 'ordinary', label: 'Đời thường dịu êm 🌿' },
    { id: 'film', label: 'Film 35mm 🎞️' },
  ];

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (window.confirm('Bạn có chắc muốn xoá bức ảnh này khỏi album kỷ niệm?')) {
      onDeletePhoto(id);
    }
  };

  return (
    <section id="gallery-section" className="py-16 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-[#EAE3D6] gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#8C7A6B] font-semibold mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#A88C6D]" />
            Instagram &amp; Pinterest Visual Feed
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif-vintage font-bold text-[#2D2824]">
            Những cuộn phim kỷ niệm
          </h2>
          <p className="mt-1 text-sm text-[#6E6053] font-editorial italic">
            Mỗi bức ảnh là một mảnh ghép nhỏ của Quốc Bảo &amp; Lại Huệ qua từng ngày bình dị.
          </p>
        </div>

        <button
          id="gallery-add-photo-btn"
          onClick={onOpenUpload}
          className="self-start md:self-auto flex items-center gap-2 px-4 py-2 bg-[#3D352E] hover:bg-[#2A231D] text-white rounded-full text-xs font-semibold tracking-wide shadow-xs hover:shadow-md transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Tải ảnh mới lên blog
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
        {filterTabs.map((tab) => (
          <button
            key={tab.id}
            id={`filter-tab-${tab.id}`}
            onClick={() => setActiveTag(tab.id)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
              activeTag === tab.id
                ? 'bg-[#3D352E] text-white shadow-xs font-semibold'
                : 'bg-white/80 hover:bg-[#EFE8DD] text-[#6E6053] border border-[#E5DFD5]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Photo Grid (Pinterest Masonry / Aesthetic Grid) */}
      {filteredPhotos.length === 0 ? (
        <div className="py-20 text-center bg-white/50 border border-dashed border-[#D6CBBF] rounded-2xl p-8">
          <Film className="w-10 h-10 text-[#A88C6D] mx-auto mb-3 opacity-60" />
          <h3 className="text-lg font-serif-vintage font-semibold text-[#3D352E]">
            Chưa có bức ảnh nào trong mục này
          </h3>
          <p className="text-xs text-[#7A6B5D] mt-1 mb-4">
            Hãy tải lên một vài tấm ảnh đầu tiên cho chủ đề này nhé!
          </p>
          <button
            onClick={onOpenUpload}
            className="px-4 py-2 bg-[#3D352E] text-white rounded-full text-xs font-medium shadow-xs"
          >
            Tải ảnh ngay
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPhotos.map((photo) => (
            <article
              key={photo.id}
              id={`photo-card-${photo.id}`}
              onClick={() => setSelectedPhoto(photo)}
              className="group bg-white rounded-xl overflow-hidden border border-[#E5DFD5] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1"
            >
              {/* Image Frame */}
              <div className="relative aspect-4/5 overflow-hidden bg-[#F0EAE1]">
                <img
                  src={photo.url}
                  alt={photo.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />

                {/* Top overlay badges */}
                <div className="absolute top-3 inset-x-3 flex items-center justify-between opacity-90">
                  {photo.filmType ? (
                    <span className="px-2.5 py-1 bg-black/60 backdrop-blur-xs text-[10px] font-mono tracking-wider text-[#FAF7F2] rounded-xs">
                      {photo.filmType}
                    </span>
                  ) : (
                    <span />
                  )}

                  <button
                    onClick={(e) => handleDelete(e, photo.id)}
                    title="Xoá ảnh này"
                    className="p-1.5 bg-black/50 hover:bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Hover inspect hint */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-xs text-[#2D2824] rounded-full text-xs font-medium shadow-md">
                    <Maximize2 className="w-3.5 h-3.5" />
                    Xem chi tiết
                  </span>
                </div>
              </div>

              {/* Card Meta & Caption */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-white">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-[#8C7A6B] font-medium mb-1.5">
                    {photo.location ? (
                      <span className="flex items-center gap-1 text-[#9E6447]">
                        <MapPin className="w-3 h-3" />
                        {photo.location}
                      </span>
                    ) : (
                      <span />
                    )}
                    <span className="flex items-center gap-1 font-mono">
                      <Calendar className="w-3 h-3" />
                      {photo.date}
                    </span>
                  </div>

                  <h3 className="font-serif-vintage text-lg font-bold text-[#2D2824] group-hover:text-[#6E4F32] transition-colors line-clamp-1">
                    {photo.title}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-[#5E5144] line-clamp-2 leading-relaxed font-normal">
                    {photo.caption}
                  </p>
                </div>

                {/* Card bottom bar */}
                <div className="pt-4 mt-4 border-t border-[#F2ECE3] flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-wider text-[#A39282] font-semibold">
                    Quốc Bảo &amp; Lại Huệ
                  </span>

                  <button
                    id={`card-like-btn-${photo.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onLikePhoto(photo.id);
                    }}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full hover:bg-[#FAF4EC] text-[#5E5144] text-xs font-medium transition-colors cursor-pointer"
                  >
                    <Heart
                      className={`w-4 h-4 transition-transform active:scale-125 ${
                        photo.likes > 0
                          ? 'fill-[#C47E5A] text-[#C47E5A]'
                          : 'text-[#A39282]'
                      }`}
                    />
                    <span className="font-mono text-[11px]">{photo.likes}</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      <PhotoLightbox
        photo={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
        onLike={(id) => {
          onLikePhoto(id);
          if (selectedPhoto && selectedPhoto.id === id) {
            setSelectedPhoto({ ...selectedPhoto, likes: selectedPhoto.likes + 1 });
          }
        }}
      />
    </section>
  );
};
