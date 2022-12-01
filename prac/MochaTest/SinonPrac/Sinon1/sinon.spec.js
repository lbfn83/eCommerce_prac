// https://www.youtube.com/watch?v=vXDbmrh0xDQ
const apicall = require('./apicall');
const sinon = require('sinon');
const axios = require('axios');
const chai = require('chai');
const expect = chai.expect;
const sinonChai = require('sinon-chai');

chai.use(sinonChai)
const result = require('./mockResult')
// console.log(result)
const a = sinon.stub(axios, "request");
describe('sinon : dwindle routes test /database/companies/benefit/${benefit_type}', () => {
    before(() => {
       

        // specify the argument for the callback function for axios
        // .yield(result)
        //  비디오의 yield는 callback function인데.. axios는 callback function이 없고. 대신, promise를 반환한다.
        a.resolves(result)
    })
    after(() => {

        axios.request.restore();

    })
    it('result has company named Abott as first element', (done => {
        apicall.getTODOById('student_loan_repayment')
            .then((product) => {
                expect(product.data[0].company_name).to.equal('Abbott');
                done();
            })
            .catch(err => {
                done(err);
            })
    }))
    it('todo has company named Abott', (done => {
        apicall.getTODOById('student_loan_repayment')
            .then((product) => {
                const companyNameArry = product.data.map((elem) => {
                    return elem.company_name;
                })
                // expect(product.data).to.have.keys(['industry', 'benefit_details'])
                expect(companyNameArry).to.include.members(['Unqork']);
                done();
            })
            .catch(err => {
                done(err);
            })
    }))
    it('todo has company object contains all the keys', (done => {
        apicall.getTODOById('student_loan_repayment')
            .then((product) => {
                const companyNameArry = product.data.map((elem) => {
                    return elem.company_name;
                })
                expect(product.data).to.have.keys(['industry', 'benefit_details'])
                // expect(companyNameArry).to.include.members(['Unqork']);
                done();
            })
            .catch(err => {
                done(err);
            })
    }))
    it('axios is called with null?', (done => {
        apicall.getTODOById('student_loan_repayment')
            .then((product) => {
                // const spy = sinon.spy()

                // 
                expect(a).to.have.been.calledWith(null)
                done();
            })
            .catch(err => {
                done(err);
            })
    }))

})