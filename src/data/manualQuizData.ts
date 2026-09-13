export interface QuizQuestion {
  id: string;
  lessonId: string;
  questionTh: string;
  questionEn: string;
  options: {
    id: string;
    textTh: string;
    textEn: string;
  }[];
  correctOptionId: string;
  explanationTh: string;
  explanationEn: string;
  tipTh?: string;
  tipEn?: string;
}

export interface LessonQuizSummary {
  lessonId: string;
  titleTh: string;
  titleEn: string;
  chapterNumber: number;
}

export const MANUAL_LESSONS: LessonQuizSummary[] = [
  { lessonId: 'auth', chapterNumber: 1, titleTh: 'ระบบเข้าสู่ระบบ & สิทธิ์ 3 รูปแบบ', titleEn: 'Authentication & Roles' },
  { lessonId: 'home', chapterNumber: 2, titleTh: 'หน้าหลัก & ตอบ 5 วินาที', titleEn: 'Home Dashboard & 5-Sec Answers' },
  { lessonId: 'appliances', chapterNumber: 3, titleTh: 'เครื่องใช้ไฟฟ้า & Eco Cut 0W', titleEn: 'Appliances & Eco Cut' },
  { lessonId: 'budget', chapterNumber: 4, titleTh: 'คำนวณค่าไฟ & TOU Tariff', titleEn: 'Budget & TOU Rate Engine' },
  { lessonId: 'ai', chapterNumber: 5, titleTh: 'AI Coach & Smart Insights', titleEn: 'AI Coach & Smart Insights' },
  { lessonId: 'quests', chapterNumber: 6, titleTh: 'ภารกิจประหยัดไฟ & คลังบทเรียน', titleEn: 'Eco Quests & Lessons' },
  { lessonId: 'locations', chapterNumber: 7, titleTh: 'สถานที่ & โหนดสมาร์ทมิเตอร์', titleEn: 'My Locations & Smart Meters' },
  { lessonId: 'score', chapterNumber: 8, titleTh: 'ดัชนีคะแนนประหยัดพลังงาน 5 มิติ', titleEn: 'Energy Saving Score 76/100' },
  { lessonId: 'trust', chapterNumber: 9, titleTh: 'ความโปร่งใส ค้นหา & ส่งออก PDF', titleEn: 'Trust Center & PDF Export' },
];

