const fetch = require('node-fetch');

class PornHub {
     constructor(){
          this.base_url = "http://www.pornhub.com/webmasters"
     }

     prepareSearchUrl(query) {
          let url = `${this.base_url}/search?`;

          if(typeof query.categories === 'string'){
               url += `categories=${query.categories}`
          }

          if(typeof query.star === 'string'){
               url += `stars=${query.stars}`
          }

          if(typeof query.search === 'string'){
               url += `search=${query.search}`
          }

          if(typeof query.thumbsize === 'string'){
               url += `&thumbsize=${query.thumbsize}`
          }
          
          return url
     }

     sendRequest(url){
          console.log(url);
          
          return new Promise((resolve,reject) => {
               fetch(url)
               .then(result => result.text())
               .then(body => resolve(JSON.parse(body)))
               .catch(e => reject(e))
          })     
     }

     getVideoDetail(videoId){
          const url = `${this.base_url}/video_by_id?id=${videoId}&thumbsize=large`

          return this.sendRequest(url)
     }

     searchVideo(query){
          const url = this.prepareSearchUrl(query)
          
          return this.sendRequest(url)
     }

     getVideoEmbedCode(videoId){
          const url = `${this.base_url}/video_embed_code?id=${videoId}`
          
          return this.sendRequest(url)
     }
}

module.exports = PornHub


