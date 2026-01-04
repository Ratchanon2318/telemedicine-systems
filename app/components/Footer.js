
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

/**
 * Helper Component: แสดงไอคอน Facebook
 */
const FacebookIcon = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="currentColor"
        {...props}
    >
        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3l-.5 3h-2.5v6.8A10.002 10.002 0 0 0 22 12z" />
    </svg>
);

/**
 * Helper Component: แสดงไอคอน Tiktok
 */
const TiktokIcon = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        fill="currentColor"
        {...props}
    >
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.04-5.36-.01-4.03-.01-8.05.02-12.07z" />
    </svg>
);

/**
 * คอมโพเนนต์สำหรับแสดงส่วนท้าย (Footer) ของเว็บไซต์
 */
const Footer = () => {
    // คำนวณปีปัจจุบันและแปลงเป็นปีพุทธศักราชสำหรับแสดงลิขสิทธิ์
    const currentYear = new Date().getFullYear();
    const buddhistYear = currentYear + 543;

    return (
        <footer className="bg-slate-900 border-t border-slate-800">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">                    
                    {/* คอลัมน์ที่ 1: เกี่ยวกับโรงพยาบาลและโซเชียลมีเดีย */}
                    <div className="md:col-span-2 lg:col-span-2">
                        <Link href="/" className="flex items-center space-x-3 mb-4">
                            <Image
                                src="/logo.png"
                                alt="KPPMCH Logo"
                                width={40}
                                height={40}
                                className="h-10 w-auto mix-blend-screen"
                            />
                            <span className="text-xl font-semibold text-slate-200">โรงพยาบาลชุมชนเทศบาลเมืองกำแพงเพชร</span>
                        </Link>
                        <p className="text-slate-400 text-sm max-w-md">
                            เว็บไซต์นี้เป็นส่วนหนึ่งของบริการการแพทย์ทางไกล (Telemedicine) พัฒนาโดยโรงพยาบาลชุมชนเทศบาลเมืองกำแพงเพชร
                        </p>
                        <div className="mt-6">
                            <h3 className="text-md font-semibold text-slate-200 mb-3">ติดตามเรา</h3>
                            <div className="flex space-x-4">
                                <a href="https://www.facebook.com/kmch.kpp" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-blue-500 transition-colors" aria-label="Facebook">
                                    <FacebookIcon className="h-6 w-6" />
                                </a>
                                <a href="https://www.tiktok.com/@kppmuch?_t=ZS-8zi6FyEyffr&_r=1" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-200 transition-colors" aria-label="Tiktok">
                                    <TiktokIcon className="h-6 w-6" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* คอลัมน์ที่ 2: ลิงก์ด่วน */}
                    <div>
                        <h3 className="text-md font-semibold text-slate-200 mb-4">ลิงก์ด่วน</h3>
                        <ul className="space-y-2">
                            <li><Link href="/" className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">หน้าหลัก</Link></li>
                            <li><Link href="/what-is-it" className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">คืออะไร</Link></li>

                            <li><Link href="/PatientRegister" className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">ลงทะเบียนพบแพทย์</Link></li>
                            <li><Link href="/terms" className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">ข้อตกลงและเงื่อนไข</Link></li>
                            <li><Link href="/contact" className="text-sm text-slate-400 hover:text-cyan-400 transition-colors">ติดต่อเรา</Link></li>
                        </ul>
                    </div>

                    {/* คอลัมน์ที่ 3: ข้อมูลติดต่อ */}
                    <div>
                        <h3 className="text-md font-semibold text-slate-200 mb-4">ติดต่อ</h3>
                        <ul className="space-y-3 text-sm">
                            <li>
                                <span className="text-slate-400"><strong>ที่อยู่:</strong> 35 ซ.2 ถ.ราชดำเนิน 1 ต.ในเมือง อ.เมือง จ.กำแพงเพชร 62000</span>
                            </li>
                            <li>
                                <span className="text-slate-400"><strong>โทร:</strong> 055-716-715</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* แถบด้านล่าง: แสดงลิขสิทธิ์และลิงก์นโยบาย */}
                <div className="mt-12 border-t border-slate-800 pt-6 text-center md:flex md:justify-between md:items-center">
                    <p className="text-sm text-slate-500 mb-4 md:mb-0">
                        ลิขสิทธิ์ © {buddhistYear} โรงพยาบาลชุมชนเทศบาลเมืองกำแพงเพชร.
                    </p>
                    <nav className="flex justify-center flex-wrap gap-x-6 gap-y-2">
                        <Link href="privacy" className="text-sm text-slate-500 hover:text-cyan-400 transition-colors">นโยบายความเป็นส่วนตัว</Link>
                        <Link href="terms" className="text-sm text-slate-500 hover:text-cyan-400 transition-colors">ข้อตกลงและเงื่อนไขการให้บริการ</Link>
                    </nav>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
