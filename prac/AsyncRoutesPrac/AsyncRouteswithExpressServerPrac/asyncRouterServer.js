
// https://itnext.io/using-async-routes-with-express-bcde8ead1de8
const express = require('express');
const app = express();
const powerRouter =  require('./router/NtoPowerOfN');
// const adminRouter =  require('./router/admin');
// app.use(express.)
app.use(express.json());
// app.use(adminRouter);
app.use(powerRouter);

// mount the router on the app
// app.use('/', router)

app.listen(3000, () => {
    console.log("listening on port 3000");
});