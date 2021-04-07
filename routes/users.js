
// Users page requests:
// POST request that allows the user to unfavorite a song
// POST request that allows the users to remove a song from their cart
// POST request that allows the user to checkout (redirect to homepage)


const express = require('express');
const router = express.Router();

module.exports = (db) => {


  // GET request to the users page which loads all the songs they have favorited or added to their cart
  router.get("/", (req, res) => {
    // console.log('>>>>>>>14');
    const templateVars = {};
    db.query('SELECT * FROM users')
      .then((result) => {
        console.log(result.rows);
        templateVars.users = result.rows;
        res.render("users", templateVars);

      })
      .catch((error) => { console.log(error.message) });
  });

  return router;


};
