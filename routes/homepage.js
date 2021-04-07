const express = require('express');
const artists = require('./artists');
const router = express.Router();

module.exports = db => {
  // Homepage requests:
  // POST request that adds a song to their users page where they can checkout
  // POST request that allows a user to favorite a song


  // GET request to the homepage which loads all the songs in the database to the homepage (Done)
  router.get("/", (req, res) => {
    console.log('>>>>>>>14');
    const templateVars = {};
    db.query(`SELECT * FROM songs
    JOIN artists ON artists.id = artist_id`)
      .then((result) => {
        console.log(result.rows);
        templateVars.songs = result.rows;
        res.render("homepage", templateVars);
      })
      .catch((error) => {
        console.log(error.message);

      });
  });

  router.get("/genre/:genre", (req, res) => {
    const genre = req.params.genre;
    console.log('>>>>>>>14');
    const templateVars = {};
    db.query(`
      SELECT songs.song_name, artists.name AS artist_name, songs.duration, songs.price
      FROM songs
      JOIN artists ON artists.id = artist_id
      WHERE genre = $1
      ORDER BY price
      LIMIT 5;`, [genre])
      .then((result) => {
        console.log(result.rows);
        templateVars.songs = result.rows;
        res.render("homepage", templateVars);
      })
      .catch((error) => { console.log(error.message) });
  });

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> master
  router.get("/artist/:artist", (req, res) => {
    const artist = req.params.artist;
    console.log('>>>>>>>14');
    const templateVars = {};
    db.query(`
      SELECT songs.song_name, artists.name AS artist_name, songs.duration, songs.price
      FROM songs
      JOIN artists ON artists.id = artist_id
      WHERE artists.name = $1
      ORDER BY songs.song_name
      LIMIT 5;`, [artist])
      .then((result) => {
        console.log(result.rows);
        templateVars.songs = result.rows;
        res.render("homepage", templateVars);
      })
      .catch((error) => { console.log(error.message) });
  });
<<<<<<< HEAD

  // POST request that allows a user to favorite a song
  // router.post('/', (req, res) => {
  //   let song = req.body;
  //   saveSongs(song)
  //     .then((response) => {
  //       res.status(201).send(response);
  //     });
  // });
=======
=======
  // POST request to save song
  app.post('/', (req, res) => {
    let song = req.body;
    saveSongs(song)
      .then((response) => {
        res.status(201).send(response);

    });

    // GET request to get favorite songs saved in the database
    app.post('/', (req, res) => {
        getFavorites()
        .then((response) => {
          res.status(201).send(response);
        })
        .catch((err) => {
          res.status(404).send(err);
      });
>>>>>>> songs
>>>>>>> master

  return router;

};
