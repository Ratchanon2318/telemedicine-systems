'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { registerUser, findPatientByNationalId } from './actions'; 
import LoadingOverlay from '../components/LoadingOverlay';

export default function OldPatientRegistrationPage() {
    const router = useRouter();

    // State สำหรับจัดการ Modal และสถานะการโหลด
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showNotFoundModal, setShowNotFoundModal] = useState(false);
    const [showCertificateModal, setShowCertificateModal] = useState(false);
    const [isRequestingMeds, setIsRequestingMeds] = useState(false);
    const [loadingText, setLoadingText] = useState('');

    // State สำหรับฟอร์มขอรับยาเดิม
    const [medsNationalId, setMedsNationalId] = useState('');
    const [medsRequestMessage, setMedsRequestMessage] = useState('');
    
    // State สำหรับเก็บข้อมูลผู้ป่วยที่ค้นเจอ เพื่อนำไปใช้ต่อ
    const [foundPatientForMeds, setFoundPatientForMeds] = useState(null);

    /**
     * ฟังก์ชันสำหรับคำนวณอายุจากวันเดือนปีเกิด
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

    // เงื่อนไขในการปิด/เปิดใช้งานปุ่มค้นหา
    const isSearchDisabled = isRequestingMeds || !medsNationalId || medsNationalId.length !== 13;

    /**
     * ฟังก์ชันจัดการการค้นหาประวัติผู้ป่วยเก่า
     * เมื่อกดปุ่ม "ค้นหาประวัติ"
     */
    const handleRequestPreviousMedication = async () => {
        if (!medsNationalId || medsNationalId.length !== 13) {
            setMedsRequestMessage('กรุณากรอกเลขบัตรประชาชน 13 หลักให้ถูกต้อง');
            return;
        }
        setIsRequestingMeds(true);
        setLoadingText('กำลังค้นหาประวัติ กรุณารอสักครู่...');
        setMedsRequestMessage(''); // Clear previous messages

        // เรียก Server Action เพื่อค้นหาผู้ป่วยจากเลขบัตรประชาชน
        const result = await findPatientByNationalId(medsNationalId);

        // ถ้าค้นหาสำเร็จและพบข้อมูลผู้ป่วย
        if (result.success && result.patient) {
            setFoundPatientForMeds(result.patient); // เก็บข้อมูลผู้ป่วยไว้ใน state
            setShowCertificateModal(true); // แสดง Modal ถามเรื่องใบรับรองแพทย์
            setMedsRequestMessage('');
        } else { // ถ้าไม่พบข้อมูล
            setMedsRequestMessage('');
            setShowNotFoundModal(true); // แสดง Modal ว่าไม่พบข้อมูล
        }
        setIsRequestingMeds(false);
    };

    /**
     * ฟังก์ชันจัดการเมื่อผู้ใช้เลือกเรื่องใบรับรองแพทย์ (รับ/ไม่รับ)
     * @param {string} certificateChoice - ตัวเลือก 'รับ' หรือ 'ไม่รับ'
     */
    const handleCertificateChoice = async (certificateChoice) => {
        setShowCertificateModal(false);
        if (!foundPatientForMeds) return;

        // เริ่มกระบวนการลงทะเบียน
        setIsRequestingMeds(true);
        setLoadingText('กำลังลงทะเบียน กรุณารอสักครู่...');

        // เตรียมข้อมูลที่จะส่งไปลงทะเบียน
        const p = foundPatientForMeds;
        const age = calculateAge(p.dob);

        // สร้าง object ข้อมูลการลงทะเบียน โดยใช้ข้อมูลเดิมของผู้ป่วย
        // และเพิ่มข้อมูลใหม่ (อาการ, วัตถุประสงค์, ใบรับรองแพทย์)
        const registrationData = {
            ...p,
            symptoms: 'ขอรับยาเดิม',
            desired: 'ขอรับยาเดิม',
            certificate: certificateChoice,
            age: age ? age.toString() : '',
        };

        // เรียก Server Action เพื่อลงทะเบียน (isReturningPatient = true)
        const result = await registerUser(registrationData, true);

        // จัดการผลลัพธ์
        if (result.success) {
            setMedsRequestMessage('');
            setShowSuccessModal(true); // แสดง Modal ลงทะเบียนสำเร็จ
            setMedsNationalId(''); // Clear input on success
        } else {
            setMedsRequestMessage(`เกิดข้อผิดพลาด: ${result.error || 'ไม่สามารถลงทะเบียนได้'}`);
        }

        setIsRequestingMeds(false);
        setFoundPatientForMeds(null); // ล้างข้อมูลผู้ป่วยที่เคยค้นเจอ
    };

    return (
        <div className="min-h-screen bg-slate-900 text-slate-300 flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <div className="max-w-2xl w-full bg-slate-800/50 backdrop-blur-sm border border-slate-700 p-8 sm:p-12 rounded-2xl shadow-2xl shadow-violet-500/10">
                <div className="text-center mb-10">
                    <h1 className="text-3xl sm:text-4xl font-bold text-slate-50">
                        ผู้ป่วยเก่า
                    </h1>
                    <p className="mt-3 text-lg text-slate-400">
                        สำหรับผู้ป่วยที่มีประวัติกับทางโรงพยาบาลแล้ว และต้องการขอรับยาเดิม
                    </p>
                </div>

                <div className="space-y-6">
                    <div>
                        <label htmlFor="nationalId" className="block text-sm font-semibold text-slate-300 mb-2">
                            เลขบัตรประจำตัวประชาชน
                        </label>
                        <div className="flex flex-col sm:flex-row items-stretch gap-3">
                        <input
                                type="tel"
                                inputMode="numeric"
                                id="nationalId"
                                value={medsNationalId}
                                onChange={(e) => setMedsNationalId(e.target.value.replace(/\D/g, ''))}
                                placeholder="กรอกเลขบัตรประชาชน 13 หลัก"
                                maxLength="13"
                                className="block w-full flex-grow p-3 bg-slate-800 border border-slate-600 rounded-lg shadow-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all duration-200 ease-in-out text-slate-200 placeholder-slate-500"
                                disabled={isRequestingMeds}
                            />
                            <button
                                type="button"
                                onClick={handleRequestPreviousMedication}
                                disabled={isSearchDisabled}
                                className={`w-full sm:w-auto text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200 ease-in-out flex items-center justify-center 
                                    ${isSearchDisabled 
                                        ? 'bg-slate-600 cursor-not-allowed' 
                                        : 'bg-violet-600 hover:bg-violet-700 transform hover:scale-105 active:scale-100'
                                    }`}
                            >
                                ค้นหาประวัติ
                            </button>
                        </div>
                        {medsRequestMessage && <p className="mt-2 text-sm text-red-400">{medsRequestMessage}</p>}
                    </div>
                </div>

                <div className="mt-8 text-center text-sm text-slate-400">
                    <p>หากท่านเป็นผู้ป่วยใหม่ กรุณา <Link href="/PatientRegister" className="font-medium text-cyan-400 hover:text-cyan-300 transition-colors duration-150">ลงทะเบียนที่นี่</Link></p>
                </div>

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

                {showNotFoundModal && (
                    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-md transform p-6 text-center">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10 mb-4">
                                <span className="text-4xl text-red-400">!</span>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-50">ไม่พบข้อมูลผู้ป่วย</h3>
                            <p className="mt-2 text-slate-400">
                                ไม่พบข้อมูลจากเลขบัตรประชาชนนี้ กรุณาตรวจสอบความถูกต้อง หรือลงทะเบียนเป็นผู้ป่วยใหม่
                            </p>
                            <div className="mt-6 flex flex-col sm:flex-row-reverse gap-3">
                                <button
                                    type="button"
                                    onClick={() => router.push('/PatientRegister')}
                                    className="w-full sm:w-auto bg-violet-600 text-white py-2.5 px-4 rounded-lg font-semibold hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition-all duration-200 ease-in-out shadow-sm hover:shadow-lg transform hover:scale-105 active:scale-100"
                                >
                                    ลงทะเบียนทันที
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowNotFoundModal(false)}
                                    className="w-full sm:w-auto bg-slate-700 text-slate-300 py-2.5 px-4 rounded-lg font-semibold hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-all duration-200 ease-in-out border border-slate-600 transform hover:scale-105 active:scale-100"
                                >
                                    ลองอีกครั้ง
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {showCertificateModal && (
                    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-md transform p-6 text-center">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500/10 mb-4">
                                <span className="text-4xl text-cyan-400">?</span>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-50">ต้องการใบรับรองแพทย์หรือไม่?</h3>
                            <p className="mt-2 text-slate-400">ท่านสามารถเลือกรับใบรับรองแพทย์ได้ โดยจะมีค่าใช้จ่ายเพิ่มเติม (ถ้ามี)</p>
                            <div className="mt-6 flex flex-col sm:flex-row-reverse gap-3">
                                <button
                                    type="button"
                                    onClick={() => handleCertificateChoice('รับ')}
                                    className="w-full sm:w-auto bg-green-600 text-white py-2.5 px-4 rounded-lg font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 ease-in-out shadow-sm hover:shadow-lg transform hover:scale-105 active:scale-100"
                                >
                                    รับใบรับรองแพทย์
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleCertificateChoice('ไม่รับ')}
                                    className="w-full sm:w-auto bg-slate-700 text-slate-300 py-2.5 px-4 rounded-lg font-semibold hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-all duration-200 ease-in-out border border-slate-600 transform hover:scale-105 active:scale-100"
                                >
                                    ไม่, ขอบคุณ
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <LoadingOverlay isLoading={isRequestingMeds} text={loadingText} />
            </div>
        </div>
    );
}
