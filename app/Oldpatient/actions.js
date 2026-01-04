'use server';

// URL ของ Google Apps Script Web App ที่ใช้เป็น Backend
const APPS_SCRIPT_WEB_APP_URL = process.env.APPS_SCRIPT_URL

/**
 * ค้นหาข้อมูลผู้ป่วยเก่าด้วยเลขบัตรประชาชน
 * โดยการส่ง request ไปยัง Google Apps Script
 * @param {string} nationalId - เลขบัตรประชาชน 13 หลัก
 * @returns {Promise<object>} - ข้อมูลผู้ป่วย หรือ null ถ้าไม่พบ
 */
export async function findPatientByNationalId(nationalId) {
    if (!APPS_SCRIPT_WEB_APP_URL || APPS_SCRIPT_WEB_APP_URL.includes('YOUR_APPS_SCRIPT')) {
        return { success: false, error: 'Server configuration error.' };
    }
    try {
        // ส่ง request แบบ POST ไปยัง Apps Script เพื่อค้นหาข้อมูล
        const response = await fetch(APPS_SCRIPT_WEB_APP_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ action: 'find_patient', nationalId: nationalId }),
            cache: 'no-store', // ไม่ให้ cache ผลการค้นหา
        });

        // หาก response จาก server ไม่ใช่ 2xx
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Server returned an error:', response.status, errorText);
            return { success: false, error: `ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ (Code: ${response.status})` };
        }

        // ตรวจสอบว่า response เป็น JSON หรือไม่ ก่อนที่จะทำการ parse
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            const errorText = await response.text();
            console.error('Received non-JSON response from Google Apps Script:', errorText);
            return { success: false, error: 'เกิดข้อผิดพลาดจากเซิร์ฟเวอร์ ไม่สามารถค้นหาข้อมูลได้ในขณะนี้' };
        }

        // แปลง response เป็น JSON และส่งกลับ
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error finding patient:', error);
        return { success: false, error: 'เกิดข้อผิดพลาดในการเชื่อมต่อเพื่อค้นหาข้อมูล' };
    }
}


/**
 * ลงทะเบียนนัดหมายสำหรับผู้ป่วย
 * โดยการส่งข้อมูลไปยัง Google Apps Script เพื่อบันทึกลง Google Sheets
 * @param {object} formData - ข้อมูลจากฟอร์ม
 * @param {boolean} isReturningPatient - ระบุว่าเป็นผู้ป่วยเก่าหรือไม่
 * @returns {Promise<object>} - ผลลัพธ์การลงทะเบียน
 */
