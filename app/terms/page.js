import Link from 'next/link';

/**
 * คอมโพเนนต์สำหรับแสดงรายการแบบมี Bullet Point (สัญลักษณ์นำหน้า)
 */
const CheckListItem = ({ children }) => (
  <li className="flex items-start gap-x-3">
    <span className="mt-1 text-violet-400 font-bold">-</span>
    <span className="text-slate-400 leading-relaxed">{children}</span>
  </li>
);

// คอมโพเนนต์หลักสำหรับหน้า "ข้อตกลงและเงื่อนไขการใช้บริการ"
export default function TermsAndConditionsPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-300 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-3xl w-full bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-8 sm:p-12 rounded-2xl">
        {/* ส่วนหัวของหน้า */}
        <div className="text-center mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-50">ข้อตกลงและเงื่อนไขการใช้บริการ</h1>
          <p className="text-slate-400 mt-2">บริการการแพทย์ทางไกล (Telemedicine)</p>
        </div>

        {/* ส่วนเนื้อหาหลักของข้อตกลง */}
        <section className="space-y-6">
          <h2 className="text-xl font-semibold text-slate-200 border-b border-slate-700 pb-3 mb-4">
            การยินยอมในการเปิดเผยข้อมูลและรับการตรวจรักษา
          </h2>
          <p className="text-slate-400">
            โดยการยอมรับข้อตกลงนี้ ข้าพเจ้าขอยืนยันว่า:
          </p>
          {/* รายการข้อตกลงที่ผู้ใช้ต้องให้ความยินยอม */}
          <ul className="space-y-4">
            <CheckListItem>
                ข้าพเจ้ารับทราบและเข้าใจถึงกระบวนการตรวจรักษาและหัตถการผ่านบริการการแพทย์ทางไกล (Telemedicine) รวมถึงความเสี่ยง ผลข้างเคียง และภาวะแทรกซ้อนที่อาจเกิดขึ้น ซึ่งได้รับการอธิบายจากแพทย์หรือเจ้าหน้าที่แล้ว
            </CheckListItem>
            <CheckListItem>
                ข้าพเจ้ายินยอมให้แพทย์หรือบุคลากรทางการแพทย์ดำเนินการตรวจรักษาตามวิธีดังกล่าว เพื่อประโยชน์สูงสุดในการรักษาพยาบาลครั้งนี้
            </CheckListItem>
            <CheckListItem>
                ข้าพเจ้าเข้าใจและยอมรับว่า ในกรณีเกิดเหตุสุดวิสัยจากการตรวจรักษาและหัตถการดังกล่าว ข้าพเจ้าจะไม่เอาความผิดต่อแพทย์หรือเจ้าหน้าที่ของโรงพยาบาลชุมชนเทศบาลเมืองกำแพงเพชร
            </CheckListItem>
            <CheckListItem>
                ข้าพเจ้ายินยอมและอนุญาตให้มีการเปิดเผยข้อมูลสุขภาพส่วนบุคคลของข้าพเจ้า เพื่อการเข้ารับบริการการแพทย์ทางไกล รวมถึงการส่งต่อข้อมูลสุขภาพผ่านสื่อออนไลน์ให้แก่ทีมแพทย์และบุคลากรที่เกี่ยวข้องกับการให้บริการ
            </CheckListItem>
          </ul>
          {/* ส่วนสรุปการยืนยัน */}
          <div className="mt-6 pt-6 border-t border-slate-700">
            <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
              <p className="text-slate-200 font-medium text-left md:text-left">
                ข้าพเจ้าได้อ่านข้อความเหล่านี้หรือผู้อื่นอ่านให้ฟังจนเข้าใจถึงรายละเอียดต่างๆ ข้างต้น จนเป็นที่เข้าใจดีแล้ว จึงขอลงนามหรือพิมพ์ลายมือไว้เป็นหลักฐานในการอนุญาตและยินยอม
              </p>
            </div>
          </div>
        </section>

        {/* ปุ่ม Call to Action เพื่อกลับไปยังหน้าลงทะเบียน */}
        <div className="mt-12 text-center">
          <Link href="/PatientRegister" className="inline-block bg-violet-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition-all duration-300 shadow-lg hover:shadow-violet-500/40 transform hover:scale-105">
           ไปหน้าลงทะเบียน
          </Link>
        </div>
      </div>
    </div>
  );
}