import React, { useState } from 'react';
import { MessageSquareHeart, Send, Heart, User, Sparkles } from 'lucide-react';
import { GuestbookEntry } from '../types';

interface GuestbookSectionProps {
  entries: GuestbookEntry[];
  onAddEntry: (entry: GuestbookEntry) => void;
}

export const GuestbookSection: React.FC<GuestbookSectionProps> = ({
  entries,
  onAddEntry,
}) => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    setIsSubmitting(true);
    const newEntry: GuestbookEntry = {
      id: 'gb-' + Date.now(),
      name: name.trim(),
      message: message.trim(),
      createdAt: Date.now(),
    };

    onAddEntry(newEntry);
    setName('');
    setMessage('');
    setIsSubmitting(false);
  };

  const formatDate = (timestamp: number) => {
    const d = new Date(timestamp);
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
  };

  return (
    <section id="guestbook-section" className="py-16 px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Guestbook Intro & Leave a Note Form */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#8C7A6B] font-semibold mb-1">
              <MessageSquareHeart className="w-3.5 h-3.5 text-[#A88C6D]" />
              Guestbook &amp; Warm Wishes
            </div>
            <h2 className="text-3xl font-serif-vintage font-bold text-[#2D2824]">
              Sổ lưu bút ghé thăm
            </h2>
            <p className="mt-2 text-sm text-[#6E6053] font-editorial italic leading-relaxed">
              Nếu có ghé qua blog nhỏ của Bảo và Huệ, bạn có thể để lại một lời nhắn nhủ, lời chúc hay đơn giản là một lời chào ấm áp nhé!
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-xl border border-[#E5DFD5] shadow-xs space-y-4"
          >
            <div>
              <label className="block text-xs font-semibold text-[#5A5046] mb-1 uppercase tracking-wide">
                Tên hoặc biệt danh của bạn
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="VD: Bạn từ Đà Lạt, Minh Anh..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-[#FAF7F2] border border-[#D6CBBF] rounded-lg focus:outline-none focus:border-[#8C7A6B]"
                />
                <User className="w-4 h-4 text-[#A88C6D] absolute left-3 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#5A5046] mb-1 uppercase tracking-wide">
                Lời nhắn gửi đến Bảo &amp; Huệ
              </label>
              <textarea
                rows={3}
                required
                placeholder="Gửi một vài dòng chia sẻ hoặc lời chúc..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-[#FAF7F2] border border-[#D6CBBF] rounded-lg focus:outline-none focus:border-[#8C7A6B] resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 bg-[#3D352E] hover:bg-[#28221D] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              Gửi lời nhắn vào sổ lưu bút
            </button>
          </form>
        </div>

        {/* Right Column: Display list of notes */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#EAE3D6]">
            <h3 className="font-serif-vintage text-xl font-bold text-[#2D2824] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#A88C6D]" />
              Những lời nhắn thân thương ({entries.length})
            </h3>
            <span className="text-xs text-[#8C7A6B] font-editorial italic">
              Cảm ơn mọi người đã ghé chơi
            </span>
          </div>

          <div className="space-y-4 max-h-[480px] overflow-y-auto pr-1">
            {entries.length === 0 ? (
              <p className="text-xs text-[#8C7A6B] italic py-8 text-center">
                Chưa có lời nhắn nào. Hãy là người đầu tiên để lại lời chúc nhé!
              </p>
            ) : (
              entries.map((entry) => (
                <div
                  key={entry.id}
                  className="p-5 bg-white/90 rounded-xl border border-[#E8E1D5] shadow-xs relative"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[#EFE8DD] flex items-center justify-center text-xs font-serif font-bold text-[#5A4B3D]">
                        {entry.name.slice(0, 1).toUpperCase()}
                      </div>
                      <span className="font-serif-vintage font-bold text-sm text-[#2D2824]">
                        {entry.name}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-[#A89887]">
                      {formatDate(entry.createdAt)}
                    </span>
                  </div>

                  <p className="text-sm text-[#52463B] leading-relaxed pl-9 font-normal">
                    {entry.message}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
