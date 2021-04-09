const express = require('express');
const router = express.Router();



const usersRoutes = (db) => {

  // GET request to the users page that shows all the users purchased songs
  router.get("/:username", (req, res) => {
    const username = req.params.username;
    const templateVars = {};

    db.query(`SELECT songs.song_name, artists.name AS artist_name, songs.genre AS genre
      FROM artists
      JOIN users ON artists.id = users.artist_id
      JOIN songs ON artists.id = songs.artist_id
      WHERE users.username = $1
      ORDER BY artist_name;`, [username])
      .then((result) => {
        templateVars.songs = result.rows;
        res.render("users", templateVars);
      })
      .catch((error) => {
        console.log(error.message);
      });
  });

  router.post("/username/delete/:songId", (req, res) => {
    const songId = req.params.songId;
    console.log("params: ", req.params);
    const templateVars = {};

    db.query(`
    DELETE
    FROM songs
    WHERE id = $1`, [songId])
      .then((result) => {
        templateVars.songs = result.rows;
        res.render("users", templateVars);
      })
      .catch((error) => {
        console.log(error.message);
      });
  });

  // GET request to get favorite songs saved in the database
  router.get('/fav/:username', (req, res) => {
    const username = req.params.username;
    const templateVars = {};

    db.query(` SELECT favorites.song AS song_title, favorites.artist AS artist, favorites.album AS album
    FROM users
    JOIN favorites ON users.id = favorites.user_id
    WHERE users.username = $1`, [username])
      .then((result) => {
        templateVars.songs = result.rows;
        res.render("users", templateVars);
      })
      .catch((error) => {
        console.log(error.message);
      });
  });

  return router;
};

module.exports = usersRoutes;
