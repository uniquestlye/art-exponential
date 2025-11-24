import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { 
  ChevronLeft, 
  Search, 
  X, 
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Facebook,
  MessageCircle,
  Shield
} from "lucide-react";
import { products } from "../../data/mockData"; 

export default function AllProducts() {
  const [selectedCategory, setSelectedCategory] = useState("ทั้งหมด");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isContactOpen, setIsContactOpen] = useState(false); // State สำหรับเปิด/ปิดหน้าต่างติดต่อ

  const priorityCats = 
  [
    "ทั้งหมด", "การแพทย์", "ระบบไฟฟ้าและงานติดตั้ง", "วิทยาศาสตร์และห้องปฏิบัติการ","กีฬาและเครื่องออกกำลังกาย","อุปกรณ์สำนักงาน","สินค้าไอทีและคอมพิวเตอร์"
  ];
  const otherCats = [...new Set(products.map((p) => p.category))].filter(c => !priorityCats.includes(c));
  const sortedCategories = [...priorityCats, ...otherCats];

  // Filter Logic
  const filteredProducts = products.filter((product) => {
    const matchCategory = selectedCategory === "ทั้งหมด" || product.category === selectedCategory;
    const matchSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <>
      <Head>
        <title>สินค้าทั้งหมด - A.R.T EXPONENTIAL</title>
      </Head>

      {/* Styles สำหรับ Animation (ถ้าไม่ได้ใส่ใน global.css) */}
      <style jsx global>{`
        @keyframes slide-up {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .slide-up {
          animation: slide-up 0.3s ease-out forwards;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }
      `}</style>

      <div className="min-h-screen bg-slate-50 relative">
        {/* Navbar */}
        <nav className="bg-white shadow-sm sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center text-slate-600 hover:text-emerald-600 transition-colors font-semibold">
              <ChevronLeft /> กลับหน้าหลัก
            </Link>
            <h1 className="text-xl font-bold text-slate-800">สินค้าทั้งหมด</h1>
            <div className="w-20"></div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 py-12">
          
          {/* Tools Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
            {/* Categories */}
            <div className="flex flex-wrap gap-2 justify-center mb-8">
              {sortedCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                    selectedCategory === cat
                      ? "bg-slate-800 text-white shadow-lg scale-105"
                      : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                  } ${
                    cat === "การแพทย์" && selectedCategory !== cat ? "text-emerald-600 border-emerald-200 bg-emerald-50 hover:bg-emerald-100" : ""
                  } ${
                    cat === "ระบบไฟฟ้าและงานติดตั้ง" && selectedCategory !== cat ? "text-amber-600 border-amber-200 bg-amber-50 hover:bg-amber-100" : ""
                  } ${cat === "วิทยาศาสตร์และห้องปฏิบัติการ" && selectedCategory !== cat ? "text-sky-600 border-sky-200 bg-sky-50 hover:bg-sky-100" : ""
                  } ${cat === "กีฬาและเครื่องออกกำลังกาย" && selectedCategory !== cat ? "text-purple-600 border-purple-200 bg-purple-50 hover:bg-purple-100" : ""
                  } ${cat === "อุปกรณ์สำนักงาน" && selectedCategory !== cat ? "text-pink-600 border-pink-200 bg-pink-50 hover:bg-pink-100" : ""
                  } ${cat === "สินค้าไอทีและคอมพิวเตอร์" && selectedCategory !== cat ? "text-teal-600 border-teal-200 bg-teal-50 hover:bg-teal-100" : ""
                  }`}
                >
                  {cat === "การแพทย์" && "🏥 "} 
                  {cat === "ระบบไฟฟ้าและงานติดตั้ง" && "⚡ "}
                  {cat === "วิทยาศาสตร์และห้องปฏิบัติการ" && "🔬 "}
                  {cat === "กีฬาและเครื่องออกกำลังกาย" && "🏋️‍♂️ "}
                  {cat === "อุปกรณ์สำนักงาน" && "🖇️ "}
                  {cat === "สินค้าไอทีและคอมพิวเตอร์" && "💻 "}
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Box */}
            <div className="relative w-full md:w-72">
              <input
                type="text"
                placeholder="ค้นหาสินค้า..."
                className="w-full pl-10 pr-4 py-2 rounded-full border border-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-slate-100 hover:-translate-y-1"
                  onClick={() => setSelectedProduct(product)}
                >
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-3 right-3">
                      <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-emerald-700 shadow-sm">
                        {product.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-slate-900 mb-2 line-clamp-1 group-hover:text-emerald-600 transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center text-emerald-600 text-sm font-medium">
                        ดูรายละเอียด <ChevronRight size={16} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-slate-500">
              ไม่พบสินค้าที่ค้นหา
            </div>
          )}
        </div>

        {/* ==========================================================
            Product Detail Modal
           ========================================================== */}
        {selectedProduct && (
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[60] p-4"
            onClick={() => setSelectedProduct(null)}
          >
            <div
              className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-4xl w-full grid md:grid-cols-2 animate-in fade-in zoom-in-50 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="aspect-square md:aspect-auto relative bg-slate-100">
                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-8 flex flex-col relative h-full max-h-[60vh] md:max-h-none overflow-y-auto custom-scrollbar">
                <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-full text-slate-500 hover:text-red-500 transition-colors">
                    <X />
                </button>
                <span className="inline-block self-start px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-bold mb-4">
                  {selectedProduct.category}
                </span>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">{selectedProduct.name}</h2>
                <div className="prose prose-slate text-slate-600 mb-8 flex-grow">
                    <p className="leading-relaxed">{selectedProduct.detail}</p>
                    {selectedProduct.description && (
                      <p className="mt-4">{selectedProduct.description}</p>
                    )}
                </div>
                
                {/* ปุ่มกดแล้วเรียกหน้าต่างติดต่อ */}
                <div className="mt-auto pt-6 border-t border-slate-100">
                  <button 
                    onClick={() => {
                        setSelectedProduct(null); // ปิดหน้าสินค้านี้
                        setIsContactOpen(true);   // เปิดหน้าต่างติดต่อ
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

        {/* ==========================================================
            Floating Contact Button & Slide-Up Modal
           ========================================================== */}
        <div className="fixed bottom-8 right-8 z-50">
          {/* Floating Button */}
          <button
            onClick={() => setIsContactOpen(!isContactOpen)}
            className="w-16 h-16 bg-gradient-to-br from-emerald-600 via-teal-600 to-sky-500 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all flex items-center justify-center text-white animate-pulse hover:animate-none"
          >
            {isContactOpen ? <X size={28} /> : <Phone size={28} />}
          </button>

          {/* Contact Modal */}
          {isContactOpen && (
            <div className="absolute bottom-20 right-0 w-80 md:w-96 bg-white rounded-3xl shadow-2xl p-6 border-2 border-emerald-100 slide-up origin-bottom-right">
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

              <div className="space-y-3 max-h-[60vh] overflow-y-auto custom-scrollbar pr-1">
                {/* Facebook */}
                <a
                  href="https://www.facebook.com/profile.php?id=61573842487909"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 p-4 bg-gradient-to-r from-sky-50 to-sky-100 rounded-2xl hover:from-sky-100 hover:to-sky-200 transition-all group transform hover:scale-105"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-sky-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Facebook className="text-white" size={20} />
                  </div>
                  <div className="flex-grow">
                    <div className="font-bold text-slate-900 group-hover:text-sky-600 transition-colors text-sm">
                      Facebook
                    </div>
                    <div className="text-xs text-slate-500">
                      A R T Exponential 
                    </div>
                  </div>
                  <ChevronRight className="text-slate-400 group-hover:text-sky-600" size={18} />
                </a>

                {/* Line */}
                <a
                  href="https://line.me/R/ti/p/@024lfgkw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 p-4 bg-gradient-to-r from-emerald-50 to-emerald-100 rounded-2xl hover:from-emerald-100 hover:to-emerald-200 transition-all group transform hover:scale-105"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                    <MessageCircle className="text-white" size={20} />
                  </div>
                  <div className="flex-grow">
                    <div className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors text-sm">
                      Line
                    </div>
                    <div className="text-xs text-slate-500">
                      @artexponential
                    </div>
                  </div>
                  <ChevronRight className="text-slate-400 group-hover:text-emerald-700" size={18} />
                </a>

                {/* Email */}
                <a
                  href="mailto:a.r.t.exponential.office@gmail.com"
                  className="flex items-center space-x-4 p-4 bg-gradient-to-r from-rose-50 to-rose-100 rounded-2xl hover:from-rose-100 hover:to-rose-200 transition-all group transform hover:scale-105"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-rose-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Mail className="text-white" size={20} />
                  </div>
                  <div className="flex-grow">
                    <div className="font-bold text-slate-900 group-hover:text-rose-600 transition-colors text-sm">
                      Email
                    </div>
                    <div className="text-xs text-slate-500 truncate w-32">
                      a.r.t.exponential.office@gmail.com
                    </div>
                  </div>
                  <ChevronRight className="text-slate-400 group-hover:text-rose-600" size={18} />
                </a>

                {/* Phone Office */}
                <a
                  href="tel:0804746169"
                  className="flex items-center space-x-4 p-4 bg-gradient-to-r from-teal-50 to-teal-100 rounded-2xl hover:from-teal-100 hover:to-teal-200 transition-all group transform hover:scale-105"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                    <Phone className="text-white" size={20} />
                  </div>
                  <div className="flex-grow">
                    <div className="font-bold text-slate-900 group-hover:text-teal-700 transition-colors text-sm">
                      สำนักงาน
                    </div>
                    <div className="text-xs text-slate-500">0945438829</div>
                  </div>
                  <ChevronRight className="text-slate-400 group-hover:text-teal-700" size={18} />
                </a>

                {/* Phone Claim */}
                <a
                  href="tel:0994132744"
                  className="flex items-center space-x-4 p-4 bg-gradient-to-r from-amber-50 to-orange-100 rounded-2xl hover:from-amber-100 hover:to-orange-200 transition-all group transform hover:scale-105"
                >
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                    <Shield className="text-white" size={20} />
                  </div>
                  <div className="flex-grow">
                    <div className="font-bold text-slate-900 group-hover:text-orange-600 transition-colors text-sm">
                      เคลมสินค้า
                    </div>
                    <div className="text-xs text-slate-500">099-413-2744</div>
                  </div>
                  <ChevronRight className="text-slate-400 group-hover:text-orange-600" size={18} />
                </a>

                {/* Map */}
                <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-100 rounded-2xl">
                  <div className="flex items-center space-x-4 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                      <MapPin className="text-white" size={20} />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-sm">ที่อยู่</div>
                      <div className="text-xs text-slate-700">
                        99/35 นิว คอนเน็กซ์ เฮาส์ ถนนพหลโยธิน
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
                  <p className="text-[10px] text-slate-600 mt-2 text-center underline cursor-pointer">
                    <a href="https://maps.app.goo.gl/your-google-map-link" target="_blank" rel="noreferrer">
                       เปิดใน Google Maps
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