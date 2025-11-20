// pages/news/index.js
import React from "react";
import Head from "next/head";
import Link from "next/link";
import { ChevronLeft, Calendar, ChevronRight } from "lucide-react";
import { news } from "../../data/mockData"; // ดึงข้อมูลจากไฟล์กลาง

export default function AllNews() {
  // 1. เรียงลำดับข่าวจาก ใหม่ -> เก่า
  const sortedNews = [...news].sort((a, b) => new Date(b.date) - new Date(a.date));

  // 2. แยกข่าวล่าสุด (ชิ้นแรก) ออกจากข่าวที่เหลือ
  const latestNews = sortedNews[0];
  const otherNews = sortedNews.slice(1);

  // Helper function สำหรับปุ่ม "อ่านเพิ่มเติม" ให้เหมือนกันทุกจุด
  const ReadMoreButton = () => (
    <div className="mt-auto pt-4">
      <span className="inline-flex items-center text-emerald-600 font-bold text-sm md:text-base transition-all group-hover:text-emerald-700">
        อ่านรายละเอียด 
        <ChevronRight size={18} className="ml-1 transform transition-transform group-hover:translate-x-1" />
      </span>
    </div>
  );

  return (
    <>
      <Head>
        <title>ข่าวสารและกิจกรรม - A.R.T EXPONENTIAL</title>
      </Head>

      <div className="min-h-screen bg-slate-50">
        {/* Navbar */}
        <nav className="bg-white shadow-sm sticky top-0 z-40">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center text-slate-600 hover:text-emerald-600 transition-colors font-semibold">
                <ChevronLeft /> กลับหน้าหลัก
            </Link>
            <h1 className="text-xl font-bold text-slate-800">ข่าวสารทั้งหมด</h1>
            <div className="w-20"></div>
            </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 py-12">
          
          {/* Section: Latest News (ไฮไลท์ข่าวล่าสุด) */}
          {latestNews && (
            <section className="mb-16">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-8 w-1 bg-emerald-500 rounded-full"></div>
                <h2 className="text-2xl font-bold text-slate-900">อัพเดทล่าสุด</h2>
              </div>

              {/* ใช้ Link ครอบเพื่อให้คลิกได้ทั้งก้อน */}
              <Link href={`/news/${latestNews.id}`} className="block group">
                <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100 grid md:grid-cols-2 hover:shadow-2xl transition-all duration-300">
                    <div className="aspect-video md:aspect-auto relative overflow-hidden">
                    <img 
                        src={latestNews.image} 
                        alt={latestNews.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-emerald-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                        Latest
                    </div>
                    </div>
                    <div className="p-8 md:p-12 flex flex-col justify-center">
                    <div className="flex items-center text-slate-500 text-sm mb-4">
                        <Calendar size={16} className="mr-2" />
                        {latestNews.displayDate}
                        <span className="mx-2">•</span>
                        <span className="text-emerald-600 font-medium">{latestNews.category}</span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight group-hover:text-emerald-700 transition-colors">
                        {latestNews.title}
                    </h3>
                    <p className="text-slate-600 text-lg mb-6 line-clamp-3">
                        {latestNews.excerpt}
                    </p>
                    
                    {/* ปุ่มอ่านต่อแบบมาตรฐาน */}
                    <ReadMoreButton />
                    </div>
                </div>
              </Link>
            </section>
          )}

          {/* Section: Other News Grid */}
          <section>
            <div className="flex items-center gap-2 mb-6">
                <div className="h-8 w-1 bg-slate-300 rounded-full"></div>
                <h2 className="text-2xl font-bold text-slate-900">ข่าวสารย้อนหลัง</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {otherNews.map((item) => (
                // ใช้ Link ครอบเพื่อให้คลิกได้ทั้งการ์ด
                <Link href={`/news/${item.id}`} key={item.id} className="block group h-full">
                    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-slate-100 transition-all hover:-translate-y-2 h-full flex flex-col">
                        <div className="aspect-video relative overflow-hidden">
                            <img 
                                src={item.image} 
                                alt={item.title} 
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                                <span className="text-white text-sm font-medium flex items-center">
                                    <Calendar size={14} className="mr-2" /> {item.displayDate}
                                </span>
                            </div>
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                            <div className="text-xs font-bold text-emerald-600 mb-2 uppercase tracking-wider">
                                {item.category}
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-emerald-700 transition-colors">
                                {item.title}
                            </h3>
                            <p className="text-slate-500 text-sm line-clamp-2 mb-4">
                                {item.excerpt}
                            </p>
                            
                            {/* ปุ่มอ่านต่อแบบมาตรฐาน */}
                            <ReadMoreButton />
                        </div>
                    </div>
                </Link>
              ))}
            </div>
          </section>

        </div>
      </div>
    </>
  );
}