// pages/index.js
import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";

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

const products = [
  {
    name: "อุปกรณ์อุตสาหกรรม A1",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=500",
    category: "อุตสาหกรรม",
  },
  {
    name: "เครื่องจักร B2",
    image: "https://images.unsplash.com/photo-1565043666747-69f6646db940?w=500",
    category: "เครื่องจักร",
  },
  {
    name: "ระบบควบคุม C3",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500",
    category: "ระบบควบคุม",
  },
  {
    name: "อุปกรณ์ไฟฟ้า D4",
    image: "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=500",
    category: "ไฟฟ้า",
  },
  {
    name: "เซ็นเซอร์อัจฉริยะ E5",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500",
    category: "เทคโนโลยี",
  },
  {
    name: "ระบบอัตโนมัติ F6",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=500",
    category: "ระบบอัตโนมัติ",
  },
];

const news = [
  {
    title: "ร่วมสนับสนุกการแข่งขันกีฬาเยาวชนและประชาชน",
    date: "25 มี.ค. 2567",
    image: "/images/new1.jpg",
    excerpt: "สนับสนุนกิจกรรมเยาวชน และสร้างสัมพันธ์กับชุมชนอย่างต่อเนื่อง",
  },
  {
    title: "กิจกรรมประกวดราคาอิเล็กทรอนิกส์ (e-bidding)",
    date: "30 พ.ค. 2568",
    image: "/images/new2.jpg",
    excerpt: "ดำเนินการจัดซื้อจัดจ้างด้วยระบบอิเล็กทรอนิกส์ โปร่งใส ตรวจสอบได้",
  },
  {
    title: "สนับสนุนทีมปิงปองหงส์ขาว",
    date: "5 พ.ย. 2568",
    image: "/images/new3.jpg",
    excerpt: "ร่วมส่งเสริมสุขภาพและกีฬาให้กับเยาวชนในพื้นที่",
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
  const [openImage, setOpenImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

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
        {/* Navbar */}
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

        {/* Hero Section */}
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

        {/* About Section */}
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

        {/* Core Values */}
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

        {/* Executives */}
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

        {/* ISO Standards */}
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

        {/* Services */}
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

        {/* Products */}
        <section
          id="สินค้า"
          className="py-24 px-4 bg-gradient-to-br from-emerald-50 via-teal-50 to-sky-50"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-2 bg-white rounded-full mb-4 shadow-md">
                <span className="text-emerald-700 font-semibold text-sm">
                  ผลิตภัณฑ์คุณภาพ
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-4">
                สินค้าของเรา
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                ผลิตภัณฑ์และโซลูชันที่ตอบโจทย์ทุกความต้องการ
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto mt-6" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {products.map((product, idx) => (
                <div
                  key={idx}
                  className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-3"
                >
                  <div className="aspect-square overflow-hidden relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute top-4 right-4">
                      <span className="px-4 py-2 bg-white/90 backdrop-blur-sm text-emerald-700 text-xs font-bold rounded-full shadow-lg">
                        {product.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-white to-emerald-50">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      {product.name}
                    </h3>
                    <button className="text-emerald-700 font-semibold hover:text-teal-700 transition-colors inline-flex items-center">
                      ดูรายละเอียด <ChevronRight size={18} className="ml-1" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button className="px-10 py-5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-full font-semibold hover:shadow-2xl transform hover:-translate-y-1 transition-all text-lg inline-flex items-center space-x-2">
                <span>ดูสินค้าทั้งหมด</span>
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </section>

        {/* News */}
        <section id="ข่าวสาร" className="py-24 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block px-4 py-2 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full mb-4">
                <span className="text-emerald-700 font-semibold text-sm">
                  อัพเดทล่าสุด
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-4">
                ข่าวสาร
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                ติดตามความเคลื่อนไหวและกิจกรรมล่าสุดของเรา
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto mt-6" />
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {news.map((item, idx) => (
                <div
                  key={idx}
                  className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-3 border border-slate-100"
                >
                  <div className="aspect-video overflow-hidden relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <span className="px-4 py-2 bg-white/90 backdrop-blur-sm text-emerald-700 text-sm font-bold rounded-full shadow-lg">
                        {item.date}
                      </span>
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 mb-4 line-clamp-2">
                      {item.excerpt}
                    </p>
                    <a
                      href="#"
                      className="text-emerald-700 font-semibold hover:text-teal-700 transition-colors inline-flex items-center group-hover:translate-x-2 transition-transform"
                    >
                      อ่านเพิ่มเติม <ChevronRight size={20} className="ml-1" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <button className="px-8 py-4 border-2 border-emerald-600 text-emerald-700 rounded-full font-semibold hover:bg-emerald-50 transition-all">
                ดูข่าวสารทั้งหมด
              </button>
            </div>
          </div>
        </section>

        {/* Clients – Auto Carousel */}
        <section id="ลูกค้า" className="py-16 px-4 bg-white relative">
  <div className="max-w-6xl mx-auto">
    <div className="text-center mb-10">
      <h2 className="text-3xl md:text-5xl font-bold text-slate-900">
        ลูกค้าที่ไว้วางใจ
      </h2>
      <p className="text-slate-600 mt-3">
        หน่วยงานและองค์กรชั้นนำทั่วประเทศ
      </p>
      <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto mt-4" />
    </div>

    {/* กล่องรวม Carousel */}
    <div className="relative w-full overflow-hidden">

      {/* ปุ่มเลื่อนซ้าย */}
      <button
        onClick={() =>
          setCurrentIndex(
            (prev) => (prev - 1 + clients.length) % clients.length
          )
        }
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 
          bg-white/90 hover:bg-emerald-100 shadow-lg border border-slate-200 
          w-10 h-10 rounded-full flex items-center justify-center 
          hover:scale-110 transition"
      >
        ‹
      </button>

      {/* รายการโลโก้ Carousel */}
      <div
        className="flex transition-transform duration-700 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {clients.map((client, idx) => (
          <div
            key={idx}
            className="min-w-full flex justify-center px-6"
          >
            <div className="bg-white/90 backdrop-blur-lg p-6 rounded-3xl shadow-lg border border-slate-100 w-72 flex flex-col items-center hover:shadow-2xl transition">
              <div className="w-28 h-28 bg-emerald-50 rounded-2xl flex items-center justify-center shadow-inner">
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={120}
                  height={120}
                  className="object-contain"
                />
              </div>
              <p className="text-center text-sm font-semibold mt-4 line-clamp-2 text-slate-800">
                {client.name}
              </p>
              {client.sector && (
                <p className="text-xs text-slate-500 mt-1">
                  {client.sector}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ปุ่มเลื่อนขวา */}
      <button
        onClick={() => setCurrentIndex((prev) => (prev + 1) % clients.length)}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 
          bg-white/90 hover:bg-emerald-100 shadow-lg border border-slate-200 
          w-10 h-10 rounded-full flex items-center justify-center 
          hover:scale-110 transition"
      >
        ›
      </button>
    </div>

    {/* จุด Indicator */}
    <div className="flex justify-center mt-6 gap-2">
      {clients.map((_, idx) => (
        <div
          key={idx}
          className={`h-2 rounded-full transition-all ${
            idx === currentIndex
              ? "bg-emerald-600 w-8"
              : "bg-slate-300 w-2"
          }`}
        />
      ))}
    </div>

    <p className="text-center text-slate-500 mt-8">
      มากกว่า{" "}
      <span className="text-emerald-700 font-bold">10+</span>{" "}
      องค์กรทั่วประเทศ
    </p>
  </div>
</section>


        {/* Footer */}
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
                    href="https://www.facebook.com"
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
                  &copy; 2025 A.R.T EXPONENTIAL. All rights reserved.
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
                  href="https://www.facebook.com"
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
}
