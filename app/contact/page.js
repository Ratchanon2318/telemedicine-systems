'use client';

// คอมโพเนนต์หลักสำหรับหน้า "ติดต่อเรา"
export default function ContactPage() {

  return (
    <div className="min-h-screen bg-slate-900 text-slate-300 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-6xl mx-auto">
          {/* ส่วนหัวของหน้า */}
          <div className="text-center mb-12">          
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-50">
              ติดต่อเรา
            </h1>
            <p className="text-slate-400 mt-3 text-lg">
              เราพร้อมให้ความช่วยเหลือ หากมีข้อสงสัยสามารถติดต่อเราได้ตามช่องทางด้านล่าง
            </p>
          </div>

          {/* ส่วนเนื้อหาหลัก แบ่งเป็น Grid */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-5 gap-x-12 gap-y-16">
            {/* คอลัมน์ซ้าย: ข้อมูลการติดต่อ */}
            <div className="lg:col-span-2 space-y-12">
              <section>
                <h2 className="text-2xl font-bold text-slate-100 mb-6">ช่องทางการติดต่อ</h2>
                <div className="space-y-8">
                    <div className="flex items-start gap-4">
                        <span className="mt-1 inline-block bg-slate-700 text-cyan-400 text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">ที่อยู่</span>
                        <p className="text-slate-400 leading-relaxed">35 ซ.2 ถ.ราชดำเนิน 1 ต.ในเมือง อ.เมือง จ.กำแพงเพชร 62000</p>
                    </div>
                    <div className="flex items-start gap-4">
                        <span className="mt-1 inline-block bg-slate-700 text-cyan-400 text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">โทรศัพท์</span>
                        <p className="text-slate-400 leading-relaxed">055-716-715</p>
                    </div>
                    <div className="flex items-start gap-4">
                        <span className="mt-1 inline-block bg-slate-700 text-cyan-400 text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">อีเมล</span>
                        <p className="text-slate-400 leading-relaxed">prathom_heath@gmail.com</p>
                    </div>
                    <div className="flex items-start gap-4">
                        <span className="mt-1 inline-block bg-slate-700 text-cyan-400 text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">LINE</span>
                        <p className="text-slate-400 leading-relaxed">@133rkonx</p>
                    </div>
                     <div className="flex items-start gap-4">
                        <span className="mt-1 inline-block bg-slate-700 text-cyan-400 text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">เวลาทำการ</span>
                        <p className="text-slate-400 leading-relaxed">วันจันทร์ - ศุกร์, 08:30 - 16:30 น. (ปิดวันหยุดราชการ)</p>
                    </div>
                </div>
              </section>
            </div>

            {/* คอลัมน์ขวา: แสดงโพสต์จาก Facebook */}
            <div className="lg:col-span-3">
                <h2 className="text-2xl font-bold text-slate-100 mb-6">ติดตามเราบน Facebook</h2>
                <div className="w-full max-w-lg mx-auto rounded-xl overflow-hidden shadow-lg border border-slate-700">
                    <div className="w-full h-[500px]">
                        <iframe
                            src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fkmch.kpp&tabs=timeline&width=500&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
                            style={{ border: 'none', overflow: 'hidden' }}
                            scrolling="no"
                            frameBorder="0"
                            allowFullScreen={true}
                            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                            title="โพสต์จาก Facebook"
                            className="w-full h-full"
                        />
                    </div>
                </div>
            </div>
          </div>
        </div>
    </div>
  );
}