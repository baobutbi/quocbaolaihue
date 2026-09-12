import React, { useState } from 'react';
import { X, Upload, Camera, MapPin, Tag } from 'lucide-react';
import { PhotoItem } from '../types';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (photo: PhotoItem) => void;
}

export const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [location, setLocation] = useState('');
  const [filmType, setFilmType] = useState('Kodak Portra 400');
  const [tag, setTag] = useState<'trips' | 'coffee' | 'ordinary' | 'film'>('ordinary');
  const [imageUrl, setImageUrl] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit (10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('Vui lòng chọn ảnh có kích thước dưới 10MB để tải mượt mà.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setPreviewUrl(base64);
      setImageUrl(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalUrl = previewUrl || imageUrl;
    if (!finalUrl) {
      alert('Vui lòng chọn một bức ảnh hoặc dán đường dẫn ảnh!');
      return;
    }

    setIsSubmitting(true);
    const newPhoto: PhotoItem = {
      id: 'photo-' + Date.now(),
      url: finalUrl,
      title: title.trim() || 'Khoảnh khắc bình yên',
      caption: caption.trim() || 'Một ngày thật đẹp của chúng mình.',
      date: date || new Date().toISOString().split('T')[0],
      location: location.trim() || undefined,
      filmType: filmType || undefined,
      tag,
      likes: 1,
      createdAt: Date.now(),
    };

    onSave(newPhoto);
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-[#FAF7F2] rounded-2xl shadow-2xl border border-[#E5DFD5] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#EAE3D6] bg-[#F5EFEB]">
          <div>
            <span className="text-[11px] font-semibold tracking-wider text-[#8C7A6B] uppercase">
              Visual Diary • New Entry
            </span>
            <h3 className="text-xl font-semibold text-[#2D2824] font-serif-vintage">
              Thêm khoảnh khắc mới
            </h3>
          </div>
          <button
            id="close-upload-modal-btn"
            onClick={onClose}
            className="p-1.5 text-[#8C7A6B] hover:text-[#2D2824] hover:bg-[#EADBCC]/50 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Image Upload Box */}
          <div>
            <label className="block text-xs font-semibold text-[#5A5046] mb-1.5 uppercase tracking-wide">
              Ảnh tải lên (Kéo thả hoặc bấm chọn)
            </label>
            <div className="relative border-2 border-dashed border-[#D6CBBF] rounded-xl p-4 text-center hover:border-[#8C7A6B] transition-colors bg-[#FAF7F2]/60">
              {previewUrl ? (
                <div className="relative group">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-56 object-cover rounded-lg shadow-xs"
                    referrerPolicy="no-referrer"
                  />
                  <label
                    htmlFor="reupload-file-input"
                    className="absolute inset-0 bg-black/40 text-white flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg cursor-pointer text-sm font-medium"
                  >
                    <Camera className="w-6 h-6 mb-1" />
                    Đổi ảnh khác
                  </label>
                </div>
              ) : (
                <label
                  htmlFor="photo-file-input"
                  className="flex flex-col items-center justify-center py-6 cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full bg-[#EADBCC] flex items-center justify-center text-[#5A4B3D] mb-3">
                    <Upload className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-semibold text-[#3D352E]">
                    Bấm vào đây để chọn ảnh từ máy
                  </span>
                  <span className="text-xs text-[#8C7A6B] mt-1">
                    Hỗ trợ định dạng JPG, PNG, WebP (Tối đa 10MB)
                  </span>
                </label>
              )}
              <input
                id={previewUrl ? 'reupload-file-input' : 'photo-file-input'}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>

          {/* Quick preset URLs for fast testing */}
          {!previewUrl && (
            <div>
              <label className="block text-xs text-[#8C7A6B] mb-1">
                Hoặc nhập link ảnh trực tiếp:
              </label>
              <input
                type="url"
                placeholder="https://..."
                value={imageUrl}
                onChange={(e) => {
                  setImageUrl(e.target.value);
                  setPreviewUrl(e.target.value);
                }}
                className="w-full px-3 py-2 text-sm bg-white border border-[#D6CBBF] rounded-lg focus:outline-none focus:border-[#8C7A6B]"
              />
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-[#5A5046] mb-1 uppercase tracking-wide">
              Tiêu đề ảnh
            </label>
            <input
              type="text"
              required
              placeholder="VD: Hoàng hôn hồ Tây, Buổi chiều ở tiệm hoa..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white border border-[#D6CBBF] rounded-lg focus:outline-none focus:border-[#8C7A6B]"
            />
          </div>

          {/* Caption */}
          <div>
            <label className="block text-xs font-semibold text-[#5A5046] mb-1 uppercase tracking-wide">
              Dòng cảm xúc / Lời kể ngắn
            </label>
            <textarea
              rows={2}
              placeholder="Chia sẻ một chút về khoảnh khắc này..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-white border border-[#D6CBBF] rounded-lg focus:outline-none focus:border-[#8C7A6B] resize-none"
            />
          </div>

          {/* Grid fields: Date, Location, Film, Tag */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#5A5046] mb-1 uppercase tracking-wide">
                Ngày chụp
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-[#D6CBBF] rounded-lg focus:outline-none focus:border-[#8C7A6B]"
              />
            </div>

            <div>
              <label className="flex items-center gap-1 text-xs font-semibold text-[#5A5046] mb-1 uppercase tracking-wide">
                <MapPin className="w-3.5 h-3.5 text-[#8C7A6B]" /> Địa điểm
              </label>
              <input
                type="text"
                placeholder="VD: Hà Nội, Đà Lạt..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-[#D6CBBF] rounded-lg focus:outline-none focus:border-[#8C7A6B]"
              />
            </div>

            <div>
              <label className="flex items-center gap-1 text-xs font-semibold text-[#5A5046] mb-1 uppercase tracking-wide">
                <Camera className="w-3.5 h-3.5 text-[#8C7A6B]" /> Máy / Loại phim (tuỳ chọn)
              </label>
              <input
                type="text"
                placeholder="VD: Kodak Portra 400, Fuji 200..."
                value={filmType}
                onChange={(e) => setFilmType(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white border border-[#D6CBBF] rounded-lg focus:outline-none focus:border-[#8C7A6B]"
              />
            </div>

            <div>
              <label className="flex items-center gap-1 text-xs font-semibold text-[#5A5046] mb-1 uppercase tracking-wide">
                <Tag className="w-3.5 h-3.5 text-[#8C7A6B]" /> Chủ đề
              </label>
              <select
                value={tag}
                onChange={(e) => setTag(e.target.value as any)}
                className="w-full px-3 py-2 text-sm bg-white border border-[#D6CBBF] rounded-lg focus:outline-none focus:border-[#8C7A6B]"
              >
                <option value="ordinary">Khoảnh khắc đời thường</option>
                <option value="trips">Những chuyến đi xa</option>
                <option value="coffee">Quán cà phê quen</option>
                <option value="film">Ảnh cuộn phim 35mm</option>
              </select>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#EAE3D6]">
            <button
              type="button"
              id="cancel-upload-btn"
              onClick={onClose}
              className="px-4 py-2 text-sm text-[#7A6B5D] hover:text-[#2D2824] rounded-lg transition-colors font-medium"
            >
              Huỷ
            </button>
            <button
              type="submit"
              id="save-new-photo-btn"
              disabled={isSubmitting}
              className="px-5 py-2 text-sm bg-[#4A3E35] hover:bg-[#382F28] text-white rounded-lg font-medium shadow-sm transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Camera className="w-4 h-4" />
              Lưu vào nhật ký ảnh
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
