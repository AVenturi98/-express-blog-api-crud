const posts = require('../data/posts.js');

function errorShow(req, res, next) {
  
    const id = +req.params.id
    const post = posts.find((el) => el.id === id)

    if (post) {
        req.post = post
        next()
    } else {
        res.status(404)
        res.json({
            error: 'Post not found',
            message: 'Il post non è stato trovato'
        })
    }
}

module.exports = { errorShow }