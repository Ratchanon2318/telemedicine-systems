import Link from 'next/link';

/**
 * คอมโพเนนต์สำหรับแสดงรายการแบบมี Bullet Point (สัญลักษณ์นำหน้า)
 * @param {React.ReactNode} children - เนื้อหาที่จะแสดงในรายการ
 */
const CheckListItem = ({ children }) => (
  <li className="flex items-start gap-x-3">
    <span className="mt-1 text-violet-400 font-bold">-</span>
    <span className="text-lg text-slate-400 leading-relaxed">{children}</span>
  </li>
);

// คอมโพเนนต์หลักสำหรับหน้า "Telemedicine คืออะไร"
export default function Page() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-300 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Page Header */}
        <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-5xl font-bold text-slate-50">
              บริการการแพทย์ทางไกล (Telemedicine) คืออะไร?
            </h1>
            <p className="mt-4 text-slate-400 text-lg max-w-3xl mx-auto">
              ทำความเข้าใจบริการ Telemedicine เพื่อการดูแลสุขภาพที่สะดวกและเข้าถึงง่ายยิ่งขึ้น
            </p>
        </div>

        <div className="space-y-16">
          {/* Definition Section */}
          <section>
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 lg:p-10">
              <h2 className="text-2xl font-bold text-slate-100 mb-4">คำจำกัดความ</h2>
              <div className="text-lg text-slate-400 leading-relaxed">
                <p>
                  <strong>Telemedicine</strong> หรือ <strong>การแพทย์ทางไกล</strong> คือการนำเทคโนโลยีการสื่อสารมาประยุกต์ใช้กับการบริการด้านสาธารณสุข เพื่อให้ผู้ป่วยและบุคลากรทางการแพทย์สามารถพูดคุยตอบโต้กันได้แบบ Real-time โดยไม่ต้องเดินทางมาที่โรงพยาบาล
                </p>
              </div>
            </div>
          </section>

          {/* Video Section */}
          <div className="mt-16 border-t border-slate-800 pt-10">
            <h2 className="text-center text-3xl font-bold text-slate-50 mb-8">
              วิดีโอแนะนำบริการ Telemedicine
            </h2>
            <div className="aspect-video rounded-xl overflow-hidden shadow-2xl shadow-violet-500/10 mx-auto max-w-4xl border border-slate-700">
              <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/KRUnZ7oRZc8?si=clusLWl5Fd2fgHP-" 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin" 
                allowFullScreen>
              </iframe>
            </div>
          </div>

          {/* Benefits and Suitability Section */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Benefits Card */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 lg:p-10">
              <h2 className="text-2xl font-bold text-slate-100 mb-5">ประโยชน์ของ Telemedicine</h2>
              <ul className="space-y-5">
                <CheckListItem>
                  <strong className="font-semibold text-slate-200">ความสะดวกสบาย:</strong> รับคำปรึกษาจากแพทย์ได้จากทุกที่ โดยไม่ต้องเสียเวลาเดินทาง
                </CheckListItem>
                <CheckListItem>
                  <strong className="font-semibold text-slate-200">ประหยัดเวลาและค่าใช้จ่าย:</strong> ลดค่าใช้จ่ายในการเดินทางและประหยัดเวลาที่ต้องใช้ในการรอคอย
                </CheckListItem>
                <CheckListItem>
                  <strong className="font-semibold text-slate-200">ลดความเสี่ยง:</strong> ลดการสัมผัสและความเสี่ยงในการติดเชื้อต่างๆ โดยเฉพาะในสถานการณ์โรคระบาด
                </CheckListItem>
                <CheckListItem>
                  <strong className="font-semibold text-slate-200">การดูแลต่อเนื่อง:</strong> เหมาะสำหรับผู้ป่วยโรคเรื้อรังที่ต้องการติดตามอาการอย่างสม่ำเสมอ
                </CheckListItem>
              </ul>
            </div>

            {/* Suitability Card */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 lg:p-10">
              <h2 className="text-2xl font-bold text-slate-100 mb-5">บริการนี้เหมาะกับใคร?</h2>
              <ul className="space-y-5">
                <CheckListItem>ผู้ป่วยโรคเรื้อรังที่อาการคงที่ และต้องการติดตามการรักษาหรือรับยาเดิม</CheckListItem>
                <CheckListItem>ผู้ป่วยที่มีอาการเจ็บป่วยเล็กน้อย เช่น เป็นหวัด ปวดศีรษะ หรือมีผื่นคัน</CheckListItem>
                <CheckListItem>ผู้ที่ต้องการคำปรึกษาด้านสุขภาพทั่วไป หรือขอความเห็นที่สอง (Second Opinion)</CheckListItem>
                <CheckListItem>ผู้ดูแลที่ต้องการปรึกษาอาการของผู้ป่วยที่อยู่ในความดูแล</CheckListItem>
                <CheckListItem>ผู้ที่อาศัยอยู่ห่างไกล หรือไม่สะดวกในการเดินทางมาโรงพยาบาล</CheckListItem>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="mt-16 border-t border-slate-800 pt-10 text-center">
          <Link href="/PatientRegister" className="inline-block bg-violet-600 text-white py-3 px-10 rounded-lg font-semibold hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition-all duration-300 shadow-lg hover:shadow-violet-500/40 transform hover:scale-105 text-lg">
            ลงทะเบียนเพื่อรับบริการ
          </Link>
        </div>
      </div>
    </div>
  );
}