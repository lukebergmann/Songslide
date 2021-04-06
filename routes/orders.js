const router = require("express").Router();
const SONG = require("../../songs");

module.exports = db => {


  // route to get all the orders. Should be protected, only on Dev/Test
  if (SONG === "songs") {
    router.get("/orders", (request, response) => {
      db.query(`SELECT * FROM songs`)
        .then(({ rows: orders }) => {
          response.status(200).json(orders);
        })
        .catch(e => console.error(e.stack));
    });
  }

  // shows a specific order
  router.get("/carts/:id", (request, response) => {
    db.query(`SELECT * FROM songs`, [ request.params.id ])
      .then(({ rows: orders }) => {
        response.status(200).json(orders);
      })
      .catch(e => console.error(e.stack));
  });

  return router;
};
