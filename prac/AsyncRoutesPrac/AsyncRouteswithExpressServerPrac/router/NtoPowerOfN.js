// const someAsync = require('./helpers/someAsync')
// const someAsync = require('./helpers/someAsync')

const asyncRoute = require('./asyncRouterWrapper');
const {someAsync, someAsyncWithError} = require('../controller/NtoPowerOfN');

// if route is defined in this way... any HTTP method like get, post will invoke this function
const myRouteWithTry_Catch = async (req, res) => {
    try{

        const result = await someAsyncWithError(req.body.num)
        res.json(result)

    }catch(error)
    {
        console.log(error);
    }
}

const myRoute = async (req, res) => {
        const result = await someAsyncWithError(req.body.num)
        res.json(result)
    
        // how to invoke an error / https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/Error
        // throw new Error("WTF");
}

// 
module.exports = myRouteWithTry_Catch
// module.exports = asyncRoute(myRoute)
