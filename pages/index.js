// pages/index.js (โค้ดที่ได้รับการปรับปรุง)
import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { products, news } from "../data/mockData";

import {
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Facebook,
  MessageCircle,
  ChevronRight,
  Award,
  Package,
  Wrench,
  Shield,
  HeadphonesIcon,
  Target,
  Users,
  Lightbulb,
} from "lucide-react";

/* ---------- STATIC DATA (นอก Component) ---------- */

const executives = [
  {
    name: "นายสนั่น สุตัญตั้งใจ",
    position: "ประธานบริษัท",
    image: "/images/TJC1.jpg",
  },
  {
    name: "นางประนอม สุตัญตั้งใจ",
    position: "รองประธานบริษัท",
    image: "/images/TJC2.jpg",
  },
  {
    name: "นายอรรถสิทธิ์ สุตัญตั้งใจ",
    position: "ประธานเจ้าหน้าที่บริหาร",
    image: "/images/TJC3.jpg",
  },
];

const services = [
  {
    icon: Package,
    title: "จัดส่งสินค้า",
    desc: "บริการจัดส่งรวดเร็วทั่วประเทศ ตรงเวลา ปลอดภัย ด้วยระบบติดตามสินค้าแบบเรียลไทม์",
  },
  {
    icon: Wrench,
    title: "การติดตั้ง",
    desc: "ทีมช่างมืออาชีพพร้อมติดตั้งถูกต้องตามมาตรฐาน รวดเร็ว ปลอดภัย",
  },
  {
    icon: HeadphonesIcon,
    title: "บริการหลังการขาย",
    desc: "ดูแลและให้คำปรึกษาตลอดการใช้งาน บริการซ่อมบำรุง 24/7",
  },
  {
    icon: Shield,
    title: "การรับประกันสินค้า",
    desc: "รับประกันคุณภาพสินค้าและบริการ พร้อมเปลี่ยนสินค้าใหม่หากมีปัญหา",
  },
];



const clients = [
  {
    name: "กระทรวงการอุดมศึกษา วิทยาศาสตร์ วิจัยและนวัตกรรม",
    short: "อว.",
    sector: "กระทรวง",
    logo: "/images/dechudom.png",
  },
  {
    name: "กรมส่งเสริมการปกครองท้องถิ่น",
    short: "DLA",
    sector: "องค์กรปกครองส่วนท้องถิ่น",
    logo: "/images/department.png",
  },
  {
    name: "สำนักงานส่งเสริมวิสาหกิจขนาดกลางและขนาดย่อม",
    short: "สสว.",
    sector: "วิสาหกิจขนาดกลางและขนาดย่อม",
    logo: "/images/ssw.jpg",
  },
  {
    name: "มหาวิทยาลัยราชภัฏพระนครศรีอยุธยา",
    short: "PSAU",
    sector: "สถาบันอุดมศึกษา",
    logo: "/images/dechudom.png",
  },
  {
    name: "กรมควบคุมโรค",
    short: "DDC",
    sector: "กระทรวงสาธารณสุข",
    logo: "/images/diseasecontrol.jpg",
  },
  {
    name: "สำนักงานคณะกรรมการการศึกษาขั้นพื้นฐาน",
    short: "สพฐ.",
    sector: "การศึกษา",
    logo: "/images/hightschoolbkk.jpg",
  },
  {
    name: "องค์การบริหารส่วนจังหวัด ",
    short: "อบจ.",
    sector: "องค์กรปกครองส่วนท้องถิ่น",
    logo: "/images/busubon.jpg",
  },
  {
    name: "กรมสุขภาพจิต",
    short: "DMH",
    sector: "กระทรวงสาธารณสุข",
    logo: "/images/health.jpg",
  },
  {
    name: "เทศบาลนครอุบลราชธานี",
    short: "เทศบาลนครอุบลฯ",
    sector: "เทศบาลนคร",
    logo: "/images/tessabanubon.png",
  },
  {
    name: "วิทยาลัยเทคนิคอุบลราชธานี",
    short: "UBON TECH",
    sector: "อาชีวศึกษา",
    logo: "/images/technicalubon.jpg",
  },
];

/* ---------- COMPONENT ---------- */

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openImage, setOpenImage] = useState(null); // สำหรับ ISO
  const [currentIndex, setCurrentIndex] = useState(0); // สำหรับ Clients Carousel
  const [selectedProduct, setSelectedProduct] = useState(null); // <<<< เพิ่ม: สำหรับ Product Detail Modal
  const [activeNews, setActiveNews] = useState(news[0]); // เพิ่มบรรทัดนี้สำหรับเก็บข่าวที่กำลังโชว์

  // แยกหมวดหมู่สินค้า
  const medicalProducts = products.filter(p => p.category === "การแพทย์");
  const electricalProducts = products.filter(p => p.category === "ไฟฟ้า");

  // ฟังก์ชันสำหรับ Infinite Scroll Loop (Clone ข้อมูลเพื่อให้เลื่อนไม่สะดุด)
  const getScrollItems = (items) => [...items, ...items, ...items];
  
