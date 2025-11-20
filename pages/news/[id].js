import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { 
  ChevronLeft, 
  Calendar, 
  Clock, 
  Share2, 
  Facebook, 
  Twitter, 
  Link as LinkIcon,
  Tag,
  ChevronRight
} from "lucide-react";
import { news } from "../../data/mockData"; // อย่าลืมตรวจสอบ path ให้ถูกต้อง

export default function NewsDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [newsItem, setNewsItem] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (router.isReady) {
      // 1. หาข่าวที่ตรงกับ ID
      const foundNews = news.find((n) => n.id.toString() === id);
      
      if (foundNews) {
        setNewsItem(foundNews);
        
        // 2. หาข่าวที่เกี่ยวข้อง
        const others = news
          .filter((n) => n.id.toString() !== id)
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);
        setRelatedNews(others);
      }
      
      setLoading(false);
    }
  }, [router.isReady, id]);

  // กรณีโหลดข้อมูล หรือ ไม่พบข่าว
  if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-50 text-emerald-600">Loading...</div>;
  if (!newsItem) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 gap-4">
      <h1 className="text-2xl font-bold text-slate-800">ไม่พบเนื้อหาข่าวที่คุณต้องการ</h1>
      <Link href="/news" className="px-6 py-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition">
        กลับหน้ารวมข่าวสาร
      </Link>
    </div>
  );

  return (
    <>
      <Head>
        <title>{newsItem.title} - A.R.T EXPONENTIAL</title>
        <meta name="description" content={newsItem.excerpt} />
      </Head>

      <div className="min-h-screen bg-slate-50">
        
        {/* Navbar แบบย่อ */}
        <nav className="bg-white shadow-sm sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/news" className="flex items-center text-slate-600 hover:text-emerald-600 transition-colors font-semibold group">
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center mr-2 group-hover:bg-emerald-100 transition-colors">
                 <ChevronLeft size={18} /> 
              </div>
              กลับหน้ารวมข่าวสาร
            </Link>
            
            {/* ปุ่มแชร์ */}
            <button className="text-slate-400 hover:text-emerald-600 transition-colors">
               <Share2 size={20} />
            </button>
          </div>
        </nav>

        {/* Main Content Layout */}
        <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
          <div className="grid lg:grid-cols-12 gap-12">
            
            {/* Column ซ้าย: เนื้อหาข่าว */}
            <div className="lg:col-span-8">
              <article className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                
                {/* รูปปกขนาดใหญ่ */}
                <div className="aspect-video w-full relative">
                  <img 
                    src={newsItem.image} 
                    alt={newsItem.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                     <span className="px-4 py-1.5 bg-emerald-600 text-white text-sm font-bold rounded-full shadow-lg">
                       {newsItem.category}
                     </span>
                  </div>
                </div>

                <div className="p-6 md:p-10">
                  {/* Meta Data */}
                  <div className="flex flex-wrap items-center gap-4 text-slate-500 text-sm mb-6 border-b border-slate-100 pb-6">
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-2 text-emerald-500" />
                      {newsItem.displayDate || newsItem.date}
                    </div>
                    <div className="flex items-center">
                      <Clock size={16} className="mr-2 text-emerald-500" />
                      เวลาอ่าน 3 นาที
                    </div>
                    <div className="flex items-center">
                       <Tag size={16} className="mr-2 text-emerald-500" />
                       Pr News
                    </div>
                  </div>

                  {/* Title */}
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-8 leading-tight">
                    {newsItem.title}
                  </h1>

                  {/* Content Body */}
                  <div className="prose prose-lg prose-slate max-w-none text-slate-700 leading-relaxed">
                    <p className="font-semibold text-xl text-slate-900 mb-6">
                      {newsItem.excerpt}
                    </p>
                    
                    {/* จำลองเนื้อหาข่าว */}
                    <p className="mb-6">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <p className="mb-6">
                      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                    
                    <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4">
                      จุดมุ่งหมายสำคัญของโครงการ
                    </h3>
                    <ul className="list-disc pl-6 space-y-2 mb-8">
                       <li>ส่งเสริมการพัฒนาเทคโนโลยีที่ยั่งยืน</li>
                       <li>ยกระดับคุณภาพชีวิตของชุมชนผ่านนวัตกรรม</li>
                       <li>สร้างเครือข่ายความร่วมมือระหว่างภาครัฐและเอกชน</li>
                    </ul>

                    <div className="my-8 p-6 bg-emerald-50 border-l-4 border-emerald-500 rounded-r-xl italic text-emerald-800">
                       "ความสำเร็จไม่ได้วัดที่เทคโนโลยีที่ล้ำสมัยที่สุด แต่วัดที่ประโยชน์ที่ผู้คนได้รับจากเทคโนโลยีนั้นจริง"
                    </div>

                    <p>
                       ทางบริษัท A.R.T EXPONENTIAL มุ่งมั่นที่จะสานต่อเจตนารมณ์นี้ต่อไป เพื่ออนาคตที่ดียิ่งขึ้น หากท่านสนใจข้อมูลเพิ่มเติม สามารถติดต่อสอบถามได้ที่ฝ่ายประชาสัมพันธ์ของเรา
                    </p>
                  </div>

                  {/* Share Footer */}
                  <div className="mt-12 pt-8 border-t border-slate-100">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                       <span className="font-bold text-slate-900">แชร์ข่าวนึ้:</span>
                       <div className="flex gap-3">
                          <button className="w-10 h-10 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:opacity-90 transition">
                             <Facebook size={20} />
                          </button>
                          <button className="w-10 h-10 rounded-full bg-[#1DA1F2] text-white flex items-center justify-center hover:opacity-90 transition">
                             <Twitter size={20} />
                          </button>
                          <button className="w-10 h-10 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center hover:bg-slate-300 transition">
                             <LinkIcon size={20} />
                          </button>
                       </div>
                    </div>
                  </div>

                </div>
              </article>
            </div>

            {/* Column ขวา: Sidebar (4 ส่วน) */}
            <div className="lg:col-span-4 space-y-8">
              
              {/* Widget 1: เกี่ยวกับเราย่อๆ (แก้ไข: เปลี่ยนจรวดเป็น Logo) */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 text-center">
                  <div className="w-24 h-24 mx-auto bg-white rounded-2xl flex items-center justify-center mb-6 shadow-lg border border-slate-50 p-4">
                     <img 
                       src="/images/logo.png" 
                       alt="A.R.T Logo" 
                       className="w-full h-full object-contain" 
                     />
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg mb-2">A.R.T EXPONENTIAL</h3>
                  <p className="text-slate-500 text-sm mb-4">
                    ผู้นำด้านนวัตกรรมและเทคโนโลยีเพื่ออนาคต มุ่งมั่นสร้างสรรค์สิ่งใหม่เพื่อสังคม
                  </p>
                  <Link href="/#ติดต่อ" className="block w-full py-2 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition">
                    ติดต่อเรา
                  </Link>
              </div>

              {/* Widget 2: ข่าวอื่นๆ ที่น่าสนใจ (Sticky) */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 sticky top-24">
                 <h3 className="font-bold text-slate-900 text-lg mb-6 flex items-center">
                    <span className="w-1 h-6 bg-emerald-500 rounded-full mr-3"></span>
                    ข่าวที่น่าสนใจอื่นๆ
                 </h3>
                 
                 <div className="space-y-6">
                    {relatedNews.map((item, idx) => (
                       <Link href={`/news/${item.id}`} key={idx} className="group block">
                          <div className="flex gap-4">
                             <div className="w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden relative">
                                <img 
                                  src={item.image} 
                                  alt={item.title} 
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                             </div>
                             <div className="flex-grow">
                                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mb-1 block">
                                  {item.category}
                                </span>
                                <h4 className="text-sm font-bold text-slate-800 leading-snug line-clamp-3 group-hover:text-emerald-700 transition-colors">
                                  {item.title}
                                </h4>
                             </div>
                          </div>
                       </Link>
                    ))}
                 </div>

                 <div className="mt-6 pt-6 border-t border-slate-100 text-center">
                    <Link href="/news" className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-emerald-600 transition">
                       ดูข่าวทั้งหมด <ChevronRight size={16} className="ml-1"/>
                    </Link>
                 </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </>
  );
}