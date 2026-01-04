
// Import ไฟล์ CSS หลักและคอมโพเนนต์ที่ใช้ร่วมกันทุกหน้า
import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LineAddFriend from './components/LineAddFriend'

// Metadata สำหรับ SEO และการแชร์ลงโซเชียลมีเดีย (Open Graph)
// ข้อมูลเหล่านี้จะถูกนำไปใช้ใน <head> ของทุกหน้า
export const metadata = {
  title: 'บริการ Telemedicine - โรงพยาบาลชุมชนเทศบาลเมืองกำแพงเพชร',
  metadataBase: new URL('https://kppmch-register.vercel.app/'),
  description: 'ลงทะเบียนเพื่อรับบริการการแพทย์ทางไกล (Telemedicine) กับโรงพยาบาลชุมชนเทศบาลเมืองกำแพงเพชร สะดวก รวดเร็ว ปลอดภัย',
  keywords: [
    'Telemedicine',
    'แพทย์ทางไกล',
    'ลงทะเบียน',
    'โรงพยาบาลชุมชนเทศบาลเมืองกำแพงเพชร',
    'สุขภาพ',
    'การแพทย์',
  ],
  openGraph: {
    title: 'บริการ Telemedicine - โรงพยาบาลชุมชนเทศบาลเมืองกำแพงเพชร',
    description: 'ลงทะเบียนเพื่อรับบริการการแพทย์ทางไกล (Telemedicine) กับโรงพยาบาลชุมชนเทศบาลเมืองกำแพงเพชร',
    type: 'website',
    locale: 'th_TH',
    url: 'https://kppmch-register.vercel.app/', // URL จริงของเว็บไซต์
    siteName: 'บริการ Telemedicine - โรงพยาบาลชุมชนเทศบาลเมืองกำแพงเพชร', // ชื่อเว็บไซต์สำหรับ Open Graph
    images: [
      {
        url: '/og-image.png', // Path ของรูปภาพสำหรับแสดงเมื่อแชร์ลิงก์ (og:image)
      },
    ],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
};

/**
 * RootLayout เป็นคอมโพเนนต์หลักที่จะครอบทุกหน้าในแอปพลิเคชัน
 * @param {React.ReactNode} children - เนื้อหาของแต่ละหน้าที่ถูกส่งเข้ามา
 */
export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body className="bg-slate-900">
        <Navbar /> {/* แสดง Navbar ด้านบนสุดของทุกหน้า */}
        <main>
          {children}
        </main>
        <Footer />
        <LineAddFriend />
      </body>
    </html>
  )
}