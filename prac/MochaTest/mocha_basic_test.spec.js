// This is from official documentation

var assert = require('assert');
const { expect } = require('chai');
const chai = require('chai')


describe('mocha_basic_test', function() {
    describe('#indexOf()', function() {
        it('should return -1 when the value is not present', function() {
            assert.equal([1,2,3].indexOf(4), -1);   
                 
        })
    })
})