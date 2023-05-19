/**
 * This module contains functions to send an email from the server
 */

import nodemailer from "nodemailer";

const sendEmail = async (email: string, subject: string, text: string) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
        },
    });
    
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: subject,
        text: text,
        // html: text,
    };
    
    transporter.sendMail(mailOptions, (error: any, info: { response: string; }) => {
        if (error) {
            console.log(error);
            return false;
        } else {
            console.log("Email sent to: " + email + " Status: " + info.response);
            return true;
        }
    });
}

export default module.exports = {
    sendEmail
}