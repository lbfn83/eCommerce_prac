// const someAsync = require('./helpers/someAsync')
const someAsync = require('./someAsync')


const asyncRoute = route => (req, res, next = console.error) =>
    Promise.resolve(route(req, res)).catch(next)

const myRoute = async (req, res) => {
    const result = await someAsync(req.body)
    res.json(result)
}


(async()=>{
    
    console.log(await someAsync(10));
})();
module.exports = asyncRoute(myRoute);