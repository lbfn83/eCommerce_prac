
const someAsync = async(num) => {
    console.log( num)
    // const number = parseInt(num);
    setTimeout((num)=>{ 
        console.log( num);
        console.log(num*num); }, 1000, num);
    
}

const someAsyncWithError = async(num) => {
    // throw new Error("real error");
    return Promise.reject("error invoked");
}

module.exports = {someAsync, someAsyncWithError};