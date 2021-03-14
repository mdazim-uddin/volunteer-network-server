const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId
const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_PASS}@cluster0.mj0t1.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const app = express()

app.use(bodyParser.json())
app.use(cors())

const port = 5000



const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("volunteerStore").collection("volunteerProducts");
  console.log("db connection")

  app.post("/add", (req,res) => {
    const newEvent = req.body ;
    collection.insertOne(newEvent)
    .then(result=>{
      res.send(result.insertedCount > 0)
      console.log(result)
    })
  })

  app.get('/adeding', (req, res) => {
    collection.find({})
    .toArray((err,documents)=>{
      res.send(documents)
    })
  })

  app.delete('/delete',(req,res) => {
    // console.log(req.params.id)
    collection.deleteOne({_id:ObjectId(req.query.id)})
    .then(result => {
      console.log(result)
    })
  })


});





app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.PORT || port)