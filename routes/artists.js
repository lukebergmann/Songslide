// Artist page requests:

const express = require('express');
const router = express.Router();
module.exports = db => {


  // GET request to load the artist page with the songs they have already uploaded
  router.get("/", (req, res) => {
    // console.log('>>>>>>>14');
    const templateVars = {};
    db.query('SELECT * FROM artists')
      .then((result) => {
        console.log(result.rows);
        templateVars.artists = result.rows;
        res.render("artists", templateVars);

      })
      .catch((error) => {
        console.log(error.message);
      });
  });


  // POST request that submits the new song upload info to the database (redirect to homepage)
  router.post("/", (req, res) => {
    const templateVars = {}
    console.log("req.body ========", req.body.song_url)
    db.query(`
    INSERT INTO songs (song_name, song_url, genre)
      VALUES ( $1, $2, $3)
    RETURNING *;
    `, [req.body.song_name, req.body.song_url, req.body.genre
    ])
    .then((result) => {
      console.log(result.rows);
      templateVars.songs = result.rows;
      res.render("homepage", templateVars);
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
