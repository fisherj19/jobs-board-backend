const auth = require('../auth');

module.exports = (req, res, next) => {
  if (res.locals._current_user_is_admin) {
    next();
  } else {
    res.status(403).send({ message: 'You are not authorized to access this API' });
  }
};
