module.exports =  async(num) => {
        return new Promise((resolve, reject, next)=> setTimeout((num)=>{ console.log(num*num); }, 1000, num)); 
    }