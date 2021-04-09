const express = require('express');
const router = express.Router();



const usersRoutes = (db) => {

  // GET request to the display song on users page
  // #1
  router.get("/:id", (req, res) => {
    console.log('abccccc');
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
  router.get("/:userId", (req, res) => {
    const userId = req.params.userId;
    const templateVars = {};

    db.query(`SELECT songs.song_name, artists.name AS artist_name, songs.genre AS genre
      FROM artists
      JOIN songs ON artists.id = songs.artist_id
      JOIN users ON artists.id = users.artist_id
      WHERE users.id = $1
      ORDER BY artist_name
      LIMIT 5;`, [userId])
      .then((result) => {
        templateVars.songs = result.rows;
        console.log("#2 ", templateVars);
        res.render("users", templateVars);
      })
      .catch((error) => {
        console.log(error.message);
      });
  });

  // GET request to get favorite songs saved in the database
  router.get('/fav/:userId', (req, res) => {
    const userId = req.params.userId;
    const templateVars = {};

    db.query(` SELECT songs.song_name, artists.name AS artist_name
    FROM artists
    JOIN users ON artists.id = users.artist_id
    JOIN songs ON artists.id = songs.artist_id
    JOIN favorites ON users.id = users_id
    WHERE users.id = $1`, [userId])
      .then((result) => {
        templateVars.songs = result.rows;
        res.render("users", templateVars);
      })
      .catch((error) => {
        console.log(error.message);
      });
  });

  // users can favourite items to check up on them later
  // router.post('/fav/:id', (req, res) => {
  //   console.log('return 444');
  //   const user = req.params.id;
  //   const templateVars = {};
  //   db.query(` SELECT * FROM favorites WHERE user_id = $1`, [user])
  //     .then((result) => {
  //       console.log(result.rows);
  //       templateVars.songs = result.rows;
  //       res.render("favorites", templateVars);
  //     })
  //     .catch((error) => {
  //       console.log(error.message);
  //     });
  // });

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
