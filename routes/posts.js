var express = require('express');
var router = express.Router();
var postsContoller = require('../controllers/posts');

// Add a new post
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Create a new post' });
});

// Read a post
router.get('/:slug', postsContoller.read_post);

// Update a post
router.post('/post/create', function (req, res) {
  postsContoller.create_post(req, res);
});

// Update a post
router.post('/update', postsContoller.update_post);

// Check Slug
router.get('/check-slug/:slug', postsContoller.check_slug);

module.exports = router; 
