const auth = {
  validate: (req, res, next, token, username, userid) => {
    const tok = token || '';
    const un = username || '';
    const id = userid || '';

    if (tok === '' || un === '' || id === '') {
      return res.status(401).send({ message: 'Missing credentials' });
    } else {
      const fireAdmin = req.app.locals.fireAdmin;

      fireAdmin.auth().verifyIdToken(tok)
        .then(decodedToken => {
          if (decodedToken.banned) {
            return res.status(403).send({ message: 'Your account has been banned' });
          } else if (decodedToken.deleted) {
            return res.status(403).send({ message: 'Your account has been deleted' });
          } else if (id === decodedToken.uid) {
            res.locals._current_user_name = un;
            res.locals._current_user_id = id;
            res.locals._current_user_is_admin = decodedToken.admin || false;
            next();
          } else {
            return res.status(403).send({ message: 'Invalid user' });
          }
        }).catch(e => {
          // console.log(e);
          return res.status(401).send({ message: 'Not authorized' });
        });
    }
  }
};

module.exports = auth;
