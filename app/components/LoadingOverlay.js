'use client';

// Bouncing dots animation - v2
import { motion, AnimatePresence } from 'framer-motion';

/**
 * คอมโพเนนต์ย่อยสำหรับแสดงอนิเมชันจุดกระพริบ (Loading Spinner)
 */
const LoadingSpinner = () => (
    <div className="flex space-x-2" aria-label="Loading">
        <motion.div
            className="h-3 w-3 rounded-full bg-indigo-600"
            animate={{ y: ["0rem", "-0.75rem", "0rem"] }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
        />
        <motion.div
            className="h-3 w-3 rounded-full bg-indigo-600"
            animate={{ y: ["0rem", "-0.75rem", "0rem"] }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.25 }}
        />
        <motion.div
            className="h-3 w-3 rounded-full bg-indigo-600"
            animate={{ y: ["0rem", "-0.75rem", "0rem"] }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        />
    </div>
);

/**
 * คอมโพเนนต์สำหรับแสดงหน้าจอ Loading แบบเต็มหน้าจอ (Overlay)
 * @param {boolean} isLoading - สถานะที่บอกว่ากำลังโหลดอยู่หรือไม่
 * @param {string} text - ข้อความที่จะแสดงใต้ animation (มีค่า default)
 */
export default function LoadingOverlay({ isLoading, text = "กำลังดำเนินการ..." }) {
    return (
        // AnimatePresence ใช้สำหรับจัดการ animation ของ component ที่มีการเพิ่มหรือลบออกจาก DOM
        <AnimatePresence>
            {isLoading && (
                // motion.div คือ div ที่สามารถใส่ props ของ framer-motion ได้
                <motion.div
                    key="loading-overlay"
                    // Animation ตอนปรากฏและหายไป
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    // Styling ของ overlay
                    className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                    aria-modal="true"
                    role="dialog"
                >
                    <motion.div
                        key="loading-box"
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        // Styling ของกล่องข้อความ
                        className="bg-white rounded-2xl shadow-xl flex flex-col items-center justify-center p-8 w-full max-w-xs text-center"
                    >
                        <div className="flex h-12 items-center justify-center">
                            <LoadingSpinner />
                        </div>
                        <p className="mt-4 text-slate-700 font-semibold text-lg">{text}</p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}