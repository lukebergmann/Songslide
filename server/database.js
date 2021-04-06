const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const dbParams = require('../lib/db.js');
const db = new Pool(dbParams);
db.connect();

// HOME PAGE
// select all songs of a genre rock
// select all songs of a genre jazz
// select all songs of a genre rap/hiphop
// select all songs of a genre punkrock


// ** do I need quotes around a token
// ** do I need % around token


// select all songs by genre
const getSongsByGenre = function(genre) {
  return db.query(`
  SELECT songs.song_name, artists.name AS artist_name, songs.duration, songs.price
  FROM songs
  JOIN artists ON artists.id = artist_id
  WHERE genre = $1
  ORDER BY price
  LIMIT 5;`, genre)
    .then(result => {
      templateVars = result.rows;
      console.log("temp", templateVars);
      // res.render("homepage", templateVars);
    })
    .catch(err => {
      return undefined;
    })
};

// select bios by artist
const getBioByArtist = function(artist) {
  return Pool.query(`
  SELECT artists.name AS artist_name , artists.bio AS bio
  FROM artists
  WHERE artists.name LIKE $1;`, artist)
  .then(res => {
    return res.rows;
  })
  .catch(err => {
    return undefined;
  })
};

// select songs by album
// **confused about this one. Id have to Join 3 tables to return album**
// const getSongsByAlbum = function(album) {
//   return Pool.query(`
//   SELECT songs.title AS song_title, songs.artist AS artist_name, artists.album AS album, songs.duration AS duration, songs.price AS price
//   From songs
//   JOIN artists ON artists.id = artist_id
//   WHERE album = $1
//   ORDER BY songs.title;
//   `, album)
//     .then(res => {
//       return res.rows;
//     })
//     .catch(err => {
//       return undefined;
//     })
// }


// select all songs of an artist
const getSongsByArtist = function(name) {
  return Pool.query(`
  SELECT song_name, artists.name AS artist_name, songs.duration AS duration, songs.price AS price
  FROM songs
  JOIN artists ON artists.id = artist_id
  WHERE artists.name = $1
  ORDER BY artists.name
  LIMIT 5;`, name)
    .then(res => {
      return res.rows;
    })
    .catch(err => {
      return undefined;
    })
};

// select song by price
const getSongsByPrice = function(price) {
  return Pool.query(`
  SELECT songs.song_name, artists.name AS artist_name, songs.duration AS duration, songs.price AS price
  FROM songs
  JOIN artists ON artists.id = artist_id
  WHERE songs.price <= $1
  ORDER BY price
  LIMIT 20;`, price)
    .then(res => {
      return res.rows;
    })
    .catch(err => {
      return undefined;
    })
};

// USER PAGE
// select all songs
// select album
// select favorited songs
// select artists of purchased songs
// select liked artist bios
// select funds

// all users songs
const getUsersSongs = function(id) {
  return Pool.query(`
  SELECT songs.song_name, artists.name AS artist_name, songs.duration AS duration
  FROM artists
  JOIN users ON artists.id = artist_id
  JOIN songs ON users.id = user_id
  WHERE users.id = $1
  ORDER BY artist_name
  LIMIT 5;`, id)
    .then(res => {
      return res.rows;
    })
    .catch(err => {
      return undefined;
    })
};

// user searches for songs by artist
const getUsersSongsByArtist = function(id, name) {
  const values = [id, name];
  return Pool.query(`
  SELECT songs.song_name, artists.name AS artist_name, songs.duration AS duration
  FROM artists
  JOIN users ON artists.id = artist_id
  JOIN songs ON users.id = user_id
  WHERE users.id = $1 AND artists.name = $2
  ORDER BY artist_name
  LIMIT 5;`, values)
    .then(res => {
      return res.rows;
    })
    .catch(err => {
      return undefined;
    })
};


// users favorite songs
const getUsersFavoriteSongs = function(id) {
  return Pool.query(`
  SELECT favorites.song AS title, favorites.artist AS artist, favorites.album AS album, favorites.genre AS genre
  FROM users
  JOIN favorites ON users.id = user_id
  WHERE users.id = $1
  ORDER BY title
  LIMIT 5;`, id)
    .then(res => {
      return res.rows;
    })
    .catch(err => {
      return undefined;
    })
};

// users favorite songs by artist
const getUsersFavoriteSongsByArtits = function(id, name) {
  const values = [id, name];
  return Pool.query(`
  SELECT favorites.song AS title, favorites.artist AS artist, favorites.album AS album, favorites.genre AS genre
  FROM users
  JOIN favorites ON users.id = user_id
  WHERE users.id = $1 AND favorites.artist = $2
  ORDER BY title
  LIMIT 5;`, values)
    .then(res => {
      return res.rows;
    })
    .catch(err => {
      return undefined;
    })
};

// users favorite songs by album
const getUsersFavoriteSongsByAlbum = function(id, album) {
  const values = [id, album];
  return Pool.query(`
  SELECT favorites.song AS title, favorites.artist AS artist, favorites.album AS album, favorites.genre AS genre
  FROM users
  JOIN favorites ON users.id = user_id
  WHERE users.id = $1 AND favorites.album = $2
  ORDER BY title
  LIMIT 5;`, values)
    .then(res => {
      return res.rows;
    })
    .catch(err => {
      return undefined;
    })
};

// users favorite songs by genre
const getUsersFavoriteSongsByGenre = function(id, genre) {
  const values = [id, genre];
  return Pool.query(`
  SELECT favorites.song AS title, favorites.artist AS artist, favorites.album AS album, favorites.genre AS genre
  FROM users
  JOIN favorites ON users.id = user_id
  WHERE users.id = $1 AND favorites.genre = $2
  ORDER BY title
  LIMIT 5;`, values)
    .then(res => {
      return res.rows;
    })
    .catch(err => {
      return undefined;
    })
};

// ARTISTS PAGE
// select produced songs
// select prices

const getArtistsSongs = function(name) {
  return Pool.query(`
  SELECT songs.song_name, songs.price AS price
  FROM artists
  JOIN songs ON artists.id = artist_id
  WHERE artists.name = $1
  ORDER BY songs.song_name;`, name)
    .then(res => {
      return res.rows;
    })
    .catch(err => {
      return undefined;
    })
};

module.exports = {
  getSongsByGenre,
  getBioByArtist,
  // getSongsByAlbum,
  getSongsByArtist,
  getSongsByPrice,
  getUsersSongs,
  getUsersSongsByArtist,
  getUsersFavoriteSongs,
  getUsersFavoriteSongsByArtits,
  getUsersFavoriteSongsByAlbum,
  getUsersFavoriteSongsByGenre,
  getArtistsSongs
};
