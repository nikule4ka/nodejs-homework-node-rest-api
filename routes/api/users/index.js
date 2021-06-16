const express = require('express');
const router = express.Router();
const ctrl = require('../../../controllers/users');
const guard = require('../../../helpers/guard');
const upload = require('../../../helpers/upload')

const {
  validationCreateUser,
  validationLogInUser,
  validationSubscriptionUser
} = require('./validation');

router.post('/signup', validationCreateUser, ctrl.signup);
router.post('/login', validationLogInUser, ctrl.login);
router.post('/logout', guard, ctrl.logout);
router.get('/current', guard, ctrl.current);
router.patch('/', guard, validationSubscriptionUser, ctrl.updateSubscribtions);
router.patch('/avatars', guard, upload.single('avatar'), ctrl.avatars)

router.get('/verify/:token', ctrl.verify)
router.post('/verify', ctrl.repeatEmailVeritification)

module.exports = router;
