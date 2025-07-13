

const Joi = require('joi'); // ספריית ולידציה

// TODO: Install and configure email service (nodemailer or SendGrid)
// TODO: npm install nodemailer
// TODO: Add environment variables for email configuration (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS)
// TODO: Create email templates for contact form notifications

// Schema for validation
const contactSchema = Joi.object({
  fullName: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  subject: Joi.string().min(3).required(),
  message: Joi.string().min(5).required(),
});

async function handleContactForm(contactData) {
  // Validate the contact form data
  const { error } = contactSchema.validate(contactData);
  if (error) {
    throw new Error(error.details[0].message); // אם יש שגיאה, נשלח את ההודעה למעלה
  }

  // TODO: Save contact data to real database using contactRepo
  // TODO: Send notification email to admin
  // TODO: Send confirmation email to user
  // TODO: Add error handling for email sending failures
  // TODO: Add logging for contact form submissions

  // במקום לשמור למסד נתונים, נוודא שהנתונים הושגו ונחזיר תגובה
  console.log('Contact form submitted:', contactData);

  // Return a success message
  return { message: 'Your message has been successfully received! (Mock version)' };
}

module.exports = {
  handleContactForm
};

