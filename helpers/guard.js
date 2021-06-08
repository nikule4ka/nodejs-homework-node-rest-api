const passport = require('passport');
require('../config/passport');
const { HttpCode } = require('./constans');

const guard = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    const headerAuth = req.get('Authhorization');
    let token = null;
    if (headerAuth) {
      token = headerAuth.split(' ')[1];
    }
    if (err || !user || token !== user?.token) {
      return res.status(HttpCode.UNAUTHORIZED).json({
        status: 'error',
        code: HttpCode.UNAUTHORIZED,
        message: 'Invalid credentials'
      });
    }

    req.user = user;
    return next();
  })(req, res, next);
};

module.exports = guard;
