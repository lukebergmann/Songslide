// HOMEPAGE
// select all songs of a genre rock
// select all songs of a genre jazz
// select all songs of a genre rap/hiphop
// select all songs of a genre punkrock

const { Pool } = require("generic-pool")

// select all songs by genre
const getSongsByGenre = function() {
  Pool.query(`
  SELECT songs.title AS song_title, songs.artist AS artist_name, songs.duration AS duration, songs.price AS price
  FROM songs
  WHERE genre LIKE %$1%
  // do you need to put percents around the token??
  ORDER BY price
  LIMIT 5;`)
}

// select songs by artist
const getSongsByArtist = function() {
  Pool.query(`
  SELECT songs.title AS song_title, artists.name AS artist_name, songs.album AS album, artists.bio AS bio
  FROM songs
  JOIN artists ON artists.id = artist_id
  WHERE artist LIKE %$1%
  GROUP BY artists.name
  LIMIT 1;`)
}

// select songs by album
// **songs tabe needs to have album**


// select all songs of an artist
const getSongsByArtist = function() {
  Pool.query(`
  SELECT songs.title AS song_title, songs.artist AS artist_name, songs.duration AS duration, songs.price AS price
  FROM songs
  WHERE artists.name = $1
  GROUP BY artists.name
  ORDER BY price
  LIMIT 5;`)
}


// select song by price
const getSongsByPrice = function() {
  Pool.query(`
  SELECT songs.title AS song_title, songs.artist AS artist_name, songs.duration AS duration, songs.price AS price
  FROM songs
  WHERE songs.price <= $1
  ORDER BY price
  LIMIT 5;`)
}



// USER PAGE
// select all songs
// select album
// select favorited songs
// select artists of purchased songs
// select liked artist bios
// select funds


// **I think users to artists is a many to many relationship **
// all users songs
const getUsersSongs = function() {
  Pool.query(`
  SELECT songs.title AS song_title, songs.artist AS artist_name, songs.duration AS duration
  FROM users
  JOIN songs ON users.id = user_id
  WHERE users.id = $1
  ORDER BY artist_name
  LIMIT 5;`)
}


// user searches for songs by artist
const getUsersSongsByArtist = function() {
  Pool.query(`
  SELECT songs.title AS song_title, songs.artist AS artist_name, songs.duration AS duration
  FROM users
  JOIN songs ON users.id = user_id
  WHERE users.id = $1 AND songs.artist = $2
  ORDER BY artist_name
  LIMIT 5;`)
}


// ** change favorites.song to favorites.title **
// users favorite songs
const getUsersFavoriteSongs = function() {
  Pool.query(`
  SELECT favorites.title AS title, favorites.artist AS artist, favorites.album AS album, favorites.genre AS genre
  FROM users
  JOIN favorites ON users.id = user_id
  GROUP BY users.id
  WHERE users.id = $1
  ORDER BY title
  LIMIT 5;`)
}


// users favorite songs by artist
const getUsersFavoriteSongsByArtits = function() {
  Pool.query(`
  SELECT favorites.title AS title, favorites.artist AS artist, favorites.album AS album, favorites.genre AS genre
  FROM users
  JOIN favorites ON users.id = user_id
  WHERE users.id = $1 AND favorites.artist = $2
  GROUP BY users.id AND favorites.artist
  ORDER BY title
  LIMIT 5;`)
}


// users favorite songs by album
const getUsersFavoriteSongsByAlbum = function() {
  Pool.query(`
  SELECT favorites.title AS title, favorites.artist AS artist, favorites.album AS album, favorites.genre AS genre
  FROM users
  JOIN favorites ON users.id = user_id
  WHERE users.id = $1 AND favorites.album = $2
  GROUP BY users.id AND favorites.album
  ORDER BY title
  LIMIT 5;`)
}


// users favorite songs by genre
const getUsersFavoriteSongsByGenre = function() {
  Pool.query(`
  SELECT favorites.title AS title, favorites.artist AS artist, favorites.album AS album, favorites.genre AS genre
  FROM users
  JOIN favorites ON users.id = user_id
  WHERE users.id = $1 AND favorites.genre = $2
  GROUP BY users.id AND favorites.genre
  ORDER BY title
  LIMIT 5;`)
}


// ARTISTS PAGE
// select produced songs
// select prices

// **artists table needs an album**
const getArtistsSongsByAlbum = function() {
  Pool.query(`
  SELECT artists.title AS title, artists.price AS price
  FROM artists
  JOIN songs ON artists.id = artist_id
  GROUP BY artists.album
  ORDER BY artists.title;`)
}




