const Person = require('./schema').Person;
const Story = require('./schema').Story;
const mongoose = require('mongoose');
const MONGODB_URI = 'mongodb://localhost:27017/prac?retryWrites=true'
mongoose
  .connect(
    MONGODB_URI
  )


const author = new Person({ 
    _id : new mongoose.Types.ObjectId(),
    name : 'Ian Fleming',
    age :50

});

author.save(function (err) {
    if (err) return handleError(err);
  
    const story1 = new Story({
      title: 'Casino Royale',
      author: author._id    // assign the _id from the person
    });
  
    story1.save(function (err) {
      if (err) return handleError(err);
      // that's it!
    });
  });