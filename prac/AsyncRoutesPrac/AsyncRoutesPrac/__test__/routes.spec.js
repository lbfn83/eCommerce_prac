const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const proxyquire = require('proxyquire');
const routes = require('../routes');


chai.use(sinonChai);
describe('src/routes/myRoute', () => {
  const mockSomeAsync = sinon.stub();

  // it is going to mimic the behavior of routes with replacing someAsync with stub
  const myRoute = proxyquire('../routes', {
    './someAsync': mockSomeAsync
  });


  const req = { body: 'some body' };
  const res = { json: sinon.stub() };

// this is default for express http request
// any error will invoke next to the defualt error handler of express
  const next = sinon.spy();
  const resetStubs = () => {
    res.json.resetHistory()
    next.resetHistory()
  }
  const result = 'some result'


  context('no errors', () => {
    before(async () => {
      mockSomeAsync.resolves(result);
      await myRoute(req, res, next);

    })
    after(resetStubs)
    it('called someAsync with the right data', () => {
      // mockSomeAsync is acutally stub for someAsync functino
      // don't get it confused with the return function from proxyquire
      chai.expect(mockSomeAsync).to.have.been.calledWith(req.body); //
      // chai.expect(mockSomeAsync).to.have.been.calledWith(res);
      // chai.expect(mockSomeAsync).to.have.been.calledWith(req);
    })
    it('called res.json with the right data', () => {
      // myRoute 내부에서 실질적으로 res.json이 콜되고..
      // 우린 그걸 stub으로 해서 function call 때 인자로 보냈지
      chai.expect(res.json).to.have.been.calledWith(result);
      
      // chai.expect(res.json).to.have.been.caller()
    })
    it("didn't call next", () => {
      chai.expect(next).not.to.have.been.called
    })
  })
  
  context('has errors', () => {
    const error = 'some error';
    before(async () => {
      mockSomeAsync.rejects(error)
      await myRoute(req, res, next)
    })
    after(resetStubs)
    it('called someAsync with the right data', () => {
      chai.expect(mockSomeAsync).to.have.been.calledWith(req.body)
    })
    it("didn't call res.json", () => {
      chai.expect(res.json).not.to.have.been.called
    })
    it('called next with the error', () => {
      // https://stackoverflow.com/questions/42119260/sinon-chai-calledwithnew-error-and-with-exact-message
      const errArg = next.firstCall.args[0];
      // const errArg2 = next.getCall(0).args[0];
      chai.expect(errArg).to.be.instanceof(Error);
      chai.expect(errArg.name).to.equal(error);
      // chai.expect(next).to.have.been.calledWith(error)
    })
  })
})