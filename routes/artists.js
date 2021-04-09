// Artist page requests:

const express = require('express');
const router = express.Router();
module.exports = db => {


  // GET request to load the artist page with the songs they have already uploaded
  router.get("/", (req, res) => {
    const templateVars = {};
    db.query(`SELECT * FROM songs
    WHERE artist_id = 1`)
      .then((result) => {
        const sortedSongs = result.rows.sort((a, b) => b.id - a.id)
        templateVars.songs = sortedSongs
        res.render("artists", templateVars);
      })
      .catch((error) => {
        console.log(error.message);
      });
  });



  // POST request that submits the new song upload info to the database (redirect to homepage)
  router.post("/", (req, res) => {
    const templateVars = {};
    db.query(`INSERT INTO songs (artist_id, song_name, genre)
    VALUES (1, $1, $2)
    RETURNING *;`, [req.body.song_name, req.body.genre])

        .then((result) => {
         return db.query(`SELECT * FROM songs
          WHERE artist_id = 1`);
          console.log("what is result", result)
        })
        .then((result) => {
        const sortedSongs = result.rows.sort((a, b) => b.id - a.id);
           templateVars.songs = sortedSongs;
              res.render("artists", templateVars);
          })
          .catch(e => console.error(e.stack));
      });



  // POST request that allows the artist to delete a song from their page
  // router.post("/", (request, response) => {
  //   console.log('deleeeeeete');
  //   db.query(`
  //   DELETE FROM songs WHERE id = $1;
  //   `, [request.params.id])
  //   .then((result) => {
  //     if (result.rowCount !== 0) {
  //       response.status(200)({ message: "song deleted successfully" });
  //     } else {
  //       response.status(204)({ message: "song not found." });
  //     }
  //   })
  //   .catch(e => console.error(e.stack));
  // });
  return router;

};
