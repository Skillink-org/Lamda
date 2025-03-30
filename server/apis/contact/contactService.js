// const contactRepository = require('./repository');
// const Joi = require('joi'); // הספריה לולידציה

// // Validation schema
// const contactSchema = Joi.object({
//   fullName: Joi.string().min(3).required(),
//   email: Joi.string().email().required(),
//   subject: Joi.string().min(3).required(),
//   message: Joi.string().min(5).required()
// });

// async function handleContactForm(contactData) {
//   // Validating input data
//   const { error } = contactSchema.validate(contactData);
//   if (error) {
//     throw new Error(error.details[0].message);
//   }

//   // Save to database or process further (in future, we will add email sending here)
//   const savedContact = await contactRepository.saveContact(contactData);
//   return { message: 'Your message has been successfully received!' };
// }

// module.exports = {
//   handleContactForm
// };

const Joi = require('joi'); // ספריית ולידציה

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

  // במקום לשמור למסד נתונים, נוודא שהנתונים הושגו ונחזיר תגובה
  console.log('Contact form submitted:', contactData);

  // Return a success message
  return { message: 'Your message has been successfully received! (Mock version)' };
}

module.exports = {
  handleContactForm
};

