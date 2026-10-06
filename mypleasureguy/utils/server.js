const express = require('express')
const app = express()
const port = 3001
const cors = require('cors');

app.use(express.json())
app.use(cors());

let data = {"empty": "empty"};


app.get('/', (req, res) => {
  res.send(JSON.stringify(data))
})

app.post('/', (req, res) => {
// console.log(req.body);
data = req.body;
res.send(JSON.stringify(data));
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
