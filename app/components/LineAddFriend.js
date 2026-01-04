'use client';

import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';

/**
 * คอมโพเนนต์สำหรับแสดงป้ายโฆษณา "เพิ่มเพื่อนใน LINE" ที่ด้านล่างของหน้าจอ
 * เมื่อคลิกจะเปิดหน้าเพิ่มเพื่อนในแอปพลิเคชัน LINE
 */
const LineAddFriend = () => {
  // LINE ID ของโรงพยาบาล
  const lineId = "@133rkonx";
  const lineAddUrl = `https://line.me/R/ti/p/${lineId}`;
  const [isVisible, setIsVisible] = React.useState(true);

  if (!isVisible) {
    return null;
  }

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 400, damping: 40 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-slate-800/80 backdrop-blur-md border-t border-slate-700 shadow-[0_-4px_30px_rgba(0,0,0,0.3)]"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Text Section */}
            <div className="text-center sm:text-left">
              <h3 className="font-bold text-lg text-slate-50">ปรึกษาปัญหาสุขภาพกับเรา</h3>
              <p className="text-sm text-slate-400">เพิ่มเพื่อนใน LINE เพื่อรับข่าวสารและนัดหมายแพทย์ได้สะดวกยิ่งขึ้น</p>
            </div>
            {/* Button Section */}
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <a
                href={lineAddUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-grow sm:flex-grow-0 inline-flex items-center justify-center px-6 py-3 bg-[#00B900] text-white font-bold rounded-lg shadow-lg hover:bg-[#00A300] transition-all duration-300 transform hover:scale-105"
              >
                <span>เพิ่มเพื่อนทันที</span>
              </a>
              <button
                onClick={handleClose}
                aria-label="ปิด"
                className="p-2 rounded-full text-slate-400 hover:bg-slate-700/50 hover:text-slate-200 transition-colors duration-200"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </motion.div>}
    </AnimatePresence>
  );
};

export default LineAddFriend;