export const MANUAL_QUIZ_POOL: QuizQuestion[] = [
  // ==========================================
  // LESSON 1: AUTH & ROLES
  // ==========================================
  {
    id: 'auth_q1',
    lessonId: 'auth',
    questionTh: 'บัญชีบทบาท "นักเรียน/นักศึกษา (Student)" ในระบบเน้นการใช้งานส่วนใดเป็นหลัก?',
    questionEn: 'Which focus area is primarily emphasized for the "Student" role?',
    options: [
      { id: 'a', textTh: 'การจัดการมิเตอร์หม้อแปลงโรงงานอุตสาหกรรมขนาดใหญ่', textEn: 'Industrial transformer management' },
      { id: 'b', textTh: 'ภารกิจเกมการเรียนรู้ (Eco Quests), สถิติ และการสะสมตราเกียรติยศ', textEn: 'Gamified Eco Quests, stats, and badge collections' },
      { id: 'c', textTh: 'การจ่ายเงินภาษีมูลค่าเพิ่มค่าไฟฟ้าให้รัฐบาล', textEn: 'VAT tax payment submission to the government' },
      { id: 'd', textTh: 'การแก้ไขซอร์สโค้ดของเซิร์ฟเวอร์ฐานข้อมูลส่วนกลาง', textEn: 'Modifying central database source code' }
    ],
    correctOptionId: 'b',
    explanationTh: 'บทบาท Student ถูกออกแบบมาเพื่อการเรียนรู้ผ่าน Gamification เน้นทำเควส รวบรวมแสตมป์ และพัฒนาทักษะการประหยัดพลังงาน',
    explanationEn: 'The Student persona focuses on interactive gamified learning, eco quests, stamps, and energy efficiency skill progression.',
    tipTh: '💡 สลับบทบาทได้ตลอดเวลาผ่านปุ่มโปรไฟล์มุมขวาบน',
    tipEn: '💡 Switch roles anytime using the profile icon at the top right.'
  },
  {
    id: 'auth_q2',
    lessonId: 'auth',
    questionTh: 'หากต้องการทดสอบระบบอย่างรวดเร็วโดยไม่ต้องพิมพ์รหัสผ่าน ควรทำอย่างไร?',
    questionEn: 'How can you quickly test the platform without typing credentials?',
    options: [
      { id: 'a', textTh: 'กดปุ่ม 1-Click Demo Quick Login หรือคลิกการ์ดผู้ใช้จำลองในหน้าคู่มือ', textEn: 'Click 1-Click Demo Quick Login or click sample account cards in manual' },
      { id: 'b', textTh: 'ส่งอีเมลขออนุมัติรหัสผ่านจากผู้พัฒนาล่วงหน้า 3 วัน', textEn: 'Email developers 3 days in advance' },
      { id: 'c', textTh: 'ปิดการเชื่อมต่ออินเทอร์เน็ตทั้งหมด', textEn: 'Disconnect from all internet connections' },
      { id: 'd', textTh: 'รีเซ็ตเบราว์เซอร์ล้างข้อมูลเครื่องทิ้ง', textEn: 'Hard wipe browser user data' }
    ],
    correctOptionId: 'a',
    explanationTh: 'ระบบมีฟีเจอร์ 1-Click Demo Login ให้เข้าสู่ระบบได้ทันทีทั้งบทบาท Student, Resident และ Auditor เพื่อความสะดวกรวดเร็วในการทดสอบ',
    explanationEn: 'The platform offers 1-Click Demo Login for quick testing across Student, Resident, and Auditor personas.',
    tipTh: '💡 มีปุ่มคัดลอก Username และ Password ในหน้าคู่มือบทที่ 1 ด้วย',
    tipEn: '💡 Copy buttons for test credentials are also available in Chapter 1.'
  },
  {
    id: 'auth_q3',
    lessonId: 'auth',
    questionTh: 'ระบบความปลอดภัยและการเข้ารหัสของ EduEase Energy ใช้มาตรฐานใด?',
    questionEn: 'What security and hashing standards does EduEase Energy utilize?',
    options: [
      { id: 'a', textTh: 'เก็บบันทึกรหัสผ่านเป็นข้อความธรรมดา (Plain text)', textEn: 'Stores plain text passwords in cookie' },
      { id: 'b', textTh: 'เข้ารหัสการส่งข้อมูล TLS 1.3 พร้อม PBKDF2 Password Hashing', textEn: 'TLS 1.3 encryption with PBKDF2 Password Hashing' },
      { id: 'c', textTh: 'ส่งรหัสผ่านผ่าน SMS แบบไม่ใส่รหัส', textEn: 'Unencrypted SMS credential transmission' },
      { id: 'd', textTh: 'ไม่มีระบบรักษาความปลอดภัยใดๆ', textEn: 'No encryption standard implemented' }
    ],
    correctOptionId: 'b',
    explanationTh: 'ระบบใช้ TLS 1.3 ร่วมกับมาตรฐาน PBKDF2 เพื่อความปลอดภัยสูงสุด และไม่เปิดเผยรหัสผ่านในฝั่ง Client',
    explanationEn: 'The system protects user data using TLS 1.3 transport security combined with PBKDF2 credential hashing.',
    tipTh: '💡 รองรับการยืนยันตัวตนด้วย Passkey Biometrics ในอุปกรณ์ที่รองรับ',
    tipEn: '💡 Supports biometric Passkey authentication on compatible devices.'
  },
  {
    id: 'auth_q4',
    lessonId: 'auth',
    questionTh: 'บทบาท "ผู้ตรวจสอบพลังงาน (Auditor/Admin)" เหมาะกับผู้ใช้กลุ่มใด?',
    questionEn: 'Which user group is the "Auditor/Admin" role primarily built for?',
    options: [
      { id: 'a', textTh: 'ผู้เล่นเกมทั่วไปที่ไม่สนใจเรื่องตัวเลขค่าไฟ', textEn: 'Casual gamers who ignore billing figures' },
      { id: 'b', textTh: 'ผู้จัดการอาคาร วิศวกร และผู้ตรวจสอบที่ต้องการวิเคราะห์เชิงลึกและรายงานทางการ', textEn: 'Building managers, engineers, and auditors needing in-depth analytics and official reports' },
      { id: 'c', textTh: 'ผู้ใช้ที่ไม่มีอุปกรณ์ไฟฟ้าในบ้านเลย', textEn: 'Users with zero appliances' },
      { id: 'd', textTh: 'เด็กอนุบาลที่ยังอ่านตัวเลขไม่ออก', textEn: 'Pre-schoolers learning numbers' }
    ],
    correctOptionId: 'b',
    explanationTh: 'Auditor/Admin มีสิทธิ์เข้าถึงฟีเจอร์ขั้นสูง เช่น Decision Logs, การปรับแต่งโมเดลอัตราค่าไฟ และการส่งออกรายงาน PDF ระดับองค์กร',
    explanationEn: 'Auditor/Admin unlocks advanced tools such as AI Decision Logs, tariff model customization, and enterprise PDF exports.',
    tipTh: '💡 Auditor สามารถตรวจสอบค่า Power Factor และฮาร์มอนิกส์ได้',
    tipEn: '💡 Auditors can monitor Power Factor and load profiles.'
  },

  // ==========================================
  // LESSON 2: HOME DASHBOARD
  // ==========================================
  {
    id: 'home_q1',
    lessonId: 'home',
    questionTh: 'หลักการ "ตอบใน 5 วินาที (5-Second Answers)" ของหน้าหลัก Home Dashboard หมายถึงอะไร?',
    questionEn: 'What does the "5-Second Answers" design principle in the Home Dashboard mean?',
    options: [
      { id: 'a', textTh: 'ระบบจะปิดตัวเองลงอัตโนมัติภายใน 5 วินาที', textEn: 'The system automatically shuts down in 5 seconds' },
      { id: 'b', textTh: 'ผู้ใช้สามารถมองเห็นยอดค่าไฟวันนี้ แนวโน้มสิ้นเดือน และสถานะงบประมาณได้ทันทีโดยไม่ต้องคลิกหลายหน้า', textEn: 'Users can grasp today’s cost, month-end forecast, and budget status within 5 seconds without deep navigation' },
      { id: 'c', textTh: 'ต้องรีบจ่ายค่าไฟให้เสร็จภายใน 5 วินาทีมิฉะนั้นไฟจะดับ', textEn: 'Bills must be paid within 5 seconds to avoid blackout' },
      { id: 'd', textTh: 'ผู้ช่วย AI จะตอบได้แค่คำละ 5 วินาที', textEn: 'AI responds in 5-second increments only' }
    ],
    correctOptionId: 'b',
    explanationTh: 'หน้าหลักถูกจัดเรียงกล่องสรุป 4 กล่องไฮไลต์และเกจงบประมาณ เพื่อให้ผู้ใช้งานทราบสถานะการใช้พลังงานทันทีใน 5 วินาทีแรกที่เปิดดู',
    explanationEn: 'The Home layout organizes top 4 metrics and the budget gauge so users immediately understand their power situation in 5 seconds.',
    tipTh: '💡 สังเกตสีของเกจงบประมาณ: เขียว (ปกติ) / เหลือง (เตือน) / แดง (เกินงบ)',
    tipEn: '💡 Observe budget gauge colors: Green (Normal) / Yellow (Warning) / Red (Over).'
  },
  {
    id: 'home_q2',
    lessonId: 'home',
    questionTh: 'เมื่อเกจวัดงบประมาณในหน้าแรกแสดง "สีแดง (>90%)" หมายถึงสถานะใด?',
    questionEn: 'What does a "Red (>90%)" budget gauge indicate on the Home view?',
    options: [
      { id: 'a', textTh: 'งบประมาณเหลือมากกว่า 90% ปลอดภัยมาก', textEn: 'Budget has over 90% remaining safely' },
      { id: 'b', textTh: 'เกิดเหตุไฟฟ้าลัดวงจรในหม้อแปลงทันที', textEn: 'An immediate transformer short circuit' },
      { id: 'c', textTh: 'ค่าไฟสะสมใกล้เต็มหรือเกินงบประมาณที่กำหนดไว้ มีความเสี่ยงค่าไฟพุ่งสูง', textEn: 'Accumulated cost is approaching or exceeding target budget, risking high expenses' },
      { id: 'd', textTh: 'ระบบขอให้เปิดแอร์ทุกตัวเพื่อระบายความร้อน', textEn: 'Prompting users to turn on all ACs' }
    ],
    correctOptionId: 'c',
    explanationTh: 'เกจสีแดงแจ้งเตือนว่าการใช้ไฟพุ่งแตะเพดานงบประมาณแล้ว ควรรีบปรับพฤติกรรมหรือปิดอุปกรณ์ที่ไม่จำเป็นทันที',
    explanationEn: 'Red status warns that electricity consumption has reached the budget threshold, calling for prompt conservation actions.',
    tipTh: '💡 ตรวจสอบอุปกรณ์ที่กินไฟสูงสุดในกล่อง "Top Consumer"',
    tipEn: '💡 Check the highest energy appliance in the "Top Consumer" card.'
  },
  {
    id: 'home_q3',
    lessonId: 'home',
    questionTh: 'หากต้องการเปิด-ปิดเครื่องใช้ไฟฟ้าแบบด่วนในหน้า Home สามารถทำได้อย่างไร?',
    questionEn: 'How can you quickly toggle an appliance on/off directly from the Home view?',
    options: [
      { id: 'a', textTh: 'คลิกที่สวิตช์รูปปลั๊กบนการ์ดเครื่องใช้ไฟฟ้าในหน้าแรก ระบบจะคำนวณวัตต์ใหม่ทันที', textEn: 'Click the plug toggle switch on the appliance card to immediately re-estimate watts' },
      { id: 'b', textTh: 'ต้องปิดเครื่องที่เบรกเกอร์หลักของบ้านเท่านั้น', textEn: 'Must pull down the main breaker of the house' },
      { id: 'c', textTh: 'ต้องส่งคำขอให้อนุมัติผ่านเจ้าหน้าที่การไฟฟ้า', textEn: 'Submit approval form to utility officials' },
      { id: 'd', textTh: 'ไม่สามารถปิดได้จากหน้าหลัก ต้องลบอุปกรณ์ทิ้ง', textEn: 'Cannot toggle; must delete the appliance' }
    ],
    correctOptionId: 'a',
    explanationTh: 'การ์ดเครื่องใช้ไฟฟ้าในหน้าแรกมี Quick Toggle ให้เปิด/ปิดได้ทันที โดยยอดคำนวณวัตต์รวมและค่าไฟรายชั่วโมงจะปรับตัวเรียลไทม์',
    explanationEn: 'Home appliance cards feature interactive quick toggles that recalculate real-time running watts and hourly cost on click.',
    tipTh: '💡 ปิดเครื่องที่ไม่ได้ใช้งานจะช่วยลดโหลดทันที',
    tipEn: '💡 Switching off idle devices immediately drops active wattage.'
  },
  {
    id: 'home_q4',
    lessonId: 'home',
    questionTh: 'คะแนนประหยัดพลังงาน (Energy Score) ระดับ 76/100 บนหน้าแรกจัดอยู่ในเกรดใด?',
    questionEn: 'What grade level does the Energy Score 76/100 on the dashboard correspond to?',
    options: [
      { id: 'a', textTh: 'เกรด F (ตกเกณฑ์รุนแรง)', textEn: 'Grade F (Severe failure)' },
      { id: 'b', textTh: 'เกรด B+ (ดีมาก มีประสิทธิภาพสูง)', textEn: 'Grade B+ (Very Good, high efficiency)' },
      { id: 'c', textTh: 'เกรด SSS (ไร้ที่ติเหนือมนุษย์)', textEn: 'Grade SSS (Superhuman flawless)' },
      { id: 'd', textTh: 'ไม่สามารถจัดเกรดได้', textEn: 'Unclassifiable' }
    ],
    correctOptionId: 'b',
    explanationTh: 'คะแนน 76/100 อยู่ในระดับเกรด B+ สะท้อนว่าจัดการพลังงานได้ดี และสามารถดันสู่เกรด A (>85) และ A+ (>90) ได้ผ่านข้อแนะนำของ AI',
    explanationEn: '76/100 corresponds to Grade B+, indicating sound energy efficiency that can reach Grade A (>85) or A+ (>90) with suggested habits.',
    tipTh: '💡 ดูรายละเอียด 5 มิติของคะแนนได้ในบทที่ 8',
    tipEn: '💡 Explore all 5 dimensions of this score in Chapter 8.'
  },

  // ==========================================
  // LESSON 3: APPLIANCES & ECO CUT
  // ==========================================
  {
    id: 'app_q1',
    lessonId: 'appliances',
    questionTh: 'การเปิดใช้งานระบบ "Eco Standby Auto-Cut (0 Watt)" ช่วยประหยัดค่าไฟได้อย่างไร?',
    questionEn: 'How does the "Eco Standby Auto-Cut (0 Watt)" feature save electricity costs?',
    options: [
      { id: 'a', textTh: 'ตัดกระแสไฟฟ้าแฝง (Phantom Load / Vampire Draw) ที่ไหลกินไฟขณะปิดเครื่อง', textEn: 'Eliminates phantom load and vampire standby leakage while idle' },
      { id: 'b', textTh: 'ทำให้แอร์เปลี่ยนสีกลายเป็นสีเขียว', textEn: 'Turns the AC chassis green' },
      { id: 'c', textTh: 'เร่งพัดลมให้หมุนเร็วขึ้น 200 เท่า', textEn: 'Accelerates fan speed by 200x' },
      { id: 'd', textTh: 'เปลี่ยนกระแสสลับ AC ให้กลายเป็นแบตเตอรี่', textEn: 'Converts AC grid power into battery' }
    ],
    correctOptionId: 'a',
    explanationTh: 'เครื่องใช้ไฟฟ้าที่มีโหมดสแตนด์บาย (เช่น ทีวี ไมโครเวฟ ปลั๊กพ่วง แอร์) ยังคงกินไฟแฝง 0.5–5 วัตต์ตลอด 24 ชม. การตัดไฟแฝงช่วยประหยัดเงินได้ ฿80 - ฿150 ต่อเดือน',
    explanationEn: 'Standby appliances leak 0.5–5W continuously. Cutting phantom power saves ฿80–฿150 per month across residential households.',
    tipTh: '💡 ถอดปลั๊กหรือใช้รางปลั๊กที่มีสวิตช์แยกแต่ละเต้ารับ',
    tipEn: '💡 Unplug or use multi-outlets with dedicated rocker switches.'
  },
  {
    id: 'app_q2',
    lessonId: 'appliances',
    questionTh: 'เมื่อเพิ่มเครื่องปรับอากาศในระบบ ทำไมการเลือกจาก "Brand Catalog" (เช่น Daikin, Carrier, Mitsubishi) จึงสะดวกกว่า?',
    questionEn: 'Why is selecting from the Brand Catalog (e.g. Daikin, Carrier, Mitsubishi) beneficial when adding an AC?',
    options: [
      { id: 'a', textTh: 'ระบบจะโหลดกำลังไฟ วัตต์มาตรฐาน ค่า SEER และฉลากประหยัดไฟเบอร์ 5 ให้อัตโนมัติ', textEn: 'It automatically pre-fills wattage, SEER efficiency ratings, and EGAT 5-star label metrics' },
      { id: 'b', textTh: 'จะได้รับเครื่องปรับอากาศฟรีส่งถึงบ้าน', textEn: 'A free physical AC unit will be shipped to your home' },
      { id: 'c', textTh: 'ระบบจะแฮ็กมิเตอร์ไฟฟ้าให้หยุดหมุน', textEn: 'It illegally freezes the physical utility meter' },
      { id: 'd', textTh: 'บังคับให้ต้องเสียบปลั๊กแอร์ทิ้งไว้ตลอด 24 ชั่วโมง', textEn: 'Forces 24/7 continuous AC operation' }
    ],
    correctOptionId: 'a',
    explanationTh: 'แคตตาล็อก 60+ รุ่นใน EduEase รวบรวมสเปกจริงจากแบรนด์ชั้นนำ พร้อมค่าวัตต์และระดับเบอร์ 5 ดาว ทำให้คำนวณค่าไฟได้อย่างแม่นยำ 100%',
    explanationEn: 'EduEase’s 60+ verified catalog presets contain authentic manufacturer wattages, SEER ratings, and EGAT 5-star badges for precise calculations.',
    tipTh: '💡 แอร์เบอร์ 5 3 ดาว ประหยัดไฟกว่ารุ่นธรรมดาถึง 30%',
    tipEn: '💡 3-Star Label 5 AC units save up to 30% more compared to unrated models.'
  },
  {
    id: 'app_q3',
    lessonId: 'appliances',
    questionTh: 'การปรับอุณหภูมิแอร์จาก 24°C เป็น 26°C พร้อมเปิดพัดลมช่วย มีผลอย่างไร?',
    questionEn: 'What is the impact of setting AC temperature to 26°C paired with a circulating fan instead of 24°C?',
    options: [
      { id: 'a', textTh: 'ลดโหลดคอมเพรสเซอร์ทันที 10-15% โดยยังคงรู้สึกเย็นสบายเท่าเดิมจากกระแสลม', textEn: 'Reduces compressor thermal load by 10-15% while wind chill maintains the same comfort level' },
      { id: 'b', textTh: 'ทำให้ค่าไฟเพิ่มขึ้นเป็น 2 เท่า', textEn: 'Doubles the electricity bill' },
      { id: 'c', textTh: 'ทำให้คอมเพรสเซอร์แอร์ระเบิด', textEn: 'Causes the AC compressor to blow up' },
      { id: 'd', textTh: 'ทำให้ความชื้นในห้องเพิ่มขึ้นจนฝนตก', textEn: 'Creates rainfall inside the room' }
    ],
    correctOptionId: 'a',
    explanationTh: 'การเพิ่มอุณหภูมิแอร์ทุก 1°C ช่วยประหยัดไฟ 7–10% การตั้ง 26°C ร่วมกับพัดลมกินไฟเพียง 40W แต่ให้ความรู้สึกเย็นเทียบเท่า 24°C',
    explanationEn: 'Each 1°C increase reduces energy by 7-10%. A 26°C setting assisted by a 40W fan feels just as cool as 24°C while saving significant kWh.',
    tipTh: '💡 ช่วยประหยัดค่าไฟได้เดือนละ ฿150 - ฿300 ต่อเครื่อง',
    tipEn: '💡 Saves roughly ฿150 - ฿300 per month per AC unit.'
  },
  {
    id: 'app_q4',
    lessonId: 'appliances',
    questionTh: 'เครื่องใช้ไฟฟ้าประเภทใดในบ้านที่มักกินไฟสัดส่วนสูงที่สุด (>50% ของบิล)?',
    questionEn: 'Which appliance category typically accounts for the largest share (>50%) of a home electric bill?',
    options: [
      { id: 'a', textTh: 'หลอดไฟ LED อ่านหนังสือ', textEn: 'LED reading lamp' },
      { id: 'b', textTh: 'เครื่องปรับอากาศ (Air Conditioner) และระบบทำความเย็น', textEn: 'Air conditioners and thermal cooling systems' },
      { id: 'c', textTh: 'ที่ชาร์จโทรศัพท์มือถือ', textEn: 'Smartphone charging adapter' },
      { id: 'd', textTh: 'นาฬิกาแขวนผนังใส่ถ่าน', textEn: 'Battery wall clock' }
    ],
    correctOptionId: 'b',
    explanationTh: 'เครื่องปรับอากาศมีคอมเพรสเซอร์กินไฟ 800 - 2,500 วัตต์ คิดเป็น 50-65% ของค่าไฟฟ้าทั้งบ้านในภูมิอากาศเขตร้อนของประเทศไทย',
    explanationEn: 'AC compressors consume 800-2,500W, representing 50-65% of monthly residential utility costs in Thailand’s tropical climate.',
    tipTh: '💡 ล้างแอร์ทุก 6 เดือนช่วยลดการกินไฟได้อีก 10%',
    tipEn: '💡 Cleaning AC air filters every 6 months cuts energy usage by an extra 10%.'
  },

  // ==========================================
  // LESSON 4: BUDGET & TOU TARIFF
  // ==========================================
  {
    id: 'bud_q1',
    lessonId: 'budget',
    questionTh: 'อัตราค่าไฟฟ้าแบบ TOU (Time of Use) ช่วง "Off-Peak" ในวันจันทร์-ศุกร์ เริ่มต้นเวลาใด?',
    questionEn: 'Under the standard TOU (Time of Use) tariff, when does the weekday "Off-Peak" period begin?',
    options: [
      { id: 'a', textTh: '12:00 น. (เที่ยงวัน)', textEn: '12:00 PM (Noon)' },
      { id: 'b', textTh: '22:00 น. ถึง 09:00 น. ของวันรุ่งขึ้น (รวมทั้งวันเสาร์-อาทิตย์)', textEn: '22:00 (10 PM) to 09:00 (9 AM) next day, plus all day Saturday-Sunday' },
      { id: 'c', textTh: '09:00 น. ถึง 22:00 น.', textEn: '09:00 AM to 22:00 PM' },
      { id: 'd', textTh: '18:00 น. ถึง 20:00 น.', textEn: '18:00 PM to 20:00 PM' },
    ],
    correctOptionId: 'b',
    explanationTh: 'ช่วง Off-Peak คือ 22:00 - 09:00 น. ในวันธรรมดา และตลอด 24 ชั่วโมงในวันหยุดเสาร์-อาทิตย์/วันหยุดราชการ ค่าไฟจะถูกลงเหลือประมาณ ~฿2.6/หน่วย เทียบกับ Peak (~฿5.3/หน่วย)',
    explanationEn: 'Off-Peak is 22:00-09:00 on weekdays and all 24 hours on weekends/holidays, dropping the tariff rate from ~฿5.3 down to ~฿2.6/unit.',
    tipTh: '💡 ย้ายการซักผ้า รีดผ้า หรือชาร์จรถ EV มาช่วงหลัง 22:00 น.',
    tipEn: '💡 Shift heavy loads like laundry and EV charging to after 10 PM.'
  },
  {
    id: 'bud_q2',
    lessonId: 'budget',
    questionTh: 'โครงสร้างค่าไฟบ้านทั่วไปประเภทอัตราก้าวหน้า (Progressive Tier) ยิ่งใช้หน่วยไฟมาก อัตราค่าไฟต่อหน่วยจะเป็นอย่างไร?',
    questionEn: 'In progressive tiered residential tariffs, what happens to the per-unit rate as electricity consumption increases?',
    options: [
      { id: 'a', textTh: 'ยิ่งใช้เยอะ อัตราค่าไฟต่อหน่วยยิ่งแพงขึ้นตามขั้นบันได (เช่น 150 หน่วยแรกถูกกว่าหน่วยที่ 400+)', textEn: 'The per-unit rate progressively increases per bracket tier (e.g., first 150 kWh is cheaper than 400+ kWh)' },
      { id: 'b', textTh: 'ยิ่งใช้เยอะ หน่วยไฟยิ่งฟรี', textEn: 'Units become free of charge' },
      { id: 'c', textTh: 'ราคาเท่ากันทุกหน่วยเสมอไม่ว่าจะใช้เท่าไหร่', textEn: 'Always a flat static rate irrespective of volume' },
      { id: 'd', textTh: 'การไฟฟ้าจะจ่ายเงินคืนให้ผู้ใช้ไฟมาก', textEn: 'The utility refunds cash bonuses to high users' }
    ],
    correctOptionId: 'a',
    explanationTh: 'อัตราก้าวหน้าถูกออกแบบมาเพื่อส่งเสริมการประหยัดพลังงาน โดยหน่วยที่สูงขึ้น (เช่น หน่วยที่ 401 เป็นต้นไป) จะมีอัตราต่อหน่วยแพงที่สุด (~฿4.42/หน่วย ไม่รวม Ft)',
    explanationEn: 'Tiered pricing penalizes excessive usage: consumption above 400 kWh is billed at the highest progressive bracket.',
    tipTh: '💡 การคุมไม่ให้หน่วยไฟข้ามขั้นบันไดช่วยเซฟเงินได้เยอะมาก',
    tipEn: '💡 Keeping consumption below higher tier thresholds saves substantial money.'
  },
  {
    id: 'bud_q3',
    lessonId: 'budget',
    questionTh: '"ค่าไฟฟ้าผันแปร (Ft)" ในบิลค่าไฟของประเทศไทย คำนวณจากปัจจัยใดเป็นหลัก?',
    questionEn: 'What primary factor determines the Fuel Adjustment Charge (Ft) in Thai electricity bills?',
    options: [
      { id: 'a', textTh: 'ต้นทุนเชื้อเพลิงผลิตไฟ (เช่น ก๊าซธรรมชาติ LNG), อัตราแลกเปลี่ยน และการซื้อไฟจากเอกชน/เพื่อนบ้าน', textEn: 'Power generation fuel costs (e.g. natural gas/LNG), currency exchange rates, and independent power purchases' },
      { id: 'b', textTh: 'จำนวนต้นไม้ที่ปลูกในชุมชน', textEn: 'Number of trees planted in the neighborhood' },
      { id: 'c', textTh: 'คะแนนการแข่งขันฟุตบอลพรีเมียร์ลีก', textEn: 'Premier League match scores' },
      { id: 'd', textTh: 'ราคาน้ำตาลและกาแฟในตลาดโลก', textEn: 'Global sugar and coffee commodity indices' }
    ],
    correctOptionId: 'a',
    explanationTh: 'ค่า Ft ปรับเปลี่ยนทุก 4 เดือนตามต้นทุนราคาเชื้อเพลิงก๊าซธรรมชาติและอัตราแลกเปลี่ยน โดย กกพ. เป็นผู้กำกับดูแล',
    explanationEn: 'Ft reflects fuel procurement fluctuations (chiefly natural gas and LNG) and exchange rates, reviewed every 4 months by ERC.',
    tipTh: '💡 ในหน้า Budget ของ EduEase สามารถปรับค่า Ft จำลองได้',
    tipEn: '💡 In EduEase’s Budget view, you can simulate different Ft scenarios.'
  },

  // ==========================================
  // LESSON 5: AI COACH & SMART INSIGHTS
  // ==========================================
  {
    id: 'ai_q1',
    lessonId: 'ai',
    questionTh: 'ผู้ช่วยอัจฉริยะ "Voltie AI Coach" ในระบบใช้ข้อมูลใดในการให้คำแนะนำประหยัดพลังงานเฉพาะบุคคล?',
    questionEn: 'What data does "Voltie AI Coach" synthesize to provide personalized energy savings advice?',
    options: [
      { id: 'a', textTh: 'รายการเครื่องใช้ไฟฟ้าที่เปิดอยู่, ประวัติการใช้ไฟ, สถิติอุณหภูมิ, และกรอบงบประมาณของผู้ใช้', textEn: 'Active appliance loads, consumption history, ambient weather, and user budget targets' },
      { id: 'b', textTh: 'สุ่มคำตอบจากอินเทอร์เน็ตโดยไม่ดูข้อมูลในบ้านเลย', textEn: 'Random internet quotes without inspecting home parameters' },
      { id: 'c', textTh: 'ดูเฉพาะยอดเงินในบัญชีธนาคาร', textEn: 'Bank account balance alone' },
      { id: 'd', textTh: 'อ่านดวงชะตาราศีประจำวัน', textEn: 'Daily zodiac horoscope' }
    ],
    correctOptionId: 'a',
    explanationTh: 'Voltie AI ผสานข้อมูลพฤติกรรมการเปิดใช้งาน สภาพอากาศ และอัตราค่าไฟจริง เพื่อวิเคราะห์จุดรั่วไหลและเสนอแผนลดค่าไฟที่ทำได้ทันที',
    explanationEn: 'Voltie AI contextualizes live device wattage, weather heat index, and active tariffs to recommend immediate ROI-driven conservation actions.',
    tipTh: '💡 ลองถาม Voltie: "จะลดค่าไฟแอร์ลง 30% ได้อย่างไร?"',
    tipEn: '💡 Ask Voltie: "How can I cut my AC power bill by 30%?"'
  },
  {
    id: 'ai_q2',
    lessonId: 'ai',
    questionTh: 'ฟีเจอร์ "AI Decision Logs (บันทึกการตัดสินใจของ AI)" มีประโยชน์อย่างไร?',
    questionEn: 'What is the purpose of the "AI Decision Logs" feature in the AI Hub?',
    options: [
      { id: 'a', textTh: 'แสดงเหตุผล สูตรอ้างอิง และระดับความเชื่อมั่น (Confidence Score) ของ AI อย่างโปร่งใส 100%', textEn: 'Reveals mathematical formulas, reasoning chains, and AI confidence scores with 100% transparency' },
      { id: 'b', textTh: 'เอาไว้เล่นเกมทายคำศัพท์ลับ', textEn: 'For playing secret word guessing games' },
      { id: 'c', textTh: 'ลบประวัติค่าไฟของเดือนที่แล้วทิ้ง', textEn: 'Erases last month’s billing history' },
      { id: 'd', textTh: 'ส่งสแปมโฆษณาไปที่โทรศัพท์มือถือ', textEn: 'Sends mobile advertising spam' }
    ],
    correctOptionId: 'a',
    explanationTh: 'Decision Logs ช่วยให้วิศวกรและผู้ใช้สามารถตรวจสอบความถูกต้องของข้อเสนอแนะ AI ได้ว่าใช้สมการใด มีหลักวิชาการรองรับหรือไม่',
    explanationEn: 'Decision Logs allow engineers and users to audit AI reasoning, underlying formulas, and verify mathematical accuracy.',
    tipTh: '💡 ตอบโจทย์หลักการ Responsible & Explainable AI',
    tipEn: '💡 Adheres strictly to Explainable & Responsible AI principles.'
  },
  {
    id: 'ai_q3',
    lessonId: 'ai',
    questionTh: 'เมื่อเกิด "ความผิดปกติของโหลดไฟฟ้า (Energy Anomaly)" AI จะแจ้งเตือนอย่างไร?',
    questionEn: 'How does the AI notify users upon detecting an "Energy Anomaly"?',
    options: [
      { id: 'a', textTh: 'แสดงแถบแจ้งเตือนไฮไลต์สีส้ม/แดง พร้อมระบุอุปกรณ์ที่กินไฟผิดปกติ เช่น ลืมปิดแอร์ทิ้งไว้', textEn: 'Displays an alert banner highlighting anomalous appliances, such as AC left on unattended' },
      { id: 'b', textTh: 'ส่งเสียงไซเรนแจ้งตำรวจมาที่บ้าน', textEn: 'Dispatches police sirens to the residence' },
      { id: 'c', textTh: 'สั่งให้คอมพิวเตอร์ดับเครื่องทันที', textEn: 'Immediately crashes the user’s computer' },
      { id: 'd', textTh: 'ไม่แจ้งเตือนใดๆ และปล่อยให้ค่าไฟพุ่งขึ้นไปเรื่อยๆ', textEn: 'Silently ignores it and allows bills to skyrocket' }
    ],
    correctOptionId: 'a',
    explanationTh: 'ระบบตรวจจับ Anomaly จะเปรียบเทียบการกินไฟกับค่าเฉลี่ยปกติ หากพบการเปิดเครื่องแช่ทิ้งไว้ช่วงไม่อยู่บ้าน จะแจ้งเตือนพร้อมปุ่ม 1-Click Turn Off ทันที',
    explanationEn: 'The anomaly detector benchmarks consumption against historical baselines, triggering timely warnings with 1-click turn-off options.',
    tipTh: '💡 ช่วยป้องกันปัญหาลืมปิดเตารีดหรือแอร์ขณะออกจากบ้าน',
    tipEn: '💡 Prevents costly mishaps like leaving irons or AC units running.'
  },

  // ==========================================
  // LESSON 6: ECO QUESTS & LESSONS
  // ==========================================
  {
    id: 'qst_q1',
    lessonId: 'quests',
    questionTh: 'การทำภารกิจรายวัน "Eco Quests" สำเร็จ จะได้รับสิ่งใดเป็นรางวัล?',
    questionEn: 'What rewards are unlocked upon completing daily "Eco Quests"?',
    options: [
      { id: 'a', textTh: 'แต้มประสบการณ์ XP, แสตมป์พาสปอร์ตพลังงาน และพัฒนาการเจริญเติบโตของต้นไม้ Energy Tree', textEn: 'XP points, Energy Passport stamps, and Energy Tree growth evolution' },
      { id: 'b', textTh: 'คูปองซื้อสินค้าลดราคาที่ไม่เกี่ยวกับพลังงาน', textEn: 'Unrelated promotional discount coupons' },
      { id: 'c', textTh: 'ตั๋วเครื่องบินไปดวงจันทร์', textEn: 'A flight ticket to the moon' },
      { id: 'd', textTh: 'เพิ่มค่าไฟให้แพงขึ้น 10 เท่า', textEn: 'A 10x electricity bill surge' }
    ],
    correctOptionId: 'a',
    explanationTh: 'การทำเควส เช่น "ปิดไฟสแตนด์บายครบ 7 วัน" ช่วยสร้างนิสัยประหยัดพลังงานจริง พร้อมรับ XP แสตมป์ และเลเวลอัปสถานะโปรไฟล์',
    explanationEn: 'Completing quests instills durable conservation habits while awarding XP, verified passport stamps, and leveling up your user status.',
    tipTh: '💡 ตรวจสอบเควสประจำวันได้ทุกเช้าในหน้า Eco Quests',
    tipEn: '💡 Check daily refreshed quests in the Quests hub every morning.'
  },
  {
    id: 'qst_q2',
    lessonId: 'quests',
    questionTh: 'วิวัฒนาการของ "ต้นไม้พลังงาน (Energy Tree)" สัมพันธ์กับพฤติกรรมใดของผู้ใช้?',
    questionEn: 'What user behavior drives the evolution of the "Energy Tree"?',
    options: [
      { id: 'a', textTh: 'ปริมาณหน่วยไฟฟ้า (kWh) และคาร์บอน (kgCO2) ที่ประหยัดได้จริง ยิ่งประหยัด ต้นไม้ยิ่งเติบใหญ่', textEn: 'Verified kilowatt-hours (kWh) and carbon (kgCO2) saved; the more saved, the larger the tree blooms' },
      { id: 'b', textTh: 'จำนวนครั้งที่คลิกเมาส์รัวๆ โดยไม่ประหยัดไฟ', textEn: 'Spamming mouse clicks without saving power' },
      { id: 'c', textTh: 'การเปิดไฟสว่างทิ้งไว้ทั้งคืน', textEn: 'Leaving all lights running overnight' },
      { id: 'd', textTh: 'ต้นไม้โตขึ้นเองตามเวลาโดยไม่ขึ้นกับพฤติกรรมใดๆ', textEn: 'Grows automatically regardless of energy habits' }
    ],
    correctOptionId: 'a',
    explanationTh: 'Energy Tree เป็นตัวแทนเชิงสัญลักษณ์ของสิ่งแวดล้อม โดยจะเติบโตจากเมล็ดกลายเป็นต้นกล้า พุ่มไม้ จนถึงโอ๊กยักษ์ตามจำนวนคาร์บอนที่ลดได้จริง',
    explanationEn: 'The Energy Tree visually mirrors environmental impact, growing from sprout to mighty oak as your verified carbon avoidance expands.',
    tipTh: '💡 ต้นไม้ระดับ Master จะช่วยดูดซับคาร์บอนเสมือนจริงกว่า 200 kgCO2e',
    tipEn: '💡 A Master Energy Tree represents over 200 kgCO2e in virtual carbon abatement.'
  },
  {
    id: 'qst_q3',
    lessonId: 'quests',
    questionTh: 'ในระบบ "Energy Passport (พาสปอร์ตพลังงาน)" มีแสตมป์รับรองอะไรบ้าง?',
    questionEn: 'What stamps are recognized within the "Energy Passport" module?',
    options: [
      { id: 'a', textTh: 'แสตมป์ทักษะรับรอง เช่น AC Specialist, TOU Master, Standby Zero, และ Solar Pioneer', textEn: 'Accredited skill stamps like AC Specialist, TOU Master, Standby Zero, and Solar Pioneer' },
      { id: 'b', textTh: 'แสตมป์วีซ่าเดินทางไปต่างประเทศจริง', textEn: 'Actual international border tourist visa stamps' },
      { id: 'c', textTh: 'ตราประทับไปรษณีย์ส่งจดหมายกระดาษ', textEn: 'Postal paper mailing stamps' },
      { id: 'd', textTh: 'สติกเกอร์การ์ตูนที่ไม่มีข้อมูลสถิติรองรับ', textEn: 'Generic cartoon stickers without statistics' }
    ],
    correctOptionId: 'a',
    explanationTh: 'พาสปอร์ตพลังงานเก็บรวบรวมแสตมป์แสดงความสามารถจริงด้านประสิทธิภาพพลังงาน สามารถแชร์หรือแสดงเป็นหลักฐานทักษะได้',
    explanationEn: 'The Energy Passport curates verified competency stamps demonstrating real-world energy efficiency mastery.',
    tipTh: '💡 สะสมครบทุกแสตมป์เพื่อปลดล็อกฉายา "Grandmaster Saver"',
    tipEn: '💡 Collect all stamps to claim the "Grandmaster Saver" title.'
  },

  // ==========================================
  // LESSON 7: MY LOCATIONS & METERS
  // ==========================================
  {
    id: 'loc_q1',
    lessonId: 'locations',
    questionTh: 'ระบบรองรับการจัดการสถานที่แบบใดบ้าง (Multi-Location Management)?',
    questionEn: 'What types of environments are supported in Multi-Location Management?',
    options: [
      { id: 'a', textTh: 'บ้านเดี่ยว (Home Base), หอพักนักศึกษา (Dorm 402), และร้านค้า/คาเฟ่ (Green Cafe)', textEn: 'Single homes (Home Base), student dorms (Dorm 402), and retail shops (Green Cafe)' },
      { id: 'b', textTh: 'รองรับเฉพาะสถานีอวกาศนานาชาติเท่านั้น', textEn: 'Only international space stations' },
      { id: 'c', textTh: 'รองรับได้เพียง 1 เครื่องต่อคอมพิวเตอร์ 1 ตัว และไม่สามารถสลับได้', textEn: 'Strictly 1 single premises per computer, unchangeable' },
      { id: 'd', textTh: 'รองรับเฉพาะตู้โทรศัพท์สาธารณะ', textEn: 'Only public telephone booths' }
    ],
    correctOptionId: 'a',
    explanationTh: 'EduEase อนุญาตให้จัดการหลายสถานที่ภายใต้บัญชีเดียว แต่ละสถานที่มีอัตราค่าไฟ งบประมาณ และมิเตอร์เฉพาะตัว',
    explanationEn: 'EduEase allows users to oversee multiple premises under a single account, each with tailored tariffs, budgets, and smart meters.',
    tipTh: '💡 สลับดูสถานที่ได้อย่างรวดเร็วที่ HeaderBar มุมซ้ายบน',
    tipEn: '💡 Fast-switch locations using the top-left HeaderBar dropdown.'
  },
  {
    id: 'loc_q2',
    lessonId: 'locations',
    questionTh: 'ทำไมผู้พักอาศัยใน "หอพักนักศึกษา" จึงมักเสียค่าไฟแพงกว่าบ้านทั่วไป?',
    questionEn: 'Why do residents in "Student Dorms" frequently pay higher electricity rates than standard homes?',
    options: [
      { id: 'a', textTh: 'หอพักเอกชนมักคิดค่าไฟอัตราเหมาต่อหน่วย (Flat Rate เช่น ฿7 - ฿9/หน่วย) ซึ่งรวมค่าไฟส่วนกลาง', textEn: 'Private dorms often charge flat rates (e.g. ฿7-฿9/unit) factoring in shared facility costs' },
      { id: 'b', textTh: 'กระแสไฟฟ้าในหอพักวิ่งเร็วกว่าไฟบ้าน 10 เท่า', textEn: 'Electricity flows 10x faster in dorms' },
      { id: 'c', textTh: 'นักศึกษาใช้สายไฟที่ทำจากทองคำแท้', textEn: 'Students use pure solid gold wiring' },
      { id: 'd', textTh: 'การไฟฟ้าคิดค่าธรรมเนียมพิเศษสำหรับคนอายุต่ำกว่า 25 ปี', textEn: 'Utility levies a surcharge on youth under 25' }
    ],
    correctOptionId: 'a',
    explanationTh: 'ในหอพัก ผู้เช่ามักจ่ายค่าไฟแบบเหมา ฿7 - ฿9/หน่วย การตั้งค่าโปรไฟล์เป็น Dorm ในระบบช่วยจำลองค่าใช้จ่ายจริงได้อย่างแม่นยำ',
    explanationEn: 'Dorms often levy commercial flat rates of ฿7–฿9/unit. Selecting the Dorm preset helps accurately reflect real monthly out-of-pocket costs.',
    tipTh: '💡 ปรับหน่วยราคาต่อหน่วยได้ในเมนูตั้งค่าสถานที่',
    tipEn: '💡 Adjust custom unit pricing in the Location Settings modal.'
  },
  {
    id: 'loc_q3',
    lessonId: 'locations',
    questionTh: 'ประโยชน์ของการเพิ่มสถานที่แยกกันในระบบคืออะไร?',
    questionEn: 'What is the key benefit of segregating premises into distinct locations?',
    options: [
      { id: 'a', textTh: 'แยกการวิเคราะห์บิล งบประมาณ และเครื่องใช้ไฟฟ้าของแต่ละแห่งออกจากกันอย่างเป็นระเบียบ', textEn: 'Isolates utility bill analyses, budgets, and appliance inventories neatly per site' },
      { id: 'b', textTh: 'ทำให้สามารถขโมยไฟฟ้าจากสถานที่อื่นได้', textEn: 'Allows siphoning power from adjacent sites' },
      { id: 'c', textTh: 'เพิ่มความเร็วสัญญาณ Wi-Fi ของบ้าน', textEn: 'Increases home Wi-Fi signal speed' },
      { id: 'd', textTh: 'ทำให้ไม่ต้องจ่ายค่าไฟเลยแม้แต่บาทเดียว', textEn: 'Exempts all locations from paying bills entirely' }
    ],
    correctOptionId: 'a',
    explanationTh: 'การแยกสถานที่ไม่ทำให้ข้อมูลปะปนกัน เช่น ค่าไฟร้านกาแฟจะไม่ไปรวมกับค่าไฟบ้านพัก ทำให้คุมงบประมาณของแต่ละแห่งได้แม่นยำ',
    explanationEn: 'Site segregation prevents data contamination, ensuring commercial cafe overhead is tracked independently of home living costs.',
    tipTh: '💡 กำหนดวงเงินงบประมาณเฉพาะของแต่ละสถานที่ได้',
    tipEn: '💡 Set dedicated budget caps for each respective premise.'
  },

  // ==========================================
  // LESSON 8: SAVING SCORE 5-DIMENSIONS
  // ==========================================
  {
    id: 'scr_q1',
    lessonId: 'score',
    questionTh: 'ดัชนีคะแนนประหยัดพลังงาน (Energy Saving Score) คำนวณจากกี่มิติหลัก?',
    questionEn: 'Across how many core dimensions is the Energy Saving Score calculated?',
    options: [
      { id: 'a', textTh: '5 มิติ (ประสิทธิภาพอุปกรณ์, การตัดไฟแฝง, การคุมงบประมาณ, การเลี่ยงชั่วโมงพีค, และพฤติกรรม)', textEn: '5 Dimensions (Appliance efficiency, Standby discipline, Budget control, Peak avoidance, and Habits)' },
      { id: 'b', textTh: '1 มิติ (ดูจากจำนวนเงินในกระเป๋าเท่านั้น)', textEn: '1 Dimension (Wallet cash only)' },
      { id: 'c', textTh: '20 มิติ (คำนวณจากดาวเคราะห์ในระบบสุริยะ)', textEn: '20 Dimensions (Planetary alignments)' },
      { id: 'd', textTh: 'ไม่ใช้สูตรคำนวณใดๆ เป็นการสุ่มตัวเลข', textEn: 'Pure random number generation' }
    ],
    correctOptionId: 'a',
    explanationTh: 'คะแนน 100 แต้มแบ่งตามมาตรฐานสากล: Efficiency (25), Standby (20), Budget (25), Peak Avoidance (15), และ Habits/Quests (15)',
    explanationEn: 'The 100-point index balances Efficiency (25), Standby (20), Budget (25), Peak Avoidance (15), and Habits/Quests (15).',
    tipTh: '💡 แต่ละมิติจะชี้ชัดว่าบ้านของคุณควรปรับปรุงจุดใดเป็นพิเศษ',
    tipEn: '💡 Each dimension pinpoints specific areas for high-impact improvement.'
  },
  {
    id: 'scr_q2',
    lessonId: 'score',
    questionTh: 'หากต้องการดันคะแนนประหยัดไฟให้แตะเกรด A+ (>90 คะแนน) ควรทำสิ่งใดเป็นอันดับแรก?',
    questionEn: 'To elevate your Energy Saving Score to Grade A+ (>90 points), which action should you take first?',
    options: [
      { id: 'a', textTh: 'ปฏิบัติตามคำแนะนำที่มีผลกระทบสูง เช่น เปิดแอร์ 26°C, ตัดไฟสแตนด์บาย 0W, และคุมไม่ให้เกินงบ', textEn: 'Follow high-impact suggestions: set AC to 26°C, cut standby power to 0W, and keep inside budget' },
      { id: 'b', textTh: 'ทุบมิเตอร์ไฟฟ้าทิ้งเพื่อไม่ให้หมุน', textEn: 'Smash the electric meter physically' },
      { id: 'c', textTh: 'เปิดไฟทุกดวงตลอด 24 ชั่วโมง', textEn: 'Leave all lights illuminated 24/7' },
      { id: 'd', textTh: 'หยุดจ่ายค่าไฟเป็นเวลา 6 เดือน', textEn: 'Withhold bill payments for 6 months' }
    ],
    correctOptionId: 'a',
    explanationTh: 'การปิดอุปกรณ์ที่ไม่ใช้งาน ตัดไฟแฝง และตั้งอุณหภูมิแอร์อย่างเหมาะสม สามารถเพิ่มคะแนนได้ทันที 10–15 แต้ม และช่วยลดบิลจริง',
    explanationEn: 'Turning off unneeded devices, cutting vampire standby, and optimizing AC thermostats raises scores by 10-15 points while lowering real bills.',
    tipTh: '💡 สังเกตปุ่ม Action Suggestions ในหน้าคะแนน',
    tipEn: '💡 Notice interactive Action Suggestions in the Score breakdown.'
  },
  {
    id: 'scr_q3',
    lessonId: 'score',
    questionTh: 'การได้คะแนนเกรด A+ (>90 แต้ม) มอบผลประโยชน์ใดในระบบ?',
    questionEn: 'What benefits are unlocked upon achieving Grade A+ (>90 points)?',
    options: [
      { id: 'a', textTh: 'ปลดล็อกเหรียญตราเกียรติยศ Gold Eco Master Badge พร้อมสิทธิ์เลื่อนระดับสู่ Grandmaster Fellow', textEn: 'Unlocks the Gold Eco Master Badge and qualifies you for Grandmaster Fellow advancement' },
      { id: 'b', textTh: 'ระบบจะส่งของขวัญตู้เย็นใหม่มาให้ 5 หลัง', textEn: 'Ships 5 brand new refrigerators to your door' },
      { id: 'c', textTh: 'ลบรหัสผ่านบัญชีของผู้ใช้ออกทั้งหมด', textEn: 'Erases all user credentials' },
      { id: 'd', textTh: 'ไม่มีอะไรเกิดขึ้นเลย', textEn: 'Nothing happens at all' }
    ],
    correctOptionId: 'a',
    explanationTh: 'ระดับ Grade A+ เป็นเกณฑ์สูงสุดที่ยืนยันว่าผู้ใช้มีความเป็นเลิศด้าน Energy Literacy ตามกรอบมาตรฐานวิชาชีพสากล',
    explanationEn: 'Grade A+ represents the pinnacle of residential energy stewardship, qualifying users for accredited certification milestones.',
    tipTh: '💡 นำคะแนนไปอ้างอิงในรายงานเพื่อการส่งเสริม ESG ได้',
    tipEn: '💡 High scores can be cited in ESG personal portfolios.'
  },

  // ==========================================
  // LESSON 9: TRUST CENTER & PDF EXPORT
  // ==========================================
  {
    id: 'tru_q1',
    lessonId: 'trust',
    questionTh: 'คีย์ลัดสำหรับเปิดหน้าต่างค้นหาครอบจักรวาล (Global Search) อย่างรวดเร็วคืออะไร?',
    questionEn: 'What is the keyboard shortcut to swiftly open Global Search from anywhere?',
    options: [
      { id: 'a', textTh: 'Cmd + K (บน Mac) หรือ Ctrl + K (บน Windows)', textEn: 'Cmd + K (on Mac) or Ctrl + K (on Windows)' },
      { id: 'b', textTh: 'กดปุ่ม Spacebar ค้างไว้ 10 นาที', textEn: 'Holding Spacebar for 10 minutes' },
      { id: 'c', textTh: 'กดปุ่ม F4 รัวๆ 50 ครั้ง', textEn: 'Pressing F4 fifty times rapidly' },
      { id: 'd', textTh: 'คลิกขวาแล้วกดปิดหน้าต่าง', textEn: 'Right-clicking to close the window' }
    ],
    correctOptionId: 'a',
    explanationTh: 'คีย์ลัด Cmd+K / Ctrl+K ช่วยให้ค้นหาเครื่องใช้ไฟฟ้า คำศัพท์ หรือบทเรียน และกระโดดไปยังหน้าเป้าหมายได้ใน 1 วินาที',
    explanationEn: 'Cmd+K / Ctrl+K opens the global command palette instantly, searching across appliances, lessons, and terminology.',
    tipTh: '💡 มีปุ่มค้นหาบน HeaderBar เช่นกันหากไม่ได้ใช้คีย์บอร์ด',
    tipEn: '💡 A search button is also prominently placed on the HeaderBar.'
  },
  {
    id: 'tru_q2',
    lessonId: 'trust',
    questionTh: 'รายงานค่าไฟฟ้าที่ส่งออกเป็น "PDF Report" ประกอบด้วยข้อมูลสำคัญใดบ้าง?',
    questionEn: 'What vital sections are included in the generated official PDF Report?',
    options: [
      { id: 'a', textTh: 'สรุปยอดเงินค่าไฟรวม, กราฟสัดส่วนโหลดเครื่องใช้ไฟฟ้า, ดัชนี ESG Score, และคำแนะนำส่วนบุคคล', textEn: 'Executive summary, appliance load breakdown charts, ESG score index, and tailored recommendations' },
      { id: 'b', textTh: 'รวมรูปภาพมีมการ์ตูนตลก', textEn: 'A compilation of humorous internet memes' },
      { id: 'c', textTh: 'ประวัติการแชทส่วนตัวของผู้ใช้', textEn: 'Private chat logs' },
      { id: 'd', textTh: 'หน้ากระดาษเปล่าสีขาวไม่มีข้อความใดๆ', textEn: 'Completely blank white pages' }
    ],
    correctOptionId: 'a',
    explanationTh: 'รายงาน PDF ออกแบบตามมาตรฐานวิศวกรรมพลังงาน สามารถนำไปใช้แนบรายงานผู้บริหาร หรือใช้วางแผนการเงินในครอบครัวได้จริง',
    explanationEn: 'The generated PDF conforms to professional energy audit formats, suitable for enterprise reporting or household financial planning.',
    tipTh: '💡 กดดาวน์โหลดได้จากหน้า Analytics & Insights หรือ Trust Center',
    tipEn: '💡 Click "Export PDF" from Analytics & Insights or Trust Center.'
  },
  {
    id: 'tru_q3',
    lessonId: 'trust',
    questionTh: 'ข้อมูลสูตรคำนวณในศูนย์ความโปร่งใส (Trust Center) อ้างอิงจากหน่วยงานใด?',
    questionEn: 'Which authorities govern the calculation formulas cited in the Trust Center?',
    options: [
      { id: 'a', textTh: 'การไฟฟ้านครหลวง (MEA), การไฟฟ้าส่วนภูมิภาค (PEA) และสำนักงาน กกพ.', textEn: 'Metropolitan Electricity Authority (MEA), Provincial Electricity Authority (PEA), and ERC regulations' },
      { id: 'b', textTh: 'บริษัทขายของเล่นออนไลน์', textEn: 'An online toy merchant' },
      { id: 'c', textTh: 'สำนักพิมพ์นิยายวิทยาศาสตร์', textEn: 'A sci-fi fiction publishing house' },
      { id: 'd', textTh: 'ไม่มีการอ้างอิง คิดสูตรขึ้นมาเองทั้งหมด', textEn: 'Unreferenced fictitious formulas' }
    ],
    correctOptionId: 'a',
    explanationTh: 'EduEase ยึดมั่นในความโปร่งใส 100% โดยทุกสูตรขั้นบันได อัตราค่าบริการรายเดือน และสูตร Ft สอดคล้องกับประกาศทางการของการไฟฟ้าไทย',
    explanationEn: 'EduEase maintains 100% mathematical integrity; all tier thresholds, fixed base fees, and fuel adjustment formulas strictly align with official Thai utility gazettes.',
    tipTh: '💡 สามารถตรวจสอบสูตรทางคณิตศาสตร์แบบเปิดเผยได้ทุกเมื่อ',
    tipEn: '💡 Review exact open mathematical equations anytime in the Trust Center.'
  }
];

/**
 * Helper to pick exactly 3 random questions for a given lessonId,
 * with options shuffled for variety.
 */
export function getRandomQuizQuestions(lessonId: string, count: number = 3): QuizQuestion[] {
  const pool = MANUAL_QUIZ_POOL.filter(q => q.lessonId === lessonId);
  if (pool.length === 0) {
    return [];
  }

  // Shuffle pool (Fisher-Yates)
  const shuffled = [...pool];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // Slice count
  const selected = shuffled.slice(0, Math.min(count, shuffled.length));

  // Shuffle options for each question
  return selected.map(q => {
    const shuffledOptions = [...q.options];
    for (let i = shuffledOptions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledOptions[i], shuffledOptions[j]] = [shuffledOptions[j], shuffledOptions[i]];
    }
    return {
      ...q,
      options: shuffledOptions
    };
  });
}
