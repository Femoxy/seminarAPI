require("./configDB/dbConfig")

const express = require("express");
const seminarRouter = require("./router/seminarRouter")
const port = 2020;
const app = express();

app.use(express.json());
app.get('/api/v2', (req, res)=>{
    res.send('Welcome! Book your seminar seat here')
})
app.use("/api/v2", seminarRouter);
app.listen(port, ()=>{
    console.log(`server is running on port: ${port}`)
})