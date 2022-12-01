// https://www.youtube.com/watch?v=7r4xVDI2vho&t=1478s
// This algo utilize two dimensional array and the array referecing to each index(chunk) of afomentioned array

const chunkArray = (arr, len) => {
    // Init chunked arr
    const chunkedArr = [];
  
    // Loop through arr
    arr.forEach(val => {
      // Get last element
      const last = chunkedArr[chunkedArr.length - 1];
  
      // Check if last and if last length is equal to the chunk len
      if (!last || last.length === len) {
        chunkedArr.push([val]);
      } else {
        last.push(val);
      }
    });
  
    return chunkedArr;
  };
  
  module.exports = chunkArray;

  console.log(chunkArray([1,2,3,4,5,6,7,8,9], 2));