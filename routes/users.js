const express = require('express');
const router = express.Router();



const usersRoutes = (db) => {

  // GET request to the display song on users page
  // #1
  router.get("/user/:id", (req, res) => {
    const templateVars = {};
    db.query(`SELECT * FROM songs
      WHERE songs.id = $1
      `, [req.params.id])
      .then((result) => {
        templateVars.users = result.rows;
        console.log("#####1 ", templateVars);
        res.render("users", templateVars);
      })
      .catch((error) => {
        console.log(error.message);
      });
  });

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

   // function to display a song in a new page
  router.post("/:id", (req, res) => {
    console.log('Getting song id from homepage', req.body);
    const songId = req.params.id;
    console.log("song id = " + songId);
    if (!songId) {
      return res.redirect("/");
    }
    const templateVars = {};

    db.query(`Select * from songs where id = $1`,[songId])
      .then((result) => {
        templateVars.songs = result.rows;
        res.render("users", templateVars);
      });

  });

  return router;

};
module.exports = usersRoutes;
