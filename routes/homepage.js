const express = require('express');
const artists = require('./artists');
const router = express.Router();

module.exports = db => {
  // Homepage requests:
  // POST request that adds a song to their users page where they can checkout
  // POST request that allows a user to favorite a song


  // GET request to the homepage which loads all the songs in the database to the homepage (Done)



  router.get("/", (req, res) => {
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
      .catch((error) => {
        console.log(error.message);
      });
  });

  router.get("/artist/:artist", (req, res) => {
    const artist = req.params.artist;
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
      .catch((error) => {
        console.log(error.message);
      });
  });



  // GET request to get songs that match the genre that was typed in
  router.get('/', (req, res) => {
    let genre = req.query;
    if (genre) {
      console.log('Error in GET/: ', genre);
      res.status(404).send(genre);
    } else {
      res.status(200).send(genre);
    }
  });

  return router;
}
