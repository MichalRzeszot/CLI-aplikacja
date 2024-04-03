const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf8");
  console.log(JSON.parse(data));
}

async function getContactById(contactId) {
  const data = await fs.readFile(contactsPath, "utf8");
  const contacts = JSON.parse(data);
  const contact = contacts.find((contact) => contact.id === contactId);
  if (!contact) {
    console.log("Kontakt nie został znaleziony.");
    return;
  }
  console.log(contact);
}

async function removeContact(contactId) {
  const data = await fs.readFile(contactsPath, "utf8");
  let contacts = JSON.parse(data);
  contacts = contacts.filter((contact) => contact.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  console.log(`Contact with id=${contactId} was removed`);
}

async function addContact(name, email, phone) {
  const data = await fs.readFile(contactsPath, "utf8");
  const contacts = JSON.parse(data);
  const newContact = {
    id: Date.now().toString(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  console.log(`Contact ${name} was added`);
}

module.exports = { listContacts, getContactById, removeContact, addContact };
