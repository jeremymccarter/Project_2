const router = require('express').Router();
const userRoutes = require('./userRoutes');
const favoriteRoutes = require('./favoriteRoutes');
const albumsRoutes = require('./albumsRoutes');

router.use('/users', userRoutes);
router.use('/favorites', favoriteRoutes);
router.use('/albums', albumsRoutes);
module.exports = router;
