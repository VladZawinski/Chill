const fetch = require('node-fetch');
const cheerio = require('cheerio');

let url = "https://www.pornhub.com/pornstars"

const fetchPornstars = function(page){
     return new Promise((resolve,reject) => {
     
     let _url = createUrlWithPage(page)

     fetch(_url)
     .then(res => res.text())
     .then(body => {
          const $ = cheerio.load(body)
          
          const posts = $('#popularPornstars li')

          const result = [];
          
          for(let i = 0;i < posts.length;i++){
               const post = $(posts[i])
               
               if(post.text().trim() !== 'Remove Ads'){
                    const img = post.find('div img').attr('data-thumb_url')
                    const name = post.find('div a').attr("data-mxptext")
                    const rank = post.find('div .rank_number').text().trim()
                    const url = post.find('.js-mxp').attr('href')
                    
                    
                    result.push({
                         name : name,
                         image : img,
                         rank : rank,
                         url : url
                    })
               }
               
          }

          resolve(result)
          
          }).catch(e => reject(e))

     });
}


function createUrlWithPage(page) {
     return `${url}?page=${page}`
}

module.exports = fetchPornstars