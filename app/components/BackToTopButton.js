'use client';

import { useEffect, useState } from 'react';

export default function BackToTopButton() {
  // State สำหรับควบคุมการแสดงผลของปุ่ม
  const [isVisible, setIsVisible] = useState(false);

  /**
   * ฟังก์ชันสำหรับตรวจสอบตำแหน่งการ scroll ของหน้าจอ
   * และตั้งค่า state 'isVisible' เพื่อแสดงหรือซ่อนปุ่ม
   */
  const toggleVisibility = () => {
    // ถ้าผู้ใช้เลื่อนหน้าจอลงมามากกว่า 300px ให้แสดงปุ่ม
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  /**
   * ฟังก์ชันสำหรับเลื่อนหน้าจอขึ้นไปด้านบนสุดอย่างนุ่มนวล
   */
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  
  // useEffect hook สำหรับเพิ่มและลบ event listener
  useEffect(() => {
    // เพิ่ม event listener 'scroll' เมื่อคอมโพเนนต์ถูก mount
    window.addEventListener('scroll', toggleVisibility);

    // Cleanup function: ลบ event listener เมื่อคอมโพเนนต์ถูก unmount
    // เพื่อป้องกัน memory leak
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    // ใช้ Fragment (<>) เพื่อให้สามารถ return JSX ได้โดยไม่ต้องมี parent element จริง
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 h-12 w-12 flex items-center justify-center rounded-full bg-indigo-600 text-white text-2xl font-bold shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 opacity-100 hover:scale-110"
          aria-label="Go to top"
        >
          ↑
        </button>
      )}
    </>
  );
}