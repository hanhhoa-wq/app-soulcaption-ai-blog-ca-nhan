
import React, { useEffect, useState, useRef } from 'react';
import { GeneratedContent } from '../types';

interface ResultSectionProps {
  content: GeneratedContent | null;
  isLoading: boolean;
  author: string;
}

const ResultSection: React.FC<ResultSectionProps> = ({ content, isLoading, author }) => {
  const [copied, setCopied] = React.useState(false);
  const [watermarkedUrl, setWatermarkedUrl] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (content?.imageUrl) {
      applyWatermark(content.imageUrl, author);
    } else {
      setWatermarkedUrl(null);
    }
  }, [content?.imageUrl, author]);

  const applyWatermark = (imageUrl: string, authorName: string) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageUrl;
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      if (authorName) {
        const handle = authorName.startsWith('@') ? authorName : `@${authorName}`;
        const padding = canvas.width * 0.03;
        const fontSize = Math.max(24, canvas.width * 0.035);
        ctx.font = `500 ${fontSize}px 'Inter', sans-serif`;
        const textMetrics = ctx.measureText(handle);
        const textWidth = textMetrics.width;
        const rectWidth = textWidth + padding * 2;
        const rectHeight = fontSize + padding;
        const x = canvas.width - rectWidth - padding;
        const y = canvas.height - rectHeight - padding;

        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.beginPath();
        ctx.roundRect(x, y, rectWidth, rectHeight, 12);
        ctx.fill();

        ctx.fillStyle = 'white';
        ctx.textBaseline = 'middle';
        ctx.fillText(handle, x + padding, y + rectHeight / 2);
      }

      setWatermarkedUrl(canvas.toDataURL('image/png'));
    };
  };

  const handleCopy = () => {
    if (!content) return;
    const textToCopy = `${content.caption}\n\n${content.hashtags.join(' ')}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const urlToDownload = watermarkedUrl || content?.imageUrl;
    if (!urlToDownload) return;
    const link = document.createElement('a');
    link.href = urlToDownload;
    link.download = `soulcaption_${author || 'blog'}_${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center min-h-[500px] animate-pulse">
        <div className="w-16 h-16 bg-slate-100 rounded-full mb-4"></div>
        <div className="h-4 w-48 bg-slate-100 rounded mb-2"></div>
        <div className="h-4 w-32 bg-slate-100 rounded"></div>
      </div>
    );
  }

  if (!content) {
    return (
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center min-h-[500px] text-center border-dashed border-2">
        <div className="bg-indigo-50 p-4 rounded-full mb-4">
          <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-slate-700">Chưa có nội dung</h3>
        <p className="text-slate-400 max-w-xs mt-2">Chọn các tùy chọn bên trái và nhấn nút "Tạo Bài Viết" để bắt đầu sáng tạo.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden flex flex-col h-full">
      <canvas ref={canvasRef} className="hidden" />

      <div className="relative aspect-square md:aspect-video lg:aspect-square bg-slate-900 overflow-hidden group">
        {(watermarkedUrl || content.imageUrl) ? (
          <img 
            src={watermarkedUrl || content.imageUrl || ''} 
            alt="Ảnh Blog AI" 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-500 p-10 text-center">
            Không thể tạo ảnh. Vui lòng thử lại.
          </div>
        )}
        <div className="absolute top-4 right-4 bg-white/80 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-slate-600 uppercase tracking-wider">
          Tạo bởi AI
        </div>
        {(watermarkedUrl || content.imageUrl) && (
          <button 
            onClick={handleDownload}
            className="absolute bottom-4 right-4 bg-orange-500 hover:bg-orange-600 text-white p-2.5 rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 active:scale-90"
            title="Tải ảnh có kèm tác giả"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </button>
        )}
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs">AI</div>
            <div>
              <p className="text-sm font-bold text-slate-800">SoulCaption AI</p>
              <p className="text-[10px] text-slate-400">Tối ưu cho Facebook</p>
            </div>
          </div>
          <div className="flex gap-2">
            {(watermarkedUrl || content.imageUrl) && (
              <button 
                onClick={handleDownload}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-orange-50 text-orange-600 hover:bg-orange-100 transition-all border border-orange-100 md:hidden"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                Tải ảnh
              </button>
            )}
            <button 
              onClick={handleCopy}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${copied ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              {copied ? (
                <>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                  Đã chép
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                  Sao chép Caption
                </>
              )}
            </button>
          </div>
        </div>

        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex-grow mb-4">
          <p className="text-slate-700 text-sm whitespace-pre-wrap leading-relaxed">
            {content.caption}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {content.hashtags.map((tag, idx) => (
            <span key={idx} className="text-xs text-indigo-600 font-medium hover:underline cursor-pointer">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultSection;
