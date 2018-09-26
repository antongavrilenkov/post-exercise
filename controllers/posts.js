const Post = require('../models/posts');

exports.read_post = function(req, res) {
    let post = Post.get_post_by_slug();
    res.render('index', { title: 'Read post' });
};

exports.create_post = (req, res) => {
    const post = {
        id: req.body.id,
        title: req.body.title || '',
        text: req.body.text || '',
        slug: req.body.slug || '',
        date: req.body.date || '',
        place: req.body.place || '',
        author: req.body.author || '',
        tags: req.body.tags || '',
    }

    Post.create_post(post, (response) => {
        res.send(response);
    })

};

exports.update_post = function(req, res) {
    res.send('UPDATED');
};

exports.check_slug = function(req, res) {
    const slug = req.params.slug;
    const result = Math.random() >= 0.5;
    let post = Post.get_post_by_slug();
    res.send(result);
};