


// // // Schema for validation
// // const contactSchema = Joi.object({
// //   fullName: Joi.string().min(3).required(),
// //   email: Joi.string().email().required(),
// //   subject: Joi.string().min(3).required(),
// //   message: Joi.string().min(5).required(),
// // });

// // async function handleContactForm(contactData) {
// //   // Validate the contact form data
// //   const { error } = contactSchema.validate(contactData);
// //   if (error) {
// //     throw new Error(error.details[0].message); // אם יש שגיאה, נשלח את ההודעה למעלה
// //   }

// //   // במקום לשמור למסד נתונים, נוודא שהנתונים הושגו ונחזיר תגובה
// //   console.log('Contact form submitted:', contactData);

// //   // Return a success message
// //   return { message: 'Your message has been successfully received! (Mock version)' };
// // }

// // module.exports = {
// //   handleContactForm
// // };
// const Joi = require('joi'); // ספריית ולידציה
// const contactRepository = require('../../apis/contact/contactRepo'); // חיבור ל-Repository

// // 📌 הגדרת ולידציה עם Joi
// const contactSchema = Joi.object({
//   fullName: Joi.string().min(3).required(),
//   email: Joi.string().email().required(),
//   subject: Joi.string().min(3).required(),
//   message: Joi.string().min(5).required(),
// });

// // 📌 יצירת טרנספורטר (הגדרות SMTP)
// const transporter = nodemailer.createTransport({
//   service: 'gmail', // ניתן להחליף ב-SMTP אחר
//   auth: {
//     user: 'shlichutorg@gmail.com', // ✉️ אימייל מנהל המערכת
//     pass: 'app pass', // 🔑 סיסמה (עדיף להשתמש ב-App Password!)
//   },
// });

// /**
//  * פונקציה שמטפלת בטופס יצירת קשר
//  * @param {Object} contactData - הנתונים מהטופס
//  * @returns {Object} - הודעת הצלחה
//  */
// async function handleContactForm(contactData) {
//   // 📌 ולידציה
//   const { error } = contactSchema.validate(contactData);
//   if (error) {
//     throw new Error(error.details[0].message);
//   }

//   // 📌 שמירת הנתונים ב-Repository
//   const savedContact = await contactRepository.saveContact(contactData);

//   // 📌 שליחת מייל למנהל המערכת
//   await transporter.sendMail({
//     from: 'your-email@gmail.com', // ✉️ ממי נשלח
//     to: 'admin-email@example.com', // 📌 אימייל המנהל
//     subject: `New Contact Form Submission: ${contactData.subject}`,
//     text: `
//       New contact form submission:
//       - Full Name: ${contactData.fullName}
//       - Email: ${contactData.email}
//       - Subject: ${contactData.subject}
//       - Message: ${contactData.message}
//     `,
//   });

//   // 📌 שליחת מייל ללקוח עם אישור קבלה
//   await transporter.sendMail({
//     from: 'your-email@gmail.com',
//     to: contactData.email, // נשלח ללקוח
//     subject: 'We received your message!',
//     text: `
//       Hi ${contactData.fullName},
      
//       We have received your message and will get back to you soon!
      
//       Your submitted details:
//       - Subject: ${contactData.subject}
//       - Message: ${contactData.message}

//       Best regards,
//       Our Support Team
//     `,
//   });

//   return { message: 'Your message has been successfully received!' };
// }

// module.exports = {
//   handleContactForm
// };



const mailer = require('./mail');


function sendEmailToUserf(to, body) {
    mailer.sendEmail(to, body)
        .then(info => {
            console.log('Email sent: ', info.response);
        })
        .catch(error => {
            console.log('Error sending email: ', error);
        });
}

