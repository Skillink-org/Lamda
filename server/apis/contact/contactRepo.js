// Repository layer for handling contact data (Mock database)

// Mock database (temporary storage for contacts)
let contactDatabase = [];

/**
 * Saves contact data (assumes validation is already done)
 *
 * @param {Object} contactData - The validated contact data object
 * @returns {Object} The saved contact data
 */
async function saveContact(contactData) {
  contactDatabase.push(contactData);
  return contactData;
}

module.exports = {
  saveContact
};
