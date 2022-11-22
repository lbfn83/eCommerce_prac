// https://expressjs.com/en/guide/using-middleware.html

const express = require('express');
const app = express();
const userRouter =  require('./router/user');
const adminRouter =  require('./router/admin');

app.use(express.json());
app.use(adminRouter);
app.use(userRouter);

// mount the router on the app
// app.use('/', router)

app.listen(3000, () => {
    console.log("listening on port 3000");
});