const Contacts = require('../repositories/contacts')

const getAll = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { docs: contacts, ...rest } = await Contacts.listContacts(
      userId,
      req.query
    );
    return res.json({
      status: 'success',
      code: 200,
      data: { contacts, ...rest }
    });
  } catch (e) {
    next(e);
  }
}

const getContactById = async (req, res, next) => {
  try {
     const userId = req.user.id;
     const contact = await Contacts.getContactById(
       userId,
       req.params.contactId
     );
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
    const userId = req.user.id;
    const contacts = await Contacts.addContact(userId, req.body);
    return res
      .status(201)
      .json({ status: 'success', code: 201, data: { contacts } });
  } catch (e) {
    next(e)
  }
}

const removeContact = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contact = await Contacts.removeContact(userId, req.params.contactId);
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
    const userId = req.user.id;
    const updatetedContacts = await Contacts.updateContact(
      userId,
      req.params.contactId,
      req.body
    );
    if (updatetedContacts) {
      return res.json({
        status: 'success',
        code: 200,
        message: 'Contact updated',
        data: { updatetedContacts }
      });
    }
    return res.json({
      status: 'error',
      code: 404,
      message: 'Not found'
    });
  } catch (e) {
    next(e)
  }
}

const updateStatusContact = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const contactStatus = await Contacts.updateStatusContact(
      userId,
      req.params.contactId,
      req.body
    );
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
