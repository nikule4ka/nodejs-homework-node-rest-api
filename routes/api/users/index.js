const express = require('express');
const router = express.Router();
const ctrl = require('../../../controllers/users');
const guard = require('../../../helpers/guard');

const {
  validationCreateUser,
  validationLogInUser,
  validationSubscriptionUser
} = require('./validation');

router.post('/signup', validationCreateUser, ctrl.signup);
router.post('/login', validationLogInUser, ctrl.login);
router.post('/logout', guard, ctrl.logout);
router.get('/current', guard, validationSubscriptionUser, ctrl.);

module.exports = router;
