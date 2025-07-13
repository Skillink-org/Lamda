// Repository layer for handling contact data (Mock database)

// TODO: Replace mock database with real MongoDB model
// TODO: Create Contact model using Mongoose schema
// TODO: Add indexes for better query performance
// TODO: Add data validation at database level
// TODO: Implement proper error handling for database operations

// Mock database (temporary storage for contacts)
let contactDatabase = [];

/**
 * Saves contact data (assumes validation is already done)
 *
 * @param {Object} contactData - The validated contact data object
 * @returns {Object} The saved contact data
 */
async function saveContact(contactData) {
  // TODO: Replace with actual database save operation
  // TODO: Add timestamp and unique ID to saved data
  // TODO: Handle database connection errors
  
  const contactWithTimestamp = {
    ...contactData,
    createdAt: new Date(),
    id: Date.now() // TODO: Use proper UUID or ObjectId
  };
  
  contactDatabase.push(contactWithTimestamp);
  return contactWithTimestamp;
}

// TODO: Add function to retrieve contact messages for admin panel
// TODO: Add function to mark messages as read/unread
// TODO: Add function to delete old messages

module.exports = {
  saveContact
};
