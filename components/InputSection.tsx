
import React from 'react';
import { GenerationParams } from '../types';
import { CATEGORIES, WRITING_STYLES, CONTENT_LENGTHS, LANGUAGES, IMAGE_STYLES, SPECIFIC_EMOTIONS } from '../constants';

interface InputSectionProps {
  params: GenerationParams;
  setParams: React.Dispatch<React.SetStateAction<GenerationParams>>;
  onGenerate: () => void;
  isLoading: boolean;
}

const InputSection: React.FC<InputSectionProps> = ({ params, setParams, onGenerate, isLoading }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-5 h-full">
      <h2 className="text-xl font-bold text-slate-800 border-b pb-4">Tùy Chỉnh Nội Dung</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">Chủ đề bài đăng (20 gợi ý)</label>
          <select 
            value={params.category}
            onChange={(e) => setParams({ ...params, category: e.target.value as any })}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
          >
            {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Cảm xúc (50 gợi ý)</label>
            <input 
              type="text"
              list="emotions-list"
              placeholder="Chọn hoặc nhập cảm xúc..."
              value={params.emotion}
              onChange={(e) => setParams({ ...params, emotion: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
            <datalist id="emotions-list">
              {SPECIFIC_EMOTIONS.map(emo => <option key={emo} value={emo} />)}
            </datalist>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Tác giả (@...)</label>
            <input 
              type="text"
              placeholder="Tên hoặc ID của bạn"
              value={params.author}
              onChange={(e) => setParams({ ...params, author: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">Chi tiết ảnh bổ sung (Tùy chọn)</label>
          <textarea 
            placeholder="Ví dụ: Một ly cà phê đá, chiếc xe đạp cũ dưới nắng, hàng hoa giấy hồng..."
            value={params.imageDetails}
            onChange={(e) => setParams({ ...params, imageDetails: e.target.value })}
            rows={2}
            className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none text-sm"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Độ dài</label>
            <select 
              value={params.length}
              onChange={(e) => setParams({ ...params, length: e.target.value as any })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            >
              {CONTENT_LENGTHS.map(len => <option key={len} value={len}>{len}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Giọng văn</label>
            <select 
              value={params.style}
              onChange={(e) => setParams({ ...params, style: e.target.value as any })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            >
              {WRITING_STYLES.map(style => <option key={style} value={style}>{style}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Ngôn ngữ</label>
            <select 
              value={params.language}
              onChange={(e) => setParams({ ...params, language: e.target.value as any })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            >
              {LANGUAGES.map(lang => <option key={lang} value={lang}>{lang}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Phong cách ảnh</label>
            <select 
              value={params.imageStyle}
              onChange={(e) => setParams({ ...params, imageStyle: e.target.value as any })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            >
              {IMAGE_STYLES.map(style => <option key={style} value={style}>{style}</option>)}
            </select>
          </div>
        </div>
      </div>

      <button 
        onClick={onGenerate}
        disabled={isLoading}
        className={`mt-auto w-full py-3 px-6 rounded-xl font-semibold text-white transition-all shadow-lg shadow-indigo-100 ${isLoading ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 active:scale-95'}`}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Đang sáng tác...
          </span>
        ) : 'Tạo Bài Viết Viral'}
      </button>
    </div>
  );
};

export default InputSection;
