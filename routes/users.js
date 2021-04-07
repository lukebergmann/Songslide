
// Users page requests:
// POST request that allows the user to unfavorite a song
// POST request that allows the users to remove a song from their cart >> done
// POST request that allows the user to checkout (redirect to homepage) >> done


// users can see featured items on a main feed >> done
// users can filter items by price,
// users can favourite items to check up on them later >> done
// users can send messages to the user that is listing the item

// Admins can:

// post items, which can be seen by others
// remove items from the site
// mark items as SOLD!,
// send a message via app, email, or text back on negotiations in buying the said item


const express = require('express');
const router = express.Router();

const usersRoutes = (db) => {

  // GET request to the users page that shows all the users purchased songs
  // #1
  router.get("/:username", (req, res) => {
    const username = req.params.username;
    const templateVars = {};
    db.query(`SELECT songs.song_name, artists.name AS artist_name, songs.duration AS duration
      FROM artists
      JOIN users ON artists.id = artist_id
      JOIN songs ON users.id = user_id
      WHERE users.username = $1
      ORDER BY artist_name
      LIMIT 5;`, [username])
      .then((result) => {
        templateVars.users = result.rows;
        console.log("#####1 ", templateVars);
        res.render("users", templateVars);
      })
      .catch((error) => {
        console.log(error.message);
      });
  });

  // POST request to save song
  router.post('/', (req, res) => {
    let users = req.params.users;
    saveSongs(users)
      .then((users) => {
        res.render("users", users);
      });
  });


  // GET request to get favorite songs saved in the database
  router.get('/user/:username', (req, res) => {
    const username = req.params.username;
    console.log('>>>>>>>>>', req.params);
    const templateVars = {};
    db.query(` SELECT songs.song_name, artists.name AS artist_name, songs.duration,
    FROM users
    JOIN favorites ON users.id = user_id
    JOIN artists ON artists.id = users.artist_id
    JOIN songs ON artists.id = songs.artist_id
    WHERE users.username = $1`, [username])
      .then((result) => {
        templateVars.favorites = result.rows;
        console.log("#2 ", templateVars);
        res.render("users", templateVars);
      })
      .catch((error) => {
        console.log(error.message);
      });
  });

  // POST request that allows the users to remove a song from their cart
  router.post('/', (req, res) => {
    let deleted = req.body;
    console.log('inside server. deleting this song: ', deleted);
    deleteFavorite(deleted)
      .then((response) => {
        res.status(201).send(response);
      })
      .catch((err) => {
        res.status(404).send(err);
      });
  });

  // users can favourite items to check up on them later
  router.get('/favorites/:id', (req, res) => {
    console.log('return 444');
    const user = req.params.id;
    const templateVars = {};
    db.query(` SELECT * FROM favorites WHERE user_id = $1`, [user])
      .then((result) => {
        console.log(result.rows);
        templateVars.favorites = result.rows;
        res.render("favorites", templateVars);
      })
      .catch((error) => {
        console.log(error.message);
      });
  });

  // mark your song as sold:
  router.post("/", (req, res) => {
    const songId = req.params.listing_id;
    // console.log("singgg!");
    if (!songId) {
      return res.redirect("/");
    }

    db.markSongAsSold(songId)
      .then(() => {
        res.redirect("songs");
      });

  });


  return router;
};

module.exports = usersRoutes;
