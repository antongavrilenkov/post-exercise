var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017'
var postsFixture = require('../test/fixtures/posts');

async function generateDemoData(){
  let result = [];
  postsFixture.default.forEach(element => {
    if (typeof element !== 'undifined' && typeof element !== 'null' && typeof element !== ''){
      let slug = generateSlug(element);
      result.push({
        title: element.title,
        slug: slug
      })
    }
  });
  await MongoClient.connect(url)
    .then(function (db) {
      db.use('post');
      db.posts.insertMany(result)
     .then(function(result) {
       console.log('result ', result)
     })
    })
    .catch(()=>{return 0;}) 
}

exports.get_post_by_slug = async function (error, callback) { 
  return 'post data';
};

exports.create_post = (data, callback) => {
  MongoClient.connect(url, async function(err, client) {
    const response = await client.db('posts').collection('post').insertOne(data);
    console.log(response.result.ok)
  });
};

exports.update_post = (req, res) => {
    return 'updated';
};