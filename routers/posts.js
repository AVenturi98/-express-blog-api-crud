const express = require('express');
const router = express.Router();
const posts = require('../data/posts.js');
const postsController = require('../controllers/postsController.js')

//index (get)
router.get('/', postsController.index);

//show (get))
router.get('/:id', postsController.show);

//store (post)
router.post('/', postsController.post);

//update (put)
router.put('/:id', postsController.update);

//modify (patch)
router.patch('/:id', postsController.modify);

//destroy (delete)
router.delete('/:id', postsController.destroy);

module.exports = router