const express = require('express');
const { handleContactForm } = require('../services/contactService');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const savedContact = await handleContactForm(req.body);
        res.status(201).json({ message: "Message sent successfully!", contact: savedContact });
    } catch (error) {
        res.status(500).json({ message: "Error sending message", error });
    }
});

module.exports = router;
