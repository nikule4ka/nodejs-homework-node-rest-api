const fs = require('fs/promises')
const path = require('path')
const { v4: uuid } = require('uuid')

const contactPath = path.join(__dirname, 'contacts.json')

const readData = async () => {
  const data = await fs.readFile(path.join(__dirname, 'contacts.json'), 'utf-8')
  return JSON.parse(data)
}

const listContacts = async () => {
  return await readData()
}

const getContactById = async (contactId) => {
  const contacts = await readData()
  return  contacts.find(contact => contact.id === contactId)
}

const removeContact = async (contactId) => {
  const contacts = await readData()
  const contactDelete = contacts.findIndex(
    (contact) => contact.id === contactId
  )
 
  if (contactDelete === -1) {
   return null
  }
  
  const removedContact = contacts.splice(contactDelete, 1)
  await fs.writeFile(contactPath, JSON.stringify(contacts))
  return removedContact
}

const addContact = async (body) => {
  const id = uuid()
  const newContact = {
    id,
    ...body,
  }
  const contacts = await readData()
  contacts.push(newContact)

  await fs.writeFile(contactPath, JSON.stringify(contacts))
  return contacts
}

const updateContact = async (contactId, body) => {
    const contacts = await readData()
  const updateContacts = contacts.find((contact) => contact.id === contactId)
  if (updateContacts) {
    Object.assign(updateContacts, body)
    await fs.writeFile(contactPath, JSON.stringify(contacts))
  } 
  return updateContacts
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