// ตรวจจับการเลื่อนหน้า
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // auto-slide ลูกค้า
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % clients.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Head>
        <title>A.R.T EXPONENTIAL</title>
        <meta
          name="description"
          content="A.R.T EXPONENTIAL - Excellence in Innovation"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-sky-50 to-teal-50">
        {/* Navbar - (No changes needed here) */}
        <nav
          className={`fixed w-full z-50 transition-all duration-300 ${
            scrolled
              ? "bg-white/95 backdrop-blur-lg shadow-lg"
              : "bg-white/80 backdrop-blur-md"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-white shadow-lg flex items-center justify-center">
                  <Image
                    src="/images/logo.png"
                    alt="A.R.T EXPONENTIAL"
                    width={48}
                    height={48}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <div className="text-xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-500 bg-clip-text text-transparent">
                    A.R.T EXPONENTIAL
                  </div>
                  <div className="text-xs text-slate-500 font-medium">
                    Excellence in Innovation
                  </div>
                </div>
              </div>

              <div className="hidden md:flex space-x-8">
                {["หน้าแรก", "เกี่ยวกับ", "บริการ", "สินค้า", "ข่าวสาร", "ลูกค้า"].map(
                  (item) => (
                    <a
                      key={item}
                      href={`#${item}`}
                      className="text-slate-700 hover:text-emerald-600 font-medium transition-colors relative group py-2"
                    >
                      {item}
                      <span className="absolute -bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 transition-all group-hover:w-full"></span>
                    </a>
                  )
                )}
              </div>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-slate-700 hover:text-emerald-600 transition-colors"
              >
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden bg-white/95 backdrop-blur-lg shadow-lg border-t border-slate-100">
              <div className="px-4 py-6 space-y-4">
                {["หน้าแรก", "เกี่ยวกับ", "บริการ", "สินค้า", "ข่าวสาร", "ลูกค้า"].map(
                  (item) => (
                    <a
                      key={item}
                      href={`#${item}`}
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-slate-700 hover:text-emerald-600 font-medium transition-colors py-2 border-b border-slate-100"
                    >
                      {item}
                    </a>
                  )
                )}
              </div>
            </div>
          )}
        </nav>

        {/* Hero Section - (No changes needed here) */}
        <section
          id="หน้าแรก"
          className="relative pt-32 pb-24 px-4 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/5 via-teal-600/5 to-sky-500/5" />
          <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full blur-3xl opacity-20 animate-pulse" />
          <div
            className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-sky-400 to-emerald-500 rounded-full blur-3xl opacity-20 animate-pulse"
            style={{ animationDelay: "1s" }}
          />

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="inline-block px-4 py-2 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full">
                  <span className="text-emerald-700 font-semibold text-sm">
                    🚀 นวัตกรรมเพื่ออนาคตที่ยั่งยืน
                  </span>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-500 bg-clip-text text-transparent">
                    A.R.T
                  </span>
                  <br />
                  <span className="text-slate-900">EXPONENTIAL</span>
                </h1>
                <p className="text-xl text-slate-600 leading-relaxed">
                  ผู้นำด้านเทคโนโลยีและนวัตกรรม
                  มุ่งมั่นสร้างสรรค์โซลูชันที่ทรงพลังเพื่ออนาคตที่ดีกว่า
                  ด้วยประสบการณ์กว่า 10 ปี
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-full font-semibold hover:shadow-2xl transform hover:-translate-y-1 transition-all flex items-center justify-center space-x-2">
                    <span>ประสบการณ์ 10ปี+</span>
                  </button>
                  <button className="px-8 py-4 border-2 border-emerald-600 text-emerald-700 rounded-full font-semibold hover:bg-emerald-50 transition-all">
                    มากกว่า 500 โครงการ
                  </button>
                </div>
              </div>
              <div className="relative">
                <div className="relative aspect-video bg-gradient-to-br from-emerald-600 to-teal-600 rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 transition-transform duration-500">
                  <video
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                  >
                    <source src="/Video/ART.mp4" type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
                <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-full blur-3xl opacity-30" />
                <div className="absolute -top-8 -left-8 w-64 h-64 bg-gradient-to-br from-sky-400 to-cyan-400 rounded-full blur-3xl opacity-30" />
              </div>
            </div>
          </div>
        </section>

        {/* About Section - (No changes needed here) */}
        <section id="เกี่ยวกับ" className="py-24 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-2 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full mb-4">
                <span className="text-emerald-700 font-semibold text-sm">
                  เกี่ยวกับ A.R.T
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-4">
                เกี่ยวกับเรา
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                ความมุ่งมั่นและวิสัยทัศน์ที่ขับเคลื่อนองค์กรไปสู่ความสำเร็จ
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto mt-6" />
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity" />
                <div className="relative bg-gradient-to-br from-white to-emerald-50 rounded-3xl p-10 shadow-lg hover:shadow-2xl transition-all border border-emerald-100">
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <Target className="text-white" size={40} />
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-4">
                    วิสัยทัศน์
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-lg">
                    ส่งต่อผลิตภัณฑ์ทางด้านคอมพิวเตอร์ สินค้าไอที
                    และอุปกรณ์การแพทย์ที่มีคุณภาพ ได้มาตรฐานสากล
                    เพื่อยกระดับคุณภาพชีวิตของประชาชนอย่างยั่งยืน
                  </p>
                </div>
              </div>

              <div className="group relative">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-sky-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity" />
                <div className="relative bg-gradient-to-br from-white to-sky-50 rounded-3xl p-10 shadow-lg hover:shadow-2xl transition-all border border-sky-100">
                  <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-sky-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                    <Award className="text-white" size={40} />
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-4">
                    พันธกิจ
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-lg">
                    ส่งมอบโซลูชันเทคโนโลยีที่ทันสมัย ด้วยประสบการณ์กว่า 10 ปี
                    บริการด้วยความเข้าใจผู้ใช้งานจริง
                    ตอบโจทย์ทั้งภาครัฐ เอกชน และชุมชนท้องถิ่น ด้วยมาตรฐานสากล
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values - (No changes needed here) */}
        <section className="py-24 px-4 bg-gradient-to-br from-emerald-50 via-teal-50 to-sky-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-2 bg-white rounded-full mb-4 shadow-md">
                <span className="text-emerald-700 font-semibold text-sm">
                  หลักการทำงาน
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-4">
                ค่านิยมองค์กร
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                พื้นฐานที่แข็งแกร่งของความสำเร็จในทุกโครงการ
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto mt-6" />
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Lightbulb,
                  title: "นวัตกรรม",
                  desc: "ส่งเสริมการคิดสร้างสรรค์และพัฒนาเทคโนโลยีใหม่อย่างต่อเนื่อง เพื่อนำเสนอโซลูชันที่ดีที่สุด",
                  gradient: "from-emerald-500 via-teal-500 to-cyan-500",
                  bgGradient: "from-emerald-50 to-teal-50",
                },
                {
                  icon: Users,
                  title: "ความร่วมมือ",
                  desc: "ทำงานเป็นทีม แบ่งปันความรู้ และสนับสนุนซึ่งกันและกัน สร้างสรรค์ผลงานที่ยอดเยี่ยมร่วมกัน",
                  gradient: "from-teal-500 via-sky-500 to-cyan-500",
                  bgGradient: "from-teal-50 to-sky-50",
                },
                {
                  icon: Award,
                  title: "คุณภาพ",
                  desc: "มุ่งมั่นในความเป็นเลิศและมาตรฐานสูงสุดในทุกกระบวนการ ด้วยความใส่ใจในทุกรายละเอียด",
                  gradient: "from-emerald-600 via-teal-600 to-sky-600",
                  bgGradient: "from-emerald-50 to-sky-50",
                },
              ].map((value, idx) => {
                const Icon = value.icon;
                return (
                  <div key={idx} className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity" />
                    <div
                      className={`relative bg-gradient-to-br ${value.bgGradient} rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-3 border border-white`}
                    >
                      <div
                        className={`w-24 h-24 bg-gradient-to-br ${value.gradient} rounded-2xl mb-6 flex items-center justify-center shadow-xl transform group-hover:rotate-6 transition-transform`}
                      >
                        <Icon className="text-white" size={48} />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-4">
                        {value.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed">
                        {value.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Executives - (No changes needed here) */}
        <section className="py-24 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-2 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full mb-4">
                <span className="text-emerald-700 font-semibold text-sm">
                  ทีมผู้นำ
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-4">
                ผู้บริหาร
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                ทีมผู้นำที่มีวิสัยทัศน์และประสบการณ์ชั้นเลิศ
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto mt-6" />
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {executives.map((exec, idx) => (
                <div key={idx} className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-teal-500 to-sky-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity" />
                  <div className="relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-3">
                    <div className="w-full overflow-hidden relative rounded-t-3xl">
                      <img
                        src={exec.image}
                        alt={exec.name}
                        className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>

                    <div className="p-8 bg-gradient-to-br from-white via-emerald-50 to-teal-50">
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">
                        {exec.name}
                      </h3>
                      <p className="text-emerald-700 font-semibold text-lg">
                        {exec.position}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ISO Standards - (No changes needed here) */}
        <section className="py-24 px-4 bg-gradient-to-br from-emerald-50 via-teal-50 to-sky-50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-2 bg-white rounded-full mb-4 shadow-md">
                <span className="text-emerald-700 font-semibold text-sm">
                  การรับรอง
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-4">
                มาตรฐานของเรา
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                การรับรองมาตรฐานสากลที่ยืนยันคุณภาพของเรา
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto mt-6" />
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {[
                {
                  iso: "ISO 9001:2015",
                  title: "ระบบบริหารคุณภาพ",
                  desc: "รับรองมาตรฐานการบริหารจัดการคุณภาพระดับสากล",
                  gradient: "from-emerald-500 to-teal-500",
                  logo: "/images/iso9001.png",
                },
                {
                  iso: "ISO 14001:2015",
                  title: "ระบบบริหารสิ่งแวดล้อม",
                  desc: "รับรองมาตรฐานการจัดการสิ่งแวดล้อมที่ยั่งยืน",
                  gradient: "from-teal-500 to-sky-500",
                  logo: "/images/iso14001.png",
                },
              ].map((item, idx) => (
                <div key={idx} className="group relative">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${item.gradient} rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity`}
                  />
                  <div className="relative bg-white rounded-3xl p-12 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-3 text-center border-2 border-transparent group-hover:border-emerald-200">
                    <div
                      onClick={() => setOpenImage(item.logo)}
                      className="w-32 h-32 bg-white rounded-full mx-auto mb-6 flex items-center justify-center shadow-2xl overflow-hidden transform group-hover:rotate-3 transition-transform cursor-pointer hover:scale-105"
                    >
                      <Image
                        src={item.logo}
                        alt={item.iso}
                        width={120}
                        height={120}
                        className="object-contain"
                      />
                    </div>

                    <h3 className="text-4xl font-bold text-slate-900 mb-3">
                      {item.iso}
                    </h3>
                    <h4 className="text-xl font-semibold text-slate-800 mb-3">
                      {item.title}
                    </h4>
                    <p className="text-slate-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {openImage && (
            <div
              className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
              onClick={() => setOpenImage(null)}
            >
              <div className="relative max-w-3xl w-full p-4">
                <img
                  src={openImage}
                  alt="ISO FULL"
                  className="w-full h-auto rounded-2xl shadow-2xl bg-white"
                />
                <button
                  className="absolute top-4 right-4 bg-white/90 hover:bg-white text-slate-800 px-4 py-2 rounded-full shadow-xl"
                  onClick={() => setOpenImage(null)}
                >
                  ✕ ปิด
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Services - (No changes needed here) */}
        <section id="บริการ" className="py-24 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-2 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full mb-4">
                <span className="text-emerald-700 font-semibold text-sm">
                  บริการครบวงจร
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-4">
                บริการของเรา
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                บริการที่ครอบคลุมทุกความต้องการ ด้วยมาตรฐานระดับสากล
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto mt-6" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, idx) => {
                const Icon = service.icon;
                const gradients = [
                  "from-emerald-500 to-teal-500",
                  "from-teal-500 to-sky-500",
                  "from-sky-500 to-cyan-500",
                  "from-emerald-600 to-teal-600",
                ];
                return (
                  <div key={idx} className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity" />
                    <div className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-3 text-center border border-slate-100 h-full flex flex-col">
                      <div
                        className={`w-20 h-20 bg-gradient-to-br ${gradients[idx]} rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg transform group-hover:rotate-3 transition-transform`}
                      >
                        <Icon className="text-white" size={36} />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3">
                        {service.title}
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed flex-grow">
                        {service.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Products (สินค้า) - ปรับปรุง */}
        {/* --- NEW PRODUCT SHOWCASE SECTION --- */}
       <section id="สินค้า" className="py-24 px-4 bg-slate-50 overflow-hidden relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-white rounded-full mb-4 shadow-md">
                <span className="text-emerald-700 font-semibold text-sm">ไฮไลท์ผลิตภัณฑ์</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-4">กลุ่มสินค้าแนะนำ</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                นวัตกรรมทางการแพทย์และระบบไฟฟ้ามาตรฐานสากล
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto mt-6" />
        </div>

        {/* Dual Category Showcase */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* 1. Medical Zone */}
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden flex flex-col h-[600px]">
            <div className="p-6 bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-100 flex justify-between items-center z-10 relative">
               <div>
                  <h3 className="text-2xl font-bold text-emerald-800 flex items-center gap-2">
                      <span className="text-3xl">🏥</span> อุปกรณ์การแพทย์
                  </h3>
                  <p className="text-emerald-600 text-sm">Medical & Healthcare</p>
               </div>
            </div>
            
            <div className="relative flex-grow overflow-hidden pause-hover bg-slate-50/50">
               <div className="absolute w-full p-6 space-y-4 animate-scroll-y">
                  {getScrollItems(medicalProducts).map((product, idx) => (
                    <div 
                      key={`${product.id}-med-${idx}`}
                      className="flex bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer border border-slate-100 items-center gap-4 group"
                      onClick={() => setSelectedProduct(product)}
                    >
                       <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-slate-100">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                       </div>
                       <div className="flex-grow">
                          <h4 className="font-bold text-slate-800 group-hover:text-emerald-600 transition-colors">{product.name}</h4>
                          <p className="text-xs text-slate-500 line-clamp-2 mt-1">{product.detail}</p>
                          <span className="text-xs text-emerald-500 font-semibold mt-2 inline-flex items-center">
                             ดูรายละเอียด <ChevronRight size={14} />
                          </span>
                       </div>
                    </div>
                  ))}
               </div>
               <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />
               <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />
            </div>
          </div>

          {/* 2. Electrical Zone */}
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden flex flex-col h-[600px]">
            <div className="p-6 bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-100 flex justify-between items-center z-10 relative">
               <div>
                  <h3 className="text-2xl font-bold text-amber-800 flex items-center gap-2">
                      <span className="text-3xl">⚡</span> อุปกรณ์ไฟฟ้า
                  </h3>
                  <p className="text-amber-600 text-sm">Electrical & Power</p>
               </div>
            </div>
            
            <div className="relative flex-grow overflow-hidden pause-hover bg-slate-50/50">
               <div className="absolute w-full p-6 space-y-4 animate-scroll-y" style={{ animationDuration: '45s' }}>
                  {getScrollItems(electricalProducts).map((product, idx) => (
                    <div 
                      key={`${product.id}-elec-${idx}`}
                      className="flex bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer border border-slate-100 items-center gap-4 group"
                      onClick={() => setSelectedProduct(product)}
                    >
                       <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-slate-100">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                       </div>
                       <div className="flex-grow">
                          <h4 className="font-bold text-slate-800 group-hover:text-amber-600 transition-colors">{product.name}</h4>
                          <p className="text-xs text-slate-500 line-clamp-2 mt-1">{product.detail}</p>
                          <span className="text-xs text-amber-500 font-semibold mt-2 inline-flex items-center">
                             ดูรายละเอียด <ChevronRight size={14} />
                          </span>
                       </div>
                    </div>
                  ))}
               </div>
               <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />
               <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* ============================================================
            2. ส่วนปุ่มกดไปหน้าสินค้าทั้งหมด (วางต่อจาก Grid)
           ============================================================ */}
        <div className="text-center mt-12">
            <Link href="/products" className="px-10 py-4 bg-slate-800 text-white rounded-full font-semibold hover:bg-slate-700 hover:shadow-lg transform hover:-translate-y-1 transition-all inline-flex items-center space-x-2">
                <span>ค้นหาสินค้าทุกหมวดหมู่</span>
                <ChevronRight />
            </Link>
        </div>

      </div>

      {/* Modal (Popup) */}
      {selectedProduct && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-4xl w-full grid md:grid-cols-2 animate-in fade-in zoom-in-50 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-square md:aspect-auto relative bg-slate-100">
              <img 
                src={selectedProduct.image} 
                alt={selectedProduct.name} 
                className="w-full h-full object-cover" 
              />
            </div>
            <div className="p-8 flex flex-col relative h-full max-h-[60vh] md:max-h-none overflow-y-auto">
              <button 
                onClick={() => setSelectedProduct(null)} 
                className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-red-500 transition-colors"
              >
                 <X />
              </button>

              {selectedProduct.category && (
                  <span className="inline-block self-start px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-bold mb-4">
                    {selectedProduct.category}
                  </span>
              )}

              <h2 className="text-3xl font-bold text-slate-900 mb-4">{selectedProduct.name}</h2>
              
              <div className="prose prose-slate text-slate-600 mb-8 flex-grow">
                 <p className="leading-relaxed">{selectedProduct.detail}</p>
                 {selectedProduct.description && (
                    <p className="mt-4">{selectedProduct.description}</p>
                 )}
              </div>

              <div className="mt-auto pt-6 border-t border-slate-100">
   <button 
     onClick={() => {
       setSelectedProduct(null); // 1. สั่งปิดหน้าต่างสินค้า
       setIsContactOpen(true);   // 2. สั่งเปิดหน้าต่างติดต่อ (Slide-up) ทันที
     }}
     className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition-colors shadow-lg shadow-emerald-200"
   >
      ติดต่อสอบถามสินค้านี้
   </button>
</div>
            </div>
          </div>
        </div>
      )}

    </section>

        {/* News (ข่าวสาร) - ปรับปรุง */}
        {/* News (ข่าวสาร) - ดีไซน์ใหม่: Interactive Magazine */}
        <section id="ข่าวสาร" className="py-24 px-4 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div className="text-left">
                <div className="inline-block px-4 py-2 bg-emerald-50 rounded-full mb-4 border border-emerald-100">
                  <span className="text-emerald-700 font-bold text-sm flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    NEWS UPDATE
                  </span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
                  ข่าวสารและกิจกรรม
                </h2>
              </div>
              
              <div className="mt-6 md:mt-0">
                 <Link href="/news" className="text-slate-500 hover:text-emerald-600 font-semibold flex items-center gap-2 transition-colors group">
                    ดูทั้งหมด <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform"/>
                 </Link>
              </div>
            </div>

            {/* Main Content: Split Layout */}
            <div className="grid lg:grid-cols-12 gap-8 h-[600px] md:h-[500px]">
              
              {/* ส่วนซ้าย: รูปภาพใหญ่ (Interactive Display) */}
              <div className="lg:col-span-7 relative h-full rounded-3xl overflow-hidden shadow-2xl group">
                {/* Link ครอบเพื่อให้คลิกที่รูปไปหน้าข่าวได้เลย */}
                <Link href={`/news/${activeNews?.id || news[0].id}`} className="block h-full w-full cursor-pointer">
                    {/* Image Background */}
                    <div className="absolute inset-0 bg-slate-900">
                    <img 
                        key={activeNews?.image} 
                        src={activeNews?.image || news[0].image} 
                        alt="News Cover" 
                        className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105 animate-in fade-in"
                    />
                    </div>
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

                    {/* Content Overlay */}
                    <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
                    <div className="flex items-center gap-4 mb-4">
                        <span className="px-3 py-1 bg-emerald-600 text-white text-xs font-bold rounded-md shadow-lg">
                            LATEST
                        </span>
                        <span className="text-slate-300 text-sm font-medium flex items-center gap-2">
                            <span className="w-1 h-1 bg-slate-300 rounded-full"/> 
                            {activeNews?.date || news[0].date}
                        </span>
                    </div>
                    <h3 className="text-2xl md:text-4xl font-bold text-white mb-4 leading-tight line-clamp-2">
                        {activeNews?.title || news[0].title}
                    </h3>
                    <p className="text-slate-300 text-sm md:text-base line-clamp-2 max-w-xl mb-6">
                        {activeNews?.excerpt || news[0].excerpt}
                    </p>
                    
                    {/* ปุ่มอ่านรายละเอียด (ปรับปรุงดีไซน์) */}
                    <div className="inline-flex items-center gap-2 text-white font-bold border-b-2 border-emerald-500 pb-1 hover:text-emerald-400 hover:border-emerald-400 transition-all group/link">
                        อ่านรายละเอียด 
                        <ChevronRight size={20} className="transform transition-transform group-hover/link:translate-x-1" />
                    </div>
                    </div>
                </Link>
              </div>

              {/* ส่วนขวา: รายการข่าว (Scrollable List) */}
              <div className="lg:col-span-5 flex flex-col h-full overflow-hidden">
                <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
                  {news.map((item, idx) => {
                    const isActive = activeNews?.title === item.title;
                    return (
                        // ใช้ Link ครอบ list item ด้วย เพื่อให้คลิกแล้วไปอ่านข่าวได้เหมือนกัน
                      <Link 
                        href={`/news/${item.id}`}
                        key={idx}
                        onMouseEnter={() => setActiveNews(item)} // ยังคงเปลี่ยนรูปเมื่อ Hover
                        className={`block p-4 rounded-2xl cursor-pointer transition-all duration-300 border-2 ${
                          isActive 
                            ? "bg-emerald-50 border-emerald-500 shadow-md translate-x-2" 
                            : "bg-white border-transparent hover:bg-slate-50 hover:border-slate-200"
                        }`}
                      >
                        <div className="flex gap-4 items-center">
                           {/* Date Box */}
                           <div className={`flex-shrink-0 w-16 h-16 rounded-xl flex flex-col items-center justify-center transition-colors ${
                             isActive ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-500"
                           }`}>
                              <span className="text-xl font-bold leading-none">{item.date.split(' ')[0]}</span>
                              <span className="text-[10px] uppercase mt-1">{item.date.split(' ')[1]}</span>
                           </div>
                           
                           {/* Text Info */}
                           <div className="flex-grow">
                              <h4 className={`font-bold text-sm md:text-base line-clamp-2 mb-1 ${
                                isActive ? "text-emerald-900" : "text-slate-700"
                              }`}>
                                {item.title}
                              </h4>
                              <div className="flex justify-between items-center">
                                <span className="text-xs text-slate-400">Admin Post</span>
                                {isActive && <ChevronRight size={16} className="text-emerald-600 animate-pulse"/>}
                              </div>
                           </div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
                
                {/* Decorative footer for list */}
                <div className="mt-4 pt-4 border-t border-slate-100 text-center">
                   <p className="text-xs text-slate-400">เลื่อนเพื่อดูข่าวสารเพิ่มเติม</p>
                </div>
              </div>

            </div>
          </div>
        </section>


        {/* Footer - (No changes needed here) */}
        <footer className="bg-gradient-to-br from-slate-900 via-emerald-950 to-teal-900 text-white py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-12 mb-16">
              {/* Logo + about */}
              <div className="col-span-2">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-14 h-14 rounded-xl overflow-hidden bg-white shadow-2xl flex items-center justify-center">
                    <Image
                      src="/images/logo.png"
                      alt="A.R.T EXPONENTIAL"
                      width={56}
                      height={56}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">A.R.T EXPONENTIAL</div>
                    <div className="text-sm text-emerald-200">
                      Excellence in Innovation
                    </div>
                  </div>
                </div>

                <p className="text-slate-200 mb-6 leading-relaxed text-lg">
                  ผู้นำด้านนวัตกรรมและเทคโนโลยี
                  มุ่งมั่นสร้างสรรค์โซลูชันที่ทรงพลังเพื่ออนาคตที่ดีกว่า
                  ด้วยประสบการณ์มากกว่า 10 ปี
                </p>

                <div className="flex space-x-4">
                  <a
                    href="https://www.facebook.com/profile.php?id=61573842487909"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white/10 hover:bg-gradient-to-br hover:from-sky-500 hover:to-sky-600 rounded-xl flex items-center justify-center transition-all transform hover:scale-110"
                  >
                    <Facebook size={24} />
                  </a>
                  <a
                    href="https://line.me/R/ti/p/@024lfgkw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white/10 hover:bg-gradient-to-br hover:from-emerald-500 hover:to-teal-500 rounded-xl flex items-center justify-center transition-all transform hover:scale-110"
                  >
                    <MessageCircle size={24} />
                  </a>
                  <a
                    href="mailto:TJC.OFFICE21@gmail.com"
                    className="w-12 h-12 bg-white/10 hover:bg-gradient-to-br hover:from-rose-500 hover:to-rose-600 rounded-xl flex items-center justify-center transition-all transform hover:scale-110"
                  >
                    <Mail size={24} />
                  </a>
                  <a
                    href="tel:0804746169"
                    className="w-12 h-12 bg-white/10 hover:bg-gradient-to-br hover:from-teal-500 hover:to-emerald-500 rounded-xl flex items-center justify-center transition-all transform hover:scale-110"
                  >
                    <Phone size={24} />
                  </a>
                </div>
              </div>

              {/* Menu */}
              <div>
                <h4 className="text-xl font-bold mb-6 bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">
                  เมนูหลัก
                </h4>
                <ul className="space-y-3">
                  {["หน้าแรก", "เกี่ยวกับ", "บริการ", "สินค้า", "ข่าวสาร", "ลูกค้า"].map(
                    (item) => (
                      <li key={item}>
                        <a
                          href={`#${item}`}
                          className="text-slate-200 hover:text-white transition-colors hover:translate-x-2 inline-block transform"
                        >
                          → {item}
                        </a>
                      </li>
                    )
                  )}
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h4 className="text-xl font-bold mb-6 bg-gradient-to-r from-teal-300 to-sky-300 bg-clip-text text-transparent">
                  ติดต่อเรา
                </h4>
                <ul className="space-y-4 text-slate-200">
                  <li className="flex items-start space-x-3 hover:text-white transition-colors">
                    <Phone
                      size={20}
                      className="mt-1 flex-shrink-0 text-emerald-300"
                    />
                    <div>
                      <div className="font-semibold text-white">
                        โทรศัพท์สำนักงาน
                      </div>
                      <a href="tel:0804746169">0945438829</a>
                    </div>
                  </li>

                  <li className="flex items-start space-x-3 hover:text-white transition-colors">
                    <Shield
                      size={20}
                      className="mt-1 flex-shrink-0 text-teal-300"
                    />
                    <div>
                      <div className="font-semibold text-white">
                        เบอร์เคลมสินค้า
                      </div>
                      <a href="tel:0994132744">099-413-2744</a>
                    </div>
                  </li>

                  <li className="flex items-start space-x-3 hover:text-white transition-colors">
                    <Mail
                      size={20}
                      className="mt-1 flex-shrink-0 text-sky-300"
                    />
                    <div>
                      <div className="font-semibold text-white">อีเมล</div>
                      <a href="mailto:TJC.OFFICE21@gmail.com">
                        a.r.t.exponential.office@gmail.com
                      </a>
                    </div>
                  </li>

                  <li className="flex items-start space-x-3 hover:text-white transition-colors">
                    <MapPin
                      size={20}
                      className="mt-1 flex-shrink-0 text-emerald-300"
                    />
                    <div>
                      <div className="font-semibold text-white">ที่อยู่</div>
                      <span>
                        99/35 นิว คอนเน็กซ์ เฮาส์ ถนนพหลโยธิน แขวงสนามบิน เขตดอนเมือง จังหวัดกรุงเทพมหานคร 10210
                        <br />
                        ทำการ : จันทร์-ศุกร์ | 08:00 - 17:00 น.
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-white/10 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <p className="text-slate-400 text-center md:text-left">
                  © 2025 A.R.T EXPONENTIAL. All rights reserved.
                </p>
                <div className="flex space-x-6 text-slate-400 text-sm">
                  <a href="#" className="hover:text-white transition-colors">
                    นโยบายความเป็นส่วนตัว
                  </a>
                  <a href="#" className="hover:text-white transition-colors">
                    เงื่อนไขการใช้งาน
                  </a>
                </div>
              </div>
            </div>
          </div>
        </footer>

        {/* Floating Contact Button */}
        <div className="fixed bottom-8 right-8 z-50 contact-fab">
          <button
            onClick={() => setIsContactOpen(!isContactOpen)}
            className="w-16 h-16 bg-gradient-to-br from-emerald-600 via-teal-600 to-sky-500 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all flex items-center justify-center text-white animate-pulse hover:animate-none"
          >
            {isContactOpen ? <X size={28} /> : <Phone size={28} />}
          </button>

          {isContactOpen && (
            <div className="absolute bottom-20 right-0 w-96 bg-white rounded-3xl shadow-2xl p-6 border-2 border-emerald-100 slide-up">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  ติดต่อเรา
                </h3>
                <button
                  onClick={() => setIsContactOpen(false)}
                  className="text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {/* Facebook */}
                <a
                  href="https://www.facebook.com/profile.php?id=61573842487909"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 p-4 bg-gradient-to-r from-sky-50 to-sky-100 rounded-2xl hover:from-sky-100 hover:to-sky-200 transition-all group transform hover:scale-105"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-sky-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Facebook className="text-white" size={24} />
                  </div>
                  <div className="flex-grow">
                    <div className="font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                      Facebook
                    </div>
                    <div className="text-sm text-slate-500">
                      แชทกับเราทาง Facebook
                    </div>
                  </div>
                  <ChevronRight
                    className="text-slate-400 group-hover:text-sky-600 group-hover:translate-x-1 transition-all"
                    size={20}
                  />
                </a>

                {/* Line */}
                <a
                  href="https://line.me/R/ti/p/@024lfgkw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 p-4 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-2xl hover:from-emerald-100 hover:to-emerald-200 transition-all group transform hover:scale-105"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                    <MessageCircle className="text-white" size={24} />
                  </div>
                  <div className="flex-grow">
                    <div className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      Line
                    </div>
                    <div className="text-sm text-slate-500">@artexponential</div>
                  </div>
                  <ChevronRight
                    className="text-slate-400 group-hover:text-emerald-700 group-hover:translate-x-1 transition-all"
                    size={20}
                  />
                </a>

                {/* Email */}
                <a
                  href="mailto:a.r.t.exponential.office@gmail.com"
                  className="flex items-center space-x-4 p-4 bg-gradient-to-r from-rose-50 to-rose-100 rounded-2xl hover:from-rose-100 hover:to-rose-200 transition-all group transform hover:scale-105"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-rose-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Mail className="text-white" size={24} />
                  </div>
                  <div className="flex-grow">
                    <div className="font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
                      Email
                    </div>
                    <div className="text-sm text-slate-500">
                      a.r.t.exponential.office@gmail.com
                    </div>
                  </div>
                  <ChevronRight
                    className="text-slate-400 group-hover:text-rose-600 group-hover:translate-x-1 transition-all"
                    size={20}
                  />
                </a>

                {/* Phone office */}
                <a
                  href="tel:0804746169"
                  className="flex items-center space-x-4 p-4 bg-gradient-to-r from-teal-50 to-teal-100 rounded-2xl hover:from-teal-100 hover:to-teal-200 transition-all group transform hover:scale-105"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                    <Phone className="text-white" size={24} />
                  </div>
                  <div className="flex-grow">
                    <div className="font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                      โทรศัพท์สำนักงาน
                    </div>
                    <div className="text-sm text-slate-500">0945438829</div>
                  </div>
                  <ChevronRight
                    className="text-slate-400 group-hover:text-teal-700 group-hover:translate-x-1 transition-all"
                    size={20}
                  />
                </a>

                {/* Phone claim */}
                <a
                  href="tel:0994132744"
                  className="flex items-center space-x-4 p-4 bg-gradient-to-r from-amber-50 to-orange-100 rounded-2xl hover:from-amber-100 hover:to-orange-200 transition-all group transform hover:scale-105"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                    <Shield className="text-white" size={24} />
                  </div>
                  <div className="flex-grow">
                    <div className="font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                      เบอร์เคลมสินค้า
                    </div>
                    <div className="text-sm text-slate-500">099-413-2744</div>
                  </div>
                  <ChevronRight
                    className="text-slate-400 group-hover:text-orange-600 group-hover:translate-x-1 transition-all"
                    size={20}
                  />
                </a>

                {/* Map */}
                <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-100 rounded-2xl">
                  <div className="flex items-center space-x-4 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                      <MapPin className="text-white" size={24} />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">ที่อยู่</div>
                      <div className="text-sm text-slate-700">
                        99/35 นิว คอนเน็กซ์ เฮาส์ ถนนพหลโยธิน แขวงสนามบิน เขตดอนเมือง จังหวัดกรุงเทพมหานคร 10210
                      </div>
                    </div>
                  </div>

                  <div className="aspect-video rounded-xl overflow-hidden shadow-lg">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1151.1945180403202!2d100.61957505174753!3d13.950186682948669!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e283014fac5667%3A0x5a905057fec8b351!2sA.R.T.%20EXPONENTIAL%20CO.%2C%20LTD.!5e0!3m2!1sen!2sth!4v1763630488829!5m2!1sen!2sth"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>

                  <p className="text-xs text-slate-600 mt-2 text-center">
                    <a
                      href="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1151.1945180403202!2d100.61957505174753!3d13.950186682948669!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e283014fac5667%3A0x5a905057fec8b351!2sA.R.T.%20EXPONENTIAL%20CO.%2C%20LTD.!5e0!3m2!1sen!2sth!4v1763630488829!5m2!1sen!2sth"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      เปิดแผนที่ใน Google Maps
                    </a>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};