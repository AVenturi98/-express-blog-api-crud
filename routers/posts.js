const express = require('express');
const router = express.Router();
const posts = require('../data/posts.js');
const postsController = require('../controllers/postsController.js')
const error = require('../middlewares/error.js')

//index (get)
router.get('/', postsController.index);

//show (get))
router.get('/:id', error.errorShow, postsController.show);

//store (post)
router.post('/', postsController.post);

//update (put)
router.put('/:id', postsController.update);

//modify (patch)
router.patch('/:id', postsController.modify);

//destroy (delete)
router.delete('/:id', postsController.destroy);

//gestione degli errori
// router.param('id', (req, res, next) => {
  
//     const id = +req.params.id
//     const post = posts.find((el) => el.id === id)

//     if (post) {
//         req.post = post
//         next()
//     } else {
//         res.status(404)
//         res.json({
//             error: 'Post not found',
//             message: 'Il post non è stato trovato'
//         })
//     }
// })

module.exports = router