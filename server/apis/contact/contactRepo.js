let contactDatabase = [];

async function saveContact(contactData) {
  contactDatabase.push(contactData);
  return contactData;
}

module.exports = {
  saveContact
};
