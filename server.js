const express = require('express')
const app = express()

const port = process.env.PORT || 1338

const pornhub = require('./modules/pornhub')
const xnxx = require('./modules/xnxx')

app.get('/pornstars/:page', (req, res) => {
     let page = req.params.page || 1
     
     pornhub(page)
          .then(result => res.send(result))
          .catch(e => console.log(e))
});

app.get('/xnxx/hits', (req, res) => {
     xnxx("").then(result => res.send(result))
          .catch(e => res.status(500).send({message : "Shut the fuck up"}))
});

app.listen(port, () => {
     console.log(`Server started on port ${port}`);
});