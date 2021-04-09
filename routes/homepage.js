const express = require('express');
const artists = require('./artists');
const router = express.Router();

module.exports = db => {


  // GET request to the homepage which loads all the songs in the database to the homepage (Done)
  router.get("/", (req, res) => {
    const templateVars = {};
    db.query(`SELECT songs.* FROM songs
    JOIN artists ON artists.id = artist_id`)
      .then((result) => {
        templateVars.songs = result.rows;
        res.render("homepage", templateVars);
      })
      .catch((error) => {
        console.log(error.message);

      });
  });

  // GET request to search up all the songs by Genre
  router.get("/genre/:genre", (req, res) => {
    const genre = req.params.genre;
    const templateVars = {};
    db.query(`
      SELECT *
      FROM songs
      JOIN artists ON artists.id = artist_id
      WHERE genre = $1
      ORDER BY artists.id;`, [genre])
      .then((result) => {
        templateVars.songs = result.rows;
        res.render("homepage", templateVars);
      })
      .catch((error) => { console.log(error.message) });
  });


 // GET request to search up all the songs by Artist
  router.get("/artist/:artist", (req, res) => {
    const artist = req.params.artist;
    const templateVars = {};
    db.query(`
      SELECT *
      FROM songs
      JOIN artists ON artists.id = artist_id
      WHERE artists.name = $1
      ORDER BY songs.song_name
      LIMIT 5;`, [artist])
      .then((result) => {
        templateVars.songs = result.rows;
        res.render("homepage", templateVars);
      })
      .catch((error) => {
        console.log(error.message);
      });
  });


  return router;
};
