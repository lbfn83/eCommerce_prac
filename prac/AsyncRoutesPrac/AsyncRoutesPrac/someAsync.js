module.exports =  async(num) => {
        return new Promise((resolve, reject)=> setTimeout((num)=>{ console.log(num*num); }, 1000, num)); 
    }