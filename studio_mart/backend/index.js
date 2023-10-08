const express = require('express')
const app = express()
const port = 4000
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


const mongo=require("./db")
mongo();
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(express.json());
app.use('/api',require("./Routes/CreateUsers"));
app.use('/api',require("./Routes/displayData"));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})