// https://levelup.gitconnected.com/prevent-csrf-attacks-in-node-js-application-d71df3704944
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const app = express();
const axios = require('axios');
const PORT_NUM = 3010

app.use(cookieParser());
app.use(express.json());
// app.use(express.static(path.join(__dirname, 'public')));
app.get("/transfer", (req, res) => {
    // https://masteringjs.io/tutorials/express/sendfile
    // Send Static Files in Express with sendFile()
    res.sendFile(path.join(__dirname, 'public/transferPost.html'));
});
app.post("/transfer", async (req, res) => {
    // utilizing cookie in req, try to access another website with that cookie by invoking post request
    // In this example, this request will place an order for every items already put in the cart
    var queryOption = {
        method: 'POST',
        url: 'http://localhost:3000/create-order',
        headers: {
            'Cookie': `connect.sid = ${req.cookies["connect.sid"]}`
        }
    }

    // res.cookie('connect.sid',  req.cookies["connect.sid"]);
    // console.log(req.cookies)
    // /create_order POST 
    const result = await axios.request(queryOption);

    if (isAuthenticated(req.cookies["session"])) {
        // transfer money and insert data in the database
        console.info("Transferring Money...");
        res.status(200).send("OK");
    } else {
        res.status(400).send("Bad Request");
    }
})

app.listen(PORT_NUM, () => console.log(`server started at ${PORT_NUM}!`));

const isAuthenticated = (session) => {
    return (session === "valid_user");

}

/** 
 * In order to manually generate cookie you need to open your browser developer tools by right clicking and 
 * clicking on inspect and after that opening console tab and running this line of Javascript code:
 * 
 * document.cookie="session=valid_user";
*/