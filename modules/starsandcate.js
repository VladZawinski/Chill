const fetch = require('node-fetch');
const cheerio = require('cheerio');

let base_url = "https://www.pornhub.com/"

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

const fetchCategories = () => {
     return new Promise((resolve,reject) => {
          fetch(createCategoriesUrl())
               .then(res => res.text())
               .then(body => {
                    const categoryList = [];
                    const $ = cheerio.load(body);
                    const categorySection = $('#categoriesListSection .cat_pic');
               
                    for(let i = 0;i < categorySection.length;i++){
                         const container = $(categorySection[i])
                         const img = container.find('div a').find('img').attr('data-thumb_url')
                         const title = container.find('div').find('h5').find('strong').text()
                        
                         categoryList.push({
                              id : i + 1,
                              title : title,
                              image_url : img
                         })
                    }
                    
                    resolve(categoryList)

               }).catch(e => reject(e))
     })
}


function createCategoriesUrl(){
     return `${base_url}categories`
}

function createUrlWithPage(page) {
     return `${base_url}pornstars?page=${page}`
}

module.exports = {
     fetchPornstars,
     fetchCategories
}