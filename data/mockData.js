// data/mockData.js

// ข้อมูลสินค้า (เพิ่มได้ไม่จำกัด)
export const products = [
  // --- สินค้าเดิม ---
  {
    id: 1,
    name: "ชุดควบคุมไฟฟ้าอุตสาหกรรม",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=500",
    category: "ไฟฟ้า",
    detail: "ตู้คอนโทรลระบบไฟฟ้า 3 เฟส สำหรับโรงงาน...",
  },
  // --- เพิ่มสินค้าหมวด การแพทย์ (Medical) ---
  {
    id: 101,
    name: "เครื่องวัดสัญญาณชีพผู้ป่วย",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0833860?w=500",
    category: "การแพทย์",
    detail: "Monitor ติดตามสัญญาณชีพ ความแม่นยำสูง...",
  },
  {
    id: 102,
    name: "เตียงผู้ป่วยไฟฟ้า 3 ไกร์",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=500",
    category: "การแพทย์",
    detail: "ปรับระดับด้วยรีโมทคอนโทรล ราวกั้นสไลด์...",
  },
  {
    id: 103,
    name: "เครื่องช่วยหายใจ Transport",
    image: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=500",
    category: "การแพทย์",
    detail: "ขนาดพกพา สำหรับเคลื่อนย้ายผู้ป่วย...",
  },
  {
    id: 104,
    name: "ชุดผ่าตัดความละเอียดสูง",
    image: "https://images.unsplash.com/photo-1583912268183-52487a661c96?w=500",
    category: "การแพทย์",
    detail: "เครื่องมือสแตนเลสเกรดการแพทย์มาตรฐานเยอรมัน...",
  },

  // --- เพิ่มสินค้าหมวด ไฟฟ้า (Electrical) ---
  {
    id: 201,
    name: "หม้อแปลงไฟฟ้า Dry Type",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=500",
    category: "ไฟฟ้า",
    detail: "ระบายความร้อนด้วยอากาศ ปลอดภัยสูง...",
  },
  {
    id: 202,
    name: "เบรกเกอร์ MCCB 400A",
    image: "https://images.unsplash.com/photo-1555731906-7d9f5e9414f1?w=500",
    category: "ไฟฟ้า",
    detail: "อุปกรณ์ตัดตอนอัตโนมัติ ทนกระแสลัดวงจรสูง...",
  },
  {
    id: 203,
    name: "สายไฟ THW 50 sq.mm.",
    image: "https://images.unsplash.com/photo-1544724569-5f546fd6dd2d?w=500",
    category: "ไฟฟ้า",
    detail: "สายทองแดงแท้ นำกระแสดี ฉนวน PVC...",
  },
  {
    id: 204,
    name: "ตู้ Switchboard MDB",
    image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=500",
    category: "ไฟฟ้า",
    detail: "ตู้เมนไฟฟ้าหลัก ออกแบบตามมาตรฐานวิศวกรรม...",
  },
  // ... สินค้าอื่นๆ
];

// ข้อมูลข่าวสาร (เรียงตามวันที่)
export const news = [
  {
    id: 1,
    title: "ร่วมสนับสนุกการแข่งขันกีฬาเยาวชนและประชาชน",
    date: "2024-03-25", // format: YYYY-MM-DD เพื่อให้ sorting ทำงานง่าย
    displayDate: "25 มี.ค. 2567",
    image: "/images/new1.jpg",
    excerpt: "สนับสนุนกิจกรรมเยาวชน และสร้างสัมพันธ์กับชุมชนอย่างต่อเนื่อง มุ่งเน้นการสร้างความสามัคคี...",
    content: "เนื้อหาข่าวฉบับเต็ม....",
    category: "กิจกรรมเพื่อสังคม"
  },
  {
    id: 2,
    title: "กิจกรรมประกวดราคาอิเล็กทรอนิกส์ (e-bidding)",
    date: "2025-05-30",
    displayDate: "30 พ.ค. 2568",
    image: "/images/new2.jpg",
    excerpt: "ดำเนินการจัดซื้อจัดจ้างด้วยระบบอิเล็กทรอนิกส์ โปร่งใส ตรวจสอบได้ ตามนโยบายภาครัฐ...",
    content: "เนื้อหาข่าวฉบับเต็ม....",
    category: "ประกาศ"
  },
  {
    id: 3,
    title: "สนับสนุนทีมปิงปองหงส์ขาว",
    date: "2025-11-05",
    displayDate: "5 พ.ย. 2568",
    image: "/images/new3.jpg",
    excerpt: "ร่วมส่งเสริมสุขภาพและกีฬาให้กับเยาวชนในพื้นที่ สนับสนุนอุปกรณ์กีฬาและชุดแข่งขัน...",
    content: "เนื้อหาข่าวฉบับเต็ม....",
    category: "CSR"
  },
  {
    id: 4,
    title: "เปิดตัวสินค้านวัตกรรมใหม่ปี 2026",
    date: "2025-12-01",
    displayDate: "1 ธ.ค. 2568",
    image: "https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?w=500",
    excerpt: "A.R.T เตรียมเปิดตัวหุ่นยนต์บริการรุ่นใหม่ล่าสุด ตอบโจทย์ Smart City...",
    content: "เนื้อหาข่าวฉบับเต็ม....",
    category: "เทคโนโลยี"
  }
];