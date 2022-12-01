const { expect } = require('chai');
const sinon = require('sinon');

describe("stubbed callback", function () {
    it("should behave differently based on arguments", function () {
        const callback = sinon.stub();
        callback.withArgs(42).returns(1);
        callback.withArgs(1).throws("name");
        const result = callback();
        // const result2 = callback(1);
        
        expect(callback()).to.be.undefined;
        expect(callback(42)).to.be.eql(1);
        expect(callback.withArgs(42).callCount).to.be.eql(1);
    });
});