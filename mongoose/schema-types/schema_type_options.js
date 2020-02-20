const mongoose = require('mongoose');

const numberSchema = new mongoose.Schema({
  integerOnly: {
    type: Number,
    set: v => Math.round(v),
    alias: 'i'
  }
});

const Integer = mongoose.model('Number', numberSchema);

var doc = new Integer();
doc.integerOnly = 2.0;
console.log(doc.integerOnly); // 2
console.log(doc.i); // 2
doc.i = 3.001;
console.log(doc.integerOnly); // 3
