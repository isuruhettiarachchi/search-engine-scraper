const express = require('express');

const searchRouter = require('./src/routes/search');

const port = 3000;
const app = express();

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.use('/search', searchRouter);

app.use(function(req, res, next) {
    next();
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))