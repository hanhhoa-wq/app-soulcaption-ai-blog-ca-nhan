
import { GoogleGenAI, Type } from "@google/genai";
import { GenerationParams, GeneratedContent } from "../types";
import { SYSTEM_INSTRUCTION, EMOTION_COLOR_MAP, STYLE_DESCRIPTIONS } from "../constants";

export const generateBlogContent = async (params: GenerationParams): Promise<GeneratedContent> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const authorText = params.author ? `Tác giả: @${params.author.replace(/^@/, '')}` : '';
  const randomnessSeed = Math.random().toString(36).substring(7);

  // Mở rộng danh sách cấu trúc kể chuyện cực kỳ đa dạng
  const structures = [
    "Một mẩu đối thoại ngắn bất ngờ giữa hai người lạ hoặc người quen",
    "Một danh sách 3 điều nhỏ nhặt bạn vừa nhìn thấy trong 60 giây qua",
    "Một lời tự sự gửi cho một món đồ cũ đã mất",
    "Một dòng trạng thái bắt đầu bằng một con số khô khan nhưng dẫn tới cảm xúc ướt át",
    "Một bài thơ tự do không vần, ngắt dòng bất thình lình",
    "Một câu chuyện ngắn về một đồ vật vô tri (ly cà phê, đôi giày, chiếc lá)",
    "Một dòng cảm xúc bắt đầu bằng một mùi vị hoặc một âm thanh khó chịu",
    "Cấu trúc 'Trước đây - Bây giờ' (Then and Now) đầy sự tương phản",
    "Bắt đầu bằng một định nghĩa 'ngông cuồng' về một cảm xúc bình thường",
    "Liệt kê những điều khiến bạn nhận ra mình đã thay đổi quá nhiều",
    "Một lời thú nhận về một thói quen kỳ quặc trong bóng tối",
    "Mô tả một khoảnh khắc tĩnh lặng tuyệt đối giữa phố thị ồn ào",
    "Viết như một trang nhật ký bị xé dở, bắt đầu từ giữa chừng một suy nghĩ"
  ];

  // Các góc nhìn (POV) ngẫu nhiên để thay đổi lăng kính
  const povAngles = [
    "Nhìn từ góc độ của một người vừa lỡ chuyến xe cuối cùng",
    "Nhìn từ góc độ của một người đang ngồi quán cà phê một mình quan sát dòng người",
    "Nhìn từ góc độ của một người vừa nhận được một tin nhắn cũ",
    "Nhìn từ góc độ của một người đang đứng dưới cơn mưa bất chợt",
    "Nhìn từ góc độ của một người đang dọn dẹp lại căn phòng cũ"
  ];

  const chosenStructure = structures[Math.floor(Math.random() * structures.length)];
  const chosenPOV = povAngles[Math.floor(Math.random() * povAngles.length)];

  const textPrompt = `
    THỬ THÁCH SÁNG TẠO SỐ ${randomnessSeed}:
    Yêu cầu bạn viết một bài đăng Facebook phá vỡ mọi định kiến về "văn mẫu AI". 

    THÔNG TIN ĐẦU VÀO:
    - Chủ đề: ${params.category}
    - Cảm xúc: ${params.emotion}
    - Giọng văn: ${params.style}
    - Độ dài: ${params.length}
    - Ngôn ngữ: ${params.language}
    - Ký danh: ${authorText || 'Ẩn danh'}

    RÀO CẢN SÁNG TẠO (BẮT BUỘC):
    - Góc nhìn chủ đạo: ${chosenPOV}.
    - Hình thức thể hiện: ${chosenStructure}.
    - CẤM TUYỆT ĐỐI các cụm từ: "Có những ngày", "Đôi khi", "Chúng ta", "Cuộc đời", "Giá trị".
    - Câu mở đầu phải là một "cú tát" vào thị giác hoặc thính giác của người đọc (Ví dụ: "Mùi xăng thơm nồng...", "Tiếng chìa khóa lạch cạch...", "Vết sẹo này có từ năm tôi 7 tuổi...").
    - Viết như đang kể chuyện cho chính mình nghe trong gương, không cần nịnh nọt độc giả.
    - Kết bài bằng một câu hỏi hoặc một câu khẳng định bỏ lửng, tạo sự hụt hẫng hoặc suy ngẫm sâu.
  `;

  const textResponse = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: [{ role: 'user', parts: [{ text: textPrompt }] }],
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: 'application/json',
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          caption: { type: Type.STRING },
          hashtags: { type: Type.ARRAY, items: { type: Type.STRING } }
        },
        required: ['caption', 'hashtags']
      }
    }
  });

  const textData = JSON.parse(textResponse.text || '{}');

  // 2. Diversify Image Prompt - Giữ nguyên logic cũ như yêu cầu
  const southernScenes = [
    "Cảnh sông nước Miền Tây với những rặng dừa nước, lục bình tím trôi lững lờ trên sông Tiền",
    "Góc phố Sài Gòn với xe Dream cũ, hàng quán vỉa hè, biển hiệu viết tay phong cách Retro Nam Bộ",
    "Nhà cổ Nam Bộ với mái ngói thấp, hàng hiên rộng, sân gạch tàu và những chậu vạn thọ vàng",
    "Hoàng hôn rực rỡ trên kênh tàu hủ Sài Gòn, bóng dáng những tòa nhà hiện đại xa xa",
    "Người dân Miền Tây mặc áo bà ba, quấn khăn rằn đang chèo xuồng ba lá trong rạch nhỏ rợp bóng dừa Bến Tre",
    "Cảnh chợ nổi trứ danh with những cây bẹo treo đầy nông sản đặc sản Nam Bộ như dứa, dưa hấu",
    "Cánh đồng lúa chín vàng óng ả ở miền Tây, xa xa là hàng cây thốt nốt",
    "Kiến trúc rực rỡ của chùa Khmer tại Sóc Trăng với mái đao cong vút và màu vàng rực",
    "Quán hủ tiếu gõ ven đường Sài Gòn dưới ánh đèn vàng mờ ảo buổi đêm",
    "Rừng tràm Trà Sư xanh ngắt với thảm bèo cám phủ kín mặt nước",
    "Hiên nhà gỗ mộc mạc ở miền Tây with chiếc võng đưa kẽo kẹt dưới tán cây sa-pô-chê",
    "Những con hẻm nhỏ Sài Gòn với nắng chói chang, dây điện chằng chịt và những chậu hoa mười giờ",
    "Cảnh thu hoạch trái cây trong vườn sầu riêng hoặc măng cụt tại Lái Thiêu",
    "Kiến trúc Nhà thờ Đức Bà Sài Gòn hoặc Bưu điện Thành phố với tone màu gạch hồng đặc trưng"
  ];
  
  const randomScene = southernScenes[Math.floor(Math.random() * southernScenes.length)];

  let toneMau = 'tự nhiên';
  let emotionalDetail = '';
  
  const emotionLower = params.emotion.toLowerCase();
  const categoryLower = params.category.toLowerCase();

  if (emotionLower.includes('buồn') || categoryLower.includes('buồn') || emotionLower.includes('cô đơn')) {
    toneMau = 'trầm, xám nhẹ của mưa rào Sài Gòn, xanh lạnh của nước sông chiều muộn';
    emotionalDetail = 'không khí tĩnh lặng, vắng lặng, mang nét hoài niệm và sâu lắng';
  } else if (emotionLower.includes('chữa lành') || categoryLower.includes('chữa lành') || emotionLower.includes('bình yên')) {
    toneMau = 'nắng phương Nam vàng rực, xanh lá dừa tươi mát, màu đất đỏ bazan';
    emotionalDetail = 'mang lại cảm giác ấm áp, dồi dào năng lượng và sự trù phú của vùng đất mới';
  } else if (emotionLower.includes('trưởng thành') || categoryLower.includes('suy ngẫm')) {
    toneMau = 'nâu trầm của gỗ, màu hổ phách của trà, ánh sáng chiều tà đổ bóng dài';
    emotionalDetail = 'góc nhìn điện ảnh, sâu sắc, tập trung vào chi tiết kiến trúc cũ kỹ nhưng kiên cường';
  } else {
    for (const [key, value] of Object.entries(EMOTION_COLOR_MAP)) {
      if (emotionLower.includes(key) || categoryLower.includes(key)) {
        toneMau = value;
        break;
      }
    }
  }

  const selectedStyleDescription = STYLE_DESCRIPTIONS[params.imageStyle];
  
  const contextSource = params.imageDetails 
    ? `Bối cảnh chi tiết: ${params.imageDetails}.` 
    : `Bối cảnh hình ảnh phải phản chiếu chính xác nội dung và cảm xúc của bài viết sau: "${textData.caption.substring(0, 400)}". Hãy trích xuất các vật thể, không gian và thời gian được nhắc đến trong văn bản để tạo hình ảnh minh họa tương ứng.`;

  const imagePrompt = `
    Authentic Southern Vietnam (Miền Nam) and Mekong Delta (Miền Tây) aesthetic. ${selectedStyleDescription}
    ${params.imageDetails ? `Bối cảnh cơ bản: ${randomScene}.` : ''}
    ${contextSource}
    Tập trung vào: Southern Vietnamese architecture (Nhà ba gian Nam Bộ), flat delta landscape (no mountains), tropical vegetation (coconut trees, water coconuts, fruit orchards). 
    Cultural markers: Áo bà ba, khăn rằn, floating markets, specific Southern street atmosphere.
    Lighting: Intense tropical sunlight or warm Southern sunset.
    Colors: ${toneMau}, ${emotionalDetail}. 
    Realism: Cinematic, highly detailed, high quality, 1:1 aspect ratio.
    
    CRITICAL: NO Northern Vietnam elements. NO Hanoi Old Quarter style yellow walls with black mold. NO limestone mountains of Ha Long or Ninh Binh. NO terraced rice fields. NO Northern traditional hats (Nón quai thao). 
    Strictly Southern and Mekong region architecture and geography only.
  `.replace(/\s+/g, ' ').trim();

  // 3. Generate Image
  let imageUrl = null;
  try {
    const imageResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: [{ parts: [{ text: imagePrompt }] }],
      config: {
        imageConfig: {
          aspectRatio: "1:1"
        }
      }
    });

    for (const part of imageResponse.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        imageUrl = `data:image/png;base64,${part.inlineData.data}`;
        break;
      }
    }
  } catch (error) {
    console.error("Image generation failed:", error);
  }

  return {
    caption: textData.caption || '',
    hashtags: textData.hashtags || [],
    imageUrl,
    imagePrompt
  };
};
