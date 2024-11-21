console.log('API & CRUD');

const express = require('express');
const postsRouter = require('./routers/posts')
const app = express();
const port = 3232;
//estrapolo il contenuto dal server
app.use(express.json())

app.use(express.static('public'));
app.use('/posts', postsRouter);

app.listen(port, () => console.log(`Test door ${port}`))