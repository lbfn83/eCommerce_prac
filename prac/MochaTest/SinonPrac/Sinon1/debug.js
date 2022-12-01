const request = require('./apicall');
const total_benefit_type = ['student_loan_repayment', 'tuition_assistance', 'tuition_reimbursement', 'full_tuition_coverage'];

(async() => {
    try{
        const a = await request.getTODOById('student_loan_repayment');
        console.log(  a );

    }catch(e)
    {
        console.error("error", e)
    }
})();