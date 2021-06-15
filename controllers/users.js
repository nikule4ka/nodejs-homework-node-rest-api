const Users = require('../repositories/users');
const { HttpCode } = require('../helpers/constans');
const jwt = require('jsonwebtoken');
const fs = require('fs/promises')
const path = require('path')
require('dotenv').config();
const UploadAvatarService = require('../services/local-upload')
const SECRET_KEY = process.env.SECRET_KEY;

const signup = async (req, res, next) => {
  try {
    const user = await Users.findByEmail(req.body.email);
    if (user) {
      return res.status(HttpCode.CONFLICT).json({
        status: 'error',
        code: HttpCode.CONFLICT,
        message: 'Email in use'
      });
    }

    const { id, email, subscription, avatar } = await Users.create(req.body)

    return res.status(HttpCode.CREATED).json({
      status: 'success',
      code: HttpCode.CREATED,
      user: { id, email, subscription, avatar }
    })
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  try {
    const user = await Users.findByEmail(req.body.email);
    const isValidPassword = await user?.isValidPassword(req.body.password);

    if (!user || !isValidPassword) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: 'error',
        code: HttpCode.UNAUTHORIZED,
        message: 'Email or password is wrong'
      });
    }
    const id = user.id;
    const payload = { id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '3h' });

    await Users.updateToken(id, token);

    return res.json({ status: 'success', code: HttpCode.OK, user: { token } });
  } catch (e) {
    next(e);
  }
};

const logout = async (req, res, next) => {
  try {
    const id = req.user.id;
    await Users.updateToken(id, null);
    return res.status(HttpCode.NO_CONTENT).json({});
  } catch (e) {
    next(e);
  }
};

const current = async (req, res, next) => {
  try {
    const user = await Users.getCurrentUser(req.user.id);
    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      user
    });
  } catch (e) {
    next(e);
  }
};

const updateSubscribtions = async (req, res, next) => {
  try {
    const updateSubscriptions = await Users.updateSubscriptionsStatus(
      req.user.id,
      req.body
    );

    if (!updateSubscriptions) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: 'error',
        code: HttpCode.UNAUTHORIZED,
        message: 'Not authorized'
      });
    }
    return res.status(HttpCode.OK).json({
      status: 'success',
      code: HttpCode.OK,
      user: {
        email: updateSubscriptions.email,
        subscription: updateSubscriptions.subscription
      }
    });
  } catch (e) {
    next(e);
  }
};

const avatars = async (req, res, next) => {
  try {
    const id = req.user.id
    const uploads = new UploadAvatarService(process.env.AVATAR_OF_USERS)
    const avatarUrl = await uploads.saveAvatar({ idUser: id, file: req.file })
    // replacement old avatar
    try {
      await fs.unlink(path.join(process.env.AVATAR_OF_USERS, req.user.avatar))
    } catch (error) {
      console.log(error.message)
    }

    await Users.updateAvatar(id, avatarUrl)
    res.json({ status: 'success', code: HttpCode.OK, user: { avatarUrl } })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  signup,
  login,
  logout,
  current,
  updateSubscribtions,
  avatars
}
