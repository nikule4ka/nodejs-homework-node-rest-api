const guard = require('../helpers/guard')

describe('Unit test controller contacts', () => {
  const req = { user: { id: 1 }, body: {}, params: { id: 1 } }
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn((data) => data)
  }
  const next = jest.fn()
  it.skip('user exist', async () => {})
})
