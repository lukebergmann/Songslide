const express = require('express');
const router = express.Router();
module.exports = db => {


  // Homepage requests:
  // POST request that adds a song to their users page where they can checkout
  // POST request that allows a user to favorite a song


  // GET request to the homepage which loads all the songs in the database to the homepage (Done)
  router.get("/", (req, res) => {
    console.log('>>>>>>>14');
    const templateVars = {};
    db.query('SELECT * FROM songs')
      .then((result) => {
        console.log(result.rows);
        templateVars.songs = result.rows;
        res.render("homepage", templateVars);

      })
      .catch((error) => {
        console.log(error.message);

  });


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

  return router;
};
