'use server';

// URL ของ Google Apps Script Web App ที่ทำหน้าที่เป็น Backend สำหรับบันทึกข้อมูลลง Google Sheets
const APPS_SCRIPT_WEB_APP_URL = process.env.APPS_SCRIPT_URL

/**
 * จัดรูปแบบวันที่และเวลาให้อยู่ในรูปแบบภาษาไทยที่อ่านง่าย
 * @param {Date|string} date - วันที่ที่ต้องการจัดรูปแบบ
 * @returns {string} - ข้อความวันที่และเวลาในรูปแบบภาษาไทย (เช่น "18 กรกฎาคม 2567 เวลา 15:30 น.")
 */
function formatThaiDateTime(date) {
    // ตรวจสอบว่าค่าที่รับมาเป็นวันที่ที่ถูกต้องหรือไม่
    if (!date || isNaN(new Date(date).getTime())) {
        console.error("Invalid date value received for date-time formatting:", date);
        return "รูปแบบวันที่และเวลาไม่ถูกต้อง";
    }
    const d = new Date(date);
    // กำหนด options สำหรับการจัดรูปแบบ
    const options = {
        year: 'numeric', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit',
        timeZone: 'Asia/Bangkok'
    };
    // แปลงปี ค.ศ. เป็น พ.ศ.
    const thaiYear = d.getFullYear() + 543;
    const thaiDateTime = new Intl.DateTimeFormat('th-TH', options).format(d);
    // แทนที่ปี ค.ศ. ด้วย พ.ศ. และปรับรูปแบบข้อความให้อ่านง่ายขึ้น
    return thaiDateTime.replace(d.getFullYear().toString(), thaiYear.toString()).replace(' ', ' เวลา ') + ' น.';
}

/**
 * สร้าง Flex Message สำหรับส่งแจ้งเตือนใน LINE
 * @param {object} data - ข้อมูลจากฟอร์มลงทะเบียน
 * @returns {object} - Object ของ Flex Message
 */
