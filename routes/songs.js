const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const dbParams = require('../lib/db.js');
const db = new Pool(dbParams);
db.connect();



// this displays all info on the homepage
router.get("/", (req, res) => {
  console.log('>>>>>>>14');
  let templateVars = {};
  db.query(`SELECT * FROM songs
  JOIN artists ON artist_id = artists.id`)
    .then((result)=> {
      console.log(result.rows);
      templateVars.songs = result.rows;
      res.render("homepage", templateVars);

    })
    .catch((error) => {
      console.log(error.message);
    });
});

// Songs for sale
router.get("/forsale", (req, res) => {
  // console.log('>>>>>>>14');
  const templateVars = {};
  db.query('SELECT * FROM songs')
    .then((result)=> {
      console.log(result.rows);
      templateVars.songs = result.rows;
      res.render("homepage", templateVars);

    })
    .catch((error) => {
      console.log(error.message);
    });
});

// shows artists works and info
router.get("/artists", (req, res) => {
  // console.log('>>>>>>>14');
  const templateVars = {};
  db.query('SELECT * FROM artists')
    .then((result)=> {
      console.log(result.rows);
      templateVars.artists = result.rows;
      res.render("artists", templateVars);

    })
    .catch((error) => {
      console.log(error.message);
    });
});

// Updates a song
router.put("/:id", (req, res) => {
  console.log('updaaaate');
  db.query(`
      UPDATE songs
      SET song_name = $1,
      price = $2,
      duration = $3,
      user_id = $4,
      artist_id = $5,
      WHERE user_id = $6 RETURNING *;
     `, [ request.params.id,
    request.body.title,
    request.body.song_name,
    request.body.price,
    request.body.duration,
    request.body.user_id,
    request.body.artist_id ])
    .then(({ rows: songs }) => {
      response.json(songs);
    })
    .catch(e => console.error(e.stack));
  console.log('>>33>>', songs);

});

// Once the artist submits the form artist gets redirected to songs page
// adds a new song
router.post("/artists", (request, response) => {
  console.log('Creaaate');

  db.query(`
      INSERT INTO songs (song_name, price, duration, user_id, artist_id )
        VALUES ( $1, $2, $3, $4, $5 )
      RETURNING *;
      `, [request.body.song_name,
    request.body.price,
    request.body.duration,
    request.body.user_id,
    request.body.artist_id,])
    .then(({ rows: songs }) => {
      response.status(201).json(songs);
    })
    .catch(e => console.error(e.stack));
    res.redirect("/songs");
});


// deletes a song
router.post("/", (request, response) => {
  console.log('deleeeeeete');

  db.query(`
      DELETE FROM songs WHERE id = $1;
      `, [ request.params.id ])
    .then((result) => {
      if (result.rowCount !== 0) {
        response.status(200)({message: "song deleted successfully"});
      } else {
        response.status(204)({message: "song not found."});
      }
    })
    .catch(e => console.error(e.stack));
});


  // gets info about one song
  router.get("/", (request, response) => {
      console.log('sooooong');
    db.query(`
      SELECT *
      FROM songs
      WHERE songs = $1`, [request.params.id])
    .then(({ rows: songs }) => { response.status(200).json(songs) })
    .catch(e => console.error(e.stack));
});

module.exports = router;
