// ^^^^ ****Is this neccessary on this page
// ** do I need quotes around a token
// ** do I need % around token

//   getSongsByGenre
//   getSongsByArtist,
//   getUsersSongs,
//   getUsersFavoriteSongs,
//   getArtistsSongs

// todo: add bio into sql queries

// select all songs by genre
const getSongsByGenre = function(genre, res) {
  const templateVars = {};
  const valueArr = [];
  valueArr.push(genre);
  const queryString = `
  SELECT songs.song_name, artists.name AS artist_name, songs.duration, songs.price
  FROM songs
  JOIN artists ON artists.id = artist_id
  WHERE genre = $1
  ORDER BY price
  LIMIT 5;`;

  return db.query(queryString, valueArr)
    .then(result => {
      templateVars.songs = result.rows;
      console.log("templateVars1: ", templateVars);
      res.render("!!!!", templateVars);
    })
    .catch(err => {
      console.log("err: ", err);
    })
};

// select all songs of an artist
const getSongsByArtist = function(name, res) {
  const templateVars = {};
  const valueArr = [];
  valueArr.push(name);
  const queryString = `
  SELECT song_name, artists.name AS artist_name, songs.duration AS duration, songs.price AS price
  FROM songs
  JOIN artists ON artists.id = artist_id
  WHERE artists.name = $1
  ORDER BY artists.name
  LIMIT 5;`

  return Pool.query(queryString, valueArr)
  .then(result => {
    templateVars.songs = result.rows;
    console.log("templateVars2: ", templateVars);
    res.render("!!!!", templateVars);
    })
    .catch(err => {
      console.log("err: ", err);
    })
};

// all users songs
const getUsersSongs = function(userId, res) {
  const templateVars = {};
  const valueArr = [];
  valueArr.push(userId);
  const queryString = `
  SELECT songs.song_name, artists.name AS artist_name, songs.duration AS duration
  FROM artists
  JOIN users ON artists.id = artist_id
  JOIN songs ON users.id = user_id
  WHERE users.id = $1
  ORDER BY artist_name
  LIMIT 5;`;

  return Pool.query(queryString, valueArr)
  .then(result => {
    templateVars.songs = result.rows;
    console.log("templateVars3: ", templateVars);
    res.render("users", templateVars);
    })
    .catch(err => {
      console.log("err: ", err);
    })
};

// users favorite songs
const getUsersFavoriteSongs = function(userId, res) {
  const templateVars = {};
  const valueArr = [];
  valueArr.push(userId);
  const queryString = `
  SELECT favorites.song AS title, favorites.artist AS artist, favorites.album AS album, favorites.genre AS genre
  FROM users
  JOIN favorites ON users.id = user_id
  WHERE users.id = $1
  ORDER BY title
  LIMIT 5;`;

  return Pool.query(queryString, valueArr)
  .then(result => {
    templateVars.songs = result.rows;
    console.log("templateVars4: ", templateVars);
    res.render("!!!!", templateVars);
    })
    .catch(err => {
      console.log("err: ", err);
    })
};

const getArtistsSongs = function(name, res) {
  const templateVars = {};
  const valueArr = [];
  valueArr.push(name);
  const queryString = `
  SELECT songs.song_name, songs.price AS price
  FROM artists
  JOIN songs ON artists.id = artist_id
  WHERE artists.name = $1
  ORDER BY songs.song_name;`;

  return Pool.query(queryString, valueArr)
  .then(result => {
    templateVars.songs = result.rows;
    console.log("templateVars5: ", templateVars);
    res.render("!!!!", templateVars);
    })
    .catch(err => {
      console.log("err: ", err);
    })
};

module.exports = {
  getSongsByGenre,
  getSongsByArtist,
  getUsersSongs,
  getUsersFavoriteSongs,
  getArtistsSongs
  // getBioByArtist,
  // getSongsByAlbum,
  // getSongsByPrice,
  // getUsersSongsByArtist,
  // getUsersFavoriteSongsByArtits,
  // getUsersFavoriteSongsByAlbum,
  // getUsersFavoriteSongsByGenre,
};



// select bios by artist
// const getBioByArtist = function(artist) {
//   return Pool.query(`
//   SELECT artists.name AS artist_name , artists.bio AS bio
//   FROM artists
//   WHERE artists.name LIKE $1;`, artist)
//   .then(res => {
//     return res.rows;
//   })
//   .catch(err => {
//     return undefined;
//   })
// };

// select songs by album
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

// select song by price
// const getSongsByPrice = function(price) {
//   return Pool.query(`
//   SELECT songs.song_name, artists.name AS artist_name, songs.duration AS duration, songs.price AS price
//   FROM songs
//   JOIN artists ON artists.id = artist_id
//   WHERE songs.price <= $1
//   ORDER BY price
//   LIMIT 20;`, price)
//     .then(res => {
//       return res.rows;
//     })
//     .catch(err => {
//       return undefined;
//     })
// };

// user searches for songs by artist
// const getUsersSongsByArtist = function(id, name) {
//   const values = [id, name];
//   return Pool.query(`
//   SELECT songs.song_name, artists.name AS artist_name, songs.duration AS duration
//   FROM artists
//   JOIN users ON artists.id = artist_id
//   JOIN songs ON users.id = user_id
//   WHERE users.id = $1 AND artists.name = $2
//   ORDER BY artist_name
//   LIMIT 5;`, values)
//     .then(res => {
//       return res.rows;
//     })
//     .catch(err => {
//       return undefined;
//     })
// };

// users favorite songs by artist
// const getUsersFavoriteSongsByArtits = function(id, name) {
//   const values = [id, name];
//   return Pool.query(`
//   SELECT favorites.song AS title, favorites.artist AS artist, favorites.album AS album, favorites.genre AS genre
//   FROM users
//   JOIN favorites ON users.id = user_id
//   WHERE users.id = $1 AND favorites.artist = $2
//   ORDER BY title
//   LIMIT 5;`, values)
//     .then(res => {
//       return res.rows;
//     })
//     .catch(err => {
//       return undefined;
//     })
// };

// users favorite songs by album
// const getUsersFavoriteSongsByAlbum = function(id, album) {
//   const values = [id, album];
//   return Pool.query(`
//   SELECT favorites.song AS title, favorites.artist AS artist, favorites.album AS album, favorites.genre AS genre
//   FROM users
//   JOIN favorites ON users.id = user_id
//   WHERE users.id = $1 AND favorites.album = $2
//   ORDER BY title
//   LIMIT 5;`, values)
//     .then(res => {
//       return res.rows;
//     })
//     .catch(err => {
//       return undefined;
//     })
// };

// users favorite songs by genre
// const getUsersFavoriteSongsByGenre = function(id, genre) {
//   const values = [id, genre];
//   return Pool.query(`
//   SELECT favorites.song AS title, favorites.artist AS artist, favorites.album AS album, favorites.genre AS genre
//   FROM users
//   JOIN favorites ON users.id = user_id
//   WHERE users.id = $1 AND favorites.genre = $2
//   ORDER BY title
//   LIMIT 5;`, values)
//     .then(res => {
//       return res.rows;
//     })
//     .catch(err => {
//       return undefined;
//     })
// };

// ARTISTS PAGE
// select produced songs
// select prices