const createFlexMessage = (data) => {
    // ดึงข้อมูลที่จำเป็นจาก formData มาสร้างเป็นตัวแปรเพื่อความสะดวก
    const {
        firstName, lastName, phone, symptoms, desired,
        nationalId, gender, dob, age, weight, height,
        allergies, disease, address, certificate
    } = data;

    const registrationDate = new Date();
    const name = `${firstName} ${lastName}`;

    // สร้าง "body" ของ Flex Message ซึ่งเป็นส่วนที่แสดงข้อมูลหลัก
    const bodyContents = [
        // แถว: ชื่อ-สกุล
        {
            type: 'box',
            layout: 'horizontal',
            margin: 'md',
            contents: [
                { type: 'text', text: 'ชื่อ-สกุล:', size: 'sm', color: '#555555', flex: 0, weight: 'bold' },
                { type: 'text', text: name, size: 'sm', color: '#111111', align: 'end', wrap: true }
            ]
        },
        // แถว: เบอร์โทร
        {
            type: 'box',
            layout: 'horizontal',
            margin: 'md',
            contents: [
                { type: 'text', text: 'เบอร์โทร:', size: 'sm', color: '#555555', flex: 0, weight: 'bold' },
                { type: 'text', text: phone, size: 'sm', color: '#111111', align: 'end' }
            ]
        },
        // แถว: เลขบัตรประชาชน
        {
            type: 'box',
            layout: 'horizontal',
            margin: 'md',
            contents: [
                { type: 'text', text: 'เลขบัตรฯ:', size: 'sm', color: '#555555', flex: 0, weight: 'bold' },
                { type: 'text', text: nationalId, size: 'sm', color: '#111111', align: 'end' }
            ]
        },
        // แถว: เพศ
        {
            type: 'box',
            layout: 'horizontal',
            margin: 'md',
            contents: [
                { type: 'text', text: 'เพศ:', size: 'sm', color: '#555555', flex: 0, weight: 'bold' },
                { type: 'text', text: gender, size: 'sm', color: '#111111', align: 'end' }
            ]
        },
        // แถว: วันเกิด
        {
            type: 'box',
            layout: 'horizontal',
            margin: 'md',
            contents: [
                { type: 'text', text: 'วันเกิด:', size: 'sm', color: '#555555', flex: 0, weight: 'bold' },
                { type: 'text', text: dob, size: 'sm', color: '#111111', align: 'end' }
            ]
        },
        // แถว: อายุ
        {
            type: 'box',
            layout: 'horizontal',
            margin: 'md',
            contents: [
                { type: 'text', text: 'อายุ:', size: 'sm', color: '#555555', flex: 0, weight: 'bold' },
                { type: 'text', text: age ? `${age} ปี` : 'ไม่ได้ระบุ', size: 'sm', color: '#111111', align: 'end' }
            ]
        },
        // บล็อก: ที่อยู่ (ใช้ layout vertical เพราะที่อยู่อาจยาว)
        {
            type: 'box',
            layout: 'vertical',
            margin: 'md',
            spacing: 'sm',
            contents: [
                { type: 'text', text: 'ที่อยู่:', size: 'sm', color: '#555555', weight: 'bold' },
                { type: 'text', text: address || 'ไม่ได้ระบุ', wrap: true, color: '#111111', size: 'sm', margin: 'sm' }
            ]
        },
        // เส้นคั่น
        { type: 'separator', margin: 'lg' },
        // บล็อก: วัตถุประสงค์
        {
            type: 'box',
            layout: 'vertical',
            margin: 'lg',
            spacing: 'sm',
            contents: [
                { type: 'text', text: 'วัตถุประสงค์:', size: 'sm', color: '#555555', weight: 'bold' },
                { type: 'text', text: desired, wrap: true, color: '#111111', size: 'sm', margin: 'md' }
            ]
        },
        // บล็อก: อาการเบื้องต้น
        {
            type: 'box',
            layout: 'vertical',
            margin: 'lg',
            spacing: 'sm',
            contents: [
                { type: 'text', text: 'อาการเบื้องต้น:', color: '#555555', size: 'sm', weight: 'bold' },
                { type: 'text', text: symptoms, wrap: true, color: '#111111', size: 'sm', margin: 'md' }
            ]
        },
        // เส้นคั่น
        { type: 'separator', margin: 'lg' },
        // บล็อก: ข้อมูลสุขภาพเพิ่มเติม
        {
            type: 'box',
            layout: 'vertical',
            margin: 'lg',
            spacing: 'sm',
            contents: [
                {
                    // แถว: น้ำหนัก
                    type: 'box',
                    layout: 'horizontal',
                    contents: [
                        { type: 'text', text: 'น้ำหนัก:', size: 'sm', color: '#555555', flex: 0, weight: 'bold' },
                        { type: 'text', text: weight ? `${weight} กก.` : 'ไม่ได้ระบุ', size: 'sm', color: '#111111', align: 'end' }
                    ]
                },
                {
                    // แถว: ส่วนสูง
                    type: 'box',
                    layout: 'horizontal',
                    margin: 'md',
                    contents: [
                        { type: 'text', text: 'ส่วนสูง:', size: 'sm', color: '#555555', flex: 0, weight: 'bold' },
                        { type: 'text', text: height ? `${height} ซม.` : 'ไม่ได้ระบุ', size: 'sm', color: '#111111', align: 'end' }
                    ]
                },
                {
                    // แถว: โรคประจำตัว
                    type: 'box',
                    layout: 'horizontal',
                    margin: 'md',
                    contents: [
                        { type: 'text', text: 'โรคประจำตัว:', size: 'sm', color: '#555555', flex: 0, weight: 'bold' },
                        { type: 'text', text: disease || 'ไม่มี', size: 'sm', color: '#111111', align: 'end', wrap: true }
                    ]
                },
                {
                    // แถว: แพ้ยา
                    type: 'box',
                    layout: 'horizontal',
                    margin: 'md',
                    contents: [
                        { type: 'text', text: 'แพ้ยา:', size: 'sm', color: '#555555', flex: 0, weight: 'bold' },
                        { type: 'text', text: allergies || 'ไม่มี', size: 'sm', color: '#111111', align: 'end', wrap: true }
                    ]
                },
                {
                    // แถว: ขอใบรับรองแพทย์
                    type: 'box',
                    layout: 'horizontal',
                    margin: 'md',
                    contents: [
                        { type: 'text', text: 'ขอใบรับรองแพทย์:', size: 'sm', color: '#555555', flex: 0, weight: 'bold' },
                        { type: 'text', text: certificate, size: 'sm', color: '#111111', align: 'end' }
                    ]
                }
            ]
        }
    ];

    // โครงสร้างหลักของ Flex Message ที่จะถูกส่งไป
    return {
        type: 'flex',
        altText: `🔔 มีผู้ลงทะเบียนใหม่: ${name}`,
        contents: {
            // รูปแบบ Bubble เป็นรูปแบบพื้นฐานของ Flex Message
            type: 'bubble',
            header: {
                type: 'box',
                layout: 'vertical',
                paddingAll: 'lg',
                backgroundColor: '#4682B4',
                contents: [
                    {
                        type: 'text',
                        text: '📝 มีการลงทะเบียนใหม่',
                        weight: 'bold',
                        size: 'lg',
                        color: '#FFFFFF',
                    },
                    {
                        type: 'text',
                        text: formatThaiDateTime(registrationDate),
                        size: 'md',
                        color: '#FFFFFFCC',
                        margin: 'md'
                    },
                ],
            },
            body: {
                type: 'box',
                layout: 'vertical',
                spacing: 'md',
                contents: bodyContents,
            },
            styles: {
                footer: {
                    separator: true
                }
            }
        }
    };
};

/**
 * ส่งการแจ้งเตือนไปยัง LINE โดยใช้ Messaging API (Push Message)
 * @param {object} formData - ข้อมูลจากฟอร์มลงทะเบียน
 */
