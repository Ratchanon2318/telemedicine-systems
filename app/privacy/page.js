import Link from 'next/link';

/**
 * คอมโพเนนต์สำหรับแสดงรายการแบบมี Bullet Point (สัญลักษณ์นำหน้า)
 */
const ListItem = ({ children }) => (
  <li className="flex items-start gap-x-3">
    <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-violet-500/20">
      <span className="h-2 w-2 rounded-full bg-violet-400"></span>
    </span>
    <span className="text-slate-400 leading-relaxed">{children}</span>
  </li>
);

// คอมโพเนนต์หลักสำหรับหน้า "นโยบายความเป็นส่วนตัว"
export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-300 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      <div className="max-w-3xl w-full bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-8 sm:p-12 rounded-2xl">
        {/* ส่วนหัวของหน้า */}
        <div className="text-center mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-50">นโยบายความเป็นส่วนตัว (Privacy Policy)</h1>
          <p className="text-slate-400 mt-2">สำหรับบริการการแพทย์ทางไกล (Telemedicine)</p>
        </div>

        {/* ส่วนเนื้อหาหลัก */}
        <div className="space-y-8">
          {/* Section 1: ข้อมูลที่เราเก็บรวบรวม */}
          <section>
            <h2 className="text-xl font-semibold text-slate-200 border-b border-slate-700 pb-3 mb-4">
              ข้อมูลที่เราเก็บรวบรวม
            </h2>
            <p className="text-slate-400 mb-4">
              เราเก็บรวบรวมข้อมูลที่จำเป็นเพื่อให้บริการการแพทย์ทางไกลแก่ท่าน ซึ่งรวมถึง:
            </p>
            <ul className="space-y-4">
              <ListItem><strong>ข้อมูลส่วนบุคคล:</strong> เช่น ชื่อ-นามสกุล, เลขบัตรประชาชน, วันเดือนปีเกิด, ที่อยู่, และเบอร์โทรศัพท์</ListItem>
              <ListItem><strong>ข้อมูลสุขภาพ:</strong> เช่น อาการเบื้องต้น, โรคประจำตัว, ประวัติการแพ้ยา, น้ำหนัก, ส่วนสูง และข้อมูลอื่นๆ ที่เกี่ยวข้องกับการวินิจฉัยและการรักษา</ListItem>
              <ListItem><strong>ข้อมูลทางเทคนิค:</strong> เช่น ข้อมูลการใช้งานเว็บไซต์ เพื่อนำไปปรับปรุงและพัฒนาบริการ</ListItem>
            </ul>
          </section>

          {/* Section 2: วัตถุประสงค์ในการใช้ข้อมูล */}
          <section>
            <h2 className="text-xl font-semibold text-slate-200 border-b border-slate-700 pb-3 mb-4">
              วัตถุประสงค์ในการใช้ข้อมูล
            </h2>
            <p className="text-slate-400">
              ข้อมูลของท่านจะถูกนำไปใช้เพื่อวัตถุประสงค์ดังต่อไปนี้:
            </p>
            <ul className="mt-4 space-y-4">
                <ListItem>เพื่อการวินิจฉัย, การรักษา, และการติดตามผลทางการแพทย์ผ่านระบบ Telemedicine</ListItem>
                <ListItem>เพื่อการยืนยันตัวตนและทำการนัดหมายกับบุคลากรทางการแพทย์</ListItem>
                <ListItem>เพื่อการติดต่อสื่อสาร แจ้งข้อมูลที่เกี่ยวข้องกับการนัดหมายและการรักษา</ListItem>
                <ListItem>เพื่อการปฏิบัติตามกฎหมายและข้อบังคับที่เกี่ยวข้องกับสถานพยาบาล</ListItem>
            </ul>
          </section>

          {/* Section 3: ความปลอดภัยของข้อมูล */}
          <section>
            <h2 className="text-xl font-semibold text-slate-200 border-b border-slate-700 pb-3 mb-4">
              ความปลอดภัยของข้อมูล
            </h2>
            <p className="text-slate-400">
              เราให้ความสำคัญสูงสุดกับความปลอดภัยของข้อมูลส่วนบุคคลและข้อมูลสุขภาพของท่าน เรามีมาตรการรักษาความปลอดภัยทางเทคนิคและการบริหารจัดการที่เหมาะสม เพื่อป้องกันการเข้าถึง, การเปิดเผย, หรือการนำข้อมูลไปใช้โดยไม่ได้รับอนุญาต
            </p>
          </section>

          {/* Section 4: สิทธิของเจ้าของข้อมูล */}
          <section>
            <h2 className="text-xl font-semibold text-slate-200 border-b border-slate-700 pb-3 mb-4">
              สิทธิของเจ้าของข้อมูล
            </h2>
            <p className="text-slate-400">
              ท่านมีสิทธิในการเข้าถึง, แก้ไข, หรือขอให้ลบข้อมูลส่วนบุคคลของท่านตามขอบเขตที่กฎหมายกำหนด หากท่านต้องการใช้สิทธิดังกล่าว กรุณาติดต่อเราตามข้อมูลในหน้า <Link href="/contact" className="text-cyan-400 hover:underline">ติดต่อเรา</Link>
            </p>
          </section>
        </div>

        {/* ปุ่ม Call to Action เพื่อกลับไปยังหน้าลงทะเบียน */}
        <div className="mt-12 text-center">
          <Link href="/PatientRegister" className="inline-block bg-violet-600 text-white py-3 px-8 rounded-lg font-semibold hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition-all duration-300 shadow-lg hover:shadow-violet-500/40 transform hover:scale-105">
           กลับไปหน้าลงทะเบียน
          </Link>
        </div>
      </div>
    </div>
  );
}