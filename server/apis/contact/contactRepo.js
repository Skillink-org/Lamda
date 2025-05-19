// Repository layer for handling contact data (Mock database)

// Mock database (temporary storage for contacts)
let contactDB = [];

/**
 * Saves contact data (assumes validation is already done)
 *
 * @param {Object} contactData - The validated contact data object
 * @returns {Object} The saved contact data
 */
async function saveContact(contactData) {
  contactDB.push(contactData);
  return contactData;
}

module.exports = {
  saveContact
};
