console.log('API & CRUD');

const express = require('express');
const postsRouter = require('./routers/posts')
const app = express();
const port = 3232;
const notFoundError = require("./middlewares/notFound")

//estrapolo il contenuto dal server
app.use(express.json())

app.use(express.static('public'));
app.use('/posts', postsRouter);

app.use(notFoundError)

app.listen(port, () => console.log(`Test door ${port}`))