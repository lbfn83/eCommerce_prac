// https://www.youtube.com/watch?v=AMJYAtz1-9Q

const uuid = require('uuid');

module.exports = function getID() {
    return uuid.v4();
}
