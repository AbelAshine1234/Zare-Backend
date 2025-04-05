const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER;

const client = new twilio(accountSid, authToken);

// Store OTPs temporarily (should use Redis or DB in production)
const otpStore = new Map(); 

const sendOTP = async (phoneNumber) => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    otpStore.set(phoneNumber, { otp, expiresAt: Date.now() + 5 * 60 * 1000 }); // Expires in 5 mins

    await client.messages.create({
        body: `Your verification code is: ${otp}`,
        from: twilioPhone,
        to: phoneNumber
    });

    return otp;
};

const verifyOTP = (phoneNumber, otp) => {
    const storedOTP = otpStore.get(phoneNumber);
    if (!storedOTP) return false;
    
    if (Date.now() > storedOTP.expiresAt) {
        otpStore.delete(phoneNumber);
        return false; // OTP expired
    }
    
    if (storedOTP.otp === otp) {
        otpStore.delete(phoneNumber);
        return true; // OTP valid
    }

    return false; // OTP incorrect
};

module.exports = { sendOTP, verifyOTP };
