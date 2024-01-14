const mongoose = require('mongoose')
const dbHost = "localhost:27017";
const dbName = "SeminarDB";
const url = `mongodb://${dbHost}/${dbName}`;

mongoose.connect(url)
.then(()=>{
    console.log("connection established")
}) 
.catch((error)=>{
    console.log(error.message)
});
