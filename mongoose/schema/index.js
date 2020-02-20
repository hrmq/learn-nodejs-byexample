const mongoose = require('mongoose');

const BlogModel = require('.');

mongoose.connect('mongodb://localhost/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// use instance method
const blog = new BlogModel();
blog.publishedCount((err, res) => {
  console.log('Number of published blogs:', res);
});

//use static method
BlogModel.findByTitle('awesome', (err, docs) => {
  console.log(`Find ${docs.length} documents with this title`);
  docs.forEach(doc => {
    console.log(doc);
  });
});

// use query method
BlogModel.find()
  .byTitle('awesome')
  .exec((err, docs) => {
    console.log(`Find ${docs.length} documents form query helper`);
  });

// TODO: virutals
// TODO: plugins
