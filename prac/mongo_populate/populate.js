const Person = require('./schema').Person;
const Story = require('./schema').Story;
const mongoose = require('mongoose'); const MONGODB_URI = 'mongodb://localhost:27017/prac?retryWrites=true'
mongoose
    .connect(
        MONGODB_URI
    );
// https://mongoosejs.com/docs/populate.html
async function aa() {
    const queriedStroy = await Story.findOne({ title: 'Casino Royale' }).
        populate('fans').
        exec(async (err, story) => {
            if (err) {
                return Error(err);
            }
            /**
             * populate populates referenced record from other table 'Person' to the queried 
             * record in Story. as an argument the target column that make a reference to the other table
             * should be specified. 
             * exec will do the follow up logic like update the record or add some record
             */
            console.log(story);

            const fan = new Person({
                _id: new mongoose.Types.ObjectId(),
                name: 'wonjae',
                age: 39
            });
            fan.save();
            story.fans.push(fan);

            /** if you push literal structure, it won't be well processed.
             *  you gotta use model constructor to build a new record and then 
             * those instances should be pushed
             */
            // story.fans.push({
            //     _id: new mongoose.Types.ObjectId(),
            //     name: 'wonjae',
            //     age: 39
            // });
            await story.save();


            // https://www.freecodecamp.org/news/check-if-javascript-array-is-empty-or-not-with-length/
            /* This is how to detect the empty array */
            if (!story.fans.length) {

            } else {

                console.log('aa')
            }
        });

}

// const aa = Story.findOne({ title: 'Casino Royale' });
//         aa.populate('author').
//     exec(function (err, story) {
//         if (err) return handleError(err);
//         console.log('The author is %s', story.author.name);
//         console.log(story.populated('author'))
//         // prints "The author is Ian Fleming"
//     });

aa();