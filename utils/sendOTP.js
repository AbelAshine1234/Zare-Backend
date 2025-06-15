require("dotenv").config();
const twilio = require("twilio");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifyServiceSid = process.env.VERIFY_SERVICE_SID;
const client = new twilio(accountSid, authToken);

/**
 * Send OTP to user phone number using Twilio Verify
 * @param {string} phone - User's phone number
 * @returns {Promise<string>} - OTP send status
 */
const sendOTP = async (phone) => {
    try {
        const verification = await client.verify.v2
            .services(verifyServiceSid)
            .verifications.create({ to: phone, channel: "sms" });

        console.log(`OTP sent to ${phone}: ${verification.status}`);
        return verification.status;
    } catch (error) {
        console.error("Error sending OTP:", error.message);
        throw new Error("Failed to send OTP. Please try again.");
    }
};

/**
 * Verify OTP provided by user
 * @param {string} phone - User's phone number
 * @param {string} otp - OTP entered by user
 * @returns {Promise<boolean>} - True if verified, False otherwise
 */
const verifyOTP = async (phone, otp) => {
    try {
        const verificationCheck = await client.verify.v2
            .services(verifyServiceSid)
            .verificationChecks.create({ to: phone, code: otp });

        console.log(`OTP Verification Status: ${verificationCheck.status}`);
        return verificationCheck.status === "approved";
    } catch (error) {
        console.error("Error verifying OTP:", error.message);
        return false;
    }
};

module.exports = { sendOTP, verifyOTP };
