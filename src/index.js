

module.exports = (db) => {
  return {
    getUser: (id) => {
      let user;

      try {
        user = db.query("A QUERY FOR USERS " + id);
      } catch(e) {
        user = null;
      }

      return user;
    }
  }
};
