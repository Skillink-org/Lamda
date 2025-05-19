// const express = require('express');
// const router = express.Router();
// const contactService = require('./services');

// // Route to handle form submission
// router.post('/', async (req, res) => {
//   try {
//     const contactData = req.body;
//     const response = await contactService.handleContactForm(contactData);
//     res.status(200).send(response);
//   } catch (error) {
//     res.status(400).send({ message: error.message });
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const contactService = require('./contactService');

// Route to handle contact form submission
router.post('/', async (req, res) => {
  try {
    const contactData = req.body;
    const response = await contactService.sendEmailToUserf(contactData);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;