async function sendLineNotification(formData) {
    // ดึงค่า Access Token และ User ID ของผู้รับ (แอดมิน) จาก Environment Variables
    const channelAccessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN;
    const userId = process.env.LINE_ADMIN_USER_ID;

    // ตรวจสอบว่ามีการตั้งค่าที่จำเป็นครบถ้วนหรือไม่
    if (!channelAccessToken || !userId) {
        console.error('Line Messaging API is not configured. Please set LINE_CHANNEL_ACCESS_TOKEN and LINE_ADMIN_USER_ID environment variables.');
        // ไม่ขัดขวางการทำงานหลัก ให้จบการทำงานของฟังก์ชันนี้ไปเงียบๆ
        return;
    }

    // สร้าง Object ของ Flex Message จากข้อมูลที่ได้รับ
    const flexMessage = createFlexMessage(formData);

    try {
        // ส่ง Request ไปยัง API ของ LINE
        const response = await fetch('https://api.line.me/v2/bot/message/push', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${channelAccessToken}`
            },
            body: JSON.stringify({
                to: userId,
                messages: [flexMessage]
            })
        });

        // ตรวจสอบผลลัพธ์จาก LINE API
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error sending Line notification:', errorData);
        } else {
            console.log('Line notification sent successfully.');
        }
    } catch (error) {
        console.error('Error sending Line notification:', error);
    }
}

/**
 * Server Action หลักสำหรับลงทะเบียนผู้ป่วยใหม่
 * 1. ตรวจสอบข้อมูลเบื้องต้น
 * 2. ส่งข้อมูลไปยัง Google Apps Script เพื่อบันทึก
 * 3. หากสำเร็จ จะเรียกใช้ฟังก์ชัน sendLineNotification เพื่อแจ้งเตือนแอดมิน
 * @param {object} formData - ข้อมูลทั้งหมดจากฟอร์มลงทะเบียน
 * @returns {Promise<{success: boolean, error?: string}>} - ผลลัพธ์ของการลงทะเบียน
 */
export async function registerUser(formData) {
  // ตรวจสอบว่ามีการตั้งค่า URL ของ Google Apps Script หรือไม่
  if (!APPS_SCRIPT_WEB_APP_URL || APPS_SCRIPT_WEB_APP_URL.includes('YOUR_APPS_SCRIPT')) {
    console.error('APPS_SCRIPT_WEB_APP_URL is not configured.');
    return { success: false, error: 'ข้อผิดพลาดในการกำหนดค่าเซิร์ฟเวอร์ กรุณาติดต่อผู้ดูแลระบบ' };
  }

  try {
    // การตรวจสอบข้อมูลเบื้องต้นสำหรับฟิลด์ที่จำเป็น (Server-side validation)
    if (!formData.nationalId || !formData.firstName || !formData.lastName || !formData.gender || !formData.dob || !formData.phone || !formData.symptoms) {
      return { success: false, error: 'กรุณากรอกข้อมูลให้ครบถ้วน' };
    }
    
    // ส่ง Request ไปยัง Google Apps Script
    const response = await fetch(APPS_SCRIPT_WEB_APP_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // ส่งข้อมูลทั้งหมดใน formData ไปใน body ของ request
      // Google Apps Script จะใช้ action: 'register_new' (ตามที่กำหนดไว้ใน Apps Script)
      body: JSON.stringify({
        ...formData,
        action: 'register_new' // ระบุ action ให้ชัดเจน
      }),
    });

    // ตรวจสอบว่า response จาก Apps Script เป็น JSON หรือไม่
    const contentType = response.headers.get('content-type');
    if (!response.ok || !contentType || !contentType.includes('application/json')) {
        const errorText = await response.text();
        console.error('Error response from Apps Script:', response.status, errorText);
        return { success: false, error: 'เกิดข้อผิดพลาดในการสื่อสารกับเซิร์ฟเวอร์บันทึกข้อมูล' };
    }

    const result = await response.json();

    // หาก Apps Script ตอบกลับว่าบันทึกสำเร็จ
    if (result.success) {
      // ส่งการแจ้งเตือนไปยัง Line (ทำงานแบบ Asynchronous ไม่ต้องรอให้เสร็จ)
      await sendLineNotification(formData);
      return { success: true };
    } else {
      // หาก Apps Script ตอบกลับว่ามีข้อผิดพลาด
      console.error('Error from Apps Script:', result.error);
      return { success: false, error: result.error || 'เกิดข้อผิดพลาดในการบันทึกข้อมูลผ่าน Apps Script' };
    }

  } catch (error) {
    // จัดการข้อผิดพลาดที่เกิดจากการเชื่อมต่อ (Network Error)
    console.error('Error calling Apps Script:', error);
    return { success: false, error: 'เกิดข้อผิดพลาดในการเชื่อมต่อกับบริการบันทึกข้อมูล' };
  }
}
