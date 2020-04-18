const express = require('express')
const app = express()

const port = process.env.PORT || 1337

const pornhub = require('./modules/pornhub')

app.get('/pornstars/:page', (req, res) => {
     pornhub(1)
          .then(result => res.send(result))
          .catch(e => console.log(e))
});

app.listen(port, () => {
     console.log(`Server started on port ${port}`);
});