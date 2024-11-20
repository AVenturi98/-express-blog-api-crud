const express = require('express');
const router = express.Router();
const posts = require('../data/posts');
const { index } = require('../controllers/controller')

//index (get)
router.get('/', index);

//show (get)
router.get('/:id', (req, res) => {

    const id = req.params.id
    const post = posts.find((el) => el.id === id)
    console.log(`Elemento del post: ${id}`)
    res.json(post)
});


//store (post)
router.post('/', (req, res) => {
    res.send('Creo un nuovo elemento del post')
});


//update (put)
router.put('/:id', (req, res) => {

    const id = req.params.id
    const post = posts.find((el) => el.id === id)
    console.log(`Aggiorno l\'elemento del post: ${id}`)
    res.json(post)
});

//modify (patch)
router.patch('/:id', (req, res) => {
    
    const id = req.params.id
    const post = posts.find((el) => el.id === id)
    console.log(`Modifico l\'elemento del post: ${id}`)
    res.json(post)
});

//destroy (delete)
router.delete('/:id', (req, res) => {

    const id = req.params.id
    const post = posts.find((el) => el.id === id)
    console.log(`Cancella l\'elemento del post: ${id}`)
    res.json(post)
});

module.exports = router