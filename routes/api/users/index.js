const express = require('express');
const router = express.Router();
const ctrl = require('../../../controllers/users');

const {
  validationCreateUser,
  validationLogInUser,
  validationSubscriptionUser
} = require('./validation');

router.post('/signup', ctrl.signup);
router.post('/login', validationLogInUser, ctrl.login);
router.post('/logout', validationSubscriptionUser, ctrl.logout);

module.exports = router;
