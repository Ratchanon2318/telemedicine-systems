'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { registerUser } from './actions';
import LoadingOverlay from '../components/LoadingOverlay';

export default function RegistrationPage() {
  // =================================================================
  // States สำหรับจัดการข้อมูลในฟอร์ม (Form Data States)
  // =================================================================
  // แต่ละ state จะผูกกับ input field หนึ่งตัวในฟอร์ม
  const [nationalId, setNationalId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [phone, setPhone] = useState('');
  const [allergies, setAllergies] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [desired, setDesired] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [address, setAddress] = useState('');
  const [certificate, setCertificate] = useState('');
   const [disease, setDisease] = useState('');

  // =================================================================
  // States สำหรับจัดการสถานะของ UI และ Logic (UI/Logic States)
  // =================================================================
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [consentChecked, setConsentChecked] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const router = useRouter();

  /**
   * Helper Function: คำนวณอายุจากวันเดือนปีเกิดที่ผู้ใช้กรอก
   * ฟังก์ชันสำหรับคำนวณอายุจากวันเดือนปีเกิด
   * @param {string} dobString - วันเดือนปีเกิดในรูปแบบ 'YYYY-MM-DD'
   * @returns {number|string} - อายุ (ปี) หรือสตริงว่างถ้าข้อมูลไม่ถูกต้อง
   */
  const calculateAge = (dobString) => {
    if (!dobString) return '';
    const birthDate = new Date(dobString);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age >= 0 ? age : ''; // ตรวจสอบให้แน่ใจว่าอายุไม่ติดลบ
  };

  // Derived State: เงื่อนไขในการปิด/เปิดใช้งานปุ่ม Submit
  // ปุ่มจะถูกปิดใช้งานถ้า: 1. กำลังโหลดข้อมูล หรือ 2. ผู้ใช้ยังไม่ได้กดยินยอมข้อตกลง
  const isSubmitDisabled = loading || !consentChecked;

  /**
   * Event Handler: จัดการการส่งฟอร์มเมื่อผู้ใช้กดปุ่ม "ลงทะเบียน"
   * ฟังก์ชันจัดการการส่งฟอร์ม
   * @param {Event} event - Event object จากการ submit form
   */
  const handleSubmit = async (event) => {
    // 1. ป้องกันการรีเฟรชหน้าเว็บตามพฤติกรรมปกติของฟอร์ม
    event.preventDefault();
    // 2. เริ่มแสดงสถานะ loading และล้างข้อความเก่า
    setLoading(true);
    setMessage('');

    // 3. คำนวณอายุก่อนส่งข้อมูล
    const age = calculateAge(dob);

    // 4. รวบรวมข้อมูลทั้งหมดจาก state ต่างๆ เพื่อสร้างเป็น object ที่จะส่งไปยัง Server Action
    const registrationData = {
      nationalId,
      firstName,
      lastName,
      gender,
      dob,
      phone,
      allergies,
      symptoms,
      desired,
      weight,
      height,
      age: age.toString(),// ส่งอายุเป็นสตริง
      address,
      disease,
      certificate
    };

    // 5. เรียกใช้ Server Action 'registerUser' และส่งข้อมูลไป
    const result = await registerUser(registrationData);

    // 6. จัดการผลลัพธ์ที่ได้กลับมาจาก Server Action
    if (result.success) {
      setShowSuccessModal(true); // แสดง Modal แจ้งว่าลงทะเบียนสำเร็จ
      // รีเซ็ตค่าในฟอร์มทั้งหมดให้เป็นค่าเริ่มต้น
      setNationalId('');
      setFirstName('');
      setLastName('');
      setGender('');
      setDob('');
      setPhone('');
      setAllergies('');
      setSymptoms('');
      setDesired('');
      setWeight('');
      setHeight('');
      setAddress('');
      setDisease('');
      setCertificate('');
      setConsentChecked(false); // รีเซ็ต checkbox การยินยอม
      setMessage(''); // ล้างข้อความผิดพลาดก่อนหน้า (ถ้ามี)
    } else { // กรณีลงทะเบียนไม่สำเร็จ
      // แสดงข้อความผิดพลาดที่ได้รับจาก Server Action
      setMessage(`เกิดข้อผิดพลาด: ${result.error || 'ไม่สามารถลงทะเบียนได้'}`);
      setShowSuccessModal(false); // ตรวจสอบให้แน่ใจว่า modal ไม่แสดงเมื่อเกิดข้อผิดพลาด
    }
    // 7. หยุดแสดงสถานะ loading
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-300 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <LoadingOverlay isLoading={loading} text="กำลังลงทะเบียน กรุณารอสักครู่..." />

      {/* Main Form Container */}
      <div className="max-w-4xl w-full bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-6 sm:p-10 rounded-2xl shadow-2xl shadow-violet-500/10">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8 text-slate-50">ลงทะเบียนใช้บริการ Telemedicine</h1>
        <div className="text-center mb-6 -mt-4">
          <p className="text-slate-400">
            เป็นผู้ป่วยเก่าและต้องการขอรับยาเดิม?{' '}
            <Link href="/Oldpatient" className="font-semibold text-cyan-400 hover:text-cyan-300 hover:underline transition-colors duration-150">
              คลิกที่นี่
            </Link>
          </p>
        </div>

        {/* Form Element */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Fieldset: ข้อมูลส่วนตัว */}
          <fieldset className="space-y-4">
            <legend className="text-lg font-semibold mb-4 border-b pb-3 border-slate-600 text-slate-200 w-full">ข้อมูลส่วนตัว</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <div className="md:col-span-2">
                <label htmlFor="nationalId" className="block text-sm font-semibold text-slate-300 mb-1">หมายเลขบัตรประจำตัวประชาชน</label>
                <input 
                  type="tel"
                  inputMode="numeric"
                  id="nationalId" 
                  value={nationalId} 
                  onChange={(e) => setNationalId(e.target.value.replace(/\D/g, ''))}
                  required 
                  pattern="\d{13}" 
                  title="กรุณากรอกเลขบัตรประชาชน 13 หลัก" 
                  maxLength="13" 
                  className="block w-full p-3 bg-slate-800 border border-slate-600 rounded-lg shadow-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors duration-150 text-slate-200 placeholder-slate-500"
                />
              </div>
              <div>
                <label htmlFor="firstName" className="block text-sm font-semibold text-slate-300 mb-1">ชื่อจริง</label>
                <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required className="block w-full p-3 bg-slate-800 border border-slate-600 rounded-lg shadow-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors duration-150 text-slate-200 placeholder-slate-500" />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-semibold text-slate-300 mb-1">นามสกุล</label>
                <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required className="block w-full p-3 bg-slate-800 border border-slate-600 rounded-lg shadow-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors duration-150 text-slate-200 placeholder-slate-500" />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="gender" className="block text-sm font-semibold text-slate-300 mb-1">เพศ</label>
                <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)} required className="block w-full p-3 bg-slate-800 border border-slate-600 rounded-lg shadow-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors duration-150 text-slate-200">
                  <option value="">เลือกเพศ</option>
                  <option value="ชาย">ชาย (Male)</option>
                  <option value="หญิง">หญิง (Female)</option>
                  <option value="อื่นๆ">อื่นๆ</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label htmlFor="dob" className="block text-sm font-semibold text-slate-300 mb-1">วันเดือนปีเกิด</label>
                <input type="date" id="dob" value={dob} onChange={(e) => setDob(e.target.value)} required className="block w-full p-3 bg-slate-800 border border-slate-600 rounded-lg shadow-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors duration-150 text-slate-200" />
              </div>
            </div>
          </fieldset>

          {/* Fieldset: ข้อมูลการติดต่อ */}
          <fieldset className="space-y-4">
            <legend className="text-lg font-semibold mb-4 border-b pb-3 border-slate-600 text-slate-200 w-full">ข้อมูลการติดต่อ</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <div className="md:col-span-2">
                <label htmlFor="phone" className="block text-sm font-semibold text-slate-300 mb-1">หมายเลขโทรศัพท์ที่ติดต่อได้</label>
                <input 
                  type="tel" 
                  id="phone" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)} 
                  required 
                  pattern="^0\d{9}$" 
                  title="กรุณากรอกเบอร์โทรศัพท์ 10 หลักให้ถูกต้อง (เช่น 0812345678)" 
                  maxLength="10"
                  className="block w-full p-3 bg-slate-800 border border-slate-600 rounded-lg shadow-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors duration-150 text-slate-200 placeholder-slate-500"
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="address" className="block text-sm font-semibold text-slate-300 mb-1">ที่อยู่ที่สามารถติดต่อได้</label>
                <textarea id="address" value={address} onChange={(e) => setAddress(e.target.value)} required rows="3" className="block w-full p-3 bg-slate-800 border border-slate-600 rounded-lg shadow-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors duration-150 text-slate-200 placeholder-slate-500" />
              </div>
            </div>
          </fieldset>

          {/* Fieldset: ข้อมูลสุขภาพ */}
          <fieldset className="space-y-4">
            <legend className="text-lg font-semibold mb-4 border-b pb-3 border-slate-600 text-slate-200 w-full">ข้อมูลสุขภาพ</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <div className="md:col-span-2">
                <label htmlFor="allergies" className="block text-sm font-semibold text-slate-300 mb-1">ประวัติการแพ้ยา (หากมี)</label>
                <textarea id="allergies" value={allergies} onChange={(e) => setAllergies(e.target.value)} rows="3" className="block w-full p-3 bg-slate-800 border border-slate-600 rounded-lg shadow-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors duration-150 text-slate-200 placeholder-slate-500" />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="disease" className="block text-sm font-semibold text-slate-300 mb-1">โรคประจำตัว (หากมี)</label>
                <textarea id="disease" value={disease} onChange={(e) => setDisease(e.target.value)} rows="3" className="block w-full p-3 bg-slate-800 border border-slate-600 rounded-lg shadow-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors duration-150 text-slate-200 placeholder-slate-500" />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="weight" className="block text-sm font-semibold text-slate-300 mb-1">น้ำหนัก (กก.)</label>
                <input type="number" id="weight" value={weight} onChange={(e) => setWeight(e.target.value)} required min="0" className="block w-full p-3 bg-slate-800 border border-slate-600 rounded-lg shadow-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors duration-150 text-slate-200 placeholder-slate-500" />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="height" className="block text-sm font-semibold text-slate-300 mb-1">ส่วนสูง (ซม.)</label>
                <input type="number" id="height" value={height} onChange={(e) => setHeight(e.target.value)} required min="0" className="block w-full p-3 bg-slate-800 border border-slate-600 rounded-lg shadow-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors duration-150 text-slate-200 placeholder-slate-500" />
              </div>
            </div>
          </fieldset>

          {/* Fieldset: อาการและความต้องการ */}
          <fieldset className="space-y-4">
            <legend className="text-lg font-semibold mb-4 border-b pb-3 border-slate-600 text-slate-200 w-full">อาการและความต้องการ</legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
              <div className="md:col-span-2">
                <label htmlFor="symptoms" className="block text-sm font-semibold text-slate-300 mb-1">อาการเบื้องต้น</label>
                <textarea id="symptoms" value={symptoms} onChange={(e) => setSymptoms(e.target.value)} required rows="3" className="block w-full p-3 bg-slate-800 border border-slate-600 rounded-lg shadow-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors duration-150 text-slate-200 placeholder-slate-500" />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="desired" className="block text-sm font-semibold text-slate-300 mb-1">วัตถุประสงค์ในการเข้ารับบริการ</label>
                <textarea id="desired" value={desired} onChange={(e) => setDesired(e.target.value)} required rows="3" className="block w-full p-3 bg-slate-800 border border-slate-600 rounded-lg shadow-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors duration-150 text-slate-200 placeholder-slate-500" />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="certificate" className="block text-sm font-semibold text-slate-300 mb-1">ประสงค์จะรับใบรับรองแพทย์หรือไม่</label>
                <select id="certificate" value={certificate} onChange={(e) => setCertificate(e.target.value)} required className="block w-full p-3 bg-slate-800 border border-slate-600 rounded-lg shadow-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-colors duration-150 text-slate-200">
                  <option value="">เลือก</option>
                  <option value="รับ">รับ</option>
                  <option value="ไม่รับ">ไม่รับ</option>
                </select>
              </div>
            </div>
          </fieldset>

        {/* Consent Checkbox: ส่วนการให้ความยินยอม */}
        <div className="pt-4">
          <label htmlFor="consent" className="flex items-start gap-x-3">
            <input type="checkbox" id="consent" checked={consentChecked} onChange={(e) => setConsentChecked(e.target.checked)} required className="mt-1 h-5 w-5 text-violet-500 bg-slate-700 border-slate-500 rounded focus:ring-violet-600 focus:ring-offset-slate-800" />
            <span className="text-sm text-slate-400">
              ข้าพเจ้ายินยอมให้ข้อมูลและตกลงรับการรักษาผ่านระบบ Telemedicine ตาม
              <Link href="/terms" target="_blank" className="text-cyan-400 hover:underline ml-1 font-medium">ข้อตกลงและเงื่อนไขการให้บริการ</Link>
            </span>
          </label>
        </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={isSubmitDisabled} 
            className={`w-full text-white py-3 px-4 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition-all duration-300 shadow-sm text-lg
              ${isSubmitDisabled 
                ? 'bg-slate-600 cursor-not-allowed' 
                : 'bg-violet-600 hover:bg-violet-700 hover:shadow-lg hover:shadow-violet-500/30 transform hover:scale-105'
              }`}
          >
           {loading ? 'กำลังลงทะเบียน...' : 'ลงทะเบียน'}
          </button>
       </form>

       {/* Error/Success Message Area */}
       {message && (
        <p className={`mt-6 text-center p-3 rounded-lg text-sm ${message.startsWith('เกิดข้อผิดพลาด') ? 'bg-red-500/10 border border-red-500/20 text-red-400' : 'bg-green-500/10 border border-green-500/20 text-green-400'}`}>
           {message}
         </p>
       )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-md transform p-6 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 mb-4">
              <span className="text-4xl text-green-400">✓</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-50">ลงทะเบียนสำเร็จ!</h3>
            <p className="mt-2 text-slate-400">ข้อมูลของท่านได้รับการบันทึกเรียบร้อยแล้ว เจ้าหน้าที่จะติดต่อกลับไปเพื่อยืนยันนัดหมาย</p>
            <div className="mt-6">
              <button
                type="button"
                onClick={() => router.push('/')}
                className="w-full bg-violet-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition-all duration-200 ease-in-out shadow-sm hover:shadow-lg transform hover:scale-105 active:scale-100"
              >
                กลับสู่หน้าหลัก
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
