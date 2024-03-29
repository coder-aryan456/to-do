const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors') 
const app = express()

connectToMongo();
app.use(cors())
const port = 3000
app.use(express.json())
app.use('/api/auth', require('./routes/auth.js'))
app.use('/api/notes', require('./routes/notes.js'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})