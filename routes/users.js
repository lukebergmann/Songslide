
// Users page requests:
// POST request that allows the user to unfavorite a song
// POST request that allows the users to remove a song from their cart
// POST request that allows the user to checkout (redirect to homepage)


const express = require('express');
const router = express.Router();

const usersRoutes = (db) => {

  // GET request to the users page that shows all the users purchased songs
  // #1
  router.get("/:username", (req, res) => {
    const username = req.params.username;
    const templateVars = {};
    db.query(`SELECT songs.song_name, artists.name AS artist_name, songs.duration AS duration
      FROM artists
      JOIN users ON artists.id = artist_id
      JOIN songs ON users.id = user_id
      WHERE users.username = $1
      ORDER BY artist_name
      LIMIT 5;`, [username])
      .then((result) => {
        templateVars.users = result.rows;
        console.log("#####1 ", templateVars);
        res.render("users", templateVars);
      })
      .catch((error) => { console.log(error.message) });
  });


  // GET request to get favorite songs saved in the database
  // #2
  router.get('/:username/fav', (req, res) => {
    const username = req.params.username;
    const templateVars = {};
    db.query(` SELECT songs.song_name, artists.name AS artist_name, songs.duration, songs.price
    FROM users
    JOIN favorites ON users.id = user_id
    JOIN artists ON artists.id = artist_id
    JOIN songs ON artists.id = artist_id
    WHERE users.username = $1`, [username])
      .then((result) => {
        templateVars.favorites = result.rows;
        console.log("#2 ", templateVars);
        res.render("users", templateVars);
      })
      .catch((error) => { console.log(error.message) });
  });
  return router;
};

module.exports = usersRoutes;
