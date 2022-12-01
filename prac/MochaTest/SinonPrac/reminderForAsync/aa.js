
  function resolveAfter2Seconds() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('2 seconds');
      }, 2000);
    });
  }
  function resolveAfter4Seconds() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('4 seconds');
      }, 4000);
    });
  }
  (async()=> {
    console.log(await resolveAfter4Seconds());
  })();