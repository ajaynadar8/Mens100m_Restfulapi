const express = require("express");
require("./db/conn");
const MensRanking = require("../src/models/mens");
const router = require("../src/routers/men");
const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());   // if it is not done then in o/p it will show undefined
app.use(router);

app.listen(port,() =>{

    console.log(`connection is live at port no ${port} `);
})
