const express = require('express')
const PornHub = require('./modules/Pornhub')
const Util = require('./modules/Util')
const app = express()


const portal = new PornHub();
const port = process.env.PORT || 1338

const pornstars = require('./modules/pornstars')

app.get('/pornstars/:page', (req, res) => {
     let page = req.params.page || 1
     
     pornstars(page)
          .then(result => res.send({
               page : page,
               data: result
          }))
          .catch(e => console.log(e))
});

app.get('/search', (req, res) => {
     const q = req.query
     console.log(q.page);
     
     portal.searchVideo({
          categories : q.categories,
          stars: q.stars,
          search: q.search,
          page : q.page
     })
     .then(result => res.send(result))
});

// Get Embed Video by ID
app.get('/embed/:video_id', (req, res) => {
     portal.getVideoEmbedCode(req.params.video_id)
          .then(result => {
               res.send({code : Util.escapeCharacter(result.embed.code)})
          })
          .catch(e => res.status(404).send(e))
});

app.get('/detail/:video_id', (req, res) => {
     portal.getVideoDetail(req.params.video_id)
          .then(result => res.send(result))
          .catch(e => res.status(404).send(e))
});


app.get('*', (req, res) => {
     res.status(404).send({
          message : "Get the fuck out"
     });
});

app.listen(port, () => {
     console.log(`Server started on port ${port}`);
});

