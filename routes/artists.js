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

<<<<<<< HEAD

=======
>>>>>>> master


  // POST request that submits the new song upload info to the database (redirect to homepage)
  router.post("/", (request, response) => {
    console.log('Creaaate');

    db.query(`
    INSERT INTO songs (thumbnail_photo_url, song_url, song_name, )
      VALUES ( $1, $2, $3, $4, $5 )
<<<<<<< HEAD
    RETURNING *;
    `), ([request.body.song_name,
    ])
      .then(({ rows: songs }) => {
=======
      RETURNING *;
    `, [request.body.song_name,
      request.body.price,
    request.body.duration,
    request.body.user_id,
    request.body.artist_id,])
    .then(({ rows: songs }) => {
>>>>>>> master
        response.status(201).json(songs);
      })
      .catch(e => console.error(e.stack));
  });


  // POST request that allows the artist to delete a song from their page
  router.post("/", (request, response) => {
    console.log('deleeeeeete');
    db.query(`
    DELETE FROM songs WHERE id = $1;
    `, [request.params.id])
    .then((result) => {
      if (result.rowCount !== 0) {
        response.status(200)({ message: "song deleted successfully" });
      } else {
        response.status(204)({ message: "song not found." });
      }
    })
    .catch(e => console.error(e.stack));
  });
<<<<<<< HEAD
  return router;
=======

<<<<<<< HEAD
  return router;
}
=======
>>>>>>> master
};
>>>>>>> songs


