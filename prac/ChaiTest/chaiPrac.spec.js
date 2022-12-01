const chai = require('chai');
const should = chai.should;
const expect = chai.expect;

chai.use(should);

describe('Chai syntax practice', ()=> {
    it('1. not throw ', ()=> {
        expect(function () { }).to.not.throw();
    });
    it('2. throw error What', ()=> {
        expect(function () { throw Error("What")}).to.throw("What");
    });
    it('3. expect not have property ', ()=> {
        expect({a:1}).to.not.have.property('b');
    });
    it('4. a. include  ', ()=> {
        expect([1,2]).to.be.a('array').that.does.not.include(3);
    });

});