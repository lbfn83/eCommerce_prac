// const jest = require('jest');
const adminSum = require('../admin');

test('adds 1 + 2 to equal 3', ()=>{
    expect(adminSum(1,2)).toBe(3);
});