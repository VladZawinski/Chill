const express = require('express')
const PornHub = require('./modules/Pornhub')
const Util = require('./modules/Util')
const pornhub = require('pornnhub')
const app = express()
const portal = new PornHub();
const port = process.env.PORT || 1338
const ug = 'https://www.pornhub.com/view_video.php?viewkey=ph56fc59c124c0c';

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
     portal.searchVideo({
          categories : q.categories,
          stars: q.stars,
          search: q.search
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

// http://ec2-54-169-219-236.ap-southeast-1.compute.amazonaws.com:1338/search?search=miakhalifa