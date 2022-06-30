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

    // https://pure-coast-15289.herokuapp.com/products
    app.get('/products', async (req, res)=>{
      const query = req.body;
      const cursor = equipmentCollection.find(query);
      const result = await cursor.toArray();

      res.send(result);
    })


    //post data to mongodb

    // https://pure-coast-15289.herokuapp.com/product
    app.post('/product', async(req, res) =>{
      const product = req.body;
      // const data = {name: "akram", text: "Hello"};
      const result = await equipmentCollection.insertOne(product);
      console.log( `inseted id:${result.insertedId}`);
      
      res.send(result);
    })

    // update data to mongodb
    // https://pure-coast-15289.herokuapp.com/product/6287386ad467649e6b2cee18
    app.put('/product/:id',async(req,res) =>{
      const id = req.params.id;
      const data = req.body;
      const filter = {_id: ObjectId(id)};
      const options = { upsert: true };
      const updateDoc = {
        $set: {
            quantity:data.quantity
        },
      };
      const result = await equipmentCollection.updateOne(filter, updateDoc, options);
      console.log('update data');
      
      res.send(result);
    })

    // delete data to mongodb
    // https://pure-coast-15289.herokuapp.com/product
    app.delete('/item/:id', async(req,res) =>{
      const id = req.params.id;
      console.log(id)
      const query = {_id:ObjectId(id)}
      const result = await equipmentCollection.deleteOne(query);
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