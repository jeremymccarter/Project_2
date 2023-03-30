const router = require('express').Router();
const { Favorite, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all favorites and JOIN with user data
     const userData = await User.findByPk(
      req.session.user_id,{
        attributes: ["firstName", "lastName"],
        raw: true,
      }
      
      // {include: [
      //   {
      //     model: User,
      //     attributes: ['name'],
      //   },
      // ]}
    
    );
    if (!userData){
      return res.redirect("/login")
    }
    console.log(userData)

    const favoriteData = await Favorite.findAll({
      where: {
        user_id: req.session.user_id
      },
      include:{
        model: User, 
        attributes: ['firstName']
      }
    })

    // Serialize data so the template can read it
    const favorites = favoriteData.map((favorite) => favorite.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      favorites,
      user: userData, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

router.get('/favorite/:id', async (req, res) => {
  try {
    const favoriteData = await Favorite.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['firstName'],
        },
      ],
    });

    const favorite = favoriteData.get({ plain: true });

    res.render('favorite', {
      ...favorite,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Favorite }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  

  res.render('signup');
});
module.exports = router;
