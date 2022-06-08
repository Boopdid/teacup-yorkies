const router = require('express').Router();
const { Tweet, User, Comment, PotatoOrPitbull } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all tweets/howls and JOIN with user data sorting by DESC ID which will sort newest toward top
    const tweetData = await Tweet.findAll({
      order: [['id', 'DESC']],
      include: [
        {
          model: User,
          attributes: ['name', 'avatar_file'],
        },
        {
          model: Comment,
          attributes: [
            'id',
            'user_id',
            'Tweet_id',
            'comment_text',
            'date_created',
          ],
          include: {
            model: User,
            attributes: ['name', 'avatar_file'],
          },
        },
      ],
    });

    // Serialize data so the template can read it
    const tweets = tweetData.map((tweet) => tweet.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', {
      tweets,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//click on individual howl/tweet and comments belonging to tweet 
router.get('/tweet/:id', async (req, res) => {
  try {
    const tweetData = await Tweet.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,

          include: [User],
        },
      ],
    });

    const tweet = tweetData.get({ plain: true });

    res.render('tweet', {
      ...tweet,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Tweet }],
    });

    const allTweetData = await Tweet.findAll({
      order: [['id', 'DESC']],
      include: [
        {
          model: User,
          attributes: ['name', 'avatar_file'],
        },
        {
          model: Comment,
          attributes: [
            'id',
            'user_id',
            'Tweet_id',
            'comment_text',
            'date_created',
          ],
          include: {
            model: User,
            attributes: ['name', 'avatar_file'],
          },
        },
      ],
    });

    const user = userData.get({ plain: true });
    // Serialize data so the template can read it
    const tweets = allTweetData.map((tweet) => {
      let convertedTweet = tweet.get({ plain: true });
      convertedTweet.currentUsersTweet = user.name === convertedTweet.user.name;
      return convertedTweet;
    });

    res.render('dashboard', {
      user,
      tweets,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('signup');
});

//edit page for user tweet
router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const tweetData = await Tweet.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    const tweet = tweetData.get({ plain: true });
    res.render('tweetinfo', {
      ...tweet,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// logic for pitbull potato minigame to randomize images presented
function randomlySort(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var newIndex = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[newIndex];
    array[newIndex] = temp;
  }
  return array;
}

//minigame get route
router.get('/PotatoOrPitbull', async (req, res) => {
  try {
    // Get all blogs and JOIN with user data sorting by DESC ID which will sort newest toward top
    const potatoOrPitbullsData = await PotatoOrPitbull.findAll({
      order: [['id', 'DESC']],
    });

    // Serialize data so the template can read it
    const potatoesOrPitbulls = potatoOrPitbullsData.map((potatoOrPitbull) =>
      potatoOrPitbull.get({ plain: true })
    );

    // Pass serialized data and session flag into template
    res.render('potatoorpitbull', {
      potatoesOrPitbulls: randomlySort(potatoesOrPitbulls),
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/hangman', async (req, res) => {
  try {
    
    res.render('hangman', {
      
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/about', async (req, res) => {
  try {
    
    res.render('about', {
      
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
