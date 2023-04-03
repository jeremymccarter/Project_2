const router = require('express').Router();
const withAuth = require('../../utils/auth');
const spotifyApi = require('../../utils/spotifyApi');

router.get('/spotify', withAuth, async (req, res) => {
  const {q, p} = req.query
  const response = await spotifyApi(q, parseInt(p, 10))
  const albums = response.data.albums.items
  if (req.header('Content-Type') === 'text/html') {
    res.render('albums', {
      albums,
      layout: false 
    })  
  } else if (req.header('Content-Type') === 'application/json') {
    res.json(albums)
  }
})


module.exports = router