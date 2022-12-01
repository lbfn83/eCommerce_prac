// https://www.npmjs.com/package/pubsub-js

const pubsub = require('pubsub-js');

var token = pubsub.subscribe('hello' , function(msg, data) {
    console.log('msg :', msg);
    console.log('data :', data);
});

pubsub.publish('hello', 'world');


// create a function to subscribe to topics
var mySubscriber = function (msg, data) {
    console.log( msg, " : ",data );
};

// add the function to the list of subscribers for a particular topic
// we're keeping the returned token, in order to be able to unsubscribe
// from the topic later on
var token = pubsub.subscribe('MY TOPIC', mySubscriber);

// publish a topic asynchronously
pubsub.publish('MY TOPIC', 'hello world!');