const { saveContact } = require('../repository/contactRepository');
const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject,
        text
    });
};

const handleContactForm = async (data) => {
    const savedContact = await saveContact(data);

    await sendEmail(process.env.ADMIN_EMAIL, "New Contact Form Submission",
        `New message from ${data.fullName} (${data.email}):\n\n${data.message}`);

    await sendEmail(data.email, "We Received Your Message",
        `Thank you, ${data.fullName}, for reaching out. We'll get back to you soon!`);

    return savedContact;
};

module.exports = { handleContactForm };
