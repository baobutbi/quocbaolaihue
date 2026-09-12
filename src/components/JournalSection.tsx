import React, { useState } from 'react';
import { PenTool, MapPin, Calendar, Clock, Plus, X } from 'lucide-react';
import { JournalSnippet } from '../types';

interface JournalSectionProps {
  snippets: JournalSnippet[];
  onAddSnippet: (snippet: JournalSnippet) => void;
}

export const JournalSection: React.FC<JournalSectionProps> = ({
  snippets,
  onAddSnippet,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [location, setLocation] = useState('');
  const [timeOfDay, setTimeOfDay] = useState('Buổi chiều');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const today = new Date();
    const dateStr = `${String(today.getDate()).padStart(2, '0')}.${String(
      today.getMonth() + 1
    ).padStart(2, '0')}.${today.getFullYear()}`;

    const newSnippet: JournalSnippet = {
      id: 'snip-' + Date.now(),
      date: dateStr,
      timeOfDay: timeOfDay || 'Khoảnh khắc thường ngày',
      title: title.trim(),
      content: content.trim(),
      location: location.trim() || 'Góc quen',
    };

    onAddSnippet(newSnippet);
    setTitle('');
    setContent('');
    setLocation('');
    setIsModalOpen(false);
  };

  return (
    <section id="journal-section" className="py-16 px-4 sm:px-6 bg-[#F5EFE6] border-y border-[#EAE3D6]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-[#E2D8CA] gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#8C7A6B] font-semibold mb-1">
              <PenTool className="w-3.5 h-3.5 text-[#A88C6D]" />
              Fragments of Everyday Life
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif-vintage font-bold text-[#2D2824]">
              Những mẩu chuyện nhỏ
            </h2>
            <p className="mt-1 text-sm text-[#6E6053] font-editorial italic">
              Vài dòng ghi vội về những ngày nắng đẹp, những buổi chiều mưa và sự ấm áp giản đơn.
            </p>
          </div>

          <button
            id="open-add-snippet-btn"
            onClick={() => setIsModalOpen(true)}
            className="self-start md:self-auto flex items-center gap-2 px-4 py-2 bg-[#4A3E35] hover:bg-[#382F28] text-white rounded-full text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            Viết thêm mẩu chuyện
          </button>
        </div>

        {/* Snippets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {snippets.map((snip) => (
            <div
              key={snip.id}
              className="bg-[#FAF7F2] p-6 rounded-xl border border-[#E5DDD2] shadow-xs hover:shadow-md transition-shadow relative flex flex-col justify-between"
            >
              {/* Paper pin accent */}
              <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-[#C4A992] opacity-70" />

              <div>
                <div className="flex items-center gap-3 text-[11px] text-[#8C7A6B] font-medium mb-3">
                  <span className="flex items-center gap-1 font-mono">
                    <Calendar className="w-3 h-3 text-[#A88C6D]" />
                    {snip.date}
                  </span>
                  {snip.timeOfDay && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#A88C6D]" />
                      {snip.timeOfDay}
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-serif-vintage font-bold text-[#2D2824] mb-3 leading-snug">
                  {snip.title}
                </h3>

                <p className="text-sm text-[#52463B] leading-relaxed font-normal">
                  {snip.content}
                </p>
              </div>

              {snip.location && (
                <div className="pt-4 mt-6 border-t border-[#EAE2D5] flex items-center gap-1.5 text-xs text-[#8C7A6B] font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#B87A5B]" />
                  <span>{snip.location}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modal to add new snippet */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="relative w-full max-w-md bg-[#FAF7F2] rounded-2xl shadow-2xl border border-[#E5DFD5] p-6 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-[#EAE3D6] mb-4">
              <h3 className="text-lg font-serif-vintage font-bold text-[#2D2824]">
                Thêm một mẩu chuyện nhỏ
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-[#8C7A6B] hover:text-[#2D2824] rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#5A5046] mb-1 uppercase tracking-wide">
                  Tiêu đề mẩu chuyện
                </label>
                <input
                  type="text"
                  required
                  placeholder="VD: Cơn mưa rào đầu hạ, Buổi sáng cà phê..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-[#D6CBBF] rounded-lg focus:outline-none focus:border-[#8C7A6B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#5A5046] mb-1 uppercase tracking-wide">
                  Nội dung dòng cảm xúc
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Kể lại một chút kỷ niệm đáng nhớ..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-[#D6CBBF] rounded-lg focus:outline-none focus:border-[#8C7A6B] resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#5A5046] mb-1 uppercase tracking-wide">
                    Thời điểm
                  </label>
                  <input
                    type="text"
                    placeholder="VD: 17:00 chiều"
                    value={timeOfDay}
                    onChange={(e) => setTimeOfDay(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-[#D6CBBF] rounded-lg focus:outline-none focus:border-[#8C7A6B]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#5A5046] mb-1 uppercase tracking-wide">
                    Địa điểm
                  </label>
                  <input
                    type="text"
                    placeholder="VD: Hà Nội, Góc quán cũ"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-[#D6CBBF] rounded-lg focus:outline-none focus:border-[#8C7A6B]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#EAE3D6]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm text-[#7A6B5D] hover:text-[#2D2824]"
                >
                  Huỷ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-sm bg-[#4A3E35] text-white rounded-lg font-medium shadow-xs hover:bg-[#382F28]"
                >
                  Lưu mẩu chuyện
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
