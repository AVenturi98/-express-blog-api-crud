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

function errorPost(req, res, next) {

    const error = validate(req)

    if (!error.length) {
        next()
    } else {
        res.status(404)
        res.json({
            error: `Data required`,
            message: error
        })
    }
}

module.exports = { errorShow, errorPost }


const validate = (req) => {
    const { title, slug, content, image, tags } = req.body

    const errors = []

    if (!title) errors.push('Title incomplete')
    if (!slug) errors.push('Slug incomplete')
    if (!content) errors.push('Content incomplete')
    if (!image) errors.push('Image incomplete')
    if (!tags) errors.push('Tags incomplete')

    return errors
}