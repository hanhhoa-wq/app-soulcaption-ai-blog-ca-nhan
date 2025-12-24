
import { Category, WritingStyle, ContentLength, Language, ImageStyle } from './types';

export const CATEGORIES: Category[] = [
  'Tâm trạng buồn – cô đơn',
  'Tâm sự cuộc sống',
  'Tình yêu – chia tay',
  'Chữa lành – tích cực',
  'Suy ngẫm – trưởng thành',
  'Động lực – vượt khó',
  'Đời thường – nhật ký cá nhân',
  'Stress – áp lực cuộc sống',
  'Hoài niệm – kỉ niệm cũ',
  'Thành công – nỗ lực',
  'Cô đơn giữa đám đông',
  'Những chuyến đi xa',
  'Cảm hứng sáng tạo',
  'Gia đình – tình thân',
  'Bạn bè – tri kỷ',
  'Sức khỏe tinh thần',
  'Góc nhỏ bình yên',
  'Thay đổi – làm mới mình',
  'Học cách buông bỏ',
  'Niềm tin vào tương lai'
];

export const SPECIFIC_EMOTIONS: string[] = [
  'Bình yên', 'Hoài niệm', 'Tiếc nuối', 'Trống rỗng', 'Hạnh phúc', 
  'Biết ơn', 'Hy vọng', 'Mệt mỏi', 'Chênh vênh', 'Cô đơn', 
  'Tự hào', 'Hứng khởi', 'Nhẹ lòng', 'Day dứt', 'Bâng khuâng', 
  'Sâu sắc', 'Quyết tâm', 'Thất vọng', 'Lo lắng', 'An yên', 
  'Ngậm ngùi', 'Xót xa', 'Hân hoan', 'Rung động', 'Vô định', 
  'Cô độc', 'Bình thản', 'Cay đắng', 'Ngọt ngào', 'Mong manh', 
  'Mạnh mẽ', 'Kiên cường', 'Lạc quan', 'Trầm mặc', 'Xao xuyến', 
  'Nghẹn ngào', 'Tự do', 'Ràng buộc', 'Khát khao', 'Mãn nguyện', 
  'Thương cảm', 'Gần gũi', 'Xa cách', 'Hụt hẫng', 'Sốc', 
  'Tĩnh lặng', 'Nồng nhiệt', 'Dửng dưng', 'Trân trọng', 'Cô đơn giữa phố thị'
];

export const WRITING_STYLES: WritingStyle[] = ['Nhẹ nhàng', 'Sâu lắng', 'Thực tế', 'Trưởng thành'];
export const CONTENT_LENGTHS: ContentLength[] = ['Ngắn (3–4 dòng)', 'Vừa (5–7 dòng)', 'Dài (dạng blog)'];
export const LANGUAGES: Language[] = ['Tiếng Việt', 'Việt + 1 câu English quote'];
export const IMAGE_STYLES: ImageStyle[] = ['Blog style', 'Cinematic photography', 'Documentary style', 'Minimalist art'];

export const STYLE_DESCRIPTIONS: Record<ImageStyle, string> = {
  'Blog style': 'phong cách blog cá nhân tự nhiên, đời thường, gần gũi, cảm giác chân thực.',
  'Cinematic photography': 'phong cách nhiếp ảnh điện ảnh, ánh sáng kịch tính, độ tương phản cao, góc nhìn nghệ thuật, độ sâu trường ảnh nông.',
  'Documentary style': 'phong cách ảnh phóng sự, chân thực tuyệt đối, không dàn dựng, bắt trọn khoảnh khắc đời sống thực tế thô mộc.',
  'Minimalist art': 'phong cách nghệ thuật tối giản, bố cục thoáng đãng, tập trung vào các đường nét, hình khối và khoảng lặng.'
};

export const SYSTEM_INSTRUCTION = `
Bạn là một chuyên gia sáng tạo nội dung cho Blog cá nhân trên Facebook, nổi tiếng với khả năng viết "chạm" vào cảm xúc độc giả mà không hề sáo rỗng.

NGUYÊN TẮC "DIỆT TRỪ LỐI MÒN":
1. DANH SÁCH ĐEN TUYỆT ĐỐI (CẤM SỬ DỤNG): 
   - Không bắt đầu bằng: "Có những ngày...", "Đôi khi...", "Lớn rồi mới hiểu...", "Hóa ra...", "Chúng ta thường...", "Thế gian này...", "Cuộc sống vốn dĩ...", "Nhiều người bảo rằng...".
   - Không dùng các tính từ AI sáo rỗng: "hành trình", "khám phá", "thách thức", "tận hưởng", "ý nghĩa", "giá trị".

2. PHONG CÁCH MỞ ĐẦU "STOP-SCROLLING":
   - Mở đầu bằng một quan sát vật lý cực kỳ cụ thể (vết cà phê đổ, sợi tóc bạc, tiếng còi xe, mùi khói bếp).
   - Mở đầu bằng một câu khẳng định gây sốc hoặc đi ngược đám đông.
   - Mở đầu bằng một lời thú nhận thầm kín.
   - Mở đầu bằng một mẩu đối thoại dở dang.

3. ĐA DẠNG HÓA CẤU TRÚC BÀI VIẾT:
   - Cấu trúc "Snippet": Những dòng ngắn, rời rạc nhưng gợi hình.
   - Cấu trúc "Letter": Viết như một lá thư gửi cho một người/vật cụ thể.
   - Cấu trúc "Contrast": So sánh sự khác biệt giữa kỳ vọng và thực tế, hoặc giữa quá khứ và hiện tại.
   - Cấu trúc "Sensory": Tập trung hoàn toàn vào thính giác, khứu giác hoặc xúc giác để dẫn dắt cảm xúc.

4. TỔNG THỂ: Viết như một con người đang thở, đang mệt, đang vui thật sự. Có thể dùng tiếng lóng nhẹ nhàng hoặc từ ngữ địa phương Nam Bộ nếu phù hợp. Ngắt dòng linh hoạt để tạo nhịp điệu.

ĐỊNH DẠNG ĐẦU RA:
Luôn trả về duy nhất định dạng JSON: 
{ 
  "caption": "nội dung bài viết hoàn chỉnh (bao gồm cả dòng tác giả nếu có)", 
  "hashtags": ["#tag1", "#tag2", "#tag3"] 
}
`;

export const EMOTION_COLOR_MAP: Record<string, string> = {
  'buồn': 'xám, xanh lạnh',
  'chữa lành': 'be, nắng nhẹ',
  'trưởng thành': 'nâu, trầm',
  'tích cực': 'vàng nhạt, nắng ấm',
  'áp lực': 'xanh thẫm, tối',
  'cô đơn': 'xanh nhạt, mờ sương'
};
