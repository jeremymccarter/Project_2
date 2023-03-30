const router = require('express').Router();
const { Favorite } = require('../../models');
const withAuth = require('../../utils/auth');
//const spotifyApi = require('./spotifyApi')

// router.get('/spotify', async (req,res) => {
//   const response = await spotifyApi()
//   console.log(response);
//   res.json(response)
// })


router.post('/', withAuth, async (req, res) => {
  try {
    const newFavorite = await Favorite.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newFavorite);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const favoriteData = await Favorite.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!favoriteData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(favoriteData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
