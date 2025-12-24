
export type Category = 
  | 'Tâm trạng buồn – cô đơn'
  | 'Tâm sự cuộc sống'
  | 'Tình yêu – chia tay'
  | 'Chữa lành – tích cực'
  | 'Suy ngẫm – trưởng thành'
  | 'Động lực – vượt khó'
  | 'Đời thường – nhật ký cá nhân'
  | 'Stress – áp lực cuộc sống'
  | 'Hoài niệm – kỉ niệm cũ'
  | 'Thành công – nỗ lực'
  | 'Cô đơn giữa đám đông'
  | 'Những chuyến đi xa'
  | 'Cảm hứng sáng tạo'
  | 'Gia đình – tình thân'
  | 'Bạn bè – tri kỷ'
  | 'Sức khỏe tinh thần'
  | 'Góc nhỏ bình yên'
  | 'Thay đổi – làm mới mình'
  | 'Học cách buông bỏ'
  | 'Niềm tin vào tương lai';

export type WritingStyle = 'Nhẹ nhàng' | 'Sâu lắng' | 'Thực tế' | 'Trưởng thành';
export type ContentLength = 'Ngắn (3–4 dòng)' | 'Vừa (5–7 dòng)' | 'Dài (dạng blog)';
export type Language = 'Tiếng Việt' | 'Việt + 1 câu English quote';
export type ImageStyle = 'Blog style' | 'Cinematic photography' | 'Documentary style' | 'Minimalist art';

export interface GenerationParams {
  category: Category;
  emotion: string;
  author: string;
  length: ContentLength;
  style: WritingStyle;
  language: Language;
  imageStyle: ImageStyle;
  imageDetails: string;
}

export interface GeneratedContent {
  caption: string;
  hashtags: string[];
  imageUrl: string | null;
  imagePrompt: string;
}
