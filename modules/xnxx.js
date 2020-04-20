const fetch = require('node-fetch');
const cheerio = require('cheerio');

let url = "https://www.xnxx.com"

const bestOf = (date) => {
     return new Promise((resolve,reject) => {
          fetch(createHitsUrl(url))
               .then(res => res.text())
               .then(body => {
                    const $ = cheerio.load(body)
                    let container = $('.mozaique')

                    const result = [];

                    const imgContainer = container.find('.thumb-inside');
                    const titleContainer = container.find('.thumb-under');
                    
                    for(let i = 0;i < imgContainer.length ; i++){
                         const imgFields = $(imgContainer[i])
                         const image = imgFields.find('.thumb').find('a').find('img').attr('data-src')
                         const _url = imgFields.find('.thumb').find('a').attr('href')
                         const title = $(titleContainer[i]).find('p').find('a').attr('title')
                         
                         result.push({
                              image : image,
                              title : title,
                              url: `${url}${_url}`
                         })
                    }
                    resolve(result)
                    
               }).catch(e => reject(e))
     })
}

bestOf()

function createBestOfUrl(date){
     return `${url}/best/${date}`;
}

function createHitsUrl(url){
     return `${url}/hits`
}


module.exports = bestOf