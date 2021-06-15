const { updateContact } = require('../controllers/contacts')

const Contacts = require('../repositories/contacts')

jest.mock('../repositories/contacts')

describe('Unit test controller contacts', () => {
  const req = { user: { id: 1 }, body: {}, params: { id: 1 } }
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn((data) => data)
  }
  const next = jest.fn()

  it('update contact exist', async () => {
    const contact = { id: 3, name: 'Nadia', email: 'vvaa@mail.com' }
    Contacts.updateContact = jest.fn(() => {
      return contact
    })
    const result = await updateContact(req, res, next)
    expect(result).toBeDefined()
    expect(result.status).toEqual('success')
    expect(result.code).toEqual(200)
    expect(result.data.updatetedContacts).toEqual(contact)
  })

  it('update not exist contact', async () => {
    Contacts.updateContact = jest.fn()
    const result = await updateContact(req, res, next)
    expect(result).toBeDefined()
    expect(result.status).toEqual('error')
    expect(result.code).toEqual(404)
    expect(result.message).toEqual('Not found')
  })

  it('update contact: return repositories Error', async () => {
    Contacts.updateContact = jest.fn(() => {
      throw new Error('ups')
    })
    await updateContact(req, res, next)
    expect(next).toHaveBeenCalled()
  })
})
