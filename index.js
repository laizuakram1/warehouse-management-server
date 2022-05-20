const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

require('dotenv').config()

//middle ware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster0.mq9ya.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){
  try{
    await client.connect();
    const equipmentCollection = client.db("equipments").collection("equipment");
    
    //get products to mongodb

    // http://localhost:5000/products
    app.get('/products', async (req, res)=>{
      const query = req.body;
      const cursor = equipmentCollection.find(query);
      const result = await cursor.toArray();

      res.send(result);
    })

    //post data to mongodb
    app.post('/porduct', async(req, res) =>{
      const data = req.body;
      // const data = {name: "akram", text: "Hello"};
      const result = await equipmentCollection.insertOne(data);
      console.log( `inseted id:${result.insertedId}`);
      
      res.send(result);
    })

    // udate data to mongodb
    // http://localhost:5000/product/6287386ad467649e6b2cee18
    app.put('/product/:id',async(req,res) =>{
      const data = req.body;
      const id = req.params.id;
      const filter = {_id:ObjectId(id)};
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          ...data
        },
      };
      const result = await equipmentCollection.updateOne(filter, updateDoc, options);
      console.log('udate data');
      
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