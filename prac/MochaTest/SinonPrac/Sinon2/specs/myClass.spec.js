const myClass = require('../src/myClass');
const { expect } = require('chai');
var myObj = new myClass();
const sinon = require('sinon');

// console.log(myObj.add(1,2));

describe("Chai prac Test suite1", () => {
    var spy = undefined;

    before(() => {
        // keep track of add funtion
        // so we can check actually add method is called or not with callAnotherFn
        spy = sinon.spy(myObj, "add");
    });

    afterEach(() => {
        /** What is difference between resetHistory vs restore
         * restore : Replaces the spy with the original method. Only available if the spy replaced an existing method.
         * resetHistory : Resets the state of a spy.
        */
        // spy.restore();
        spy.resetHistory();

    });


    it("Expect the add method", () => {
        expect(myObj.add(1, 2)).to.be.eql(3);
        expect(myObj.add(1, 2)).not.to.be.eql(5);
    });
    it("Spy the add method", () => {
        var arg1 = 10, arg2 = 20;
        myObj.callAnotherFn(10, 20);
        // here he doesn't use sinon-chai
        sinon.assert.calledOnce(spy);
        sinon.assert.calledOnce(myObj.add);

        sinon.assert.calledWith(spy, arg1, arg2);
        expect(spy.calledOnce).to.be.true;
        expect(myObj.add.callCount).to.be.eql(1);
        /** The below is not a working code
         * to be able to make the below work, we need to import sinon-chai library
         *  https://www.chaijs.com/plugins/sinon-chai/
         * 
         * expect(spy).to.be.calledOnce;
         * expect(spy).to.be.calledWith(arg1, arg2)
         * */
        expect(spy.calledWith(arg1, arg2)).to.be.true;
        sinon.assert.calledWith(myObj.add, 10, 20);
    });

    it("Spy the callback", () => {

        // keep track of add funtion
        // so we can check actually add method is called or not with callAnotherFn

        var callback = sinon.spy();

        myObj.callTheCallback(callback);

        // sinon also has its own assert library
        sinon.assert.calledOnce(callback);
        expect(callback.calledOnce).to.be.true;

    });

    // 아래 것은 단순하게 sayHello 함수가 콜이 되었는지 아닌지 정도만 확인하고 끝나네
    it("Mock the sayHello method", () => {
        // Creates a mock for the provided object.
        var mock = sinon.mock(myObj);
        // Overrides obj.method with a mock function and returns it.
        var expectation = mock.expects("sayHello");
        // Expect the method to be called with obj as this.”}
        expectation.on(myObj);
        expectation.exactly(1);
        expectation.withArgs('halo world');
        
        
        myObj.callAnotherFn(10, 20);
        // Verifies all expectations on the mock.
        mock.verify();



    });
});


describe("Sinon Chai another prac", () => {
    it('just duplicated test as the above', () => {
        // the below is commented out since spy is already defined with myObj.add in the above
        // sinon.spy(myObj, "add");

        const result = myObj.add(2, 3);

        expect(myObj.add.calledOnce).to.be.true;
        expect(myObj.add.called).to.be.true;
        expect(myObj.add.callCount).to.be.eql(1);
    })
});