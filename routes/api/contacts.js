const express = require('express')
const router = express.Router()
const ctrl = require('../../controllers/contacts')

const {
  validationCreateContact,
  validationUpdateContact,
  validationFavoriteContact
} = require('./validation')

router.use((req, res, next) => {
  console.log(req.url)
  next()
})

router.get('/', ctrl.getAll).post('/', validationCreateContact, ctrl.addContact)

router
  .get('/:contactId', ctrl.getContactById)
  .delete('/:contactId', ctrl.removeContact)
  .put('/:contactId', validationUpdateContact, ctrl.updateContact)

router.patch(
  '/:contactId/favorite',
  validationFavoriteContact,
  ctrl.updateStatusContact
)

module.exports = router
