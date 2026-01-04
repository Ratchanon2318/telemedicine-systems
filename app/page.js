'use client';

import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import BackToTopButton from './components/BackToTopButton';

// ข้อมูลสำหรับส่วนคำถามที่พบบ่อย (FAQ)
const faqData = [
  {
    question: "บริการ Telemedicine เหมาะกับใคร?",
    answer: "เหมาะสำหรับผู้ป่วยที่มีอาการไม่รุนแรง, ผู้ป่วยโรคเรื้อรังที่ต้องการติดตามอาการ, ผู้ที่ต้องการคำปรึกษาด้านสุขภาพทั่วไป หรือผู้ที่ไม่สะดวกเดินทางมาโรงพยาบาล"
  },
  {
    question: "ต้องใช้อุปกรณ์อะไรบ้าง?",
    answer: "คุณต้องมีสมาร์ทโฟน, แท็บเล็ต, หรือคอมพิวเตอร์ที่มีกล้อง, ไมโครโฟน และเชื่อมต่ออินเทอร์เน็ตความเร็วสูงได้"
  },
  {
    question: "ค่าบริการเท่าไหร่ และสามารถใช้สิทธิ์ประกันได้หรือไม่?",
    answer: "ค่าบริการจะแตกต่างกันไปขึ้นอยู่กับแผนกและแพทย์ผู้ให้คำปรึกษา กรุณาติดต่อสอบถามข้อมูลเพิ่มเติมเกี่ยวกับค่าใช้จ่ายและการใช้สิทธิ์ประกันต่างๆ กับทางโรงพยาบาลโดยตรง"
  },
  {
    question: "ข้อมูลของฉันจะปลอดภัยหรือไม่?",
    answer: "เราใช้ระบบที่มีมาตรฐานความปลอดภัยสูงในการเก็บรักษาข้อมูลส่วนบุคคลและข้อมูลการรักษาของคุณ การสนทนาระหว่างคุณและแพทย์จะถูกเข้ารหัสเพื่อความเป็นส่วนตัวสูงสุด"
  }
];

/**
 * คอมโพเนนต์สำหรับแสดงรายการคำถาม-คำตอบในรูปแบบ Accordion
 * @param {string} question - คำถาม
 * @param {string} answer - คำตอบ
 * @param {boolean} isOpen - สถานะว่ารายการนี้กำลังเปิดอยู่หรือไม่
 * @param {function} onClick - ฟังก์ชันที่จะถูกเรียกเมื่อคลิก
 */
const AccordionItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-slate-700">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center text-left py-5 px-2"
      >
        <span className="text-lg font-medium text-slate-100">{question}</span>
        <span className="text-2xl font-light text-slate-400">
          {isOpen ? '-' : '+'}
        </span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <p className="pb-5 px-2 text-slate-400">{answer}</p>
      </motion.div>
    </div>
  );
};

