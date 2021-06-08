const express = require('express');
const router = express.Router();
const ctrl = require('../../../controllers/contacts');
const guard = require('../../../helpers/guard');


const {
  validationCreateContact,
  validationUpdateContact,
  validationFavoriteContact
} = require('./validation');


router.use((req, res, next) => {
  console.log(req.url);
  next();
});

router
  .get('/', guard, ctrl.getAll)
  .post('/', guard, validationCreateContact, ctrl.addContact);

router
  .get('/:contactId', guard, ctrl.getContactById)
  .delete('/:contactId', guard, ctrl.removeContact)
  .put('/:contactId', guard, validationUpdateContact, ctrl.updateContact);

router.patch(
  '/:contactId/favorite',
  guard,
  validationFavoriteContact,
  ctrl.updateStatusContact
);

module.exports = router;
