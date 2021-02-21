const auth = require('../auth');

module.exports = (req, res, next) => {
  const token = req.headers.token;
  const uname = req.headers.username;
  const key = req.headers.key;

  if (token && uname && key) {
    if (uname.split('@')[1] === 'xavier.edu') {
      try {
        auth.validate(req, res, next, token, uname, key);
      } catch (err) {
        res.status(500).send(err);
      }
    } else {
      res.status(401).send({ message: 'Users must have an active Xavier University email to use this system.' });
    }
  } else {
    res.status(401).send({ message: 'Invalid token or key' });
  }
};
