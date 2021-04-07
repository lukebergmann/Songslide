
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


  // POST request to get favorite songs saved in the database
  router.get('/user/:user', (req, res) => {
    const users = req.params.users;
    const templateVars = {};
    db.query(` SELECT songs.song_name, artists.name AS artist_name, songs.duration, songs.price
    FROM users
    JOIN favorites ON users.id = user_id
    JOIN artists ON artists.id = artist_id
    JOIN songs ON artists.id = artist_id
    WHERE users.username = $1`, [users])
      .then((result) => {
        console.log(result.rows);
        templateVars.artists = result.rows;
        res.render("users", templateVars);
      })
      .catch((error) => { console.log(error.message) });
  });
  return router;


};
