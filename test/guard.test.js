const guard = require('../helpers/guard')
const { HttpCode } = require('../helpers//constans')

const passport = require('passport')

describe('Unit test guard', () => {
  const user = { token: '1122565665656' }
  const req = { get: jest.fn((header) => `Bearer ${user.token}`), user }
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn((data) => data)
  }
  const next = jest.fn()

  it('user exist', async () => {
      passport.authenticate = jest.fn(
        (strategy, options, cb) => (req, res, next) => {
          cb(null, user)
        }
      )
      guard(req, res, next)
      expect(next).toHaveBeenCalled()
  })
    
      it('user not exist', async () => {
        passport.authenticate = jest.fn((strategy, options, cb) => (req, res, next) => {
          cb(null, false)
        },)
        guard(req, res, next)
          expect(req.get).toHaveBeenCalled()
          expect(res.status).toHaveBeenCalled()
          expect(res.json).toHaveBeenCalled()
          expect(res.json).toHaveReturnedWith({
            status: 'error',
            code: HttpCode.UNAUTHORIZED,
            message: 'Invalid credentials'
          })
      })
    
          it('user wrong user', async () => {
            passport.authenticate = jest.fn(
              (strategy, options, cb) => (req, res, next) => {
                cb(null, {token: '2345'})
              }
            )
            guard(req, res, next)
            expect(req.get).toHaveBeenCalled()
            expect(res.status).toHaveBeenCalled()
            expect(res.json).toHaveBeenCalled()
            expect(res.json).toHaveReturnedWith({
              status: 'error',
              code: HttpCode.UNAUTHORIZED,
              message: 'Invalid credentials'
            })
          })
})
