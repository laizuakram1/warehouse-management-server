const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

require('dotenv').config()



const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster0.mq9ya.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  if(err){
      console.log('db not connected');
  }
  
  console.log('db connected');
  // perform actions on the collection object
//   client.close();
});


app.get('/', (req, res) =>{
    
    res.send('hello from lab server');
})

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
  });