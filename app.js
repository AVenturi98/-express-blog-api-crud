console.log('CRUD & REST');

const express = require('express');
const posts = require('./data/posts');
const postsRouter = require('./routers/posts')
const app = express();
const port = 3232;

app.use(express.static('public'));
app.use('/posts', postsRouter);

app.listen(port, () => console.log(`Test door ${port}`))