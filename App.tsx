
import React, { useState } from 'react';
import { GenerationParams, GeneratedContent } from './types';
import { generateBlogContent } from './services/geminiService';
import InputSection from './components/InputSection';
import ResultSection from './components/ResultSection';
import PromptGuide from './components/PromptGuide';

const App: React.FC = () => {
  const [params, setParams] = useState<GenerationParams>({
    category: 'Tâm sự cuộc sống',
    emotion: 'Bình yên',
    author: '',
    length: 'Vừa (5–7 dòng)',
    style: 'Nhẹ nhàng',
    language: 'Tiếng Việt',
    imageStyle: 'Blog style',
    imageDetails: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await generateBlogContent(params);
      setGeneratedContent(result);
    } catch (err: any) {
      console.error(err);
      setError('Đã có lỗi xảy ra khi kết nối với AI. Vui lòng kiểm tra lại cấu hình API.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-6 px-4 md:py-12 md:px-8">
      {/* Header */}
      <header className="max-w-6xl w-full text-center mb-12">
        <div className="inline-block bg-indigo-600 text-white px-4 py-1.5 rounded-full text-sm font-bold mb-4 tracking-tight shadow-md shadow-indigo-200 uppercase">
          Máy Tạo Blog Cá Nhân FB
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
          SoulCaption <span className="text-indigo-600">AI</span>
        </h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium">
          Tạo bài đăng Facebook hoàn chỉnh với ảnh minh họa nghệ thuật và caption chạm đến trái tim người đọc chỉ trong một nốt nhạc.
        </p>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Side: Inputs */}
          <section className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-8">
            <InputSection 
              params={params} 
              setParams={setParams} 
              onGenerate={handleGenerate} 
              isLoading={isLoading} 
            />
            {error && (
              <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100 font-medium">
                {error}
              </div>
            )}
          </section>

          {/* Right Side: Display */}
          <section className="lg:col-span-7 xl:col-span-8">
            <ResultSection content={generatedContent} isLoading={isLoading} author={params.author} />
          </section>
        </div>

        {/* New Guide Section */}
        <PromptGuide />
      </main>

      {/* Footer Info / Tips */}
      <footer className="max-w-6xl w-full mt-16 pt-8 border-t border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col gap-2">
          <div className="bg-indigo-50 w-10 h-10 rounded-lg flex items-center justify-center text-indigo-600 mb-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          </div>
          <h4 className="font-bold text-slate-800">Chuẩn SEO Viral</h4>
          <p className="text-sm text-slate-500">Hook gây tò mò, xuống dòng hợp lý, từ khóa tự nhiên giúp Facebook ưu tiên hiển thị bài viết của bạn.</p>
        </div>
        <div className="flex flex-col gap-2">
          <div className="bg-rose-50 w-10 h-10 rounded-lg flex items-center justify-center text-rose-600 mb-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
          </div>
          <h4 className="font-bold text-slate-800">Chạm Cảm Xúc</h4>
          <p className="text-sm text-slate-500">Giọng văn như tâm sự thật, dễ tạo đồng cảm và khuyến khích mọi người để lại bình luận, chia sẻ.</p>
        </div>
        <div className="flex flex-col gap-2">
          <div className="bg-amber-50 w-10 h-10 rounded-lg flex items-center justify-center text-amber-600 mb-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          </div>
          <h4 className="font-bold text-slate-800">Hình Ảnh Nghệ Thuật</h4>
          <p className="text-sm text-slate-500">Tự động tạo ảnh minh họa tối giản, nghệ thuật khớp với tâm trạng bài viết mà không cần tìm kiếm lâu.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
