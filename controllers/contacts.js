const Contacts = require('../repositories/contacts')

const getAll = async (req, res, next) => {
  try {
    const contacts = await Contacts.listContacts()
    return res.json({ status: 'success', code: 200, data: { contacts } })
  } catch (e) {
    next(e)
  }
}

const getContactById = async (req, res, next) => {
  try {
    const contact = await Contacts.getContactById(req.params.contactId)
    if (contact) {
      console.log(contact)
      return res.json({ status: 'success', code: 200, data: { contact } })
    }
    return res.json({
      status: 'error',
      code: 404,
      data: { message: 'Not found' }
    })
  } catch (e) {
    next(e)
  }
}

const addContact = async (req, res, next) => {
  try {
    const contacts = await Contacts.addContact(req.body)
    return res
      .status(201)
      .json({ status: 'success', code: 201, data: { contacts } })
  } catch (e) {
    next(e)
  }
}

const removeContact = async (req, res, next) => {
  try {
    const contact = await Contacts.removeContact(req.params.contactId)
    if (contact) {
      return res.json({
        status: 'success',
        code: 200,
        message: 'contact deleted',
        data: { contact }
      })
    }
    return res.json({
      status: 'error',
      code: 404,
      message: 'Not found'
    })
  } catch (e) {
    next(e)
  }
}

const updateContact = async (req, res, next) => {
  try {
    const updatetedContacts = await Contacts.updateContact(
      req.params.contactId,
      req.body
    )
    if (updatetedContacts) {
      return res.json({
        status: 'success',
        code: 200,
        message: 'Contact updated',
        data: { updatetedContacts }
      })
    }
    return res.json({
      status: 'error',
      code: 404,
      message: 'Not found'
    })
  } catch (e) {
    next(e)
  }
}

const updateStatusContact = async (req, res, next) => {
  try {
    const contactStatus = await Contacts.updateStatusContact(
      req.params.contactId,
      req.body
    )
    if (contactStatus) {
      return res.json({
        status: 'success',
        code: 200,
        message: 'Contact updated',
        data: { contactStatus }
      })
    }
    return res.json({
      status: 'error',
      code: 404,
      message: 'Not found'
    })
  } catch (e) {
    next(e)
  }
}

module.exports = {
  getAll,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact
}
