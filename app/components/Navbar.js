'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

/**
 * คอมโพเนนต์สำหรับแสดงแถบนำทาง (Navigation Bar) ด้านบนของเว็บไซต์
 */
export default function Navbar() {
  // State สำหรับควบคุมการเปิด/ปิดเมนูบนมือถือ
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-slate-900 border-b border-slate-700 shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* ส่วนโลโก้และชื่อเว็บไซต์ */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/logo.png"
                alt="KPPMCH Logo"
                width={40}
                height={40}
                className="h-8 w-auto"
              />
              <span className="hidden md:inline text-xl font-bold text-slate-50">
                บริการ Telemedicine โรงพยาบาลชุมชนเทศบาลเมืองกำแพงเพชร
              </span>
              <span className="inline md:hidden text-lg font-bold text-slate-50">
                KPPMCH Telemedicine
              </span>
            </Link>
          </div>

          {/* เมนูสำหรับหน้าจอเดสก์ท็อป (ซ่อนบนมือถือ) */}
          <nav className="hidden md:flex items-center">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/" className="text-slate-300 hover:bg-slate-800 hover:text-slate-50 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                หน้าหลัก
              </Link>
              <Link href="/what-is-it" className="text-slate-300 hover:bg-slate-800 hover:text-slate-50 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                คืออะไร
              </Link>
              
              
              <Link href="/contact" className="text-slate-300 hover:bg-slate-800 hover:text-slate-50 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                ติดต่อเรา
              </Link>
             
              <Link href="/PatientRegister" className="text-slate-300 hover:bg-slate-800 hover:text-slate-50 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                ลงทะเบียน
              </Link>             
            </div>
          </nav>

          {/* ปุ่มสำหรับเปิดเมนูบนมือถือ (แสดงเฉพาะบนมือถือ) */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-violet-500"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ส่วนเมนูสำหรับมือถือ (จะแสดงเมื่อ state 'isOpen' เป็น true) */}
      {isOpen && (
        <nav className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-slate-700" onClick={() => setIsOpen(false)}>
            <Link href="/" className="text-slate-300 hover:bg-slate-800 hover:text-slate-50 block px-3 py-2 rounded-md text-base font-medium transition-colors">หน้าหลัก</Link>
            <Link href="/what-is-it" className="text-slate-300 hover:bg-slate-800 hover:text-slate-50 block px-3 py-2 rounded-md text-base font-medium transition-colors">คืออะไร</Link>
            
            <Link href="/contact" className="text-slate-300 hover:bg-slate-800 hover:text-slate-50 block px-3 py-2 rounded-md text-base font-medium transition-colors">ติดต่อเรา</Link>
          
            <Link href="/PatientRegister" className="text-slate-300 hover:bg-slate-800 hover:text-slate-50 block px-3 py-2 rounded-md text-base font-medium transition-colors">ลงทะเบียน</Link>
          </div>
        </nav>
      )}
    </header>
  );
}