export async function registerUser(formData, isReturningPatient = false) {
    if (!APPS_SCRIPT_WEB_APP_URL || APPS_SCRIPT_WEB_APP_URL.includes('YOUR_APPS_SCRIPT')) {
        console.error('APPS_SCRIPT_WEB_APP_URL is not configured.');
        return {
            success: false,
            error: 'ข้อผิดพลาดในการกำหนดค่าเซิร์ฟเวอร์ กรุณาติดต่อผู้ดูแลระบบ'
        };
    }

    try {
        // การตรวจสอบข้อมูลเบื้องต้นสำหรับฟิลด์ที่จำเป็น
        if (!formData.nationalId || !formData.firstName || !formData.lastName || !formData.symptoms || !formData.desired) {
            return {
                success: false,
                error: 'กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน'
            };
        }

        // สร้าง payload ที่จะส่งไป โดยระบุ action และข้อมูลจาก form
        const payload = {
            action: isReturningPatient ? 'register_existing' : 'register_new',
            ...formData,
        };

        const response = await fetch(APPS_SCRIPT_WEB_APP_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        // ตรวจสอบว่า request สำเร็จหรือไม่ (HTTP status 200-299)
        if (!response.ok) {
            const errorText = await response.text(); // อ่าน error ที่อาจเป็น HTML หรือ text
            console.error('Apps Script returned a non-OK response:', response.status, errorText);
            return { success: false, error: `เกิดข้อผิดพลาดจากฝั่งเซิร์ฟเวอร์ (Code: ${response.status})` };
        }

        const result = await response.json();

        if (result.success) {
            const registrationTimestamp = new Date();
            // หากบันทึกข้อมูลสำเร็จ ให้ส่ง Line Notification
            await sendLineNotification(formData, registrationTimestamp);
            return { success: true };
        } else {
            console.error('Error from Apps Script:', result.error);
            return {
                success: false,
                error: result.error || 'เกิดข้อผิดพลาดในการบันทึกข้อมูลผ่าน Apps Script'
            };
        }

    } catch (error) {
        console.error('Error calling Apps Script:', error);
        return {
            success: false,
            error: 'เกิดข้อผิดพลาดในการเชื่อมต่อกับบริการบันทึกข้อมูล'
        };
    }
}

/**
 * จัดรูปแบบวันที่และเวลาเป็นภาษาไทย
 * @param {Date|string} date - วันที่ที่ต้องการจัดรูปแบบ
 * @returns {string} - ข้อความวันที่และเวลาภาษาไทย
 */
function formatThaiDateTime(date) {
    if (!date || isNaN(new Date(date).getTime())) {
        console.error("Invalid date value received for date-time formatting:", date);
        return "รูปแบบวันที่และเวลาไม่ถูกต้อง";
    }
    const d = new Date(date);
    const options = {
        year: 'numeric', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit',
        timeZone: 'Asia/Bangkok'
    };
    const thaiYear = d.getFullYear() + 543;
    const thaiDateTime = new Intl.DateTimeFormat('th-TH', options).format(d);
    // แทนที่ปี ค.ศ. ด้วย พ.ศ. และจัดรูปแบบข้อความ
    return thaiDateTime.replace(d.getFullYear().toString(), thaiYear.toString()).replace(' ', ' เวลา ') + ' น.';
}
/**
 * Helper function to create a horizontal key-value row for a LINE Flex Message.
 * @param {string} label - ข้อความหัวข้อ
 * @param {string} value - ข้อความข้อมูล
 * @returns {object} - A LINE Flex Message box component.
 */
function createFlexMessageRow(label, value) {
    return {
        type: 'box',
        layout: 'horizontal',
        margin: 'md',
        contents: [
            {
                type: 'text',
                text: label,
                size: 'sm',
                color: '#555555',
                flex: 0,
                weight: 'bold',
            },
            {
                type: 'text',
                text: value,
                size: 'sm',
                color: '#111111',
                align: 'end',
                wrap: true,
            },
        ],
    };
}

/**
 * Helper function to create a vertical block for a LINE Flex Message.
 * @param {string} label - ข้อความหัวข้อ
 * @param {string} value - ข้อความข้อมูล
 * @returns {object} - A LINE Flex Message box component.
 */
function createFlexMessageBlock(label, value) {
    return {
        type: 'box',
        layout: 'vertical',
        margin: 'lg',
        spacing: 'sm',
        contents: [
            { type: 'text', text: label, color: '#555555', size: 'sm', weight: 'bold' },
            { type: 'text', text: value, wrap: true, color: '#111111', size: 'sm', margin: 'md' },
        ],
    };
}

/**
 * ส่งการแจ้งเตือนไปยัง LINE เมื่อมีการลงทะเบียนสำเร็จ
 * โดยใช้ LINE Messaging API
 * @param {object} formData - ข้อมูลจากฟอร์มที่ลงทะเบียน
 * @param {Date} registrationDate - วันที่และเวลาที่ลงทะเบียน
 */
async function sendLineNotification(formData, registrationDate) {
    const channelAccessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN;
    const adminUserId = process.env.LINE_ADMIN_USER_ID; // User ID ของผู้รับ (แอดมิน)

    if (!channelAccessToken || !adminUserId) {
        console.error('LINE API credentials (LINE_CHANNEL_ACCESS_TOKEN or LINE_ADMIN_USER_ID) are not configured in environment variables.');
        return; // ไม่ขัดขวางกระบวนการลงทะเบียนหลัก
    }

    const name = `${formData.firstName} ${formData.lastName}`;
    const altTextMessage = `🔔 มีผู้ลงทะเบียนใหม่: ${name}`;
    // เตรียมข้อมูลสำหรับแสดงใน Flex Message
    const phone = formData.phone ?? 'ไม่ได้ระบุ';
    const address = formData.address ?? 'ไม่ได้ระบุ';
    const symptoms = formData.symptoms;
    const purposeOfVisit = formData.desired;
    const disease = formData.disease || 'ไม่มี';
    const allergies = formData.allergies || 'ไม่มี';
    const certificate = formData.certificate ?? 'ไม่ได้ระบุ';
    const appointmentTime = 'จะแจ้งเวลาให้ทราบภายหลัง';
    const weight = formData.weight ? `${formData.weight}` : 'ไม่ได้ระบุ';
    const height = formData.height ? `${formData.height}` : 'ไม่ได้ระบุ';

    // สร้างส่วน body ของ Flex Message
    const bodyContents = [
        createFlexMessageRow('ชื่อ-สกุล:', name),
        createFlexMessageRow('เบอร์โทร:', phone),
        createFlexMessageRow('เวลานัดหมาย:', appointmentTime),
        {
            type: 'box',
            layout: 'vertical',
            margin: 'md',
            spacing: 'sm',
            contents: [
                { type: 'text', text: 'ที่อยู่:', size: 'sm', color: '#555555', weight: 'bold' },
                { type: 'text', text: address, wrap: true, color: '#111111', size: 'sm', margin: 'sm' },
            ],
        },
        { type: 'separator', margin: 'lg' },
        createFlexMessageBlock('วัตถุประสงค์:', purposeOfVisit),
        { type: 'separator', margin: 'lg' },
        createFlexMessageBlock('อาการเบื้องต้น:', formData.symptoms),
        { type: 'separator', margin: 'lg' },
        {
            type: 'box',
            layout: 'vertical',
            margin: 'lg',
            spacing: 'sm',
            contents: [
                createFlexMessageRow('น้ำหนัก:', `${weight} กก.`),
                createFlexMessageRow('ส่วนสูง:', `${height} ซม.`),
                createFlexMessageRow('โรคประจำตัว:', disease),
                createFlexMessageRow('แพ้ยา:', allergies),
                createFlexMessageRow('ขอใบรับรองแพทย์:', certificate),
            ],
        },
    ];

    // โครงสร้างหลักของ Flex Message
    const flexMessage = {
        type: 'flex',
        altText: altTextMessage,
        contents: {
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
                        color: '#FFFFFF'
                    },
                    {
                        type: 'text',
                        text: formatThaiDateTime(registrationDate),
                        size: 'md',
                        color: '#FFFFFFCC',
                        margin: 'md'
                    }
                ]
            },
            body: {
                type: 'box',
                layout: 'vertical',
                spacing: 'md',
                contents: bodyContents
            },
            styles: {
                footer: {
                    separator: true
                }
            },
        },
    };

    try {
        // ส่ง request ไปยัง LINE Messaging API (Push Message)
        const response = await fetch('https://api.line.me/v2/bot/message/push', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${channelAccessToken}`,
            },
            body: JSON.stringify({
                to: adminUserId,
                messages: [flexMessage],
            }),
        });

        if (response.ok) {
            console.log('LINE notification sent successfully.');
        } else {
            const errorData = await response.json();
            console.error('Failed to send LINE notification:', response.status, response.statusText, JSON.stringify(errorData, null, 2));
        }
    } catch (error) {
        console.error('Failed to send LINE notification:', error);
    }
}
