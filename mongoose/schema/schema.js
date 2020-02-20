const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    title: String,
    author: {
      firstName: String,
      lastName: String
    },
    slug: String,
    text: String,
    comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now },
    published: Boolean
  },
  {
    toObject: { getters: true, virtuals: true }
  }
);

// instance method
blogSchema.methods.publishedCount = function(cb) {
  return this.model('Blog')
    .find({ published: true })
    .countDocuments(cb);
};

// virtual method
blogSchema.virtual('authorFullName').get(function() {
  return this.author.firstName + ' ' + this.author.lastName;
});

// static method
blogSchema.statics.findByTitle = function(name, cb) {
  return this.find({ title: new RegExp(name, 'i') }, cb);
};

// query helper
blogSchema.query.byTitle = function(name) {
  return this.where({ title: new RegExp(name, 'i') });
};

const model = mongoose.model('Blog', blogSchema);
module.exports = model;
