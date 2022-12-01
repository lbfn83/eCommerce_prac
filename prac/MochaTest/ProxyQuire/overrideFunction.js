// const uuidGen = require('./uuidGen');

const proxyquire = require('proxyquire')

// const uuidGen = proxyquire('./uuidGen', { "uuid" : {}})
const uuidGen = proxyquire('./uuidGen', { "uuid" : {
    "v4" : function(){
        return 'always-same-value'
    }
}});



console.log(uuidGen());
console.log(uuidGen());