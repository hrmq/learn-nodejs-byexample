const mongoose = require('mongoose');

const Person = new mongoose.Schema({
  name: {
    first: String,
    last: String
  },
  occupation: String,
  age: Number
});

Person.findOne({ 'name.last': 'ghost' }, 'name occupation', function(
  err,
  person
) {
  if (err) throw new Error(err.message);
  console.log(
    '%s %s is a %s.',
    person.name.first,
    person.name.last,
    person.occupation
  );
});

