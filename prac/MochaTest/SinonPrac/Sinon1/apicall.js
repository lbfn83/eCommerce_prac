
// https://www.youtube.com/watch?v=vXDbmrh0xDQ

const axios= require('axios');

// funcking fetch is only supported in react
module.exports = {
    getTODOById: async(benefit_type) => {
        const reqString = `http://localhost:5000/database/companies/benefit/${benefit_type}`;
        return new Promise(async(resolve, reject) => {
            await axios.request({
                url : reqString, 
                method: 'get'
            })
                .then((res) => {
                    // console.log( res);
                    resolve(res)
                    // resolve(res.data[0].company_name)
                })
                .catch((err) => {
                    if (err) {
                        return reject(err);
                    }
                })
        })

    }

}