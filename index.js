const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

require('dotenv').config()



const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster0.mq9ya.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){
  try{
    await client.connect();
    const equipmentCollection = client.db("equipments").collection("equipment");
    
    //get products to mongodb
    app.get('/products', async (req, res)=>{
      const query = req.body;
      const cursor = equipmentCollection.find(query);
      const result = await cursor.toArray();

      res.send(result);
    })

  }
  finally{
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/', (req, res) =>{
    
    res.send('hello from lab server');
})

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
  });