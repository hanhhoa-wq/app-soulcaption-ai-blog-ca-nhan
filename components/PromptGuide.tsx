
import React from 'react';

const PROMPT_EXAMPLES = [
  {
    title: "Bình minh trên sông nước Miền Tây",
    description: "Tập trung vào sương mù, ghe xuồng và ánh sáng sớm.",
    prompt: "Cinematic shot of a Mekong Delta river at dawn, thick morning mist hovering over the water, a single traditional wooden sampan boat floating, silhouettes of coconut trees on the banks, soft golden hour lighting, 8k resolution, highly detailed textures.",
    meaning: "Cảnh quay điện ảnh sông nước Miền Tây lúc bình minh, sương mù dày trên mặt nước, một chiếc xuồng ba lá gỗ truyền thống đang trôi, bóng dừa bên bờ sông, ánh sáng giờ vàng nhẹ nhàng."
  },
  {
    title: "Sài Gòn đêm mưa rực rỡ",
    description: "Nhấn mạnh hiệu ứng phản chiếu ánh sáng trên mặt đường ướt.",
    prompt: "Street level view of a small Saigon alley during a tropical rain shower at night, glowing neon signs reflecting on wet asphalt, a mobile hủ tiếu stall with steam rising, warm yellow street lamps, cinematic mood, teal and orange color grading.",
    meaning: "Góc nhìn từ mặt đường một con hẻm nhỏ Sài Gòn trong cơn mưa rào đêm, biển hiệu neon rực rỡ phản chiếu trên nhựa đường ướt, xe hủ tiếu gõ nghi ngút khói, đèn đường vàng ấm áp."
  },
  {
    title: "Biệt thự Pháp cổ Sài Gòn",
    description: "Chi tiết kiến trúc, hoa giấy và nắng xiên.",
    prompt: "Close up of an old French colonial villa balcony in District 3, faded yellow walls with peeling paint, vibrant pink bougainvillea flowers overflowing, wooden shutters, dappled sunlight filtering through ancient trees, nostalgic atmosphere.",
    meaning: "Cận cảnh ban công biệt thự Pháp cổ ở Quận 3, tường vàng nhạt bong tróc, hoa giấy hồng rực rỡ tràn ngập, cửa sổ gỗ, nắng lốm đốm xuyên qua tán cây cổ thụ, không khí hoài niệm."
  },
  {
    title: "Cánh đồng thốt nốt An Giang",
    description: "Bố cục tối giản, bầu trời rộng lớn và cây đặc trưng.",
    prompt: "Minimalist landscape of An Giang province, tall iconic sugar palm trees (cây thốt nốt) standing against a vast pastel sunset sky, endless flat green rice fields, ultra-wide angle, serene and peaceful vibe, high dynamic range.",
    meaning: "Phong cảnh tối giản tỉnh An Giang, những cây thốt nốt cao vút nổi bật trên bầu trời hoàng hôn màu pastel rộng lớn, cánh đồng lúa xanh mướt trải dài, góc rộng, cảm giác thanh bình và yên ả."
  }
];

const PromptGuide: React.FC = () => {
  return (
    <div className="mt-12 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex items-center gap-2">
        <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="font-bold text-slate-800">Bí kíp tạo ảnh "triệu like"</h3>
      </div>
      
      <div className="p-6">
        <p className="text-sm text-slate-500 mb-6 leading-relaxed">
          Hệ thống AI của SoulCaption đã được tối ưu sẵn cho phong cách Miền Nam. Dưới đây là cách mô tả chi tiết bằng tiếng Anh (AI hiểu tốt nhất) kèm ý nghĩa tiếng Việt để bạn tham khảo:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROMPT_EXAMPLES.map((item, index) => (
            <div key={index} className="flex flex-col gap-2 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-indigo-200 transition-colors">
              <h4 className="text-sm font-bold text-indigo-600">{item.title}</h4>
              <p className="text-[11px] text-slate-700 font-medium">{item.meaning}</p>
              <div className="mt-2 p-2.5 bg-white rounded-lg border border-slate-200 text-[10px] font-mono text-slate-500 line-clamp-2 select-all cursor-help italic" title={item.prompt}>
                Lệnh AI: {item.prompt}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-indigo-600 font-bold text-xl mb-1">01</div>
            <p className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Mô tả ánh sáng</p>
            <p className="text-[10px] text-slate-400 mt-1 italic">Nắng xiên (dappled sunlight), hoàng hôn (sunset), hay đèn đường (street lamps)...</p>
          </div>
          <div className="text-center">
            <div className="text-indigo-600 font-bold text-xl mb-1">02</div>
            <p className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Vật thể đặc trưng</p>
            <p className="text-[10px] text-slate-400 mt-1 italic">Xe Dream, nón lá (conical hat), xuồng ba lá (sampan), hoa giấy (bougainvillea)...</p>
          </div>
          <div className="text-center">
            <div className="text-indigo-600 font-bold text-xl mb-1">03</div>
            <p className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Cảm xúc (Vibe)</p>
            <p className="text-[10px] text-slate-400 mt-1 italic">Nostalgic (hoài niệm), Peaceful (bình yên), Cinematic (điện ảnh)...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptGuide;