// คอมโพเนนต์หลักสำหรับหน้า Landing Page
export default function Page() {
  return (
    <div className="bg-slate-900 text-slate-300 font-sans antialiased min-h-screen">
      {/* Background Grid Pattern */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#2d3748_1px,transparent_1px)] [background-size:32px_32px] -z-10"></div>

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          {/* Aurora-style background gradient */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-[800px] max-w-[1200px] bg-[radial-gradient(ellipse_50%_40%_at_50%_0%,rgba(139,92,246,0.25),rgba(255,255,255,0))] -z-10"
            aria-hidden="true"
          ></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="py-24 md:py-32 text-left md:text-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-50"
              >
                บริการการแพทย์ทางไกล
                <span className="mt-2 block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-500">Telemedicine</span>
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4"
              >
                <Link href="/PatientRegister" className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-semibold rounded-lg text-white bg-violet-600 hover:bg-violet-700 transform transition-all duration-300 hover:scale-105 shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50">
                  ลงทะเบียนพบแพทย์
                </Link>
                <Link href="https://telemedscheduler.vercel.app/" targ className="inline-flex items-center justify-center px-8 py-3 border border-slate-600 text-base font-semibold rounded-lg text-slate-300 bg-transparent hover:bg-slate-800/50 backdrop-blur-sm transition-colors duration-300">
                  ค้นหาวัน-เวลานัดหมาย
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
                className="mt-16 md:mt-24"
              >
                <Image
                  src="/content/telemedicine-simulator.png"
                  alt="แพทย์ให้คำปรึกษาผ่าน Telemedicine"
                  width={450}
                  height={450}
                  priority={true}
                  className="mx-auto"
                />
              </motion.div>
            </div>
          </div>
        </section>
       
        {/* What is it Section */}
        <section id="what-is-it" className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col-reverse md:flex-row items-center gap-12 lg:gap-16">
              {/* Image Column */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
                className="md:w-5/12"
              >
                <Image
                  src="/content/what-is-it.png"
                  alt="ภาพประกอบบริการ Telemedicine"
                  width={500}
                  height={500}
                  className="rounded-xl shadow-2xl shadow-indigo-500/10 object-cover w-full h-auto"
                />
              </motion.div>
              {/* Text Column */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
                className="md:w-7/12 text-left"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-slate-50">บริการการแพทย์ทางไกล (Telemedicine) คืออะไร?</h2>
                <p className="mt-4 text-lg text-slate-400 leading-relaxed">
                  Telemedicine คือการนำเทคโนโลยีการสื่อสารมาประยุกต์ใช้ในการให้บริการด้านสาธารณสุข เพื่อให้ผู้ป่วยและบุคลากรทางการแพทย์สามารถพูดคุย ปรึกษา วินิจฉัย และติดตามการรักษาได้จากระยะไกล...{' '}
                  <Link href="/what-is-it" className="text-cyan-400 hover:text-cyan-300 font-semibold">
                    อ่านต่อ
                  </Link>
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        

        {/* How it works Section */}
        <section id="how-it-works" className="py-16 md:py-24 bg-slate-900/70 backdrop-blur-sm scroll-mt-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-left md:text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-50">3 ขั้นตอนง่ายๆ ในการเข้ารับบริการ</h2>
              <p className="mt-4 text-lg text-slate-400">
                เริ่มต้นประสบการณ์การดูแลสุขภาพยุคใหม่ได้ในไม่กี่ขั้นตอน
              </p>
            </div>
            <div className="relative mt-16 md:mt-20">
              {/* The connecting line for desktop view */}
              <div className="hidden md:block absolute top-10 left-0 w-full h-0.5 bg-slate-800" aria-hidden="true">
                <div className="absolute top-1/2 left-1/2 w-[calc(100%-20rem)] h-0.5 -translate-x-1/2 -translate-y-1/2 border-t-2 border-dashed border-slate-700"></div>
              </div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={{
                  visible: { transition: { staggerChildren: 0.2 } },
                  hidden: {},
                }}
                className="relative grid gap-12 md:grid-cols-3 text-left md:text-center"
              >
                {/* Step 1 */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
                  }}
                  className="relative p-4"
                >
                  <div className="relative flex items-center justify-center h-20 w-20 rounded-full bg-slate-800 border-2 border-violet-500 mx-auto mb-6 shadow-lg shadow-violet-500/10">
                    <span className="text-3xl font-bold text-slate-50">1</span>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-100">ลงทะเบียนและทำนัด</h3>
                  <p className="mt-2 text-slate-400">กรอกข้อมูลส่วนตัวและอาการเบื้องต้นเพื่อทำการนัดหมายพบแพทย์</p>
                </motion.div>
                {/* Step 2 */}
                <motion.div
                  variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
                  className="relative p-4"
                >
                  <div className="relative flex items-center justify-center h-20 w-20 rounded-full bg-slate-800 border-2 border-violet-500 mx-auto mb-6 shadow-lg shadow-violet-500/10">
                    <span className="text-3xl font-bold text-slate-50">2</span>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-100">พบแพทย์ผ่านวิดีโอคอล</h3>
                  <p className="mt-2 text-slate-400">ปรึกษาปัญหาสุขภาพกับแพทย์ผู้เชี่ยวชาญผ่านระบบวิดีโอคอลที่ปลอดภัย</p>
                </motion.div>
                {/* Step 3 */}
                <motion.div
                  variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
                  className="relative p-4"
                >
                  <div className="relative flex items-center justify-center h-20 w-20 rounded-full bg-slate-800 border-2 border-violet-500 mx-auto mb-6 shadow-lg shadow-violet-500/10">
                    <span className="text-3xl font-bold text-slate-50">3</span>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-100">รับยาและเอกสาร</h3>
                  <p className="mt-2 text-slate-400">ขณะนี้โรงพยาบาลยังไม่มีบริการส่งยาและใบรับรองแพทย์ กรุณามารับด้วยตนเองที่โรงพยาบาล</p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Advantages Section */}
        <section id="advantages" className="py-16 md:py-24 scroll-mt-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-left md:text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-50">ข้อดีของบริการ Telemedicine</h2>
              <p className="mt-4 text-lg text-slate-400">
                สัมผัสประสบการณ์การดูแลสุขภาพที่สะดวกสบายและเข้าถึงง่ายกว่าที่เคย
              </p>
            </div>
            <div className="mt-16 grid md:grid-cols-2 gap-8 lg:gap-12">
              {/* Advantage 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-slate-700 hover:border-violet-500/50 transition-all duration-300"
              >
                <div>
                  <h3 className="font-semibold text-xl text-slate-100">ความสะดวกสบาย</h3>
                  <p className="mt-2 text-slate-400">
                    รับคำปรึกษาจากแพทย์ได้จากทุกที่ โดยไม่ต้องเสียเวลาเดินทางมาโรงพยาบาล
                  </p>
                </div>
              </motion.div>
              {/* Advantage 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
                className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-slate-700 hover:border-violet-500/50 transition-all duration-300"
              >
                <div>
                  <h3 className="font-semibold text-xl text-slate-100">ประหยัดเวลาและค่าใช้จ่าย</h3>
                  <p className="mt-2 text-slate-400">
                    ลดค่าใช้จ่ายในการเดินทางและประหยัดเวลาที่ต้องใช้ในการรอคอยที่โรงพยาบาล
                  </p>
                </div>
              </motion.div>
              {/* Advantage 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
                className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-slate-700 hover:border-violet-500/50 transition-all duration-300"
              >
                <div>
                  <h3 className="font-semibold text-xl text-slate-100">ลดความเสี่ยง</h3>
                  <p className="mt-2 text-slate-400">
                    ลดการสัมผัสและลดความเสี่ยงในการติดเชื้อต่างๆ โดยเฉพาะในสถานการณ์โรคระบาด
                  </p>
                </div>
              </motion.div>
              {/* Advantage 4 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
                className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-slate-700 hover:border-violet-500/50 transition-all duration-300"
              >
                <div>
                  <h3 className="font-semibold text-xl text-slate-100">การดูแลต่อเนื่อง</h3>
                  <p className="mt-2 text-slate-400">
                    เหมาะสำหรับผู้ป่วยโรคเรื้อรังที่ต้องการติดตามอาการกับแพทย์อย่างสม่ำเสมอ
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Limitations Section */}
        <section id="limitations" className="py-16 md:py-24 bg-slate-900/70 backdrop-blur-sm scroll-mt-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-left md:text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-50">ข้อจำกัดของบริการ Telemedicine</h2>
              <p className="mt-4 text-lg text-slate-400">
                เพื่อให้ท่านเข้าใจและใช้บริการได้อย่างเหมาะสม กรุณาทำความเข้าใจข้อจำกัดของบริการดังต่อไปนี้
              </p>
            </div>
            <div className="mt-16 grid md:grid-cols-2 gap-8 lg:gap-12">
              {/* Limitation 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-slate-700 hover:border-red-500/50 transition-all duration-300"
              >
                <div>
                  <h3 className="font-semibold text-xl text-slate-100">ภาวะฉุกเฉินทางการแพทย์</h3>
                  <p className="mt-2 text-slate-400">
                    ไม่เหมาะสำหรับภาวะฉุกเฉินหรืออาการรุนแรงที่ต้องการการรักษาอย่างเร่งด่วน กรุณาติดต่อห้องฉุกเฉินโดยตรง
                  </p>
                </div>
              </motion.div>
              {/* Limitation 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
                className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-slate-700 hover:border-red-500/50 transition-all duration-300"
              >
                <div>
                  <h3 className="font-semibold text-xl text-slate-100">การตรวจร่างกาย</h3>
                  <p className="mt-2 text-slate-400">
                    แพทย์ไม่สามารถทำการตรวจร่างกายได้โดยตรง ซึ่งอาจเป็นข้อจำกัดในการวินิจฉัยบางโรค
                  </p>
                </div>
              </motion.div>
              {/* Limitation 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
                className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-slate-700 hover:border-red-500/50 transition-all duration-300"
              >
                <div>
                  <h3 className="font-semibold text-xl text-slate-100">การออกเอกสารบางประเภท</h3>
                  <p className="mt-2 text-slate-400">
                    การออกใบรับรองแพทย์บางประเภทที่ต้องมีการตรวจร่างกายอย่างละเอียด อาจไม่สามารถทำผ่านระบบนี้ได้
                  </p>
                </div>
              </motion.div>
              {/* Limitation 4 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.3, ease: 'easeOut' }}
                className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-slate-700 hover:border-red-500/50 transition-all duration-300"
              >
                <div>
                  <h3 className="font-semibold text-xl text-slate-100">ปัญหาทางเทคนิค</h3>
                  <p className="mt-2 text-slate-400">
                    คุณภาพของบริการขึ้นอยู่กับความเสถียรของอินเทอร์เน็ตและอุปกรณ์ของท่าน
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-16 md:py-24 scroll-mt-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-left md:text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-50">คำถามที่พบบ่อย (FAQ)</h2>
              <p className="mt-4 text-lg text-slate-400">
                รวบรวมคำถามที่พบบ่อยเพื่อไขข้อสงสัยเกี่ยวกับการใช้บริการ
              </p>
            </div>
            <div className="mt-16 max-w-4xl mx-auto">
              <Accordion />
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 md:py-24 bg-slate-900/70 backdrop-blur-sm scroll-mt-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-left md:text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-50">ติดต่อเรา</h2>
              <p className="mt-4 text-lg text-slate-400">
                หากคุณมีคำถามหรือต้องการข้อมูลเพิ่มเติม สามารถติดต่อเราได้ตามช่องทางด้านล่าง
              </p>
            </div>
            <div className="mt-16 max-w-4xl mx-auto grid md:grid-cols-2 gap-8 text-left">
                <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                    <h3 className="font-semibold text-lg text-slate-100 mb-2">ที่อยู่</h3>
                    <p className="text-slate-400 text-sm">35 ซ.2 ถ.ราชดำเนิน 1 ต.ในเมือง อ.เมือง จ.กำแพงเพชร 62000</p>
                </div>
                <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                    <h3 className="font-semibold text-lg text-slate-100 mb-2">โทรศัพท์</h3>
                    <p className="text-slate-400 text-sm">055-716-715</p>
                </div>
                <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                    <h3 className="font-semibold text-lg text-slate-100 mb-2">อีเมล</h3>
                    <p className="text-slate-400 text-sm">prathom_heath@gmail.com</p>
                </div>
                <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700">
                    <h3 className="font-semibold text-lg text-slate-100 mb-2">เวลาทำการ</h3>
                    <p className="text-slate-400 text-sm">วันจันทร์ - ศุกร์, 08:30 - 16:30 น. (ปิดวันหยุดราชการ)</p>
                </div>
            </div>
            <div className="mt-12 text-center">
                <Link href="/contact" className="inline-flex items-center justify-center px-6 py-2 border border-slate-600 text-base font-semibold rounded-lg text-slate-300 bg-transparent hover:bg-slate-800/50 backdrop-blur-sm transition-colors duration-300">
                  ดูข้อมูลติดต่อเพิ่มเติม
                </Link>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative bg-slate-800/70 backdrop-blur-sm rounded-2xl p-8 md:p-12 lg:p-16 overflow-hidden">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-violet-500/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-violet-500/20 rounded-full blur-2xl"></div>
              <div className="relative z-10 text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-50">พร้อมเริ่มต้นดูแลสุขภาพของคุณแล้วหรือยัง?</h2>
                <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
                  ลงทะเบียนเพื่อรับบริการการแพทย์ทางไกล (Telemedicine) และนัดหมายแพทย์ผู้เชี่ยวชาญได้แล้ววันนี้
                </p>
                <div className="mt-8">
                  <Link href="/PatientRegister" className="inline-flex items-center justify-center px-10 py-4 border border-transparent text-lg font-semibold rounded-lg text-white bg-violet-600 hover:bg-violet-700 transform transition-all duration-300 hover:scale-105 shadow-lg shadow-violet-500/40">
                    ลงทะเบียนพบแพทย์ทันที
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <BackToTopButton />
    </div>
  );
}

/**
 * คอมโพเนนต์สำหรับจัดการการแสดงผลของ Accordion ทั้งหมด
 * โดยใช้ state เพื่อควบคุมว่ารายการไหนกำลังเปิดอยู่
 */
function Accordion() {
  const [openIndex, setOpenIndex] = useState(null);

  const handleClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div>
      {faqData.map((faq, index) => (
        <AccordionItem
          key={index}
          question={faq.question}
          answer={faq.answer}
          isOpen={openIndex === index}
          onClick={() => handleClick(index)}
        />
      ))}
    </div>
  );
}